using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ICitizenLetterTypeMasterService
    {
        /// <summary>
        /// Get All Letter Type data in list Format
        /// </summary>
        /// <param name="model"> default value: Page=1; PageSize = 10;OrderByAsc = 1;</param>
        /// <returns>PagedData<CitizenLetterTypeMasterViewModel></returns>
        ServiceResponse<PagedData<CitizenLetterTypeMasterViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Add/Update Letter Type Detail
        /// </summary>
        /// <param name="model">CitizenLetterTypeMasterViewModel </param>
        /// <returns>Letter Type Code</returns>
        Task<ServiceResponse<string>> AddUpdate(CitizenLetterTypeMasterViewModel model);

        /// <summary>
        /// Get Detail of Letter Type Master
        /// </summary>
        /// <param name="id">Letter Type Code</param>
        /// <returns>CitizenLetterTypeMasterViewModel</returns>
        Task<ServiceResponse<CitizenLetterTypeMasterViewModel>> GetById(long id);
        
        /// <summary>
        /// Update Active Status
        /// </summary>
        /// <param name="id">Letter Type Code</param>
        /// <returns>Letter Type Code</returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// Update Delete Status
        /// </summary>
        /// <param name="id">Letter Type Code</param>
        /// <returns>Letter Type Code</returns>
        Task<ServiceResponse<string>> UpdateDeleteStatus(long id);

        /// <summary>
        /// Check Letter Type is Exist or not
        /// </summary>
        /// <param name="letterType">Letter Type</param>
        /// <returns>Letter Type Code </returns>
        ServiceResponse<object> IsLetterTypeExist(string letterType);
    }
}
