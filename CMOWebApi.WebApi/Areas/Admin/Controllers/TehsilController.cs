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
     public class TehsilController : ApiController
	{
		private readonly ITehsilService _tehsilService;

		public TehsilController(ITehsilService TehsilService)
		{
			_tehsilService = TehsilService;
		}

		// GET: api/Tehsil
		[HttpGet]
		public ServiceResponse<List<TehsilViewModel>> Get()
		{

			ServiceResponse<List<TehsilViewModel>> objReturn = new ServiceResponse<List<TehsilViewModel>>();
			try
			{
				return _tehsilService.GetAll();
			}
			catch
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		// GET: api/Tehsil/5
		[HttpGet]
		public async Task<ServiceResponse<TehsilViewModel>> Get(long id)
		{
			ServiceResponse<TehsilViewModel> objReturn = new ServiceResponse<TehsilViewModel>();
			try
			{
				if (id > 0)
				{
					return await _tehsilService.GetById(id);
				}
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// POST: api/Tehsil
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(TehsilViewModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _tehsilService.Create(model);
				}
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.Error;
					return objReturn;
				}

			}
			catch
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// PUT: api/Tehsil/5
		[HttpPut]
		public async Task<ServiceResponse<string>> Put(TehsilViewModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _tehsilService.Edit(model);
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

		// DELETE: api/Tehsil/5
		[HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _tehsilService.Delete(id);
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
