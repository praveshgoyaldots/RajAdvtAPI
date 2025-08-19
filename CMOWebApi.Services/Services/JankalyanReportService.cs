using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class JankalyanReportService : BaseService, IJankalyanReportService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///
        public JankalyanReportService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Jankalyan Front Report

        /// <summary>
        /// Get summary report of jankalyan front portal of user visit from back-end
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<JankalyanUserLogSummaryReportModel>> GetJankalyanUserLogSummaryReport(JankalyanLogSearchModel model)
        {
            try
            {
                List<JankalyanUserLogSummaryReportModel> objReturn = new List<JankalyanUserLogSummaryReportModel>();
                List<SP_JAN_JankalyanUserLogSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_JankalyanUserLogSummaryReport_Result>("SP_JAN_JankalyanUserLogSummaryReport @DepartmentCode,@OfficeCode,@District,@UserType, @ToDate, @FromDate, @CustomSearch"
                  , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  , new SqlParameter("OfficeCode", SqlDbType.Int) { Value = model.OfficeCode > 0 ? model.OfficeCode : 0 }
                  , new SqlParameter("District", SqlDbType.Int) { Value = model.District > 0 ? model.District : 0 }
                  , new SqlParameter("UserType", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.UserType) ? string.Empty : model.UserType }
                  , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                  , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                  , new SqlParameter("CustomSearch", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CustomSearch) ? string.Empty : model.CustomSearch }).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_JankalyanUserLogSummaryReport_Result, JankalyanUserLogSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetJankalyanUserLogSummaryReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJankalyanUserLogSummaryReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJankalyanUserLogSummaryReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<JankalyanUserLogSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Detail report of jankalyan front portal of user visit from back-end
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<JankalyanUserLogDetailReportModel>> GetJankalyanUserLogDetailReport(JankalyanLogSearchModel model)
        {
            try
            {
                List<JankalyanUserLogDetailReportModel> objReturn = new List<JankalyanUserLogDetailReportModel>();
                List<SP_JAN_JankalyanUserLogDetailReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_JankalyanUserLogDetailReport_Result>("SP_JAN_JankalyanUserLogDetailReport @DepartmentCode,@OfficeCode,@District,@UserType, @ToDate, @FromDate, @CustomSearch"
                  , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  , new SqlParameter("OfficeCode", SqlDbType.Int) { Value = model.OfficeCode > 0 ? model.OfficeCode : 0 }
                  , new SqlParameter("District", SqlDbType.Int) { Value = model.District > 0 ? model.District : 0 }
                  , new SqlParameter("UserType", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.UserType) ? string.Empty : model.UserType }
                  , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                  , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                  , new SqlParameter("CustomSearch", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CustomSearch) ? string.Empty : model.CustomSearch }).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_JankalyanUserLogDetailReport_Result, JankalyanUserLogDetailReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetJankalyanUserLogDetailReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJankalyanUserLogDetailReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJankalyanUserLogDetailReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<JankalyanUserLogDetailReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get summary report of jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<JankalyanSummaryReportModel>> GetJankalyanSummaryReport(JankalyanSummarySearchModel model)
        {
            try
            {
                List<JankalyanSummaryReportModel> objReturn = new List<JankalyanSummaryReportModel>();
                List<sp_JAN_JankalyanSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_JankalyanSummaryReport_Result>("sp_JAN_JankalyanSummaryReport @DepartmentCode, @AdminDepartmentCode,@Status, @EntryFromDate, @EntryToDate,@UserId",
                  new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 },
                  new SqlParameter("AdminDepartmentCode", SqlDbType.Int) { Value = model.AdminDepartmentCode > 0 ? model.AdminDepartmentCode : 0 },
                  new SqlParameter("Status", SqlDbType.Int) { Value = model.Status },
                  new SqlParameter("EntryFromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.EntryFromDate) ? string.Empty : model.EntryFromDate },
                  new SqlParameter("EntryToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.EntryToDate) ? string.Empty : model.EntryToDate },
                  new SqlParameter("UserId", SqlDbType.Int) { Value = _loginUserDetail.UserId > 0 ? _loginUserDetail.UserId : 0 }
                  ).OrderBy(x => x.ModuleName).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_JankalyanSummaryReport_Result, JankalyanSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetJankalyanSummaryReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJankalyanSummaryReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJankalyanSummaryReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<JankalyanSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get report of jankalyan project on dashboard 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<JankalyanDashBoardProjectReportModel>> GetJankalyanProjectReport()
        {
            try
            {
                List<JankalyanDashBoardProjectReportModel> objReturn = new List<JankalyanDashBoardProjectReportModel>();
                List<sp_DashBoardProjectReport_Result> data = _uow.ExeccuteStoreProcedure<sp_DashBoardProjectReport_Result>("sp_DashBoardProjectReport @UserId"
                  , new SqlParameter("UserId", SqlDbType.Int)
                  {
                      Value = _loginUserDetail.UserId > 0 ? _loginUserDetail.UserId : 0
                  }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_DashBoardProjectReport_Result, JankalyanDashBoardProjectReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetJankalyanProjectReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJankalyanProjectReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJankalyanProjectReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<JankalyanDashBoardProjectReportModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region CMIS New Report

        /// <summary>
        /// Get summary report CMIS new module which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<CMISNewSummaryModel>> GetCMISNewSummaryReport(CMISReportFilterModel model)
        {
            try
            {
                List<CMISNewSummaryModel> objReturn = new List<CMISNewSummaryModel>();
                List<CMIS_New_Summary_Result> data = _uow.ExeccuteStoreProcedure<CMIS_New_Summary_Result>("CMIS_New_Summary @dept_Code,@DeptStatus, @CMOStatus, @ModuleID,@FromDate,@ToDate"
                  , new SqlParameter("dept_Code", SqlDbType.Decimal) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  , new SqlParameter("DeptStatus", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.DepartmentStatus) ? model.DepartmentStatus : string.Empty }
                  , new SqlParameter("CMOStatus", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.CMOStatus) ? model.CMOStatus : string.Empty }
                  , new SqlParameter("ModuleID", SqlDbType.Decimal) { Value = model.ModuleId > 0 ? model.ModuleId : 0 }
                  , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                  , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<CMIS_New_Summary_Result, CMISNewSummaryModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCMISNewSummaryReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISNewSummaryReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISNewSummaryReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<CMISNewSummaryModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get detail report CMIS new module which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<CMISNewDetailModel>> GetCMISNewDetailReport(CMISReportFilterModel model)
        {
            try
            {
                List<CMISNewDetailModel> objReturn = new List<CMISNewDetailModel>();
                List<CMIS_New_detail_Result> data = _uow.ExeccuteStoreProcedure<CMIS_New_detail_Result>("CMIS_New_detail @dept_Code,@DeptStatus, @CMOStatus, @ModuleID,@FromDate,@ToDate,@TransCoreId"
                  , new SqlParameter("dept_Code", SqlDbType.Decimal) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                 , new SqlParameter("DeptStatus", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.DepartmentStatus) ? model.DepartmentStatus : string.Empty }
                  , new SqlParameter("CMOStatus", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.CMOStatus) ? model.CMOStatus : string.Empty }
                  , new SqlParameter("ModuleID", SqlDbType.Decimal) { Value = model.ModuleId > 0 ? model.ModuleId : 0 }
                  , new SqlParameter("FromDate", SqlDbType.VarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                  , new SqlParameter("ToDate", SqlDbType.VarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                    , new SqlParameter("TransCoreId", SqlDbType.BigInt) { Value = model.TransCoreId > 0 ? model.TransCoreId : 0 }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<CMIS_New_detail_Result, CMISNewDetailModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCMISNewDetailReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISNewDetailReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISNewDetailReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<CMISNewDetailModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region CMIS Compliance

        /// <summary>
        /// get CMIS Compliance by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<CMISComplianceModel> GetCMISComplianceById(int id, int achvId)
        {
            try
            {
                tblJAN_CMIS_Compliance sector = _uow.GenericRepository<tblJAN_CMIS_Compliance>().GetAll(filter: x => (id > 0 ? x.CMISNew_Trans_CoreId == id : false) || (achvId > 0 ? x.CMIS_AchievementId == achvId : false)).FirstOrDefault();

                CMISComplianceModel objData = new CMISComplianceModel();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblJAN_CMIS_Compliance, CMISComplianceModel>();
                });
                IMapper mapper = config.CreateMapper();
                objData = mapper.Map(sector, objData);

                return SetResultStatus(objData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCMISComplianceById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISComplianceById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISComplianceById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<CMISComplianceModel>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Add and update CMIS Compliance and generate UIN numer at the time of Add new data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> AddUpdateCMISCompliance(CMISComplianceModel model)
        {
            try
            {
                spJAN_CMISComplianceSave_Result data = _uow.ExeccuteStoreProcedure<spJAN_CMISComplianceSave_Result>("spJAN_CMISComplianceSave @Id,@CMISNew_Trans_CoreId,@ModuleName,@CategoryCode,@SubCategoryCode,@WorksTypeCode,@PageCode,@LoginUserId,@CMIS_AchievementId,@ExpactedNoOfEntries",
                 new SqlParameter("Id", SqlDbType.BigInt) { Value = model.Id },
                 new SqlParameter("CMISNew_Trans_CoreId", SqlDbType.Int) { Value = model.CMISNew_Trans_CoreId > 0 ? model.CMISNew_Trans_CoreId : (object)DBNull.Value },
                 new SqlParameter("ModuleName", SqlDbType.NVarChar) { Value = model.ModuleName },
                 new SqlParameter("CategoryCode", SqlDbType.Int) { Value = model.CategoryCode },
                 new SqlParameter("SubCategoryCode", SqlDbType.Int) { Value = model.SubCategoryCode },
                 new SqlParameter("WorksTypeCode", SqlDbType.Int) { Value = model.WorksTypeCode },
                 new SqlParameter("PageCode", SqlDbType.BigInt) { Value = model.PageCode },
                 new SqlParameter("LoginUserId", SqlDbType.Int) { Value = _loginUserDetail.UserId },
                  new SqlParameter("CMIS_AchievementId", SqlDbType.Int) { Value = model.CMIS_AchievementId > 0 ? model.CMIS_AchievementId : 0 },
                   new SqlParameter("ExpactedNoOfEntries", SqlDbType.Int) { Value = model.ExpactedNoOfEntries > 0 ? model.ExpactedNoOfEntries : 0 }
                 ).FirstOrDefault();
                var id = data.Id;

                return SetResultStatus(id.ToString(), model.Id > 0 ? MessageStatus.Update : MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("AddUpdateCMISCompliance ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("AddUpdateCMISCompliance ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("AddUpdateCMISCompliance ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<string>(null, MessageStatus.Error, false);
            }

        }

        #endregion

        #region Compliance Report

        /// <summary>
        /// Get CMIS Compliance report 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ComplianceReportModel>> GetCMISComplianceReport(CMISReportFilterModel model)
        {
            try
            {
                List<ComplianceReportModel> objReturn = new List<ComplianceReportModel>();
                List<SP_JAN_CMIS_ComplianceReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_CMIS_ComplianceReport_Result>("SP_JAN_CMIS_ComplianceReport @DepartmentCode,@ModuleID, @CMOStatus, @DepartmentStatus,@ToDate,@FromDate,@CMOOfficerCode,@IsDataWithTotalEntries,@UserId,@ExpectedNumberOfEntry"
                  , new SqlParameter("DepartmentCode", SqlDbType.Decimal) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  , new SqlParameter("ModuleID", SqlDbType.Decimal) { Value = model.ModuleId > 0 ? model.ModuleId : 0 }
                  , new SqlParameter("CMOStatus", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.CMOStatus) ? model.CMOStatus : string.Empty }
                  , new SqlParameter("DepartmentStatus", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.DepartmentStatus) ? model.DepartmentStatus : string.Empty }
                  , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                  , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                   , new SqlParameter("CMOOfficerCode", SqlDbType.BigInt) { Value = model.CMOOfficerCode > 0 ? model.CMOOfficerCode : 0 }
                      , new SqlParameter("IsDataWithTotalEntries", SqlDbType.Bit) { Value = model.IsDataWithTotalEntries }
                       , new SqlParameter("UserId", SqlDbType.Int) { Value = _loginUserDetail.UserId }
                       , new SqlParameter("ExpectedNumberOfEntry", SqlDbType.Int) { Value = model.ExpectedNumberOfEntry > 0 ? model.ExpectedNumberOfEntry : 0 }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_CMIS_ComplianceReport_Result, ComplianceReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCMISComplianceReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISComplianceReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISComplianceReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<ComplianceReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get CMIS Module and department wise Compliance summary report report 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ComplianceModuleAndDeptWiseSummaryReportModel>> GetComplianceModuleAndDeptWiseSummaryReport(CMISReportFilterModel model)
        {
            try
            {
                List<ComplianceModuleAndDeptWiseSummaryReportModel> objReturn = new List<ComplianceModuleAndDeptWiseSummaryReportModel>();
                List<SP_JAN_ComplianceModuleAndDeptWiseSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_ComplianceModuleAndDeptWiseSummaryReport_Result>("SP_JAN_ComplianceModuleAndDeptWiseSummaryReport @DepartmentCode,@ModuleID, @CMOStatus, @DepartmentStatus,@ToDate,@FromDate,@CMOOfficerCode,@UserId"
                  , new SqlParameter("DepartmentCode", SqlDbType.Decimal) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  , new SqlParameter("ModuleID", SqlDbType.Decimal) { Value = model.ModuleId > 0 ? model.ModuleId : 0 }
                  , new SqlParameter("CMOStatus", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.CMOStatus) ? model.CMOStatus : string.Empty }
                  , new SqlParameter("DepartmentStatus", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.DepartmentStatus) ? model.DepartmentStatus : string.Empty }
                  , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                  , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                   , new SqlParameter("CMOOfficerCode", SqlDbType.BigInt) { Value = model.CMOOfficerCode > 0 ? model.CMOOfficerCode : 0 }
                    , new SqlParameter("UserId", SqlDbType.Int) { Value = model.UserId > 0 ? model.UserId : _loginUserDetail.UserId }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_ComplianceModuleAndDeptWiseSummaryReport_Result, ComplianceModuleAndDeptWiseSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCMISComplianceReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISComplianceReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISComplianceReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<ComplianceModuleAndDeptWiseSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region CMIS Achievement Report

        /// <summary>
        /// Get summary report CMIS Achievement which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<CMISAchievementSummayReportModel>> GetCMISAchievementSummaryReport(CMISAchievementFilterModel model)
        {
            try
            {
                List<CMISAchievementSummayReportModel> objReturn = new List<CMISAchievementSummayReportModel>();
                List<SP_JAN_CMIS_AchievementSummayReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_CMIS_AchievementSummayReport_Result>("SP_JAN_CMIS_AchievementSummayReport @DepartmentCode,@ToDate,@FromDate"
                  , new SqlParameter("DepartmentCode", SqlDbType.Decimal) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                    , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                  ).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_CMIS_AchievementSummayReport_Result, CMISAchievementSummayReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCMISAchievementSummaryReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISAchievementSummaryReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISAchievementSummaryReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<CMISAchievementSummayReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Detail report CMIS Achievement which used on jankalyan portal 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<CMISAchievementDetailReportModel>> GetCMISAchievementDetailReport(CMISAchievementFilterModel model)
        {
            try
            {
                List<CMISAchievementDetailReportModel> objReturn = new List<CMISAchievementDetailReportModel>();
                List<SP_JAN_CMIS_AchievementDetailReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_CMIS_AchievementDetailReport_Result>("SP_JAN_CMIS_AchievementDetailReport @DepartmentCode,@ToDate,@FromDate"
                  , new SqlParameter("DepartmentCode", SqlDbType.Decimal) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                    , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                  ).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_CMIS_AchievementDetailReport_Result, CMISAchievementDetailReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCMISAchievementDetailReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISAchievementDetailReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMISAchievementDetailReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<CMISAchievementDetailReportModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region  Compliance Detail Report

        public ServiceResponse<ComplianceNoOfEntryInJankalyanReportModel> GetComplianceNoOfEntryInJankalyanReportData(CMISReportFilterModel model)
        {
            try
            {
                ComplianceNoOfEntryInJankalyanReportModel responsedata = new ComplianceNoOfEntryInJankalyanReportModel();
                List<UserListWithDepartmentCodeModel> nodelUsers = new List<UserListWithDepartmentCodeModel>();
                List<vwUserListWithDepartmentCode> usertData = _uow.GenericRepository<vwUserListWithDepartmentCode>().GetAll(f => f.DepartmentCode == model.DepartmentCode).ToList();

                List<SP_JAN_ComplianceNoOfEntryInJankalyanReport_Result> projectData = new List<SP_JAN_ComplianceNoOfEntryInJankalyanReport_Result>();
                List<SP_JAN_ComplianceNoOfEntryInJankalyanGeneralEntry_Result> generalEntryData = new List<SP_JAN_ComplianceNoOfEntryInJankalyanGeneralEntry_Result>();
                List<SP_JAN_ComplianceNoOfEntryInJankalyanGovDocument_Result> govDocData = new List<SP_JAN_ComplianceNoOfEntryInJankalyanGovDocument_Result>();
                List<SP_JAN_ComplianceNoOfEntryInJankalyanScheme_Result> schemeData = new List<SP_JAN_ComplianceNoOfEntryInJankalyanScheme_Result>();

                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("DepartmentCode", model.DepartmentCode > 0 ? model.DepartmentCode : 0));
                spParams.Add(new ObjectParameter("ModuleID", model.ModuleId > 0 ? model.ModuleId : 0));
                spParams.Add(new ObjectParameter("DepartmentStatus", !string.IsNullOrEmpty(model.DepartmentStatus) ? model.DepartmentStatus : string.Empty));
                spParams.Add(new ObjectParameter("UserId", _loginUserDetail.UserId));

                ObjectResult<SP_JAN_ComplianceNoOfEntryInJankalyanReport_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<SP_JAN_ComplianceNoOfEntryInJankalyanReport_Result>("SP_JAN_ComplianceNoOfEntryInJankalyanReport", spParams.ToArray());

                projectData.AddRange(spResult.ToList());

                ObjectResult<SP_JAN_ComplianceNoOfEntryInJankalyanGeneralEntry_Result> objgeneralEntryResult = spResult.GetNextResult<SP_JAN_ComplianceNoOfEntryInJankalyanGeneralEntry_Result>();
                generalEntryData.AddRange(objgeneralEntryResult.ToList());

                ObjectResult<SP_JAN_ComplianceNoOfEntryInJankalyanGovDocument_Result> objgovDocResult = objgeneralEntryResult.GetNextResult<SP_JAN_ComplianceNoOfEntryInJankalyanGovDocument_Result>();
                govDocData.AddRange(objgovDocResult.ToList());

                ObjectResult<SP_JAN_ComplianceNoOfEntryInJankalyanScheme_Result> objschemeDocResult = objgovDocResult.GetNextResult<SP_JAN_ComplianceNoOfEntryInJankalyanScheme_Result>();
                schemeData.AddRange(objschemeDocResult.ToList());

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_ComplianceNoOfEntryInJankalyanReport_Result, ComplianceNoOfEntryInJankalyanProjectModel>()
                      .ForMember(des => des.Attachments, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.Attachments) ? (mdlSrc.Attachments.Split(',').Select(a => !string.IsNullOrEmpty(a) ? a.ToAbsolutePath() : string.Empty).ToList()) : null));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.ProjectsList = mapper.Map(projectData, responsedata.ProjectsList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_ComplianceNoOfEntryInJankalyanGeneralEntry_Result, ComplianceNoOfEntryInJankalyanGeneralEntryModel>()
                     .ForMember(des => des.Attachments, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.Attachments) ? (mdlSrc.Attachments.Split(',').Select(a => !string.IsNullOrEmpty(a) ? a.ToAbsolutePath() : string.Empty).ToList()) : null));

                });
                mapper = config.CreateMapper();
                responsedata.GeneralEntryList = mapper.Map(generalEntryData, responsedata.GeneralEntryList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_ComplianceNoOfEntryInJankalyanGovDocument_Result, ComplianceNoOfEntryInJankalyanGovDocumentModel>()
                     .ForMember(des => des.Attachments, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.Attachments) ? (mdlSrc.Attachments.Split(',').Select(a => !string.IsNullOrEmpty(a) ? a.ToAbsolutePath() : string.Empty).ToList()) : null));
                });
                mapper = config.CreateMapper();
                responsedata.GovDocumentList = mapper.Map(govDocData, responsedata.GovDocumentList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_ComplianceNoOfEntryInJankalyanScheme_Result, ComplianceNoOfEntryInJankalyanSchemeModel>()
                     .ForMember(des => des.Attachments, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.Attachments) ? (mdlSrc.Attachments.Split(',').Select(a => !string.IsNullOrEmpty(a) ? a.ToAbsolutePath() : string.Empty).ToList()) : null));
                });
                mapper = config.CreateMapper();
                responsedata.SchemeList = mapper.Map(schemeData, responsedata.SchemeList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwUserListWithDepartmentCode, UserListWithDepartmentCodeModel>();
                });
                mapper = config.CreateMapper();
                responsedata.NodelUserList = mapper.Map(usertData, responsedata.NodelUserList);

                return SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetComplianceNoOfEntryInJankalyanReportData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetComplianceNoOfEntryInJankalyanReportData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetComplianceNoOfEntryInJankalyanReportData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<ComplianceNoOfEntryInJankalyanReportModel>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }

        public ServiceResponse<NoOfComplianceDetailModel> GetNoOfComplianceDetailData(CMISReportFilterModel model)
        {
            try
            {
                NoOfComplianceDetailModel responsedata = new NoOfComplianceDetailModel();


                List<SP_JAN_NoOfComplianceDetailReport_Result> compData = new List<SP_JAN_NoOfComplianceDetailReport_Result>();
                List<SP_JAN_NoOfComplianceCollectionReport_Result> collData = new List<SP_JAN_NoOfComplianceCollectionReport_Result>();


                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("DepartmentCode", model.DepartmentCode > 0 ? model.DepartmentCode : 0));
                spParams.Add(new ObjectParameter("ModuleID", model.ModuleId > 0 ? model.ModuleId : 0));
                spParams.Add(new ObjectParameter("DepartmentStatus", !string.IsNullOrEmpty(model.DepartmentStatus) ? model.DepartmentStatus : string.Empty));
                spParams.Add(new ObjectParameter("UserId", _loginUserDetail.UserId));

                ObjectResult<SP_JAN_NoOfComplianceDetailReport_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<SP_JAN_NoOfComplianceDetailReport_Result>("SP_JAN_NoOfComplianceDetailReport", spParams.ToArray());

                compData.AddRange(spResult.ToList());

                ObjectResult<SP_JAN_NoOfComplianceCollectionReport_Result> objPressReleaseResult = spResult.GetNextResult<SP_JAN_NoOfComplianceCollectionReport_Result>();
                collData.AddRange(objPressReleaseResult.ToList());

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_NoOfComplianceDetailReport_Result, NoOfComplianceDetailReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.NoOfComplianceDetailList = mapper.Map(compData, responsedata.NoOfComplianceDetailList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_NoOfComplianceCollectionReport_Result, NoOfComplianceCollectionReportModel>();
                });
                mapper = config.CreateMapper();
                responsedata.NoOfComplianceCollectionList = mapper.Map(collData, responsedata.NoOfComplianceCollectionList);

                return SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetNoOfComplianceDetailData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetNoOfComplianceDetailData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetNoOfComplianceDetailData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<NoOfComplianceDetailModel>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }

        #endregion
    }
}
