using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.ComparetiveModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
	public class ComparativeParameterMasterService :BaseService, IComparativeParameterMasterService
	{
		#region /// Variable ///

		IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;

        #endregion

        #region /// Constructor  ///

        public ComparativeParameterMasterService(IUnitofWork uow, UserManagementService userManagementService)
		{
			_uow = uow;
            _userManagementService = userManagementService;
        }

		#endregion

		#region /// Methods ///

		/// <summary>
		/// Craete new comparative parameter master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(ComparativeParameterMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<ComparativeParameterMasterModel, tblCPT_ComparativeParameterMaster>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblCPT_ComparativeParameterMaster data = Mapper.Map<ComparativeParameterMasterModel, tblCPT_ComparativeParameterMaster>(model);

				data = await _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().UpdateAsync(data);

                //Add child records
                if ((model.BenificiaryList != null && model.BenificiaryList.Count > 0))
                {
                    foreach (var item in model.BenificiaryList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblCPT_ComparativeParameterBenificiaryMapping objChild = new tblCPT_ComparativeParameterBenificiaryMapping();
                            objChild.ComparativeParameterId = data.Id;
                            objChild.BenificiaryId = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblCPT_ComparativeParameterBenificiaryMapping>().AddAsync(objChild);
                        }
                    }
                }

                _uow.save();

				objReturn = SetResultStatus(data.Id.ToString(), MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				objReturn.Data = null;
				objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// Update existing comparative parameter master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(ComparativeParameterMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{
					tblCPT_ComparativeParameterMaster objResult = await _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<ComparativeParameterMasterModel, tblCPT_ComparativeParameterMaster>()
							 .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							 .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().UpdateAsync(objResult);

                        //delete child records
                        if (objResult.tblCPT_ComparativeParameterBenificiaryMapping.Count > 0)
                        {
                            _uow.GenericRepository<tblCPT_ComparativeParameterBenificiaryMapping>().DeleteAllById(objResult.tblCPT_ComparativeParameterBenificiaryMapping.ToList());
                        }

                        //Add child records
                        if ((model.BenificiaryList != null && model.BenificiaryList.Count > 0))
                        {
                            foreach (var item in model.BenificiaryList)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblCPT_ComparativeParameterBenificiaryMapping objChild = new tblCPT_ComparativeParameterBenificiaryMapping();
                                    objChild.ComparativeParameterId = objResult.Id;
                                    objChild.BenificiaryId = Convert.ToInt32(item);
                                    await _uow.GenericRepository<tblCPT_ComparativeParameterBenificiaryMapping>().AddAsync(objChild);
                                }
                            }
                        }
                        _uow.save();

						objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.Update, true);
					}
					else
					{
						objReturn.Data = null;
						objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
					}
				}
				else
				{
					objReturn.Data = null;
					objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
				}
			}
			catch (Exception ex)
			{
				objReturn.Data = null;
				objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// Get all comparative parameter master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<ComparativeParameterMasterViewModel>> GetAll(IndexModel model)
		{
			ServiceResponse<PagedData<ComparativeParameterMasterViewModel>> objReturn = new ServiceResponse<PagedData<ComparativeParameterMasterViewModel>>();
            bool isAllRecords = false;
                try
			{
				PagedData<ComparativeParameterMasterViewModel> resulData = new PagedData<ComparativeParameterMasterViewModel>();
                long parameterCategoryCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("parameterCategoryCode") ? Convert.ToInt64(model.AdvanceSearchModel["parameterCategoryCode"]) :0) : 0;


                if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))
                {
                    isAllRecords = true;
                }
                else
                {
                    tblUserType objUserType = _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.UserType.Trim().ToLower() == _loginUserDetail.UserType.Trim().ToLower()).FirstOrDefault();
                    if (objUserType != null && objUserType.ParrentUserType == UserTypeEnum.ADM.GetStringValue())
                    {
                        isAllRecords = true;
                    }
                }

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vwCPT_ComparativeParameterMaster> data = GenericGridCall<vwCPT_ComparativeParameterMaster>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false  && (parameterCategoryCode>0? x.CategoryCode==parameterCategoryCode :true) && (isAllRecords ||x.UserSSOID.Trim().ToLower() == _loginUserDetail.SSOID.Trim().ToLower()), model.Search, model.OrderBy, model.OrderByAsc, model.Page);  //&& depIds.Contains(x.DepartmentCode)
                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwCPT_ComparativeParameterMaster, ComparativeParameterMasterViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<ComparativeParameterMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				objReturn = SetResultStatus<PagedData<ComparativeParameterMasterViewModel>>(null, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// comparative parameter master by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<ComparativeParameterMasterModel> GetById(long id)
		{
			ServiceResponse<ComparativeParameterMasterModel> objReturn = new ServiceResponse<ComparativeParameterMasterModel>();
			try
			{
				tblCPT_ComparativeParameterMaster resultData = _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().GetAll(filter: x => x.Id == id).FirstOrDefault();
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
                        x.CreateMap<tblCPT_ComparativeParameterMaster, ComparativeParameterMasterModel>()
                        .ForMember(des => des.BenificiaryList, src => src.MapFrom(y => y.tblCPT_ComparativeParameterBenificiaryMapping.Count > 0 ? y.tblCPT_ComparativeParameterBenificiaryMapping.Select(z => z.BenificiaryId).ToList() : null));

                    });
					objReturn.Data = Mapper.Map<tblCPT_ComparativeParameterMaster, ComparativeParameterMasterModel>(resultData);
					objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
				}
				else
				{
					objReturn.Data = null;
					objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
				}
			}
			catch (Exception ex)
			{
				objReturn.Data = null;
				objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					tblCPT_ComparativeParameterMaster objResult = await _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().UpdateAsync(objResult);
						_uow.save();
						objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.StatusUpdate, true);
					}
					else
					{
						objReturn.Data = null;
						objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
					}
				}
				else
				{
					objReturn.Data = null;
					objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
				}
			}
			catch (Exception)
			{
				objReturn.Data = null;
				objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
			return objReturn;
		}


		#endregion
	}
}
