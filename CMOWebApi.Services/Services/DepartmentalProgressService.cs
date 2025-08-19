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
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CMOWebApi.Services.Services
{
    public class DepartmentalProgressService : BaseService, IDepartmentalProgressService
    {
		#region /// Variable ///

		IUnitofWork _uow;
        private readonly GetAllDropDownList _ddlObj;
        private readonly UserManagementService _userManagementService;

        #endregion

        #region /// Constructor  ///

        public DepartmentalProgressService(IUnitofWork uow, GetAllDropDownList ddlObj, UserManagementService userManagementService)
		{
			_uow = uow;
            _ddlObj = ddlObj;
            _userManagementService = userManagementService;
        }

		#endregion

		#region /// Methods ///

		/// <summary>
		/// Craete new Departmental Progress master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(DepartmentalProgressModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<DepartmentalProgressModel, tblCPT_CurrentGovtEntry>()
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                    .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblCPT_CurrentGovtEntry data = Mapper.Map<DepartmentalProgressModel, tblCPT_CurrentGovtEntry>(model);

				data = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().UpdateAsync(data);

				// Add child records
				if (model.DepartmentalProgressParameterMappingModel != null && model.DepartmentalProgressParameterMappingModel.Count > 0)
				{
					foreach (var item in model.DepartmentalProgressParameterMappingModel)
					{
						tblCPT_CurrentGovtEntryParameterMapping objChild = new tblCPT_CurrentGovtEntryParameterMapping();
						objChild.CurrentGovtEntryId = data.Id;
						objChild.ParameterCode = item.ParameterCode;
						objChild.PhysicalValue = item.PhysicalValue;
						objChild.FinancialValue = item.FinancialValue;
						await _uow.GenericRepository<tblCPT_CurrentGovtEntryParameterMapping>().AddAsync(objChild);
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
		/// Update existing Departmental Progress master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(DepartmentalProgressModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{
					tblCPT_CurrentGovtEntry objResult = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<DepartmentalProgressModel, tblCPT_CurrentGovtEntry>()
							 .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							 .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().UpdateAsync(objResult);

                        //Delete child records
                        if (objResult.tblCPT_CurrentGovtEntryParameterMapping.Count > 0)
                        {
                            _uow.GenericRepository<tblCPT_CurrentGovtEntryParameterMapping>().DeleteAllById(objResult.tblCPT_CurrentGovtEntryParameterMapping.ToList());
                        }

                        // Add child records
                        if (model.DepartmentalProgressParameterMappingModel != null && model.DepartmentalProgressParameterMappingModel.Count > 0)
						{
							foreach (var item in model.DepartmentalProgressParameterMappingModel)
							{
								tblCPT_CurrentGovtEntryParameterMapping objChild = new tblCPT_CurrentGovtEntryParameterMapping();
								objChild.CurrentGovtEntryId = objResult.Id;
								objChild.ParameterCode = item.ParameterCode;
								objChild.PhysicalValue = item.PhysicalValue;
								objChild.FinancialValue = item.FinancialValue;
								//objChild.Id = item.Id;
								//if (item.Id > 0)
								//{
								//	await _uow.GenericRepository<tblCPT_CurrentGovtEntryParameterMapping>().UpdateAsync(objChild);
								//}
								//else
								//{
									await _uow.GenericRepository<tblCPT_CurrentGovtEntryParameterMapping>().AddAsync(objChild);
								//	_uow.save();
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
		/// Get all Departmental Progress master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<DepartmentalProgressListViewModel>> GetAll(IndexModel model, long catCode = 0)
		{
			ServiceResponse<PagedData<DepartmentalProgressListViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentalProgressListViewModel>>();
			try
			{

                List<SelectListItem> dep = _ddlObj.GetDepartmentalProgressList();
                List<int> depIds = dep.Select(x => Convert.ToInt32(x.Value)).ToList();

                PagedData<DepartmentalProgressListViewModel> resulData = new PagedData<DepartmentalProgressListViewModel>();
				PagedData<vw_CurrentGovtEntry> data = GenericGridCall<vw_CurrentGovtEntry>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false && x.ParameterCategoryCode!= catCode && depIds.Contains(Convert.ToInt32(x.DepartmentCode)), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vw_CurrentGovtEntry, DepartmentalProgressListViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<DepartmentalProgressListViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				objReturn = SetResultStatus<PagedData<DepartmentalProgressListViewModel>>(null, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// Departmental Progress master by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<DepartmentalProgressModel> GetById(long id)
		{
			ServiceResponse<DepartmentalProgressModel> objReturn = new ServiceResponse<DepartmentalProgressModel>();
			try
			{
				tblCPT_CurrentGovtEntry resultData = _uow.GenericRepository<tblCPT_CurrentGovtEntry>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblCPT_CurrentGovtEntry, DepartmentalProgressModel>()
						.AfterMap((s, des) =>
						{

							des.DepartmentalProgressParameterMappingModel = /*_uow.GenericRepository<vwCPT_CurrentGovtEntryParameterMapping>().GetAll(filter: z => z.CurrentGovtEntryId == s.Id && z.DepartmentCode == resultData.DepartmentCode  && (z.IsFinancial == true || z.IsPhysical == true))*/
_uow.ExeccuteStoreProcedure<SP_CPT_ParametersWithCumulativeAndTargetValue_Result>("SP_CPT_ParametersWithCumulativeAndTargetValue @MonthCode,@DepartmentCode,@YearCode,@CurrentGovtEntryId,@ParameterCategoryCode"
                    , new SqlParameter("MonthCode", SqlDbType.BigInt) { Value = resultData.MonthCode }
					, new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = resultData.DepartmentCode}
					, new SqlParameter("YearCode", SqlDbType.Int) { Value = resultData.YearCode}
					, new SqlParameter("CurrentGovtEntryId", SqlDbType.Int) { Value = resultData.Id}
                    , new SqlParameter("ParameterCategoryCode", SqlDbType.Int) { Value = resultData.ParameterCategoryCode > 0 ? resultData.ParameterCategoryCode : 0 }
                    ).Select(item => new DepartmentalProgressParameterMappingModel
                    {
								Id = item.MappingId,
								CurrentGovtEntryId = item.CurrentGovtEntryId,
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
								KPICategoryCode = item.KPICategoryCode,
								PhysicalCumulativeValue=item.PhysicalCumulativeValue,
								PhysicalTargetValue=item.PhysicalTargetValue,
								FinancialCumulativeValue=item.FinancialCumulativeValue,
								FinancialTargetValue=item.FinancialTargetValue
					}).ToList();
						});
					});
					objReturn.Data = Mapper.Map<tblCPT_CurrentGovtEntry, DepartmentalProgressModel>(resultData);
					//if (objReturn.Data.DepartmentalProgressParameterMappingModel.Count > 0)
					//{
						var ids = objReturn.Data.DepartmentalProgressParameterMappingModel.Select(z => z.ParameterCode).ToList();

						List<DepartmentalProgressParameterMappingModel> objdata =

							//_uow.GenericRepository<vwCPT_ComparativeTargetParmeter>().GetAll(filter: x => x.IsActive == true && !ids.Contains(x.Code)  && (x.DepartmentCode == resultData.DepartmentCode || x.IsAplicableToAllDpt==true) && (x.IsFinancial == true || x.IsPhysical == true))
							_uow.ExeccuteStoreProcedure<SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue_Result>("SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue @MonthCode,@DepartmentCode,@YearCode,@ParameterCategoryCode"
                    , new SqlParameter("MonthCode", SqlDbType.BigInt) { Value = resultData.MonthCode }
					, new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = resultData.DepartmentCode }
					, new SqlParameter("YearCode", SqlDbType.Int) { Value = resultData.YearCode }
                    , new SqlParameter("ParameterCategoryCode", SqlDbType.Int) { Value = resultData.ParameterCategoryCode > 0 ? resultData.ParameterCategoryCode : 0 }
                    ).Where(x=>!ids.Contains(x.Code))
							.Select(item => new DepartmentalProgressParameterMappingModel
						{
							Id = 0,
							CurrentGovtEntryId = 0,
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
							KPICategoryCode = item.KPICategoryCode,
							PhysicalCumulativeValue = item.PhysicalCumulativeValue,
							PhysicalTargetValue = item.PhysicalTargetValue,
							FinancialCumulativeValue = item.FinancialCumulativeValue,
							FinancialTargetValue = item.FinancialTargetValue
							}).ToList();

						if (objdata.Count > 0)
						{
							objReturn.Data.DepartmentalProgressParameterMappingModel.AddRange(objdata);
						}
					//}
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
					tblCPT_CurrentGovtEntry objResult = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().UpdateAsync(objResult);
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
        /// check duplicate record of current gov.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<DepartmentalProgressModel> IsDataAvailable(DepartmentalProgressModel model)
        {
            try
            {
                List<tblCPT_CurrentGovtEntry> obj = _uow.GenericRepository<tblCPT_CurrentGovtEntry>().GetAll(filter: x => x.YearCode == model.YearCode && x.DepartmentCode == model.DepartmentCode && x.MonthCode== model.MonthCode && x.IsDeleted == false && (model.Id> 0 ? x.Id != model.Id : true)).ToList();
                if (obj!=null && obj.Count > 0)
                {
                    return GetById(obj[0].Id);
                }
                else
                {
                    DepartmentalProgressModel result = new DepartmentalProgressModel();
                    ServiceResponse<List<DepartmentalProgressParameterMappingModel>> parameters = GetAllParameterWithCumulativeAndTargetValue(model.MonthCode, model.DepartmentCode, model.YearCode, Convert.ToInt64(model.ParameterCategoryCode));
                    result.DepartmentalProgressParameterMappingModel = parameters.Data;
                   return SetResultStatus(result, MessageStatus.Success, true);
                }
            }
            catch(Exception ex)
            {
               return SetResultStatus<DepartmentalProgressModel>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get default Parameter With Cumulative And Target Value by month, year and department
        /// </summary>
        /// <param name="monthCode"></param>
        /// <param name="dpt"></param>
        /// <param name="yearCode"></param>
        /// <returns></returns>
        public ServiceResponse<List<DepartmentalProgressParameterMappingModel>> GetAllParameterWithCumulativeAndTargetValue(long monthCode=0, int dpt = 0,int yearCode=0, long paramCatCode = 0)
        {
            ServiceResponse<List<DepartmentalProgressParameterMappingModel>> objReturn = new ServiceResponse<List<DepartmentalProgressParameterMappingModel>>();
            try
            {
                List<DepartmentalProgressParameterMappingModel> resultData = new List<DepartmentalProgressParameterMappingModel>();


                List<SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue_Result> objdata = _uow.ExeccuteStoreProcedure<SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue_Result>("SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue @MonthCode,@DepartmentCode,@YearCode,@ParameterCategoryCode"
                    , new SqlParameter("MonthCode", SqlDbType.BigInt) { Value = monthCode }
                    , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = dpt }
                    , new SqlParameter("YearCode", SqlDbType.Int) { Value = yearCode }
                    , new SqlParameter("ParameterCategoryCode", SqlDbType.Int) { Value = paramCatCode }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue_Result, DepartmentalProgressParameterMappingModel>()
                     .ForMember(dest => dest.ParameterCode, opt => opt.MapFrom(src => src.Code));
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(objdata, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<DepartmentalProgressParameterMappingModel>>(null, MessageStatus.Error, false); ;
            }

        }

        #endregion

        #region Web Service

        /// <summary>
        /// This service use for create record in Departmental Progress through service.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> DepartmentalPushService(DepartmentalProgressWebServiceModel model, HttpRequestHeaders header = null)
        {
            try
            {
                if (header != null)
                {
                    IEnumerable<string> username, password, clientid, userId;
                    List<int?> depIds = new List<int?>();
                    
                    header.TryGetValues("username", out username);
                    header.TryGetValues("password", out password);
                    header.TryGetValues("clientid", out clientid);
                    header.TryGetValues("userid", out userId);

                    List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(Convert.ToInt32(userId)).Data;
                    if (dep != null && dep.Count > 0)
                    {
                        depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());
                    }

                    tblClientIdForService objclient = _uow.GenericRepository<tblClientIdForService>().GetAll(
                    filter: x => x.UserId == username.FirstOrDefault() && x.Password == password.FirstOrDefault() && x.ClientId == clientid.FirstOrDefault()
                    && x.tblClientIdModuleMappings.Select(z => z.ModuleCode == model.ModuleId).FirstOrDefault() && depIds.Contains(x.DepartmentCode)
                    ).FirstOrDefault();

                    if (objclient != null)
                    {
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<DepartmentalProgressWebServiceModel, tblCPT_DepartmentalProgressWebService>()
                            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => userId))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => userId));
                        });
                        tblCPT_DepartmentalProgressWebService data = Mapper.Map<DepartmentalProgressWebServiceModel, tblCPT_DepartmentalProgressWebService>(model);

                        data = await _uow.GenericRepository<tblCPT_DepartmentalProgressWebService>().AddAsync(data);
                        _uow.save();

                        return SetResultStatus(Convert.ToString(data.Id), MessageStatus.Save, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.UnthothorizedForActivity, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.UnthothorizedForActivity, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master AddUpdateProjectService ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master AddUpdateProjectService ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master AddUpdateProjectService ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }


        #endregion
    }
}
