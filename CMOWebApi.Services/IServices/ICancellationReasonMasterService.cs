using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ICancellationReasonMasterService
    {
        /// <summary>
        /// Get All Cancellation Reason using Server side paging
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<CancellationReasonViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Add new Cancellation Reason
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(CancellationReasonMasterModel model);

        /// <summary>
        /// Update existing Cancellation Reason
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(CancellationReasonMasterModel model);

        /// <summary>
        /// get Cancellation Reason by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<CancellationReasonMasterModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);
        
    }
}
