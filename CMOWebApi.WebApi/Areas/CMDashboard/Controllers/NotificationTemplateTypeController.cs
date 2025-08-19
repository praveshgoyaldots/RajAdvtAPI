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

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize] 
    public class NotificationTemplateTypeController : ApiController
    {
        private readonly INotificationTemplateTypeService _notificationTemplateTypeService;

        public NotificationTemplateTypeController(INotificationTemplateTypeService notificationTemplateTypeService)
        {
            _notificationTemplateTypeService = notificationTemplateTypeService;
        }

        [HttpPost]
        public ServiceResponse<PagedData<NotificationTemplateTypeModel>> Get(IndexModel model)
        {

            ServiceResponse<PagedData<NotificationTemplateTypeModel>> objReturn = new ServiceResponse<PagedData<NotificationTemplateTypeModel>>();
            try
            {
                return _notificationTemplateTypeService.GetAll(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<NotificationTemplateTypeModel>> GetById(long id)
        {
            ServiceResponse<NotificationTemplateTypeModel> objReturn = new ServiceResponse<NotificationTemplateTypeModel>();
            try
            {
                if (id > 0)
                {
                    return await _notificationTemplateTypeService.GetById(id);
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
        public async Task<ServiceResponse<string>> Post(NotificationTemplateTypeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _notificationTemplateTypeService.Create(model);
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
        public async Task<ServiceResponse<string>> Put(NotificationTemplateTypeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _notificationTemplateTypeService.Edit(model);
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
                    return await _notificationTemplateTypeService.Delete(id);
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
