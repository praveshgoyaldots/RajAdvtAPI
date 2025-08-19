using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VendorPressRelease;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ITenderMasterService
    {
        #region InterFace For CRUD

        /// <summary>
        /// Get all tender master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<TenderMasterListModel>> GetAll(IndexModel model);

        /// <summary>
        /// This for create new record in tender master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(TenderMasterModel model);

        /// <summary>
        /// Get record by id of tender master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<TenderMasterModel>> GetById(long id);

        /// <summary>
        /// this is for edit the tender master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(TenderMasterModel model);

        /// <summary>
        /// For toggle the status of specific record.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// Get record by id of tender master with child data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<TenderDetailModel> GetTenderDetailWithChildList(long id);

        ServiceResponse<PagedData<DiprTenderMasterModel>> GetAllTendorData(IndexModel model);

        #endregion

        #region Child Data(Update Progress)

        /// <summary>
        /// Update tender progress
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateTenderProgress(TenderMappingModel model);

        /// <summary>
        /// modified tender progress
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> ModifyTenderProgress(TenderMappingModel model);

        /// <summary>
        /// Get Tender Progress record by id of tender master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<TenderMappingModel>> GetTenderProgressById(long id);

        #endregion
    }
}
