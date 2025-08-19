using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IJankalyanReportService
    {
        #region Jankalyan Front Report

        /// <summary>
        /// Get summary report of jankalyan front portal of user visit from back-end
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<JankalyanUserLogSummaryReportModel>> GetJankalyanUserLogSummaryReport(JankalyanLogSearchModel model);

        /// <summary>
        /// Get Detail report of jankalyan front portal of user visit from back-end
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<JankalyanUserLogDetailReportModel>> GetJankalyanUserLogDetailReport(JankalyanLogSearchModel model);

		/// <summary>
		/// Get summary report of jankalyan portal 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<List<JankalyanSummaryReportModel>> GetJankalyanSummaryReport(JankalyanSummarySearchModel model);

        /// <summary>
		/// Get report of jankalyan project on dashboard
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<List<JankalyanDashBoardProjectReportModel>> GetJankalyanProjectReport();
        #endregion

        #region CMIS New Report

        /// <summary>
        /// Get summary report CMIS new module which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<CMISNewSummaryModel>> GetCMISNewSummaryReport(CMISReportFilterModel model);

        /// <summary>
        /// Get detail report CMIS new module which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<CMISNewDetailModel>> GetCMISNewDetailReport(CMISReportFilterModel model);

        #endregion

        #region CMIS Compliance

        /// <summary>
        /// get CMIS Compliance by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<CMISComplianceModel> GetCMISComplianceById(int id,int achvId);

        /// <summary>
        /// Add and update CMIS Compliance and generate UIN numer at the time of Add new data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<string> AddUpdateCMISCompliance(CMISComplianceModel model);

        #endregion

        #region Compliance Report

        /// <summary>
        /// Get CMIS Compliance report 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ComplianceReportModel>> GetCMISComplianceReport(CMISReportFilterModel model);

        /// <summary>
        /// Get CMIS Module and department wise Compliance summary report report 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ComplianceModuleAndDeptWiseSummaryReportModel>> GetComplianceModuleAndDeptWiseSummaryReport(CMISReportFilterModel model);

        #endregion

        #region CMIS Achievement Report

        /// <summary>
        /// Get summary report CMIS Achievement which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<CMISAchievementSummayReportModel>> GetCMISAchievementSummaryReport(CMISAchievementFilterModel model);

        /// <summary>
        /// Get Detail report CMIS Achievement which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<CMISAchievementDetailReportModel>> GetCMISAchievementDetailReport(CMISAchievementFilterModel model);

        #endregion

        #region  Compliance Detail Report

        ServiceResponse<ComplianceNoOfEntryInJankalyanReportModel> GetComplianceNoOfEntryInJankalyanReportData(CMISReportFilterModel model);

        ServiceResponse<NoOfComplianceDetailModel> GetNoOfComplianceDetailData(CMISReportFilterModel model);

        #endregion
    }
}
