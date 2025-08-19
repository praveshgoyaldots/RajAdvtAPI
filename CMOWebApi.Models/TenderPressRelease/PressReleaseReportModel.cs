using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.TenderPressRelease
{
    class PressReleaseReportModel
    {
    }

    public class PressReleaseSummaryReportPressReleasesCreatedByUsers
    {
        public string Name { get; set; }
        public string User_Type { get; set; }
        public string Department_Name { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }

    public class PressReleaseSummaryReportCategorySubCategory
    {
        public string Category_Name { get; set; }
        public string Sub_category_Name { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }

    public class PressReleaseSummaryReportDeptCatSubcat
    {
        public string Department_Name { get; set; }
        public string Category_Name { get; set; }
        public string Sub_category_Name { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }

    public class PressReleaseSummaryReportLookupCategory
    {
        public string Lookup_Category { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }

    public class PressReleaseSummaryReportDeptLookupCat
    {
        public string Department_Name { get; set; }
        public string Lookup { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }

    public class PressReleaseSummmaryReportVIPDepartment
    {
        public string VIP_Person { get; set; }
        public string Department_Name { get; set; }
        public string Category_Name { get; set; }
        public string Sub_category_Name { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }
    
    public class PressReleaseSummmaryReportDistCatSubcat
    {
        public string District_Name { get; set; }
        public string Category_Name { get; set; }
        public string Sub_category_Name { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }
    
    public class PressReleaseSummmaryReportDistLookupCategory
    {
        public string District_Name { get; set; }
        public string Lookup_Category { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }
    
    public class PressReleaseSummmaryReportDepartmentDistrict
    {
        public string Department_Name { get; set; }
        public string District_Name { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }

    public class PressReleaseSummmaryReportVIPDistrict
    {
        public string VIP_Person { get; set; }
        public string District_Name { get; set; }
        public string Category_Name { get; set; }
        public string Sub_category_Name { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }
    
    public class PressReleaseSummmaryReportVIPDeptDist
    {
        public string VIP_Person { get; set; }
        public string Department_Name { get; set; }
        public string District_Name { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }

    public class PressReleaseSummaryReportUserDate
    {
        public string Name { get; set; }
        public string User_Type { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<int> Total_Entries { get; set; }
        public int Total_Records { get; set; }
    }

    public class PressReleaseReportFilterModel: IndexModel
    {
        public string DepartmentCode { get; set; }
        public string DistrictCode { get; set; }
        public string VIPCategoryCode { get; set; }
        public string VIPPersonCode { get; set; }
        public int? CategoryCode { get; set; }
        public int? SubCategoryCode { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? Status { get; set; }
        public long Id { get; set; }
        public long DIPR_Id { get; set; }
        public string PressReleaseFromDate { get; set; }
        public string PressReleaseToDate { get; set; }
        public int? ModifiedBy { get; set; }
    }
}
