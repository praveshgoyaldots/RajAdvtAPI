using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IComplainEntryTypeService
    {
        ServiceResponse<ComplainEntryTypeMasterViewModel> GetById(long id);
        Task<ServiceResponse<string>> Edit(ComplainEntryTypeMasterViewModel model);
        Task<ServiceResponse<string>> Create(ComplainEntryTypeMasterViewModel model);
        ServiceResponse<PagedData<ComplainEntryTypeMasterViewModel>> GetAll(IndexModel model);
        Task<ServiceResponse<string>> UpdateStatus(long id);       
    }
}
