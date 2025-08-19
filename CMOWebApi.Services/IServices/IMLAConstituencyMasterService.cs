using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IMLAConstituencyMasterService
    {
        /// <summary>
        /// Get MLA Constituency List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<MLAConstituencyViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Add MLA Constituency
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(MLAConstituencyMasterModel model);

        /// <summary>
        /// Update MLA Constituency
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(MLAConstituencyMasterModel model);

        /// <summary>
        /// Get MLA Constituency by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<MLAConstituencyMasterModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);
        
    }
}
