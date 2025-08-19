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
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CMOWebApi.Services.Services
{
	public class CurrentGovernmentEntryService : BaseService, ICurrentGovernmentEntryService
	{
		#region /// Variable ///

		IUnitofWork _uow;
        private readonly GetAllDropDownList _ddlObj;

        #endregion

        #region /// Constructor  ///

        public CurrentGovernmentEntryService(IUnitofWork uow, GetAllDropDownList ddlObj)
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
		public async Task<ServiceResponse<string>> Create(CurrentGovtEntryModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<CurrentGovtEntryModel, tblCPT_CurrentGovtEntry>()
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                    .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblCPT_CurrentGovtEntry data = Mapper.Map<CurrentGovtEntryModel, tblCPT_CurrentGovtEntry>(model);

				data = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().UpdateAsync(data);

				// Add child records
				if (model.CurrentGovtEntryParameterMappingModel != null && model.CurrentGovtEntryParameterMappingModel.Count > 0)
				{
					foreach (var item in model.CurrentGovtEntryParameterMappingModel)
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
		/// Update existing comparative parameter master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(CurrentGovtEntryModel model)
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
							cfg.CreateMap<CurrentGovtEntryModel, tblCPT_CurrentGovtEntry>()
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
                        if (model.CurrentGovtEntryParameterMappingModel != null && model.CurrentGovtEntryParameterMappingModel.Count > 0)
						{
							foreach (var item in model.CurrentGovtEntryParameterMappingModel)
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
		/// Get all comparative parameter master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<CurrentGovtEntryListViewModel>> GetAll(IndexModel model, long catCode = 0)
		{
			ServiceResponse<PagedData<CurrentGovtEntryListViewModel>> objReturn = new ServiceResponse<PagedData<CurrentGovtEntryListViewModel>>();
			try
			{

                List<SelectListItem> dep = _ddlObj.GetDepartmentalProgressList();
                List<int> depIds = dep.Select(x => Convert.ToInt32(x.Value)).ToList();

                PagedData<CurrentGovtEntryListViewModel> resulData = new PagedData<CurrentGovtEntryListViewModel>();
				PagedData<vw_CurrentGovtEntry> data = GenericGridCall<vw_CurrentGovtEntry>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false && x.ParameterCategoryCode==catCode && depIds.Contains(Convert.ToInt32(x.DepartmentCode)), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vw_CurrentGovtEntry, CurrentGovtEntryListViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<CurrentGovtEntryListViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				objReturn = SetResultStatus<PagedData<CurrentGovtEntryListViewModel>>(null, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// comparative parameter master by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<CurrentGovtEntryModel> GetById(long id)
		{
			ServiceResponse<CurrentGovtEntryModel> objReturn = new ServiceResponse<CurrentGovtEntryModel>();
			try
			{
				tblCPT_CurrentGovtEntry resultData = _uow.GenericRepository<tblCPT_CurrentGovtEntry>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblCPT_CurrentGovtEntry, CurrentGovtEntryModel>()
						.AfterMap((s, des) =>
						{

							des.CurrentGovtEntryParameterMappingModel = /*_uow.GenericRepository<vwCPT_CurrentGovtEntryParameterMapping>().GetAll(filter: z => z.CurrentGovtEntryId == s.Id && z.DepartmentCode == resultData.DepartmentCode  && (z.IsFinancial == true || z.IsPhysical == true))*/
_uow.ExeccuteStoreProcedure<SP_CPT_ParametersWithCumulativeAndTargetValue_Result>("SP_CPT_ParametersWithCumulativeAndTargetValue @MonthCode,@DepartmentCode,@YearCode,@CurrentGovtEntryId,@ParameterCategoryCode"
                    , new SqlParameter("MonthCode", SqlDbType.BigInt) { Value = resultData.MonthCode }
					, new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = resultData.DepartmentCode}
					, new SqlParameter("YearCode", SqlDbType.Int) { Value = resultData.YearCode}
					, new SqlParameter("CurrentGovtEntryId", SqlDbType.Int) { Value = resultData.Id}
                    , new SqlParameter("ParameterCategoryCode", SqlDbType.Int) { Value = resultData.ParameterCategoryCode>0 ? resultData.ParameterCategoryCode:0}
                    ).Select(item => new CurrentGovtEntryParameterMappingModel
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
					objReturn.Data = Mapper.Map<tblCPT_CurrentGovtEntry, CurrentGovtEntryModel>(resultData);
					//if (objReturn.Data.CurrentGovtEntryParameterMappingModel.Count > 0)
					//{
						var ids = objReturn.Data.CurrentGovtEntryParameterMappingModel.Select(z => z.ParameterCode).ToList();

						List<CurrentGovtEntryParameterMappingModel> objdata =

							//_uow.GenericRepository<vwCPT_ComparativeTargetParmeter>().GetAll(filter: x => x.IsActive == true && !ids.Contains(x.Code)  && (x.DepartmentCode == resultData.DepartmentCode || x.IsAplicableToAllDpt==true) && (x.IsFinancial == true || x.IsPhysical == true))
							_uow.ExeccuteStoreProcedure<SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue_Result>("SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue @MonthCode,@DepartmentCode,@YearCode,@ParameterCategoryCode"
                    , new SqlParameter("MonthCode", SqlDbType.BigInt) { Value = resultData.MonthCode }
					, new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = resultData.DepartmentCode }
					, new SqlParameter("YearCode", SqlDbType.Int) { Value = resultData.YearCode }
                    , new SqlParameter("ParameterCategoryCode", SqlDbType.Int) { Value = resultData.ParameterCategoryCode>0? resultData.ParameterCategoryCode:0 }
                    ).Where(x=>!ids.Contains(x.Code))
							.Select(item => new CurrentGovtEntryParameterMappingModel
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
							objReturn.Data.CurrentGovtEntryParameterMappingModel.AddRange(objdata);
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
        public ServiceResponse<CurrentGovtEntryModel> IsDataAvailable(CurrentGovtEntryModel model)
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
                    CurrentGovtEntryModel result = new CurrentGovtEntryModel();
                    ServiceResponse<List<CurrentGovtEntryParameterMappingModel>> parameters = GetAllParameterWithCumulativeAndTargetValue(model.MonthCode, model.DepartmentCode, model.YearCode,Convert.ToInt64(model.ParameterCategoryCode));
                    result.CurrentGovtEntryParameterMappingModel = parameters.Data;
                   return SetResultStatus(result, MessageStatus.Error, false);
                }
            }
            catch(Exception ex)
            {
               return SetResultStatus<CurrentGovtEntryModel>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get default Parameter With Cumulative And Target Value by month, year and department
        /// </summary>
        /// <param name="monthCode"></param>
        /// <param name="dpt"></param>
        /// <param name="yearCode"></param>
        /// <returns></returns>
        public ServiceResponse<List<CurrentGovtEntryParameterMappingModel>> GetAllParameterWithCumulativeAndTargetValue(long monthCode=0, int dpt = 0,int yearCode=0, long paramCatCode=0)
        {
            ServiceResponse<List<CurrentGovtEntryParameterMappingModel>> objReturn = new ServiceResponse<List<CurrentGovtEntryParameterMappingModel>>();
            try
            {
                List<CurrentGovtEntryParameterMappingModel> resultData = new List<CurrentGovtEntryParameterMappingModel>();


                List<SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue_Result> objdata = _uow.ExeccuteStoreProcedure<SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue_Result>("SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue @MonthCode,@DepartmentCode,@YearCode,@ParameterCategoryCode"
                    , new SqlParameter("MonthCode", SqlDbType.BigInt) { Value = monthCode }
                    , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = dpt }
                    , new SqlParameter("YearCode", SqlDbType.Int) { Value = yearCode }
                     , new SqlParameter("ParameterCategoryCode", SqlDbType.Int) { Value = paramCatCode }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_CPT_DepartmentalProgressParametersWithCumulativeAndTargetValue_Result, CurrentGovtEntryParameterMappingModel>()
                     .ForMember(dest => dest.ParameterCode, opt => opt.MapFrom(src => src.Code));
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(objdata, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<CurrentGovtEntryParameterMappingModel>>(null, MessageStatus.Error, false); ;
            }

        }

        #endregion
    }
}
