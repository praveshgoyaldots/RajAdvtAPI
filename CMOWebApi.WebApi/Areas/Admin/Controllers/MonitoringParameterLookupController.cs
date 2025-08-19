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
    public class MonitoringParameterLookupController : ApiController
    {
        private readonly IMonitoringParameterLookupService _monitoringParameterLookupService;
        public MonitoringParameterLookupController(IMonitoringParameterLookupService monitoringParameterLookupService)
        {
            _monitoringParameterLookupService = monitoringParameterLookupService;
        }

        #region MonitoringParameterLookup
        [HttpPost]
        public ServiceResponse<PagedData<MonitoringParameterLookupViewModel>> Get(IndexModel model)
        {

            ServiceResponse<PagedData<MonitoringParameterLookupViewModel>> objReturn = new ServiceResponse<PagedData<MonitoringParameterLookupViewModel>>();
            try
            {
                return _monitoringParameterLookupService.GetAll(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<MonitoringParameterLookupViewModel>> Get(long id)
        {
            ServiceResponse<MonitoringParameterLookupViewModel> objReturn = new ServiceResponse<MonitoringParameterLookupViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _monitoringParameterLookupService.GetById(id);
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
        public async Task<ServiceResponse<string>> Post(MonitoringParameterLookupModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _monitoringParameterLookupService.Create(model);
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
        public async Task<ServiceResponse<string>> Put(MonitoringParameterLookupModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _monitoringParameterLookupService.Edit(model);
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

        #endregion

        #region MonitoringParameterLookupType

        [HttpPost]
        public ServiceResponse<PagedData<MonitoringParameterLookupTypeModel>> GetAllLookupType(IndexModel model)
        {

            ServiceResponse<PagedData<MonitoringParameterLookupTypeModel>> objReturn = new ServiceResponse<PagedData<MonitoringParameterLookupTypeModel>>();
            try
            {
                return _monitoringParameterLookupService.GetAllLookupType(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }


        [HttpPost]
        public async Task<ServiceResponse<string>> CreateLookupType(MonitoringParameterLookupTypeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _monitoringParameterLookupService.CreateLookupType(model);
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
        public async Task<ServiceResponse<MonitoringParameterLookupTypeModel>> GetByIdLookupType(long id)
        {
            ServiceResponse<MonitoringParameterLookupTypeModel> objReturn = new ServiceResponse<MonitoringParameterLookupTypeModel>();
            try
            {
                if (id > 0)
                {
                    return await _monitoringParameterLookupService.GetByIdLookupType(id);
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
        public async Task<ServiceResponse<string>> EditLookupType(MonitoringParameterLookupTypeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _monitoringParameterLookupService.EditLookupType(model);
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

        #endregion
    }


}

