using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize]
    public class NotificationSMSTemplatesController : ApiController
    {
        private readonly INotificationSMSTemplateService _notificationSMSTemplateService;

        public NotificationSMSTemplatesController(INotificationSMSTemplateService notificationSMSTemplateService)
        {
            _notificationSMSTemplateService = notificationSMSTemplateService;
        }

        [HttpPost]
        public ServiceResponse<PagedData<NotificationSMSTemplateViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<NotificationSMSTemplateViewModel>> objReturn = new ServiceResponse<PagedData<NotificationSMSTemplateViewModel>>();
            try
            {
                return _notificationSMSTemplateService.GetAll(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Create(NotificationSMSTemplatesModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                return await _notificationSMSTemplateService.Create(model);

            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Edit(NotificationSMSTemplatesModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                return await _notificationSMSTemplateService.Edit(model);

            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<NotificationSMSTemplatesModel>> GetById(long id)
        {
            ServiceResponse<NotificationSMSTemplatesModel> objReturn = new ServiceResponse<NotificationSMSTemplatesModel>();
            try
            {
                if (id > 0)
                {
                    return await _notificationSMSTemplateService.GetById(id);
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
        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _notificationSMSTemplateService.Delete(id);
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
