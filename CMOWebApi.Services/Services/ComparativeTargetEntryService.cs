using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.ComparetiveModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CMOWebApi.Services.Services
{
    public class ComparativeTargetEntryService : BaseService, IComparativeTargetEntryService
    {
        #region /// Variable ///

        IUnitofWork _uow;
		private readonly GetAllDropDownList _ddlObj;
		#endregion

		#region /// Constructor  ///

		public ComparativeTargetEntryService(IUnitofWork uow, GetAllDropDownList ddlObj)
        {
            _uow = uow;
			_ddlObj = ddlObj;
		}

        #endregion

        #region /// Methods ///

        /// <summary>
        /// Craete new comparative parameter master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(ComparativeTargetEntryModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ComparativeTargetEntryModel, tblCPT_ComparativeParameterTarget>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblCPT_ComparativeParameterTarget data = Mapper.Map<ComparativeTargetEntryModel, tblCPT_ComparativeParameterTarget>(model);

                data = await _uow.GenericRepository<tblCPT_ComparativeParameterTarget>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblCPT_ComparativeParameterTarget>().UpdateAsync(data);

                // Add child records
                if (model.ComparativeParameterTargetParameterMappingModel != null && model.ComparativeParameterTargetParameterMappingModel.Count > 0)
                {
                    foreach (var item in model.ComparativeParameterTargetParameterMappingModel)
                    {
                        tblCPT_ComparativeParameterTargetParameterMapping objChild = new tblCPT_ComparativeParameterTargetParameterMapping();
                        objChild.ComparativeParameterTargetId = data.Id;
                        objChild.ParameterCode = item.ParameterCode;
                        objChild.PhysicalValue = item.PhysicalValue;
                        objChild.FinancialValue = item.FinancialValue;
                        await _uow.GenericRepository<tblCPT_ComparativeParameterTargetParameterMapping>().AddAsync(objChild);
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
        public async Task<ServiceResponse<string>> Edit(ComparativeTargetEntryModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblCPT_ComparativeParameterTarget objResult = await _uow.GenericRepository<tblCPT_ComparativeParameterTarget>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<ComparativeTargetEntryModel, tblCPT_ComparativeParameterTarget>()
                             .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                             .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblCPT_ComparativeParameterTarget>().UpdateAsync(objResult);

                        //Delete child records
                        if (objResult.tblCPT_ComparativeParameterTargetParameterMapping.Count > 0)
                        {
                            _uow.GenericRepository<tblCPT_ComparativeParameterTargetParameterMapping>().DeleteAllById(objResult.tblCPT_ComparativeParameterTargetParameterMapping.ToList());
                        }

                        // Add child records
                        if (model.ComparativeParameterTargetParameterMappingModel != null && model.ComparativeParameterTargetParameterMappingModel.Count > 0)
                        {
                            foreach (var item in model.ComparativeParameterTargetParameterMappingModel)
                            {
                                tblCPT_ComparativeParameterTargetParameterMapping objChild = new tblCPT_ComparativeParameterTargetParameterMapping();
                                objChild.ComparativeParameterTargetId = objResult.Id;
                                objChild.ParameterCode = item.ParameterCode;
                                objChild.PhysicalValue = item.PhysicalValue;
                                objChild.FinancialValue = item.FinancialValue;
                                //objChild.Id = item.Id;
                                //if (item.Id > 0)
                                //{
                                //    await _uow.GenericRepository<tblCPT_ComparativeParameterTargetParameterMapping>().UpdateAsync(objChild);
                                //}
                                //else
                                //{
                                    await _uow.GenericRepository<tblCPT_ComparativeParameterTargetParameterMapping>().AddAsync(objChild);
                                    //_uow.save();
                                //}

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
        public ServiceResponse<PagedData<ComparativeParameterTargetViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<ComparativeParameterTargetViewModel>> objReturn = new ServiceResponse<PagedData<ComparativeParameterTargetViewModel>>();
            try
            {
				List<SelectListItem> dep = _ddlObj.GetDepartmentalProgressList();
				List<int> depIds = dep.Select(x => Convert.ToInt32(x.Value)).ToList();

				PagedData<ComparativeParameterTargetViewModel> resulData = new PagedData<ComparativeParameterTargetViewModel>();
                PagedData<vw_ComparativeParameterTarget> data = GenericGridCall<vw_ComparativeParameterTarget>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false && depIds.Contains(Convert.ToInt32(x.DepartmentCode)), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_ComparativeParameterTarget, ComparativeParameterTargetViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<ComparativeParameterTargetViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<ComparativeParameterTargetViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// comparative parameter master by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ComparativeTargetEntryModel> GetById(long id)
        {
            ServiceResponse<ComparativeTargetEntryModel> objReturn = new ServiceResponse<ComparativeTargetEntryModel>();
            try
            {
                tblCPT_ComparativeParameterTarget resultData = _uow.GenericRepository<tblCPT_ComparativeParameterTarget>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblCPT_ComparativeParameterTarget, ComparativeTargetEntryModel>()
                        .AfterMap((s, des) =>
                        {
                            des.ComparativeParameterTargetParameterMappingModel = _uow.GenericRepository<vwCPT_TargetParameterMapping>().GetAll(filter: z => z.ComparativeParameterTargetId == s.Id && z.DepartmentCode==resultData.DepartmentCode && (z.IsFinancial == true || z.IsPhysical == true)).Select(item => new ComparativeParameterTargetParameterMappingModel
                            {
                                Id = item.MappingId,
                                ComparativeParameterTargetId = item.ComparativeParameterTargetId,
                                ParameterCode = item.ParameterCode,
                                PhysicalParameter = item.PhysicalParameter,
                                FinancialParameter = item.FinancialParameter,
                                physicalUnitName = item.physicalUnitName,
                                FinancialUnitName = item.FinancialUnitName,
                                PhysicalValue = item.PhysicalValue,
                                FinancialValue = item.FinancialValue,
                                IsPhysical = item.IsPhysical,
                                IsFinancial = item.IsFinancial,
								KPICategoryName = item.KPICategoryName,
								KPICategoryCode = item.KPICategoryCode
							}).ToList();
                        });
                        //.ForMember(dest => dest.ComparativeParameterTargetParameterMappingModel, opt => opt.MapFrom(src => src.tblCPT_ComparativeParameterTargetParameterMapping.ToList()));
                    });
                    objReturn.Data = Mapper.Map<tblCPT_ComparativeParameterTarget, ComparativeTargetEntryModel>(resultData);
                    if (objReturn.Data.ComparativeParameterTargetParameterMappingModel.Count>0)
                    {
                        var ids = objReturn.Data.ComparativeParameterTargetParameterMappingModel.Select(z => z.ParameterCode).ToList();

                    List<ComparativeParameterTargetParameterMappingModel> objdata = _uow.GenericRepository<vwCPT_ComparativeTargetParmeter>().GetAll(filter: x => x.IsActive == true && !ids.Contains(x.Code) && (x.DepartmentCode == resultData.DepartmentCode || x.IsAplicableToAllDpt==true) && (x.IsFinancial == true || x.IsPhysical == true)).Select(item => new ComparativeParameterTargetParameterMappingModel
                    {
                        Id = 0,
                        ComparativeParameterTargetId = 0,
                        ParameterCode = item.Code,
                        PhysicalParameter = item.PhysicalParameter,
                        FinancialParameter = item.FinancialParameter,
                        physicalUnitName = item.physicalUnitName,
                        FinancialUnitName = item.FinancialUnitName,
                        PhysicalValue = string.Empty,
                        FinancialValue = string.Empty,
                        IsPhysical = item.IsPhysical,
                        IsFinancial = item.IsFinancial,
						KPICategoryName = item.KPICategoryName,
						KPICategoryCode = item.KPICategoryCode
					}).ToList();

                        if (objdata.Count>0)
                        {
                            objReturn.Data.ComparativeParameterTargetParameterMappingModel.AddRange(objdata);
                        }
                    }
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
                    tblCPT_ComparativeParameterTarget objResult = await _uow.GenericRepository<tblCPT_ComparativeParameterTarget>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblCPT_ComparativeParameterTarget>().UpdateAsync(objResult);
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

        /// <summary>
        /// Get all comparative parameter master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ComparativeTargetParmeterListModel>> GetAllParameter(int kPICode, int dpt = 0)
        {
            ServiceResponse<List<ComparativeTargetParmeterListModel>> objReturn = new ServiceResponse<List<ComparativeTargetParmeterListModel>>();
            try
            {
                List<ComparativeTargetParmeterListModel> resultData = new List<ComparativeTargetParmeterListModel>();


                List<vwCPT_ComparativeTargetParmeter> objdata = _uow.GenericRepository<vwCPT_ComparativeTargetParmeter>().GetAll(filter: x => x.IsActive == true  && (x.DepartmentCode == dpt || x.IsAplicableToAllDpt==true) && (x.IsFinancial==true||x.IsPhysical==true)).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwCPT_ComparativeTargetParmeter, ComparativeTargetParmeterListModel>()
                     .ForMember(dest => dest.ParameterCode, opt => opt.MapFrom(src => src.Code));
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(objdata, resultData);

                return SetResultStatus<List<ComparativeTargetParmeterListModel>>(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ComparativeTargetParmeterListModel>>(null, MessageStatus.Error, false); ;
            }

        }

		public ServiceResponse<ComparativeTargetEntryModel> IsDataAvailable(ComparativeTargetEntryModel model)
		{
			try
			{
				List<tblCPT_ComparativeParameterTarget> obj = _uow.GenericRepository<tblCPT_ComparativeParameterTarget>().GetAll(filter: x => x.YearCode == model.YearCode && x.DepartmentCode == model.DepartmentCode  && x.IsDeleted == false && (model.Id > 0 ? x.Id != model.Id : true)).ToList();
				if (obj != null && obj.Count > 0)
				{
					return SetResultStatus<ComparativeTargetEntryModel>(null, MessageStatus.DeptWithYearExist, true);
				}
				else
				{
					return SetResultStatus<ComparativeTargetEntryModel>(null, MessageStatus.Error, false);
				}
			}
			catch (Exception ex)
			{
				return SetResultStatus<ComparativeTargetEntryModel>(null, MessageStatus.Error, false);
			}
		}

		#endregion
	}
}
