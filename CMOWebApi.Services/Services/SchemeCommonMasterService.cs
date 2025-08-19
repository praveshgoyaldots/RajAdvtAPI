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
    public class SchemeCommonMasterService : BaseService, ISchemeCommonMasterService
	{
		IUnitofWork _uow;
		public SchemeCommonMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}
	
		public ServiceResponse<PagedData<SCM_CommonMasterModel>> GetAll(SearchListModel model)
		{
			try
			{
				PagedData<SCM_CommonMasterModel> responsedata = new PagedData<SCM_CommonMasterModel>();

				PagedData<vwSCM_SchemeCommonMaster> resultdata = GenericGridCall<vwSCM_SchemeCommonMaster>.ListView(model.PageSize,x=>x.SchemeTypeName, x => x.IsDeleted == false && (x.Name.ToLower().Contains(model.SearchField.ToLower()) || x.NameHindi.ToLower().Contains(model.SearchField.ToLower())), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
		

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwSCM_SchemeCommonMaster, SCM_CommonMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<SCM_CommonMasterModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<SCM_CommonMasterModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SCM_CommonMasterModel>> GetById(long id)
		{
			try
			{
				tblSCM_SchemeCommonMaster output = await _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetByIdAsync(id);

				SCM_CommonMasterModel obj = new SCM_CommonMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_SchemeCommonMaster, SCM_CommonMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(output, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SCM_CommonMasterModel
>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SCM_CommonMasterModel model)
		{
			ServiceResponse<tblSCM_SchemeCommonMaster> objReturn = new ServiceResponse<tblSCM_SchemeCommonMaster>();
			try
			{
				tblSCM_SchemeCommonMaster result =  _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(filter: x => x.Name == model.Name).FirstOrDefault();
				if (result == null)
				{

					Mapper.Initialize(x =>
					{
						x.CreateMap<SCM_CommonMasterModel, tblSCM_SchemeCommonMaster>();
					});
					model.CreatedDate = DateTime.Now;
					var scmCommon = Mapper.Map<SCM_CommonMasterModel, tblSCM_SchemeCommonMaster>(model);
					await _uow.GenericRepository<tblSCM_SchemeCommonMaster>().AddAsync(scmCommon);
					_uow.save();

					scmCommon.Code = scmCommon.Id;
					await _uow.GenericRepository<tblSCM_SchemeCommonMaster>().UpdateAsync(scmCommon);
					_uow.save();
					return SetResultStatus(string.Empty, MessageStatus.Success, true);
				}
				else {
					return SetResultStatus(string.Empty, MessageStatus.NameExist, true);
				}


			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(SCM_CommonMasterModel model)
		{
			ServiceResponse<tblSCM_SchemeCommonMaster> objReturn = new ServiceResponse<tblSCM_SchemeCommonMaster>();
			try
			{
				tblSCM_SchemeCommonMaster result = _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(filter: x => x.Name == model.Name && x.Id!=model.Id).FirstOrDefault();
				if (result == null)
				{
					tblSCM_SchemeCommonMaster obj = await _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetByIdAsync(model.Id);

					var config = new MapperConfiguration(cfg =>
					{
						cfg.CreateMap<SCM_CommonMasterModel, tblSCM_SchemeCommonMaster>();
					});
					IMapper mapper = config.CreateMapper();
					obj = mapper.Map(model, obj);
					obj.ModifiedDate = DateTime.Now;
					await _uow.GenericRepository<tblSCM_SchemeCommonMaster>().UpdateAsync(obj);
					_uow.save();
					return SetResultStatus(string.Empty, MessageStatus.Success, true);
				}
				else {
					return SetResultStatus(string.Empty, MessageStatus.Exist, true);
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
				tblSCM_SchemeCommonMaster cObj = await _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDeleted = true;
				await _uow.GenericRepository<tblSCM_SchemeCommonMaster>().UpdateAsync(cObj);
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
					tblSCM_SchemeCommonMaster objResult = _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblSCM_SchemeCommonMaster>().UpdateAsync(objResult);
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
