using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IComplainStatusService
    {
        ServiceResponse<ComplainStatusMasterViewModel> GetById(long id);
        Task<ServiceResponse<string>> Edit(ComplainStatusMasterViewModel model);
        Task<ServiceResponse<string>> Create(ComplainStatusMasterViewModel model);
        ServiceResponse<PagedData<ComplainStatusMasterViewModel>> GetAll(IndexModel model);
        Task<ServiceResponse<string>> UpdateStatus(long id);
        Task<ServiceResponse<string>> ChangeStatus(ChangeStatus model);
    }
}
