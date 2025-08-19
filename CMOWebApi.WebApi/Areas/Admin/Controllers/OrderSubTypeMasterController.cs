using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class OrderSubTypeMasterController : ApiController
    {
		private readonly IOrderSubTypeMasterService _OrderSubTypeMasterService;
		IndexModel model = null;
		public OrderSubTypeMasterController(IOrderSubTypeMasterService iOrderSubTypeMasterService, IndexModel indexModel)
		{
			this._OrderSubTypeMasterService = iOrderSubTypeMasterService;
			this.model = indexModel;
		}

		[HttpPost]
		public ServiceResponse<PagedData<OrderSubTypeMasterViewModel>> Get(IndexModel model)
		{
			ServiceResponse<PagedData<OrderSubTypeMasterViewModel>> objReturn = new ServiceResponse<PagedData<OrderSubTypeMasterViewModel>>();
			try
			{
				objReturn = _OrderSubTypeMasterService.GetAll(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;

			}
			return objReturn;
		}

		[HttpGet]
		public ServiceResponse<OrderSubTypeMasterModel> Get(long id)
		{
			ServiceResponse<OrderSubTypeMasterModel> objReturn = new ServiceResponse<OrderSubTypeMasterModel>();
			try
			{
				objReturn = _OrderSubTypeMasterService.GetById(id);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				objReturn.Data = null;
			}
			return objReturn;
		}

		[HttpPost]
		public async Task<ServiceResponse<string>> Post(OrderSubTypeMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					objReturn = await _OrderSubTypeMasterService.Create(model);
				}
				else
				{
					var errors = ModelState.Select(x => x.Value.Errors)
											 .Where(y => y.Count > 0)
											 .ToList();
					List<string> err = new List<string>();

					objReturn.IsSuccess = false;
					objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
					return objReturn;
				}
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

		[HttpPost]
		public async Task<ServiceResponse<string>> Put(OrderSubTypeMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid && model.Id > 0)
				{
					objReturn = await _OrderSubTypeMasterService.Edit(model);
				}
				else
				{
					var errors = ModelState.Select(x => x.Value.Errors)
											  .Where(y => y.Count > 0)
											  .ToList();
					List<string> err = new List<string>();

					objReturn.IsSuccess = false;
					objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
					return objReturn;
				}
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

		[HttpGet]
		public async Task<ServiceResponse<string>> UpdateStatus(int id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				objReturn = await _OrderSubTypeMasterService.UpdateStatus(id);
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
