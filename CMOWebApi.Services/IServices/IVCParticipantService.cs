using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IVCParticipantService
    {
        /// <summary>
        /// Get all Video Conferencing Creation according to login user by CV Code
        /// </summary>
        /// <param name="Model"></param>
        /// <param name="CVCode"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<VCParticipantViewModel>> GetAll(IndexModel model, long vCCode);

        /// <summary>
        /// Get all Video Conferencing Creation by CV Code
        /// </summary>
        /// <param name="model"></param>
        /// <param name="CVCode"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<VCParticipantViewModel>> GetParicipantReport(IndexModel model, long vCCode);

        /// <summary>
        /// Get Video Conferencing Report with filter
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
     
		ServiceResponse<List<VCParticipantReportViewModel>> GetVcReport(VCCustomFilter model);
		/// <summary>
		/// Create Video Conferencing Creation
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(VCParticipantModel model);

        /// <summary>
        /// Update Video Conferencing Creation
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(VCParticipantModel model);

        /// <summary>
        /// get Video Conferencing Creation by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<VCParticipantModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);

        /// <summary>
        /// Delete Participant 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> DeleteParticipant(long id);

        #region bulk Upload

        /// <summary>
        /// Use to upload bulk participant from excel
        /// </summary>
        /// <param name="excelRecords"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ParticipantTempBulkViewModel>> ParticipantExcelUpload(DataSet excelRecords, ParticipantTempBulkModel model);

        /// <summary>
        /// Save final excel data in main table
        /// </summary>
        /// <returns></returns>
        ServiceResponse<string> ParticipantExcelFinalUpload();

        ///<summary>
        /// excel file download
        ///</summary>
        ServiceResponse<ExcelFileViewModel> GetExcelFileDownload();

        /// <summary>
        /// Delete item from Bulk upload which is not want to upload
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Delete(long id);

        /// <summary>
        /// Get All Excel Temp data
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<ParticipantTempBulkViewModel>> GetParticipantExcelUploadTempList();

        /// <summary>
        /// Mark present and absent to participant
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> MarkPresentAbsent(long id);

        #endregion
    }
}
