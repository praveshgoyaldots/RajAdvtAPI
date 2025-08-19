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
    public class TypeMasterService :BaseService,ITypeMasterService
	{
		IUnitofWork _uow;
		public TypeMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<SCM_TypeMasterModel>> GetAll(SearchListModel model)
		{
			try
			{
				PagedData<SCM_TypeMasterModel> responsedata = new PagedData<SCM_TypeMasterModel>();

				PagedData<vwSCM_SchemeTypeMaster> resultdata = GenericGridCall<vwSCM_SchemeTypeMaster>.ListView(model.PageSize, x => x.orderByColumn, x => x.IsDeleted == false && (x.Name.ToLower().Contains(model.SearchField.ToLower()) || x.NameHindi.ToLower().Contains(model.SearchField.ToLower())), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwSCM_SchemeTypeMaster, SCM_TypeMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<SCM_TypeMasterModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<SCM_TypeMasterModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SCM_TypeMasterModel>> GetById(long id)
		{
			try
			{
				tblSCM_TypeMaster type = await _uow.GenericRepository<tblSCM_TypeMaster>().GetByIdAsync(id);

				SCM_TypeMasterModel obj = new SCM_TypeMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_TypeMaster, SCM_TypeMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(type, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SCM_TypeMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SCM_TypeMasterModel model)
		{
			ServiceResponse<tblSCM_TypeMaster> objReturn = new ServiceResponse<tblSCM_TypeMaster>();
			try
			{
				tblSchemeTypeMaster result = _uow.GenericRepository<tblSchemeTypeMaster>().GetAll(filter: x => x.Name == model.Name).FirstOrDefault();
				if (result == null)
				{

					Mapper.Initialize(x =>
					{
						x.CreateMap<SCM_TypeMasterModel, tblSCM_TypeMaster>();
					});
					model.CreatedDate = DateTime.Now;
					var Type = Mapper.Map<SCM_TypeMasterModel, tblSCM_TypeMaster>(model);
					await _uow.GenericRepository<tblSCM_TypeMaster>().AddAsync(Type);
					_uow.save();

					Type.Code = Type.Id;
					await _uow.GenericRepository<tblSCM_TypeMaster>().UpdateAsync(Type);
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

		public async Task<ServiceResponse<string>> Edit(SCM_TypeMasterModel model)
		{
			ServiceResponse<tblSCM_TypeMaster> objReturn = new ServiceResponse<tblSCM_TypeMaster>();
			try
			{
				tblSchemeTypeMaster result = _uow.GenericRepository<tblSchemeTypeMaster>().GetAll(filter: x => x.Name == model.Name && x.Id != model.Id).FirstOrDefault();
				if (result == null)
				{
					tblSCM_TypeMaster obj = await _uow.GenericRepository<tblSCM_TypeMaster>().GetByIdAsync(model.Id);

					var config = new MapperConfiguration(cfg =>
					{
						cfg.CreateMap<SCM_TypeMasterModel, tblSCM_TypeMaster>();
					});
					IMapper mapper = config.CreateMapper();
					obj = mapper.Map(model, obj);
					obj.ModifiedDate = DateTime.Now;
					await _uow.GenericRepository<tblSCM_TypeMaster>().UpdateAsync(obj);
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
				tblSCM_TypeMaster cObj = await _uow.GenericRepository<tblSCM_TypeMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDeleted = true;
				await _uow.GenericRepository<tblSCM_TypeMaster>().UpdateAsync(cObj);
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
					tblSCM_TypeMaster objResult = _uow.GenericRepository<tblSCM_TypeMaster>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblSCM_TypeMaster>().UpdateAsync(objResult);
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
