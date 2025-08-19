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
    public class LookUpTypeController : ApiController
    {
		private readonly ILookupTypeService _lookupTypeService;

		public LookUpTypeController(ILookupTypeService lookupTypeService)
		{
			_lookupTypeService = lookupTypeService;
		}

		// GET: api/LookUp
		[HttpGet]
		public ServiceResponse<List<LookUpTypeViewModel>> Get()
		{
			ServiceResponse<List<LookUpTypeViewModel>> objReturn = new ServiceResponse<List<LookUpTypeViewModel>>();
			try
			{
				return _lookupTypeService.GetAll();
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpGet]
		// GET: api/LookUp/5
		public async Task<ServiceResponse<LookUpTypeViewModel>> Get(long id)
		{
			ServiceResponse<LookUpTypeViewModel> objReturn = new ServiceResponse<LookUpTypeViewModel>();
			try
			{
				if (id > 0)
				{
					return await _lookupTypeService.GetById(id);
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

		[HttpPost]
		// POST: api/LookUp
		public async Task<ServiceResponse<string>> Post(LookUpTypeViewModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _lookupTypeService.Create(model);
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
		[HttpPut]
		// PUT: api/LookUp/5
		public async Task<ServiceResponse<string>> Put(LookUpTypeViewModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _lookupTypeService.Edit(model);
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
		[HttpGet]
		// DELETE: api/LookUp/5
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _lookupTypeService.Delete(id);
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
		public ServiceResponse<List<LookUpListViewModel>> GetLookUpTypeById(long id)
		{
			ServiceResponse<List<LookUpListViewModel>> objReturn = new ServiceResponse<List<LookUpListViewModel>>();
			try
			{
				return _lookupTypeService.GetLookUpByTypeId(id);
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
