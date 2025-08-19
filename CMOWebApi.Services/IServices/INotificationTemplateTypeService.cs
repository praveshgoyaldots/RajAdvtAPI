using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface INotificationTemplateTypeService
    {
		ServiceResponse<PagedData<NotificationTemplateTypeModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(NotificationTemplateTypeModel model);
		Task<ServiceResponse<NotificationTemplateTypeModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(NotificationTemplateTypeModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
