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
    public class PlatformMasterController : ApiController
    {
		private readonly IPlatformMasterService _platformMasterService;

		public PlatformMasterController(IPlatformMasterService platformMasterService)
		{
			_platformMasterService = platformMasterService;
		}
		// POST: api/PlatformMaster
		[HttpPost]
		public ServiceResponse<PagedData<PlatformMasterViewModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<PlatformMasterViewModel>> objReturn = new ServiceResponse<PagedData<PlatformMasterViewModel>>();
			try
			{
				return _platformMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// GET: api/PlatformMaster/5
		[HttpGet]
		public async Task<ServiceResponse<PlatformMasterModel>> Get(long id)
		{
			ServiceResponse<PlatformMasterModel> objReturn = new ServiceResponse<PlatformMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _platformMasterService.GetById(id);
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

		// POST: api/PlatformMaster
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(PlatformMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _platformMasterService.Create(model);
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

		// PUT: api/PlatformMaster/5
		[HttpPost]
		public async Task<ServiceResponse<string>> Put(PlatformMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _platformMasterService.Edit(model);
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

		// DELETE: api/PlatformMaster/5
		[HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _platformMasterService.Delete(id);
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
				objReturn = await _platformMasterService.UpdateActiveStatus(id);
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
