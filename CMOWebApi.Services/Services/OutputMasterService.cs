using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Linq;
using System.Threading.Tasks;


namespace CMOWebApi.Services.Services
{
    public class OutputMasterService :BaseService,IOutputMasterService
	{
		IUnitofWork _uow;
		public OutputMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}
		public ServiceResponse<PagedData<SCM_OutputMasterModel>> GetAll(SearchListModel model)
		{
			try
			{
				PagedData<SCM_OutputMasterModel> responsedata = new PagedData<SCM_OutputMasterModel>();

				PagedData<vwSCM_SchemeOutputMaster> resultdata = GenericGridCall<vwSCM_SchemeOutputMaster>.ListView(model.PageSize, x => x.orderByColumn, x => x.IsDeleted == false && (x.Name.ToLower().Contains(model.SearchField.ToLower()) || x.NameHindi.ToLower().Contains(model.SearchField.ToLower())), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwSCM_SchemeOutputMaster, SCM_OutputMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<SCM_OutputMasterModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<SCM_OutputMasterModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SCM_OutputMasterModel>> GetById(long id)
		{
			try
			{
				tblSCM_OutputMaster output = await _uow.GenericRepository<tblSCM_OutputMaster>().GetByIdAsync(id);

				SCM_OutputMasterModel obj = new SCM_OutputMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_OutputMaster, SCM_OutputMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(output, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SCM_OutputMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SCM_OutputMasterModel model)
		{
			ServiceResponse<tblSCM_OutputMaster> objReturn = new ServiceResponse<tblSCM_OutputMaster>();
			try
			{
				tblSchemeOutputMaster result = _uow.GenericRepository<tblSchemeOutputMaster>().GetAll(filter: x => x.Name == model.Name).FirstOrDefault();

				if (result == null)
				{

					Mapper.Initialize(x =>
					{
						x.CreateMap<SCM_OutputMasterModel, tblSCM_OutputMaster>();
					});
					model.CreatedDate = DateTime.Now;
					var Output = Mapper.Map<SCM_OutputMasterModel, tblSCM_OutputMaster>(model);
					await _uow.GenericRepository<tblSCM_OutputMaster>().AddAsync(Output);
					_uow.save();

					Output.Code = Output.Id;
					await _uow.GenericRepository<tblSCM_OutputMaster>().UpdateAsync(Output);
					_uow.save();
					return SetResultStatus(string.Empty, MessageStatus.Success, true);

				}
				else
				{
					return SetResultStatus(string.Empty, MessageStatus.NameExist, true);
				}

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(SCM_OutputMasterModel model)
		{
			ServiceResponse<tblSCM_OutputMaster> objReturn = new ServiceResponse<tblSCM_OutputMaster>();
			try
			{
				tblSchemeOutputMaster result = _uow.GenericRepository<tblSchemeOutputMaster>().GetAll(filter: x => x.Name == model.Name && x.Id != model.Id).FirstOrDefault();

				if (result == null)
				{

					tblSCM_OutputMaster obj = await _uow.GenericRepository<tblSCM_OutputMaster>().GetByIdAsync(model.Id);

					var config = new MapperConfiguration(cfg =>
					{
						cfg.CreateMap<SCM_OutputMasterModel, tblSCM_OutputMaster>();
					});
					IMapper mapper = config.CreateMapper();
					obj = mapper.Map(model, obj);
					obj.ModifiedDate = DateTime.Now;
					await _uow.GenericRepository<tblSCM_OutputMaster>().UpdateAsync(obj);
					_uow.save();
					return SetResultStatus(string.Empty, MessageStatus.Success, true);
				}
				else
				{
					return SetResultStatus(string.Empty, MessageStatus.NameExist, true);
				}

			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Delete(long id)
		{
			try
			{
				tblSCM_OutputMaster cObj = await _uow.GenericRepository<tblSCM_OutputMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDeleted = true;
				await _uow.GenericRepository<tblSCM_OutputMaster>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}
		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> UpdateStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();

			try
			{
				if (id > 0)
				{
					tblSCM_OutputMaster objResult = _uow.GenericRepository<tblSCM_OutputMaster>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblSCM_OutputMaster>().UpdateAsync(objResult);
						_uow.save();
						return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
					}
					else
					{
						return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
					}
				}
				else
				{
					return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
				}
			}
			catch (Exception)
			{
				return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
			}
		}

	}
}
