using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class JankalyanReportController : ApiController
    {
        #region /// Variable ///

        private readonly IJankalyanReportService _iJankalyanReportService;

        #endregion

        #region /// constructor  ///
        public JankalyanReportController(IJankalyanReportService jankalyanReportService, IndexModel indexModel)
        {
            this._iJankalyanReportService = jankalyanReportService;
        }

        #endregion

        #region Jankalyan Front Report

        /// <summary>
        /// Get summary report of jankalyan front portal of user visit from back-end
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<JankalyanUserLogSummaryReportModel>> GetJankalyanUserLogSummaryReport(JankalyanLogSearchModel model)
        {
            ServiceResponse<List<JankalyanUserLogSummaryReportModel>> objReturn = new ServiceResponse<List<JankalyanUserLogSummaryReportModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetJankalyanUserLogSummaryReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get Detail report of jankalyan front portal of user visit from back-end
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<JankalyanUserLogDetailReportModel>> GetJankalyanUserLogDetailReport(JankalyanLogSearchModel model)
        {
            ServiceResponse<List<JankalyanUserLogDetailReportModel>> objReturn = new ServiceResponse<List<JankalyanUserLogDetailReportModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetJankalyanUserLogDetailReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

		/// <summary>
		/// Get summary report of jankalyan portal 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
        public ServiceResponse<List<JankalyanSummaryReportModel>> GetJankalyanSummaryReport(JankalyanSummarySearchModel model)
		{
			ServiceResponse<List<JankalyanSummaryReportModel>> objReturn = new ServiceResponse<List<JankalyanSummaryReportModel>>();
			try
			{
				objReturn = _iJankalyanReportService.GetJankalyanSummaryReport(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

        /// <summary>
		/// Get report of jankalyan project on dashboard
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpGet]
        public ServiceResponse<List<JankalyanDashBoardProjectReportModel>> GetJankalyanProjectReport()
        {
            ServiceResponse<List<JankalyanDashBoardProjectReportModel>> objReturn = new ServiceResponse<List<JankalyanDashBoardProjectReportModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetJankalyanProjectReport();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion

        #region CMIS New Report

        /// <summary>
        /// Get summary report CMIS new module which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<CMISNewSummaryModel>> GetCMISNewSummaryReport(CMISReportFilterModel model)
        {
            ServiceResponse<List<CMISNewSummaryModel>> objReturn = new ServiceResponse<List<CMISNewSummaryModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetCMISNewSummaryReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get detail report CMIS new module which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<CMISNewDetailModel>> GetCMISNewDetailReport(CMISReportFilterModel model)
        {
            ServiceResponse<List<CMISNewDetailModel>> objReturn = new ServiceResponse<List<CMISNewDetailModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetCMISNewDetailReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion

        #region CMIS Compliance

        /// <summary>
        /// get CMIS Compliance by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<CMISComplianceModel> GetCMISComplianceById(int id,int achvId)
        {
            ServiceResponse<CMISComplianceModel> objReturn = new ServiceResponse<CMISComplianceModel>();
            try
            {
                objReturn =  _iJankalyanReportService.GetCMISComplianceById(id, achvId);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Add and update CMIS Compliance and generate UIN numer at the time of Add new data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<string> AddUpdateCMISCompliance(CMISComplianceModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn =  _iJankalyanReportService.AddUpdateCMISCompliance(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion

        #region Compliance Report

        /// <summary>
        /// Get CMIS Compliance report 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ComplianceReportModel>> GetCMISComplianceReport(CMISReportFilterModel model)
        {
            ServiceResponse<List<ComplianceReportModel>> objReturn = new ServiceResponse<List<ComplianceReportModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetCMISComplianceReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get CMIS Module and department wise Compliance summary report report 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ComplianceModuleAndDeptWiseSummaryReportModel>> GetComplianceModuleAndDeptWiseSummaryReport(CMISReportFilterModel model)
        {
            ServiceResponse<List<ComplianceModuleAndDeptWiseSummaryReportModel>> objReturn = new ServiceResponse<List<ComplianceModuleAndDeptWiseSummaryReportModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetComplianceModuleAndDeptWiseSummaryReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion

        #region CMIS Achievement Report

        /// <summary>
        /// Get summary report CMIS Achievement which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<CMISAchievementSummayReportModel>> GetCMISAchievementSummaryReport(CMISAchievementFilterModel model)
        {
            ServiceResponse<List<CMISAchievementSummayReportModel>> objReturn = new ServiceResponse<List<CMISAchievementSummayReportModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetCMISAchievementSummaryReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get Detail report CMIS Achievement which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<CMISAchievementDetailReportModel>> GetCMISAchievementDetailReport(CMISAchievementFilterModel model)
        {
            ServiceResponse<List<CMISAchievementDetailReportModel>> objReturn = new ServiceResponse<List<CMISAchievementDetailReportModel>>();
            try
            {
                objReturn = _iJankalyanReportService.GetCMISAchievementDetailReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<ComplianceNoOfEntryInJankalyanReportModel> GetComplianceNoOfEntryInJankalyanReportData(CMISReportFilterModel model)
        {
            ServiceResponse<ComplianceNoOfEntryInJankalyanReportModel> objReturn = new ServiceResponse<ComplianceNoOfEntryInJankalyanReportModel>();
            try
            {
                objReturn = _iJankalyanReportService.GetComplianceNoOfEntryInJankalyanReportData(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<NoOfComplianceDetailModel> GetNoOfComplianceDetailData(CMISReportFilterModel model)
        {
            ServiceResponse<NoOfComplianceDetailModel> objReturn = new ServiceResponse<NoOfComplianceDetailModel>();
            try
            {
                objReturn = _iJankalyanReportService.GetNoOfComplianceDetailData(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        #endregion
    }
}
