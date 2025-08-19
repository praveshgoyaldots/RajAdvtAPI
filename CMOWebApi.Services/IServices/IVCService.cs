using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IVCService
        {
        #region VC Service

        ServiceResponse<VCCreationModel> GetById(long id);
        Task<ServiceResponse<string>> Edit(VCCreationModel model);
        Task<ServiceResponse<string>> Create(VCCreationModel model);
        ServiceResponse<PagedData<VCCreationViewModel>> GetAll(VCSearchModel model);
        Task<ServiceResponse<string>> UpdateStatus(long id);

        /// <summary>
        /// Delete VC incase no participant added for this VC
        /// </summary>
        /// <param name="vCId"></param>
        /// <returns></returns>
        ServiceResponse<string> Delete(long vCId);

        #endregion

        #region Reports

        /// <summary>
        /// Get VC report
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<VCReportModel>> GetAllVcReport(VCReportSearchModel model);

        /// <summary>
        /// VC Summary Report
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<ReportSummeryViewModel>> VCSummaryReport(ReportSummerySearchModel model);

        /// <summary>
        /// Get participant count of all district
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ParticipantCountByDistrictReportModel>> VCParticipantCountByDistrictReport(ParticipantByDistrictReportModel model);

        /// <summary>
        /// VC Chairperson Category Summary Report
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ChairPersonCategorySummaryReportModel>> VCChairpersonCategorySummaryReport(ChairpersonSummeryReportSearchModel model);

        /// <summary>
        /// Get VC report summary report by category and department
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<CatDptWiseSummaryReportModel>> GetCategoryAndDptWiseSummaryVCReport(CategoryAndDptWiseSummaryVCReportFilterModel model);

        /// <summary>
        /// Get VC summary report by admin department, department and category wise
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<AdminDptCatWiseSummaryReportModel>> GetAdmDptCatWiseSummaryVCReport(CategoryAndDptWiseSummaryVCReportFilterModel model);

        #endregion


    }
}