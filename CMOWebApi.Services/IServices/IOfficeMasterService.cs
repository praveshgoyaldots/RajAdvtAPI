using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;

using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IOfficeMasterService
    {
        /// <summary>
        /// Get All Office data in list Format
        /// </summary>
        /// <param name="model"> default value: Page=1; PageSize = 10;OrderByAsc = 1;</param>
        /// <returns>PagedData<OfficeMasterViewModel></returns>
        ServiceResponse<PagedData<OfficeMasterViewModel>> GetAll(IndexModel model);
        /// <summary>
        /// Add Office 
        /// </summary>
        /// <param name="model">OfficeMasterViewModel </param>
        /// <returns>Id</returns>
        Task<ServiceResponse<string>> Add(OfficeMasterViewModel model);
        /// <summary>
        /// Get Detail of Office master
        /// </summary>
        /// <param name="id">office Id</param>
        /// <returns>OfficeMasterViewModel</returns>
        Task<ServiceResponse<OfficeMasterViewModel>> GetById(long id);
        /// <summary>
        /// Edit Office Detail
        /// </summary>
        /// <param name="model">OfficeMasterViewModel </param>
        /// <returns>Office Id</returns>
        Task<ServiceResponse<string>> Edit(OfficeMasterViewModel model);
        /// <summary>
        /// Update Active Status
        /// </summary>
        /// <param name="id">office Id </param>
        /// <returns>office id</returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);
        /// <summary>
        /// Update Delete Status
        /// </summary>
        /// <param name="id">office Id </param>
        /// <returns>office id</returns>
        Task<ServiceResponse<string>> UpdateDeleteStatus(long id);
        /// <summary>
        /// Check Office code is Exist or not
        /// </summary>
        /// <param name="officeCode">Office Code</param>
        /// <returns>Office Code </returns>
        ServiceResponse<object> IsOfficeShortNameExist(string officeShortName);
    }
}
