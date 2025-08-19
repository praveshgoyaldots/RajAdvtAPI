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

namespace CMOWebApi.Services.Services
{
	public class PreviousGovernmentEntryService : BaseService, IPreviousGovernmentEntryService
	{
		#region /// Variable ///

		IUnitofWork _uow;

		#endregion

		#region /// Constructor  ///

		public PreviousGovernmentEntryService(IUnitofWork uow)
		{
			_uow = uow;
		}

		#endregion

		#region /// Methods ///

		/// <summary>
		/// Craete new comparative parameter master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(PreviousGovernmentEntryModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<PreviousGovernmentEntryModel, tblCPT_PreviousGovtEntry>()
					.ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
					.ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblCPT_PreviousGovtEntry data = Mapper.Map<PreviousGovernmentEntryModel, tblCPT_PreviousGovtEntry>(model);

				data = await _uow.GenericRepository<tblCPT_PreviousGovtEntry>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblCPT_PreviousGovtEntry>().UpdateAsync(data);

				// Add child records
				if (model.PreviousGovernmentEntryParameterMappingModel != null && model.PreviousGovernmentEntryParameterMappingModel.Count > 0)
				{
					foreach (var item in model.PreviousGovernmentEntryParameterMappingModel)
					{
						tblCPT_PreviousGovtEntryParameterMapping objChild = new tblCPT_PreviousGovtEntryParameterMapping();
						objChild.PreviousGovtId = data.Id;
						objChild.YearCode = item.YearCode;
						objChild.PhysicalValue = item.PhysicalValue;
						objChild.FinancialValue = item.FinancialValue;
						await _uow.GenericRepository<tblCPT_PreviousGovtEntryParameterMapping>().AddAsync(objChild);
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
		public async Task<ServiceResponse<string>> Edit(PreviousGovernmentEntryModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{
					tblCPT_PreviousGovtEntry objResult = await _uow.GenericRepository<tblCPT_PreviousGovtEntry>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<PreviousGovernmentEntryModel, tblCPT_PreviousGovtEntry>()
							 .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							 .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblCPT_PreviousGovtEntry>().UpdateAsync(objResult);

						//Delete child records
						if (objResult.tblCPT_PreviousGovtEntryParameterMapping.Count > 0)
						{
							_uow.GenericRepository<tblCPT_PreviousGovtEntryParameterMapping>().DeleteAllById(objResult.tblCPT_PreviousGovtEntryParameterMapping.ToList());
						}

						// Add child records
						if (model.PreviousGovernmentEntryParameterMappingModel != null && model.PreviousGovernmentEntryParameterMappingModel.Count > 0)
						{
							foreach (var item in model.PreviousGovernmentEntryParameterMappingModel)
							{
								tblCPT_PreviousGovtEntryParameterMapping objChild = new tblCPT_PreviousGovtEntryParameterMapping();
								objChild.PreviousGovtId = objResult.Id;
								objChild.YearCode = item.YearCode;
								objChild.PhysicalValue = item.PhysicalValue;
								objChild.FinancialValue = item.FinancialValue;
								//objChild.Id = item.Id;
								//if (item.Id > 0)
								//{
								//	await _uow.GenericRepository<tblCPT_PreviousGovtEntryParameterMapping>().UpdateAsync(objChild);
								//}
								//else
								//{
								await _uow.GenericRepository<tblCPT_PreviousGovtEntryParameterMapping>().AddAsync(objChild);
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
		public ServiceResponse<PagedData<PreviousGovernmentEntryListModel>> GetAll(IndexModel model)
		{
			ServiceResponse<PagedData<PreviousGovernmentEntryListModel>> objReturn = new ServiceResponse<PagedData<PreviousGovernmentEntryListModel>>();
			try
			{
				PagedData<PreviousGovernmentEntryListModel> resulData = new PagedData<PreviousGovernmentEntryListModel>();
				PagedData<vw_PreviousGovtEntry> data = GenericGridCall<vw_PreviousGovtEntry>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vw_PreviousGovtEntry, PreviousGovernmentEntryListModel>();
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<PreviousGovernmentEntryListModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				objReturn = SetResultStatus<PagedData<PreviousGovernmentEntryListModel>>(null, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// comparative parameter master by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<PreviousGovernmentEntryModel> GetById(long id)
		{
			ServiceResponse<PreviousGovernmentEntryModel> objReturn = new ServiceResponse<PreviousGovernmentEntryModel>();
			try
			{
				tblCPT_PreviousGovtEntry resultData = _uow.GenericRepository<tblCPT_PreviousGovtEntry>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblCPT_PreviousGovtEntry, PreviousGovernmentEntryModel>()
						.AfterMap((s, des) =>
						{
							des.PreviousGovernmentEntryParameterMappingModel = _uow.GenericRepository<vwCPT_PreviousGovtEntryParameterMapping>().GetAll(filter: z => z.PreviousGovtId == s.Id).Select(item => new PreviousGovernmentEntryParameterMappingModel
							{
								Id = item.MappingId,
								PreviousGovtId = item.PreviousGovtId,
								YearCode = item.YearCode,
								YearName = item.YearName,
								PhysicalValue = item.PhysicalValue,
								FinancialValue = item.FinancialValue,
							}).ToList();
						});
					});
					objReturn.Data = Mapper.Map<tblCPT_PreviousGovtEntry, PreviousGovernmentEntryModel>(resultData);
					if (objReturn.Data.PreviousGovernmentEntryParameterMappingModel.Count > 0)
					{
						var ids = objReturn.Data.PreviousGovernmentEntryParameterMappingModel.Select(z => z.YearCode).ToList();

						List<PreviousGovernmentEntryParameterMappingModel> objdata = _uow.GenericRepository<tblCPT_YearMaster>().GetAll(filter: x => !ids.Contains(x.Code) && x.IsCurrentGovernment!=true 
						).Select(item => new PreviousGovernmentEntryParameterMappingModel
						{
							Id = 0,
							PreviousGovtId = 0,
							YearCode = item.Code,
							YearName = item.YearName,
							PhysicalValue = string.Empty,
							FinancialValue = string.Empty,
							
						}).ToList();

						if (objdata.Count > 0)
						{
							objReturn.Data.PreviousGovernmentEntryParameterMappingModel.AddRange(objdata);
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
					tblCPT_PreviousGovtEntry objResult = await _uow.GenericRepository<tblCPT_PreviousGovtEntry>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblCPT_PreviousGovtEntry>().UpdateAsync(objResult);
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

		public ServiceResponse<List<PreviousGovernmentEntryParameterMappingModel>> GetAllYearList()
		{
			try
			{
				List<PreviousGovernmentEntryParameterMappingModel> result = new List<PreviousGovernmentEntryParameterMappingModel>();
				List<tblCPT_YearMaster> data = _uow.GenericRepository<tblCPT_YearMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.IsCurrentGovernment != true,orderBy:o=>o.OrderBy(x=>x.OrderBy)).ToList();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblCPT_YearMaster, PreviousGovernmentEntryParameterMappingModel>()
					.ForMember(dest => dest.YearCode, opt => opt.MapFrom(src => src.Code)); ;
				});
				IMapper mapper = config.CreateMapper();
				result = mapper.Map(data, result);
				return SetResultStatus<List<PreviousGovernmentEntryParameterMappingModel>>(result, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return null;
			}
		}

		/// <summary>
		/// Get comparative parameter by parameter code
		/// </summary>
		/// <param name="paraCode"></param>
		/// <returns></returns>
		public ServiceResponse<ComparativeTargetParmeterListModel> GetParameterDetailByParameterCode(long paraCode)
		{
			ServiceResponse<ComparativeTargetParmeterListModel> objReturn = new ServiceResponse<ComparativeTargetParmeterListModel>();
			try
			{

				vwCPT_ComparativeTargetParmeter objdata = _uow.GenericRepository<vwCPT_ComparativeTargetParmeter>().GetAll(filter: x => x.IsActive == true && x.Code==paraCode).FirstOrDefault();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwCPT_ComparativeTargetParmeter, ComparativeTargetParmeterListModel>()
					 .ForMember(dest => dest.ParameterCode, opt => opt.MapFrom(src => src.Code));
				});
				IMapper mapper = config.CreateMapper();
				objReturn.Data = mapper.Map(objdata, objReturn.Data);

				return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<ComparativeTargetParmeterListModel>(null, MessageStatus.Error, false); ;
			}

		}

		#endregion
	}
}
