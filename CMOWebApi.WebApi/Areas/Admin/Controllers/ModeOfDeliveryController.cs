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
    public class ModeOfDeliveryController : ApiController
	{
		private readonly IModeOfDeliveryService _modeOfDeliveryService;

		public ModeOfDeliveryController(IModeOfDeliveryService ModeOfDeliveryService)
		{
			_modeOfDeliveryService = ModeOfDeliveryService;
		}

		[HttpGet]
		// GET: api/ModeOfDelivery
		public ServiceResponse<List<ModeOfDeliveryViewModel>> Get()
		{

			ServiceResponse<List<ModeOfDeliveryViewModel>> objReturn = new ServiceResponse<List<ModeOfDeliveryViewModel>>();
			try
			{
				return _modeOfDeliveryService.GetAll();
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpGet]
		// GET: api/ModeOfDelivery/5
		public async Task<ServiceResponse<ModeOfDeliveryViewModel>> Get(long id)
		{
			ServiceResponse<ModeOfDeliveryViewModel> objReturn = new ServiceResponse<ModeOfDeliveryViewModel>();
			try
			{
				if (id > 0)
				{
					return await _modeOfDeliveryService.GetById(id);
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
		// POST: api/ModeOfDelivery
		public async Task<ServiceResponse<string>> Post(ModeOfDeliveryViewModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _modeOfDeliveryService.Create(model);
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
		// PUT: api/ModeOfDelivery/5
		public async Task<ServiceResponse<string>> Put(ModeOfDeliveryViewModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _modeOfDeliveryService.Edit(model);
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
		// DELETE: api/ModeOfDelivery/5
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _modeOfDeliveryService.Delete(id);
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
