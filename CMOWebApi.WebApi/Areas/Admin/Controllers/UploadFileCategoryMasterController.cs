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
     public class UploadFileCategoryMasterController : ApiController
	{
		private readonly IUploadFileCategoryMasterService _uploadFileCategoryMasterService;

		public UploadFileCategoryMasterController(IUploadFileCategoryMasterService uploadFileCategoryMasterService)
		{
			_uploadFileCategoryMasterService = uploadFileCategoryMasterService;
		}

		// GET: api/UploadFileCategoryMaster
		[System.Web.Http.HttpPost]
		public ServiceResponse<PagedData<SCM_UploadFileCategoryMasterModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<SCM_UploadFileCategoryMasterModel>> objReturn = new ServiceResponse<PagedData<SCM_UploadFileCategoryMasterModel>>();
			try
			{
				return _uploadFileCategoryMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// GET: api/UploadFileCategoryMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<SCM_UploadFileCategoryMasterModel>> Get(long id)
		{
			ServiceResponse<SCM_UploadFileCategoryMasterModel> objReturn = new ServiceResponse<SCM_UploadFileCategoryMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _uploadFileCategoryMasterService.GetById(id);
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

		// POST: api/UploadFileCategoryMaster
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Post(SCM_UploadFileCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _uploadFileCategoryMasterService.Create(model);
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

		// PUT: api/UploadFileCategoryMaster/5
		[System.Web.Http.HttpPut]
		public async Task<ServiceResponse<string>> Put(SCM_UploadFileCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _uploadFileCategoryMasterService.Edit(model);
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

		// DELETE: api/UploadFileCategoryMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _uploadFileCategoryMasterService.Delete(id);
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
