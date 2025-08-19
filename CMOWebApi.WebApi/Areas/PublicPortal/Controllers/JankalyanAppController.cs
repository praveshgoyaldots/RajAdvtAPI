using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class JankalyanAppController : ApiController
    {
        #region /// variable  ///
        IJanklyanAppService _janklyanAppService;
        private readonly IJankalyanReportService _iJankalyanReportService;
        private readonly IProjectMasterService _projectMasterService;

        #endregion

        #region /// constructor  //
        public JankalyanAppController(IJanklyanAppService janklyanAppService, IJankalyanReportService jankalyanReportService, IProjectMasterService projectMasterService)
        {
            _janklyanAppService = janklyanAppService;
            _iJankalyanReportService = jankalyanReportService;
            _projectMasterService = projectMasterService;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Get Module Icons
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetJanklayanAppModules()
        {
            try
            {
                return Ok(_janklyanAppService.GetJanklayanAppModules());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetDepartmentWiseCountForCMISModules(decimal moduleId)
        {
            try
            {
                return Ok(_janklyanAppService.GetDepartmentWiseCountForCMISModules(moduleId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetCMOStatusWiseCountForCMIS(decimal moduleId)
        {
            try
            {
                return Ok(_janklyanAppService.GetCMOStatusWiseCountForCMIS(moduleId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetDepartmentStatusWiseCountForCMIS(decimal moduleId)
        {
            try
            {
                return Ok(_janklyanAppService.GetDepartmentStatusWiseCountForCMIS(moduleId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetProjectStatusCount()
        {
            try
            {
                return Ok(_janklyanAppService.GetProjectStatusCount());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetProjectDepartmentCount()
        {
            try
            {
                return Ok(_janklyanAppService.GetProjectDepartmentCount());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
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

        /// <summary>
        /// Get detail report CMIS new module which used on jankalyan App 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<CMISNewDetailModel>> NumberOfEntryInCMISDetail(CMISReportFilterModel model)
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

        [HttpPost]
        public ServiceResponse<ComplianceNoOfEntryInJankalyanReportModel> GetNoOfEntryInJankalyanDetail(CMISReportFilterModel model)
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
        public ServiceResponse<NoOfComplianceDetailModel> GetNoOfComplianceDetail(CMISReportFilterModel model)
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

        /// <summary>
        /// Get department wise category, Sub category, Sub sub category,With MAL constituency and Without MAL constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ProjectDepartmentWiseSummaryReportModel>> GetDepartmentWiseSummaryReport(ProjectReportFilterModel model)
        {
            ServiceResponse<List<ProjectDepartmentWiseSummaryReportModel>> objReturn = new ServiceResponse<List<ProjectDepartmentWiseSummaryReportModel>>();
            try
            {
                if (model != null)
                {
                    return _projectMasterService.GetDepartmentWiseSummaryReport(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }


        /// <summary>
        /// Get project status wise department summary report
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ProjectDepartmentStatusSummaryReportModel>> GetProjectDepartmentStatusSummaryReport(ProjectReportFilterModel model)
        {
            ServiceResponse<List<ProjectDepartmentStatusSummaryReportModel>> objReturn = new ServiceResponse<List<ProjectDepartmentStatusSummaryReportModel>>();
            try
            {
                if (model != null)
                {
                    return _projectMasterService.GetProjectDepartmentStatusSummaryReport(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        #endregion

    }
}
