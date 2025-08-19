using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class BeneficialCategoryMasterController : ApiController
	{
		private readonly IBeneficialCategoryMasterService _beneficialCategoryMasterService;

		public BeneficialCategoryMasterController(IBeneficialCategoryMasterService beneficialCategoryMasterService)
		{
			_beneficialCategoryMasterService = beneficialCategoryMasterService;
		}
		// GET: api/BeneficialCategoryMaster
		[System.Web.Http.HttpPost]
		public ServiceResponse<PagedData<SCM_BeneficialCategoryMasterModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<SCM_BeneficialCategoryMasterModel>> objReturn = new ServiceResponse<PagedData<SCM_BeneficialCategoryMasterModel>>();
			try
			{
				return _beneficialCategoryMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// GET: api/BeneficialCategoryMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<SCM_BeneficialCategoryMasterModel>> Get(long id)
		{
			ServiceResponse<SCM_BeneficialCategoryMasterModel> objReturn = new ServiceResponse<SCM_BeneficialCategoryMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _beneficialCategoryMasterService.GetById(id);
				}
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// POST: api/BeneficialCategoryMaster
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Post(SCM_BeneficialCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _beneficialCategoryMasterService.Create(model);
				}
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.Error;
					return objReturn;
				}

			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// PUT: api/BeneficialCategoryMaster/5
		[System.Web.Http.HttpPut]
		public async Task<ServiceResponse<string>> Put(SCM_BeneficialCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _beneficialCategoryMasterService.Edit(model);
				}
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.Error;
					return objReturn;
				}

			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// DELETE: api/BeneficialCategoryMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _beneficialCategoryMasterService.Delete(id);
				}
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
	}
}
