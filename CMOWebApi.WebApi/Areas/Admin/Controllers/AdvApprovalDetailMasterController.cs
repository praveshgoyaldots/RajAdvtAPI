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
    [System.Web.Http.Authorize]
    public class AdvApprovalDetailMasterController : ApiController
	{
		private readonly IAdvApprovalDetailMasterService _advApprovalDetailMasterService;

		public AdvApprovalDetailMasterController(IAdvApprovalDetailMasterService advApprovalDetailMasterService)
		{
			_advApprovalDetailMasterService = advApprovalDetailMasterService;
		}

		[System.Web.Http.HttpPost]
		// GET: api/AdvApprovalDetailMaster
		public ServiceResponse<PagedData<AdvApprovalDetailMasterViewModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<AdvApprovalDetailMasterViewModel>> objReturn = new ServiceResponse<PagedData<AdvApprovalDetailMasterViewModel>>();
			try
			{
				return _advApprovalDetailMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		// GET: api/AdvApprovalDetailMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<AdvApprovalDetailMasterModel>> Get(long id)
		{
			ServiceResponse<AdvApprovalDetailMasterModel> objReturn = new ServiceResponse<AdvApprovalDetailMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _advApprovalDetailMasterService.GetById(id);
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

		// POST: api/AdvApprovalDetailMaster
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Post(AdvApprovalDetailMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _advApprovalDetailMasterService.Create(model);
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

		// PUT: api/AdvApprovalDetailMaster/5
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Put(AdvApprovalDetailMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _advApprovalDetailMasterService.Edit(model);
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

		// DELETE: api/AdvApprovalDetailMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _advApprovalDetailMasterService.Delete(id);
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
		[HttpGet]
		public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				objReturn = await _advApprovalDetailMasterService.UpdateActiveStatus(id);
			}
			catch
			{
				objReturn.Data = null;
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}
	}
}
