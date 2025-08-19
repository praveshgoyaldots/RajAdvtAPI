using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class JankalyanSummaryReportModel
	{
		public Nullable<long> TotalCount { get; set; }
		public string ModuleName { get; set; }
	}
	public class JankalyanSummarySearchModel
	{
		public int? DepartmentCode { get; set; }
        public int AdminDepartmentCode { get; set; }
        public int? Status { get; set; }
        public string EntryFromDate { get; set; }
        public string EntryToDate { get; set; }

    }

    public class JankalyanDashBoardProjectReportModel
    {
        public string ProjectStatus { get; set; }
        public Nullable<int> ProjectCount { get; set; }
    }

    #region CMIS New Report

    public class CMISNewDetailModel
    {
        public string modulename { get; set; }
        public int Id { get; set; }
        public string Project_Code { get; set; }
        public Nullable<System.DateTime> App_Date { get; set; }
        public string Financial_Year { get; set; }
        public Nullable<bool> Send_to_Department { get; set; }
        public string Para_No { get; set; }
        public string Part_No { get; set; }
        public string Sub_Para_No { get; set; }
        public string File_Number { get; set; }
        public string Announcement_Description { get; set; }
        public string Announcement_Description_Gist { get; set; }
        public Nullable<bool> Action_not_required { get; set; }
        public Nullable<System.DateTime> Sent_to_Dept_on { get; set; }
        public Nullable<bool> Is_CM_Priority { get; set; }
        public Nullable<bool> IsActualbenefitedStart { get; set; }
        public Nullable<System.DateTime> Benefited_StartDate { get; set; }
        public string Dept_Status { get; set; }
        public string CMO_Status { get; set; }
        public Nullable<System.DateTime> Dept_UpdateDate { get; set; }
        public Nullable<System.DateTime> CMO_UpdateDate { get; set; }
        public string Dept_Comments { get; set; }
        public string CMO_Comments { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CretaedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<bool> isActive { get; set; }
        public string PageTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string SubSubCategoryName { get; set; }
        public string DepartmentName { get; set; }
		public Nullable<int> ExpactedNoOfEntries { get; set; }
	}

    public class CMISNewSummaryModel
    {
        public string modulename { get; set; }
        public Nullable<int> ActiveTotal { get; set; }
        public int InActiveTotal { get; set; }
        public Nullable<decimal> moduleid { get; set; }
    }

    public class CMISReportFilterModel
    {
        public decimal DepartmentCode { get; set; }
        public string CMOStatus { get; set; }
        public decimal ModuleId { get; set; }
        public string DepartmentStatus { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long CMOOfficerCode { get; set; }
        public bool IsDataWithTotalEntries { get; set; }
        public int ExpectedNumberOfEntry { get; set; }
        public int UserId { get; set; } = 0;
        public long TransCoreId { get; set; } 

    }

    #endregion


    #region CMIS Compliance

    public class CMISComplianceModel
    {
        public long Id { get; set; }
        public Nullable<int> CMISNew_Trans_CoreId { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public Nullable<int> SubCategoryCode { get; set; }
        public Nullable<int> WorksTypeCode { get; set; }
        public Nullable<long> PageCode { get; set; }
        public string ModuleName { get; set; }
        public int CMIS_AchievementId { get; set; }
		public int ExpactedNoOfEntries { get; set; }

	}


    #endregion

    #region Compliance Report
    public class  ComplianceReportModel
    {
        public int Id { get; set; }
        public string modulename { get; set; }
        public string Project_Code { get; set; }
        public Nullable<System.DateTime> App_Date { get; set; }
        public string Financial_Year { get; set; }
        public Nullable<bool> Send_to_Department { get; set; }
        public string Para_No { get; set; }
        public string Part_No { get; set; }
        public string Sub_Para_No { get; set; }
        public string File_Number { get; set; }
        public string Announcement_Description { get; set; }
        public string Announcement_Description_Gist { get; set; }
        public Nullable<bool> Action_not_required { get; set; }
        public Nullable<System.DateTime> Sent_to_Dept_on { get; set; }
        public Nullable<bool> Is_CM_Priority { get; set; }
        public Nullable<bool> IsActualbenefitedStart { get; set; }
        public Nullable<System.DateTime> Benefited_StartDate { get; set; }
        public string Dept_Status { get; set; }
        public string CMO_Status { get; set; }
        public Nullable<System.DateTime> Dept_UpdateDate { get; set; }
        public Nullable<System.DateTime> CMO_UpdateDate { get; set; }
        public string Dept_Comments { get; set; }
        public string CMO_Comments { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CretaedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<bool> isActive { get; set; }
        public Nullable<decimal> ModuleID { get; set; }
        public string PageTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string SubSubCategoryName { get; set; }
        public string DepartmentName { get; set; }
        public Nullable<int> TotalEntries { get; set; }

        public int ExpectedNumberOfEntry { get; set; }
    }

    public class ComplianceModuleAndDeptWiseSummaryReportModel
    {
        public Nullable<int> Nodal_Department { get; set; }
        public string DepartmentName { get; set; }
        public string modulename { get; set; }
        public Nullable<decimal> ModuleID { get; set; }
        public Nullable<int> NoOfEntyInCMIS { get; set; }
        public Nullable<int> NumberOfEntriesInJankalyan { get; set; }
        public Nullable<int> NumberOfCompliance { get; set; }
        public int NumberOfEntry { get; set; }
    }

    #endregion

    #region CMIS Achievement Report

    public class CMISAchievementFilterModel
    {
        public decimal DepartmentCode { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
    }

    public class CMISAchievementSummayReportModel
    {
        public string DepartmentTitle { get; set; }
        public Nullable<decimal> DepartmentCode { get; set; }
        public Nullable<int> TotalCount { get; set; }
    }

    public class CMISAchievementDetailReportModel
    {
        public string DepartmentTitle { get; set; }
        public int ID { get; set; }
        public string updprogresse { get; set; }
        public string updprogressh { get; set; }
        public Nullable<decimal> departmentid { get; set; }
        public Nullable<bool> deptpublish { get; set; }
        public Nullable<bool> cmopublish { get; set; }
        public string ben_category { get; set; }
        public string relatedto { get; set; }
        public string pprojectid { get; set; }
        public string rtf_anndesc { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<System.DateTime> Modifiedon { get; set; }
        public Nullable<System.DateTime> docdate { get; set; }
    }

    #endregion

    #region Compliance Detail Report

    public class ComplianceNoOfEntryInJankalyanReportModel
    {
        public List<ComplianceNoOfEntryInJankalyanProjectModel> ProjectsList { get; set; }
        public List<ComplianceNoOfEntryInJankalyanGeneralEntryModel> GeneralEntryList { get; set; }
        public List<ComplianceNoOfEntryInJankalyanGovDocumentModel> GovDocumentList { get; set; }
        public List<ComplianceNoOfEntryInJankalyanSchemeModel> SchemeList { get; set; }
        public List<UserListWithDepartmentCodeModel> NodelUserList { get; set; }
    }

    public class UserListWithDepartmentCodeModel
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string SSOID { get; set; }
        public string CreatedUserContact { get; set; }
        public int DepartmentCode { get; set; }
    }

    public class ComplianceNoOfEntryInJankalyanProjectModel
    {
        public int ProjectMasterId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentName { get; set; }
        public string YearText { get; set; }
        public string Description { get; set; }
        public Nullable<int> Trans_Core { get; set; }
        public string Para_No { get; set; }
        public string Part_No { get; set; }
        public string PageTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string SubSubCategoryName { get; set; }
        public List<string> Attachments { get; set; }
        public string ComplianceDone { get; set; }
    }

    public  class ComplianceNoOfEntryInJankalyanGeneralEntryModel
    {
        public int AchievementId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentName { get; set; }
        public string YearText { get; set; }
        public string Description { get; set; }
        public Nullable<int> Trans_Core { get; set; }
        public string Para_No { get; set; }
        public string Part_No { get; set; }
        public string PageTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string SubSubCategoryName { get; set; }
        public List<string> Attachments { get; set; }
        public string ComplianceDone { get; set; }
    }

    public class ComplianceNoOfEntryInJankalyanGovDocumentModel
    {
        public long OrderEntryID { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentName { get; set; }
        public string YearText { get; set; }
        public string Description { get; set; }
        public Nullable<int> Trans_Core { get; set; }
        public string Para_No { get; set; }
        public string Part_No { get; set; }
        public string PageTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string SubSubCategoryName { get; set; }
        public List<string> Attachments { get; set; }
        public string ComplianceDone { get; set; }
    }

    public class ComplianceNoOfEntryInJankalyanSchemeModel
    {
        public long SchemeId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentName { get; set; }
        public string YearText { get; set; }
        public string Description { get; set; }
        public Nullable<int> Trans_Core { get; set; }
        public string Para_No { get; set; }
        public string Part_No { get; set; }
        public string PageTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string SubSubCategoryName { get; set; }
        public List<string> Attachments { get; set; }
        public string ComplianceDone { get; set; }
    }

    public class NoOfComplianceDetailModel
    {
        public List<NoOfComplianceDetailReportModel> NoOfComplianceDetailList { get; set; }
        public List<NoOfComplianceCollectionReportModel> NoOfComplianceCollectionList { get; set; }
    }

    public class NoOfComplianceDetailReportModel
    {
        public Nullable<int> CMISNewTransCoreId { get; set; }
        public string Description { get; set; }
        public string ModuleName { get; set; }
    }

    public class NoOfComplianceCollectionReportModel
    {
        public Nullable<int> CMISNewTransCoreId { get; set; }
        public string Description { get; set; }
    }

    #endregion

}
