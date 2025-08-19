using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [System.Web.Http.Authorize]
    public class AdvNotificationMasterController : ApiController
	{
		private readonly IAdvNotificationMasterService _advNotificationMasterService;

		public AdvNotificationMasterController(IAdvNotificationMasterService advNotificationMasterService)
		{
			_advNotificationMasterService = advNotificationMasterService;
		}
		// GET: api/AdvNotificationMaster
		[System.Web.Http.HttpPost]
		public ServiceResponse<PagedData<AdvNotificationMasterViewModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<AdvNotificationMasterViewModel>> objReturn = new ServiceResponse<PagedData<AdvNotificationMasterViewModel>>();
			try
			{
				return _advNotificationMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// GET: api/AdvNotificationMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<AdvNotificationMasterModel>> Get(long id)
		{
			ServiceResponse<AdvNotificationMasterModel> objReturn = new ServiceResponse<AdvNotificationMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _advNotificationMasterService.GetById(id);
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

		// POST: api/AdvNotificationMaster
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Post(AdvNotificationMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
                if (ModelState.IsValid)
                {
                    return await _advNotificationMasterService.Create(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                           .Where(y => y.Count > 0)
                                           .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => y.ErrorMessage).FirstOrDefault()).ToList());
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

		// PUT: api/AdvNotificationMaster/5
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Put(AdvNotificationMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _advNotificationMasterService.Edit(model);
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

		// DELETE: api/AdvNotificationMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _advNotificationMasterService.Delete(id);
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

		[System.Web.Http.HttpGet]
		public ServiceResponse<List<SelectListItem>> GetAdvertisementList(long id)
		{
			ServiceResponse<List<SelectListItem>> objReturn = new ServiceResponse<List<SelectListItem>>();
			try
			{
				//if (id > 0)
				//{
					return _advNotificationMasterService.GetAdvertisementDepartmentMasterType(id);
				//}
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


		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				objReturn = await _advNotificationMasterService.UpdateActiveStatus(id);
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
