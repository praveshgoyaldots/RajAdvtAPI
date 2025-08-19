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
    public class BeneficialCategoryMasterService : BaseService,IBeneficialCategoryMasterService
	{
		IUnitofWork _uow;
		public BeneficialCategoryMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<SCM_BeneficialCategoryMasterModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<SCM_BeneficialCategoryMasterModel> responsedata = new PagedData<SCM_BeneficialCategoryMasterModel>();

				PagedData<tblSCM_BeneficialCategoryMaster> resultdata = GenericGridCall<tblSCM_BeneficialCategoryMaster>.ListView(model.PageSize, x => x.IsActive==true, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_BeneficialCategoryMaster, SCM_BeneficialCategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<SCM_BeneficialCategoryMasterModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<SCM_BeneficialCategoryMasterModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SCM_BeneficialCategoryMasterModel>> GetById(long id)
		{
			try
			{
				tblSCM_BeneficialCategoryMaster beneficialcategory = await _uow.GenericRepository<tblSCM_BeneficialCategoryMaster>().GetByIdAsync(id);

				SCM_BeneficialCategoryMasterModel obj = new SCM_BeneficialCategoryMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_BeneficialCategoryMaster, SCM_BeneficialCategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(beneficialcategory, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SCM_BeneficialCategoryMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SCM_BeneficialCategoryMasterModel model)
		{
			ServiceResponse<tblSCM_BeneficialCategoryMaster> objReturn = new ServiceResponse<tblSCM_BeneficialCategoryMaster>();
			try
			{

			
				Mapper.Initialize(x =>
				{
					x.CreateMap<SCM_BeneficialCategoryMasterModel, tblSCM_BeneficialCategoryMaster>();
				});

				var beneficialcategory = Mapper.Map<SCM_BeneficialCategoryMasterModel, tblSCM_BeneficialCategoryMaster>(model);
				await _uow.GenericRepository<tblSCM_BeneficialCategoryMaster>().AddAsync(beneficialcategory);
				_uow.save();

				beneficialcategory.Code = beneficialcategory.Id;
				await _uow.GenericRepository<tblSCM_BeneficialCategoryMaster>().UpdateAsync(beneficialcategory);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(SCM_BeneficialCategoryMasterModel model)
		{
			ServiceResponse<tblSCM_BeneficialCategoryMaster> objReturn = new ServiceResponse<tblSCM_BeneficialCategoryMaster>();
			try
			{
				tblSCM_BeneficialCategoryMaster obj = await _uow.GenericRepository<tblSCM_BeneficialCategoryMaster>().GetByIdAsync(model.Id);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<SCM_BeneficialCategoryMasterModel, tblSCM_BeneficialCategoryMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblSCM_BeneficialCategoryMaster>().UpdateAsync(obj);
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
				tblSCM_BeneficialCategoryMaster cObj = await _uow.GenericRepository<tblSCM_BeneficialCategoryMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDeleted = true;
				await _uow.GenericRepository<tblSCM_BeneficialCategoryMaster>().UpdateAsync(cObj);
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
