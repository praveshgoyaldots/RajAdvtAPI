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
    public class AdvCategoryMasterController : ApiController
    {
		private readonly IAdvCategoryMasterService _advCategoryMasterService;

		public AdvCategoryMasterController(IAdvCategoryMasterService advCategoryMasterService)
		{
			_advCategoryMasterService = advCategoryMasterService;
		}

		// GET: api/AdvCategoryMaster
		[HttpPost]
		public ServiceResponse<PagedData<AdvCategoryViewModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<AdvCategoryViewModel>> objReturn = new ServiceResponse<PagedData<AdvCategoryViewModel>>();
			try
			{
				return _advCategoryMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// GET: api/AdvCategoryMaster/5
		[HttpGet]
		public async Task<ServiceResponse<AdvCategoryMasterModel>> Get(long id)
		{
			ServiceResponse<AdvCategoryMasterModel> objReturn = new ServiceResponse<AdvCategoryMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _advCategoryMasterService.GetById(id);
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

		// POST: api/AdvCategoryMaster
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(AdvCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _advCategoryMasterService.Create(model);
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

		// PUT: api/AdvCategoryMaster/5
		[HttpPost]
		public async Task<ServiceResponse<string>> Put(AdvCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _advCategoryMasterService.Edit(model);
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

		// DELETE: api/AdvCategoryMaster/5
		[HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _advCategoryMasterService.Delete(id);
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
				objReturn = await _advCategoryMasterService.UpdateActiveStatus(id);
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
