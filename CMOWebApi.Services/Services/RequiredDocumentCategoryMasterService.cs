using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
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
	public class RequiredDocumentCategoryMasterService :BaseService,IRequiredDocumentCategoryMasterService
	{
		IUnitofWork _uow;
		public RequiredDocumentCategoryMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<SCM_RequiredDocumentCategoryMasterModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<SCM_RequiredDocumentCategoryMasterModel> responsedata = new PagedData<SCM_RequiredDocumentCategoryMasterModel>();

				PagedData<tblSCM_RequiredDocumentCategoryMaster> resultdata = GenericGridCall<tblSCM_RequiredDocumentCategoryMaster>.ListView(model.PageSize, x => x.IsActive==true, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_RequiredDocumentCategoryMaster, SCM_RequiredDocumentCategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<SCM_RequiredDocumentCategoryMasterModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<SCM_RequiredDocumentCategoryMasterModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SCM_RequiredDocumentCategoryMasterModel>> GetById(long id)
		{
			try
			{
				tblSCM_RequiredDocumentCategoryMaster beneficialcategory = await _uow.GenericRepository<tblSCM_RequiredDocumentCategoryMaster>().GetByIdAsync(id);

				SCM_RequiredDocumentCategoryMasterModel obj = new SCM_RequiredDocumentCategoryMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_RequiredDocumentCategoryMaster, SCM_RequiredDocumentCategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(beneficialcategory, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SCM_RequiredDocumentCategoryMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SCM_RequiredDocumentCategoryMasterModel model)
		{
			ServiceResponse<tblSCM_RequiredDocumentCategoryMaster> objReturn = new ServiceResponse<tblSCM_RequiredDocumentCategoryMaster>();
			try
			{

			
				Mapper.Initialize(x =>
				{
					x.CreateMap<SCM_RequiredDocumentCategoryMasterModel, tblSCM_RequiredDocumentCategoryMaster>();
				});

				var reqDocFile = Mapper.Map<SCM_RequiredDocumentCategoryMasterModel, tblSCM_RequiredDocumentCategoryMaster>(model);
				await _uow.GenericRepository<tblSCM_RequiredDocumentCategoryMaster>().AddAsync(reqDocFile);
				_uow.save();

				reqDocFile.Code = reqDocFile.Id;
				await _uow.GenericRepository<tblSCM_RequiredDocumentCategoryMaster>().UpdateAsync(reqDocFile);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(SCM_RequiredDocumentCategoryMasterModel model)
		{
			ServiceResponse<tblSCM_RequiredDocumentCategoryMaster> objReturn = new ServiceResponse<tblSCM_RequiredDocumentCategoryMaster>();
			try
			{
				tblSCM_RequiredDocumentCategoryMaster obj = await _uow.GenericRepository<tblSCM_RequiredDocumentCategoryMaster>().GetByIdAsync(model.Id);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<SCM_RequiredDocumentCategoryMasterModel, tblSCM_RequiredDocumentCategoryMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblSCM_RequiredDocumentCategoryMaster>().UpdateAsync(obj);
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
				tblSCM_RequiredDocumentCategoryMaster cObj = await _uow.GenericRepository<tblSCM_RequiredDocumentCategoryMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDeleted = true;
				await _uow.GenericRepository<tblSCM_RequiredDocumentCategoryMaster>().UpdateAsync(cObj);
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
