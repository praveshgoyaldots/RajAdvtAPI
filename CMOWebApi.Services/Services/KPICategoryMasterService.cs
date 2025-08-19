using AutoMapper;
using CMOWebApi.Core;
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

namespace CMOWebApi.Services.Services
{
	public class KPICategoryMasterService : BaseService, IKPICategoryMasterService
	{

		#region /// Variable ///

		IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;

        #endregion

        #region /// Constructor  ///

        public KPICategoryMasterService(IUnitofWork uow, UserManagementService userManagementService)
		{
			_uow = uow;
            _userManagementService = userManagementService;
        }

		#endregion

		#region /// Methods ///

		/// <summary>
		/// Craete new KPI category master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(KPICategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<KPICategoryMasterModel, tblCPT_KPICategoryMaster>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblCPT_KPICategoryMaster data = Mapper.Map<KPICategoryMasterModel, tblCPT_KPICategoryMaster>(model);

				data = await _uow.GenericRepository<tblCPT_KPICategoryMaster>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblCPT_KPICategoryMaster>().UpdateAsync(data);
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
		/// Update existing KPI category master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(KPICategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{
					tblCPT_KPICategoryMaster objResult = await _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<KPICategoryMasterModel, tblCPT_KPICategoryMaster>()
							 .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							 .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblCPT_KPICategoryMaster>().UpdateAsync(objResult);
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
		/// Get all KPI category master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<KPICategoryMasterViewModel>> GetAll(IndexModel model)
		{
			ServiceResponse<PagedData<KPICategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<KPICategoryMasterViewModel>>();
			try
			{
				PagedData<KPICategoryMasterViewModel> resulData = new PagedData<KPICategoryMasterViewModel>();

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vwCPT_KPICategoryMaster> data = GenericGridCall<vwCPT_KPICategoryMaster>.ListView(model.PageSize, x => x.Name, x => x.IsDeleted == false && (depIds.Contains(x.DepartmentCode) || x.IsAplicableToAllDpt==true), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwCPT_KPICategoryMaster, KPICategoryMasterViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<KPICategoryMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				objReturn = SetResultStatus<PagedData<KPICategoryMasterViewModel>>(null, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// KPI category master  by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<KPICategoryMasterModel> GetById(long id)
		{
			ServiceResponse<KPICategoryMasterModel> objReturn = new ServiceResponse<KPICategoryMasterModel>();
			try
			{
				tblCPT_KPICategoryMaster resultData = _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: x => x.Id == id).FirstOrDefault();
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblCPT_KPICategoryMaster, KPICategoryMasterModel>();
					});
					objReturn.Data = Mapper.Map<tblCPT_KPICategoryMaster, KPICategoryMasterModel>(resultData);
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
					tblCPT_KPICategoryMaster objResult = await _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblCPT_KPICategoryMaster>().UpdateAsync(objResult);
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
