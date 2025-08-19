using System.Threading.Tasks;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.Services.IServices
{
    public interface ITransferDept
    {
        ServiceResponse<PagedData<TransferDeptModel>> GetAll(IndexModel model);
       // ServiceResponse<PagedData<TransferDeptModel>> UpdateTransferDept(TransferDeptModel model);

        Task<ServiceResponse<string>> UpdateTransferDept(TransferDeptModel model);
        Task<ServiceResponse<string>> UpdateTransferDeptOLD(TransferDeptModel model);
        
    }
}
