using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface INewsSubjectMasterService
    {
        /// <summary>
        /// Get News Subject Master List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<NewsSubjectMasterViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Add News Subject Master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(NewsSubjectMasterModel model);

        /// <summary>
        /// Update Project Mile Stone
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(NewsSubjectMasterModel model);

        /// <summary>
        /// Get News Subject Master by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<NewsSubjectMasterModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);
        
    }
}
