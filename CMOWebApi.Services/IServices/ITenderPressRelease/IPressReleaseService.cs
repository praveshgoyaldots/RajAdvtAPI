using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VendorPressRelease;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IPressReleaseService
    {
        #region InterFace For CRUD

        /// <summary>
        /// Get all press release
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<PressReleaseListModel>> GetAll(PressReleaseFilterModel model);

        /// <summary>
        /// This for create new record in press release.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(PressReleaseModel model);

        /// <summary>
        /// Get record by id of press release
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<PressReleaseModel>> GetById(long id);

        /// <summary>
        /// this is for edit the press release.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(PressReleaseModel model);

        /// <summary>
        /// For toggle the status of specific record.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);


        #endregion

        #region Interface for press release user configration
        /// <summary>
        /// Get all press release User Configration  master 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<PressReleaseUserConfigrationModel>> GetAllUserConfigration(IndexModel model);

        /// <summary>
        /// Craete new press release User Configration 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> CreateUserConfigration(PressReleaseUserConfigrationModel model);

        /// <summary>
        /// press release User Configration   by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<PressReleaseUserConfigrationModel> GetByIdUserConfigration(long id);

        /// <summary>
        /// Update existing press release User Configration 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> EditUserConfigration(PressReleaseUserConfigrationModel model);

        /// <summary>
        /// Update Status(Active/De-Active)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatusUserConfigration(long id);
        #endregion

    }
}
