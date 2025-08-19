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
	public class DistrictKPIService : BaseService, IDistrictKPIService
	{
		#region /// Variable ///

		IUnitofWork _uow;
		private readonly GetAllDropDownList _ddlObj;
		#endregion

		#region /// Constructor  ///

		public DistrictKPIService(IUnitofWork uow, GetAllDropDownList ddlObj)
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
		public async Task<ServiceResponse<string>> Create(DistrictKPIModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<DistrictKPIModel, tblCPT_CurrentGovtEntry>()
					.ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
					.ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblCPT_CurrentGovtEntry data = Mapper.Map<DistrictKPIModel, tblCPT_CurrentGovtEntry>(model);

				data = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblCPT_CurrentGovtEntry>().UpdateAsync(data);

				// Add child records
				if (model.DistrictKPIParameterMappingModel != null && model.DistrictKPIParameterMappingModel.Count > 0)
				{
					foreach (var item in model.DistrictKPIParameterMappingModel)
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
		public async Task<ServiceResponse<string>> Edit(DistrictKPIModel model)
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
							cfg.CreateMap<DistrictKPIModel, tblCPT_CurrentGovtEntry>()
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
						if (model.DistrictKPIParameterMappingModel != null && model.DistrictKPIParameterMappingModel.Count > 0)
						{
							foreach (var item in model.DistrictKPIParameterMappingModel)
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
		public ServiceResponse<PagedData<DistrictKPIListViewModel>> GetAll(IndexModel model, long catCode = 0)
		{
			ServiceResponse<PagedData<DistrictKPIListViewModel>> objReturn = new ServiceResponse<PagedData<DistrictKPIListViewModel>>();
			try
			{

				List<SelectListItem> dep = _ddlObj.GetDistrictKPIList();
				List<int> depIds = dep.Select(x => Convert.ToInt32(x.Value)).ToList();

				PagedData<DistrictKPIListViewModel> resulData = new PagedData<DistrictKPIListViewModel>();
				PagedData<vw_CurrentGovtEntry> data = GenericGridCall<vw_CurrentGovtEntry>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false && x.ParameterCategoryCode == catCode && depIds.Contains(Convert.ToInt32(x.DepartmentCode)), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vw_CurrentGovtEntry, DistrictKPIListViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<DistrictKPIListViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				objReturn = SetResultStatus<PagedData<DistrictKPIListViewModel>>(null, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// comparative parameter master by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<DistrictKPIModel> GetById(long id)
		{
			ServiceResponse<DistrictKPIModel> objReturn = new ServiceResponse<DistrictKPIModel>();
			try
			{
				tblCPT_CurrentGovtEntry resultData = _uow.GenericRepository<tblCPT_CurrentGovtEntry>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblCPT_CurrentGovtEntry, DistrictKPIModel>()
						.AfterMap((s, des) =>
						{

							des.DistrictKPIParameterMappingModel = _uow.GenericRepository<vwCPT_DistrictKPIEntryParameterMapping>().GetAll(filter: z => z.CurrentGovtEntryId == s.Id && z.CategoryCode==s.ParameterCategoryCode && (z.IsFinancial == true || z.IsPhysical == true) && z.IsDistrict == true).Select(item => new DistrictKPIParameterMappingModel
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
								KPICategoryCode = item.KPICategoryCode
							}).ToList();
						});
					});
					objReturn.Data = Mapper.Map<tblCPT_CurrentGovtEntry, DistrictKPIModel>(resultData);
					//if (objReturn.Data.DistrictKPIParameterMappingModel.Count > 0)
					//{
						var ids = objReturn.Data.DistrictKPIParameterMappingModel.Select(z => z.ParameterCode).ToList();

						List<DistrictKPIParameterMappingModel> objdata = _uow.GenericRepository<vwCPT_DistrictKPITargetParmeter>().GetAll(filter: x => x.IsActive == true && !ids.Contains(x.Code) && x.CategoryCode== resultData.ParameterCategoryCode &&(x.IsFinancial == true || x.IsPhysical == true)).Select(item => new DistrictKPIParameterMappingModel
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
							KPICategoryCode = item.KPICategoryCode
						}).ToList();

						if (objReturn.Data.DistrictKPIParameterMappingModel.Count > 0)
						{
							objReturn.Data.DistrictKPIParameterMappingModel.AddRange(objdata);
					}
					else
					{
						objReturn.Data.DistrictKPIParameterMappingModel=objdata;
					}
                    objReturn.Data.DistrictKPIParameterMappingModel = objReturn.Data.DistrictKPIParameterMappingModel.OrderBy(x => x.KPICategoryName).ToList();
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
		public ServiceResponse<DistrictKPIModel> IsDataAvailable(DistrictKPIModel model)
		{
			try
			{
				List<tblCPT_CurrentGovtEntry> obj = _uow.GenericRepository<tblCPT_CurrentGovtEntry>().GetAll(filter: x => x.YearCode == model.YearCode && x.DepartmentCode == model.DepartmentCode && x.ParameterCategoryCode==model.ParameterCategoryCode && x.MonthCode == model.MonthCode && x.IsDeleted == false && (model.Id > 0 ? x.Id != model.Id : true)).ToList();
				if (obj != null && obj.Count > 0)
				{
					return GetById(obj[0].Id);
				}
				else
				{
					return SetResultStatus<DistrictKPIModel>(null, MessageStatus.Error, false);
				}
			}
			catch (Exception ex)
			{
				return SetResultStatus<DistrictKPIModel>(null, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Get all comparative parameter master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<List<ComparativeTargetParmeterListModel>> GetAllParameterList(int kPICode, int dpt = 0,long catCode=0)
		{
			ServiceResponse<List<ComparativeTargetParmeterListModel>> objReturn = new ServiceResponse<List<ComparativeTargetParmeterListModel>>();
			try
			{
				List<ComparativeTargetParmeterListModel> resultData = new List<ComparativeTargetParmeterListModel>();


				List<vwCPT_DistrictKPITargetParmeter> objdata = _uow.GenericRepository<vwCPT_DistrictKPITargetParmeter>().GetAll(filter: x => x.IsActive == true && x.CategoryCode==catCode && (x.IsFinancial == true || x.IsPhysical == true)).OrderBy(x=>x.KPICategoryName).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwCPT_DistrictKPITargetParmeter, ComparativeTargetParmeterListModel>()
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

		#endregion
	}
}
