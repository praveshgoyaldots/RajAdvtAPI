using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class JankalyanUserLogSummaryReportModel
    {
        public string UserName { get; set; }
        public string SSOID { get; set; }
        public string UserType { get; set; }
        public string UserTypeTitle { get; set; }
        public Nullable<int> ViewCount { get; set; }
        public string DepartmentNames { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }

    public class JankalyanUserLogDetailReportModel
    {
        public string UserName { get; set; }
        public string SSOID { get; set; }
        public Nullable<System.DateTime> LoginTime { get; set; }
        public string IPAddress { get; set; }
        public string UserType { get; set; }
        public string UserTypeTitle { get; set; }
        public string DepartmentNames { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }

    public class JankalyanLogSearchModel
    {
        public int DepartmentCode { get; set; }
        public int OfficeCode { get; set; }
        public int District { get; set; }
        public string UserType { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
        public string CustomSearch { get; set; }
    }

}
