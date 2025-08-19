using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface INotificationEmailTemplateService
    {
        ServiceResponse<PagedData<NotificationEmailTemplateViewModel>> GetAll(IndexModel model);
        Task<ServiceResponse<string>> Create(NotificationEmailTemplatesModel model);

        Task<ServiceResponse<string>> Edit(NotificationEmailTemplatesModel model);

        Task<ServiceResponse<NotificationEmailTemplatesModel>> GetById(long id);

        Task<ServiceResponse<string>> Delete(long id);
        

    }
}
