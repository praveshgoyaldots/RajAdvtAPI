
using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.PublicPortalModel
{
    public class CMISModuleDataViewModel
    {
        public int ID { get; set; }
        public Nullable<decimal> ModuleID { get; set; }
        public string modulename { get; set; }
        public string ModuleNameHindi { get; set; }
        public Nullable<decimal> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public Nullable<int> JanDepartmentCode { get; set; }
        public string JanDepartmentTitle { get; set; }
        public string JanDepartmentTitleHindi { get; set; }
        public Nullable<int> DepartmentPriority { get; set; }
        public Nullable<System.DateTime> App_Date { get; set; }
        public string Announcement_Description { get; set; }

        public string CMDMaster_MeetingId { get; set; }
        public Nullable<System.DateTime> MeetingDate { get; set; }
        public string DecisionNo { get; set; }
        public Nullable<System.DateTime> AnnouncementDate { get; set; }
        public string File_Number { get; set; }
        public string Financial_Year { get; set; }
        public string ParaNumber { get; set; }
        public bool isActive { get; set; }
        public bool isDelete { get; set; }



        public string AllSearch { get; set; }
        public string App_DateHindi { get; set; }
        public string MeetingDateHindi { get; set; }
        public string AnnouncementDateHindi { get; set; }

        public string place_village { get; set; }
        public string place_grampanchayat { get; set; }
        public string place_panchayat { get; set; }
        public string place_adistrict { get; set; }
        public string place_assconstituency { get; set; }
        public string place_parconstituency { get; set; }
        public Nullable<System.DateTime> CabinateDecision_Date { get; set; }
        public string CabinateDecision_DateHindi { get; set; }
    }

    public class CMISModuleMasterViewModel
    {
        public int ID { get; set; }
        public decimal cm_moduleid { get; set; }
        public string Cancel { get; set; }
        public string modulename { get; set; }
        public string ModuleNameHindi { get; set; }
        public string modulesname { get; set; }
        public string ImagePath { get; set; }
        public bool IsVisibleOnFrontHome { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
    }

    public class DepartmentGroupCMISListViewModel
    {
        public Nullable<decimal> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }

        public List<FinancialGroupCMISListViewModel> FinancialYearItems { get; set; }
        public List<CMISModuleDataViewModel> Items { get; set; }


    }

    public class FinancialGroupCMISListViewModel
    {
        public string FinancialYear { get; set; }
        public List<CMISModuleDataViewModel> Items { get; set; }
    }


    public class CMISAchievementViewModel
    {
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

        public string docdateHindi { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string AllSearch { get; set; }
    }

    public class DepartmentGroupCMISAchievementViewModel
    {

        public Nullable<decimal> departmentid { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }

        public List<CMISAchievementViewModel> Items { get; set; }


    }

    public class CMISFilterModel
    {
        public Nullable<decimal> ModuleId { get; set; }
        public Nullable<decimal> DepartmentCode { get; set; }
        public Nullable<int> JanDepartmentCode { get; set; }
        public Nullable<DateTime> FromDate { get; set; }
        public Nullable<DateTime> ToDate { get; set; }
        public string SearchKeyword { get; set; }
        public string FileNumber { get; set; }
        public string FinancialYear { get; set; }
        public Nullable<int> AdmDepartmentCode { get; set; }
        public IndexModel IndexModel { get; set; }
    }
}
