using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class AdvSubCategoryMasterController : ApiController
	{
		private readonly IAdvSubCategoryMasterService _advSubCategoryMasterService;

		public AdvSubCategoryMasterController(IAdvSubCategoryMasterService advSubCategoryMasterService)
		{
			_advSubCategoryMasterService = advSubCategoryMasterService;
		}
		// GET: api/AdvSubCategoryMaster
		[HttpGet]
		public ServiceResponse<List<AdvSubCategoryViewModel>> Get()
		{

			ServiceResponse<List<AdvSubCategoryViewModel>> objReturn = new ServiceResponse<List<AdvSubCategoryViewModel>>();
			try
			{
				return _advSubCategoryMasterService.GetAll();
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// GET: api/AdvSubCategoryMaster/5
		[HttpGet]
		public async Task<ServiceResponse<AdvSubCategoryMasterModel>> Get(long id)
		{
			ServiceResponse<AdvSubCategoryMasterModel> objReturn = new ServiceResponse<AdvSubCategoryMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _advSubCategoryMasterService.GetById(id);
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

		// POST: api/AdvSubCategoryMaster
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(AdvSubCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _advSubCategoryMasterService.Create(model);
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

		// PUT: api/AdvSubCategoryMaster/5
		[HttpPost]
		public async Task<ServiceResponse<string>> Put(AdvSubCategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _advSubCategoryMasterService.Edit(model);
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

		// DELETE: api/AdvSubCategoryMaster/5
		[HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _advSubCategoryMasterService.Delete(id);
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
				objReturn = await _advSubCategoryMasterService.UpdateActiveStatus(id);
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
