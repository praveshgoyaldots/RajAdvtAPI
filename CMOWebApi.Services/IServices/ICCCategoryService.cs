using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ICCCategoryService
    {
        /// <summary>
        /// Get All Record using paging 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<CCCategoryMasterViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Create CC Category
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(CCCategoryMasterModel model);

        /// <summary>
        /// Update CC Category
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(CCCategoryMasterModel model);

        /// <summary>
        /// get CC Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<CCCategoryMasterViewModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);

        #region CC Category Mapping

        /// <summary>
        /// Get Department Reference list for assign category to these reference
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<CCCategoryReferenceListResponseModel> GetCCCategoryReferenceList(CCCategoryLookupModel model);

        /// <summary>
        /// Save references to mapping table for single CCCategory
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<CCCategoryReferenceListResponseModel> SaveCCCategoryMapping(CCCategoryLookupModel model);
        #endregion
    }
}
