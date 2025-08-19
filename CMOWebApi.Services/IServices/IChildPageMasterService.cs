using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IChildPageMasterService
    {
        /// <summary>
        /// Get Child Page Master List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<ChildPageMasterViewModel>> GetAll(ChildPageFilterModel model);

        /// <summary>
        /// Add Child Page Master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(ChildPageMasterModel model);

        /// <summary>
        /// Update Child Page Master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(ChildPageMasterModel model);

        /// <summary>
        /// Get Child Page Master by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<ChildPageMasterModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);

        /// <summary>
        /// Get Page Detail By Page Code
        /// </summary>
        /// <param name="pageCode"></param>
        /// <returns></returns>
        ServiceResponse<PageMasterDetailModel> GetPageDetailByPageCode(long pageCode);

        /// <summary>
        /// Get Page detail list by menu name
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ChildPageMasterViewModel>> GetPageListByMenuName(PageManualModel model);
    }
}
