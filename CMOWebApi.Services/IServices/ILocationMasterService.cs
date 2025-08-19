using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ILocationMasterService
        {

        /// <summary>
        /// Get all Video Conferencing Location Master according to login user by CV Code
        /// </summary>
        /// <param name="Model"></param>
        /// <param name="CVCode"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<LocationMasterViewModel>> GetAll(VCLocationSearchModel model);
      
        /// <summary>
        /// Create Video Conferencing Location Master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(LocationMasterViewModel model);

        /// <summary>
        /// Update Video Conferencing Location Master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(LocationMasterViewModel model);

        /// <summary>
        /// get Video Conferencing Location Master by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<LocationMasterViewModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);

        /// Delete location incase no participant added for this location
        /// </summary>
        /// <param name="locationId"></param>
        /// <returns></returns>
        ServiceResponse<string> Delete(long locationId);

        }
    }
