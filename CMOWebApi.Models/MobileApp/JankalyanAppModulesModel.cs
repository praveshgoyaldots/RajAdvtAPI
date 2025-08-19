using System;

namespace CMOWebApi.Models.MobileApp
{
    public class JankalyanAppModulesModel
    {
        public string Module { get; set; }
        public string ModuleDisplayName { get; set; }
        public string IconImage { get; set; }
        public int IsCMISModule { get; set; }
    }

    public class DepartmentWiseCountForCMISModel
    {
        public Nullable<int> JanDepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<int> TotalCount { get; set; }
    }

    public class DepartmentStatusWiseCountForCMISModel
    {
        public string DepartmentStatus { get; set; }
        public Nullable<int> TotalCount { get; set; }
    }

    public class CMOStatusWiseCountForCMISModel
    {
        public string CMOStatus { get; set; }
        public Nullable<int> TotalCount { get; set; }
    }

    public class ProjectStatusCountModel
    {
        public long ProjectStatusCode { get; set; }
        public string ProjectStatus { get; set; }
        public Nullable<int> ProjectCount { get; set; }
    }
    public class ProjectDepartmentCountModel
    {
        public int NodalDepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<int> ProjectCount { get; set; }
    }

    public class OptionViewModel
    {
        public int Code { get; set; }
        public string Title { get; set; }
        public Nullable<int> TotalCount { get; set; }
    }
}
