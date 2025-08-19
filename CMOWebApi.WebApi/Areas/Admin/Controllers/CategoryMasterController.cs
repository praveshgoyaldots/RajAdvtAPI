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
    public class CategoryMasterController : ApiController
    {
		private readonly ICategoryMasterService _categoryMasterService;

		public CategoryMasterController(ICategoryMasterService categoryMasterService)
		{
			_categoryMasterService = categoryMasterService;
		}

		// GET: api/CategoryMaster
		[System.Web.Http.HttpPost]
		public ServiceResponse<PagedData<SCM_CategoryMasterModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<SCM_CategoryMasterModel>> objReturn = new ServiceResponse<PagedData<SCM_CategoryMasterModel>>();
			try
			{
				return _categoryMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// GET: api/CategoryMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<SCM_CategoryMasterModel>> Get(long id)
		{
			ServiceResponse<SCM_CategoryMasterModel> objReturn = new ServiceResponse<SCM_CategoryMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _categoryMasterService.GetById(id);
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

		// POST: api/CategoryMaster
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Post(SCM_CategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _categoryMasterService.Create(model);
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

		// PUT: api/CategoryMaster/5
		[System.Web.Http.HttpPut]
		public async Task<ServiceResponse<string>> Put(SCM_CategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _categoryMasterService.Edit(model);
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

		// DELETE: api/CategoryMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _categoryMasterService.Delete(id);
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
