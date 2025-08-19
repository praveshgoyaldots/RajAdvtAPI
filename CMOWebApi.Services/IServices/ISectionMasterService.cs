using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ISectionMasterService
    {
        #region InterFace For CRUD

        /// <summary>
        /// Get all section master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<SectionMasterModel>> GetAll(IndexModel model);

        /// <summary>
        /// This for create new record in section master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(SectionMasterModel model);

        /// <summary>
        /// Get record by id of section master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<SectionMasterModel> GetById(long id);

        /// <summary>
        /// this is for edit the section master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(SectionMasterModel model);

        /// <summary>
        /// For toggle the status of specific record.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        #endregion

    }
}
