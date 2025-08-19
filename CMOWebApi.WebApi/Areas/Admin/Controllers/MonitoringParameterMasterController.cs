using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;


namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class MonitoringParameterMasterController : ApiController
    {
		private readonly IMonitoringParameterMasterService _monitoringParameterMasterService;

		public MonitoringParameterMasterController(IMonitoringParameterMasterService monitoringParameterMasterService)
		{
            _monitoringParameterMasterService = monitoringParameterMasterService;
		}

		[HttpPost]
		public ServiceResponse<PagedData<MonitoringParameterMasterViewModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<MonitoringParameterMasterViewModel>> objReturn = new ServiceResponse<PagedData<MonitoringParameterMasterViewModel>>();
			try
			{
				return _monitoringParameterMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		[HttpGet]
		public async Task<ServiceResponse<MonitoringParameterMasterModel>> Get(long id)
		{
			ServiceResponse<MonitoringParameterMasterModel> objReturn = new ServiceResponse<MonitoringParameterMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _monitoringParameterMasterService.GetById(id);
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
		public async Task<ServiceResponse<string>> Post(MonitoringParameterMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _monitoringParameterMasterService.Create(model);
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

		[HttpPost]
		public async Task<ServiceResponse<string>> Put(MonitoringParameterMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _monitoringParameterMasterService.Edit(model);
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
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _monitoringParameterMasterService.Delete(id);
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
				objReturn = await _monitoringParameterMasterService.UpdateActiveStatus(id);
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
