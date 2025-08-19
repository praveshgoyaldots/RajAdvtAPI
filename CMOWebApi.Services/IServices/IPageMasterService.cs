using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IPageMasterService
    {
        ServiceResponse<PagedData<PageMasterListViewModel>> GetAll(IndexModel model);
        Task<ServiceResponse<string>> AddUpdate(PageMasterViewModel model);       
        ServiceResponse<PageMasterViewModel> GetById(long id);
        Task<ServiceResponse<string>> UpdateDeleteStatus(int pageCode);
        Task<ServiceResponse<string>> UpdateActiveStatus(int pageCode);

    }
}
