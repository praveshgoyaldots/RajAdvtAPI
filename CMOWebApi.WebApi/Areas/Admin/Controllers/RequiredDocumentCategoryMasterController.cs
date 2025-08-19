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
    public class RequiredDocumentCategoryMasterController : ApiController
    {
		private readonly IRequiredDocumentCategoryMasterService _requiredDocumentCategoryMasterService;

		public RequiredDocumentCategoryMasterController(IRequiredDocumentCategoryMasterService requiredDocumentCategoryMasterService)
		{
			_requiredDocumentCategoryMasterService = requiredDocumentCategoryMasterService;
		}

		// GET: api/RequiredDocumentCategoryMaster
		[System.Web.Http.HttpPost]
		public ServiceResponse<PagedData<SCM_RequiredDocumentCategoryMasterModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<SCM_RequiredDocumentCategoryMasterModel>> objReturn = new ServiceResponse<PagedData<SCM_RequiredDocumentCategoryMasterModel>>();
			try
			{
				return _requiredDocumentCategoryMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// GET: api/RequiredDocumentCategoryMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<SCM_RequiredDocumentCategoryMasterModel>> Get(long id)
		{
			ServiceResponse<SCM_RequiredDocumentCategoryMasterModel> objReturn = new ServiceResponse<SCM_RequiredDocumentCategoryMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _requiredDocumentCategoryMasterService.GetById(id);
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

		// POST: api/RequiredDocumentCategoryMaster
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Post(SCM_RequiredDocumentCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _requiredDocumentCategoryMasterService.Create(model);
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

		// PUT: api/RequiredDocumentCategoryMaster/5
		[System.Web.Http.HttpPut]
		public async Task<ServiceResponse<string>> Put(SCM_RequiredDocumentCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _requiredDocumentCategoryMasterService.Edit(model);
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

		// DELETE: api/RequiredDocumentCategoryMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _requiredDocumentCategoryMasterService.Delete(id);
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
