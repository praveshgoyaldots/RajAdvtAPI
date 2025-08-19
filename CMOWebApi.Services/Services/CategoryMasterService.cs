using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class CategoryMasterService : BaseService, ICategoryMasterService
	{

		IUnitofWork _uow;
		public CategoryMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<SCM_CategoryMasterModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<SCM_CategoryMasterModel> responsedata = new PagedData<SCM_CategoryMasterModel>();

				PagedData<tblSCM_CategoryMaster> resultdata = GenericGridCall<tblSCM_CategoryMaster>.ListView(model.PageSize, x => x.IsActive==true, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_CategoryMaster, SCM_CategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<SCM_CategoryMasterModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<SCM_CategoryMasterModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SCM_CategoryMasterModel>> GetById(long id)
		{
			try
			{
				tblSCM_CategoryMaster category = await _uow.GenericRepository<tblSCM_CategoryMaster>().GetByIdAsync(id);

				SCM_CategoryMasterModel obj = new SCM_CategoryMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_CategoryMaster, SCM_CategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(category, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SCM_CategoryMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SCM_CategoryMasterModel model)
		{
			ServiceResponse<tblSCM_CategoryMaster> objReturn = new ServiceResponse<tblSCM_CategoryMaster>();
			try
			{

			
				Mapper.Initialize(x =>
				{
					x.CreateMap<SCM_CategoryMasterModel, tblSCM_CategoryMaster>();
				});

				var category = Mapper.Map<SCM_CategoryMasterModel, tblSCM_CategoryMaster>(model);
				await _uow.GenericRepository<tblSCM_CategoryMaster>().AddAsync(category);
				_uow.save();

				category.Code = category.Id;
				await _uow.GenericRepository<tblSCM_CategoryMaster>().UpdateAsync(category);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(SCM_CategoryMasterModel model)
		{
			ServiceResponse<tblSCM_CategoryMaster> objReturn = new ServiceResponse<tblSCM_CategoryMaster>();
			try
			{
				tblSCM_CategoryMaster obj = await _uow.GenericRepository<tblSCM_CategoryMaster>().GetByIdAsync(model.Id);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<SCM_CategoryMasterModel, tblSCM_CategoryMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblSCM_CategoryMaster>().UpdateAsync(obj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);
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
				tblSCM_CategoryMaster cObj = await _uow.GenericRepository<tblSCM_CategoryMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDeleted = true;
				await _uow.GenericRepository<tblSCM_CategoryMaster>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

	}
}
