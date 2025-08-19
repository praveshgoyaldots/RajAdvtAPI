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
    public class UploadFileCategoryMasterService : BaseService, IUploadFileCategoryMasterService
	{
		IUnitofWork _uow;
		public UploadFileCategoryMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<SCM_UploadFileCategoryMasterModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<SCM_UploadFileCategoryMasterModel> responsedata = new PagedData<SCM_UploadFileCategoryMasterModel>();

				PagedData<tblSCM_UploadFileCategoryMaster> resultdata = GenericGridCall<tblSCM_UploadFileCategoryMaster>.ListView(model.PageSize, x => x.IsActive==true, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_UploadFileCategoryMaster, SCM_UploadFileCategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<SCM_UploadFileCategoryMasterModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<SCM_UploadFileCategoryMasterModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SCM_UploadFileCategoryMasterModel>> GetById(long id)
		{
			try
			{
				tblSCM_UploadFileCategoryMaster beneficialcategory = await _uow.GenericRepository<tblSCM_UploadFileCategoryMaster>().GetByIdAsync(id);

				SCM_UploadFileCategoryMasterModel obj = new SCM_UploadFileCategoryMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_UploadFileCategoryMaster, SCM_UploadFileCategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(beneficialcategory, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SCM_UploadFileCategoryMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SCM_UploadFileCategoryMasterModel model)
		{
			ServiceResponse<tblSCM_UploadFileCategoryMaster> objReturn = new ServiceResponse<tblSCM_UploadFileCategoryMaster>();
			try
			{

				Mapper.Initialize(x =>
				{
					x.CreateMap<SCM_UploadFileCategoryMasterModel, tblSCM_UploadFileCategoryMaster>();
				});

				var uploadFileCategory = Mapper.Map<SCM_UploadFileCategoryMasterModel, tblSCM_UploadFileCategoryMaster>(model);
				await _uow.GenericRepository<tblSCM_UploadFileCategoryMaster>().AddAsync(uploadFileCategory);
				_uow.save();

				uploadFileCategory.Code = uploadFileCategory.Id;
				await _uow.GenericRepository<tblSCM_UploadFileCategoryMaster>().UpdateAsync(uploadFileCategory);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(SCM_UploadFileCategoryMasterModel model)
		{
			ServiceResponse<tblSCM_UploadFileCategoryMaster> objReturn = new ServiceResponse<tblSCM_UploadFileCategoryMaster>();
			try
			{
				tblSCM_UploadFileCategoryMaster obj = await _uow.GenericRepository<tblSCM_UploadFileCategoryMaster>().GetByIdAsync(model.Id);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<SCM_UploadFileCategoryMasterModel, tblSCM_UploadFileCategoryMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblSCM_UploadFileCategoryMaster>().UpdateAsync(obj);
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
				tblSCM_UploadFileCategoryMaster cObj = await _uow.GenericRepository<tblSCM_UploadFileCategoryMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDeleted = true;
				await _uow.GenericRepository<tblSCM_UploadFileCategoryMaster>().UpdateAsync(cObj);
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
