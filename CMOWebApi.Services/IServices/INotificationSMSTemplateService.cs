using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface INotificationSMSTemplateService
    {
        Task<ServiceResponse<string>> Create(NotificationSMSTemplatesModel model);

        Task<ServiceResponse<string>> Edit(NotificationSMSTemplatesModel model);

        Task<ServiceResponse<NotificationSMSTemplatesModel>> GetById(long id);

        ServiceResponse<PagedData<NotificationSMSTemplateViewModel>> GetAll(IndexModel model);

        Task<ServiceResponse<string>> Delete(long id);
    }
}
