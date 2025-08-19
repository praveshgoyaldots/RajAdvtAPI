using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class ProjectSchemeCategoryMasterModel
    {
        public int Id { get; set; }
        public Nullable<int> NodalDepartmentCode { get; set; }
        public Nullable<long> ProgramSchemeTypeCode { get; set; }
        public string ProgramSchemeName { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
    }

    public class ProjectSchemeCategoryMasterViewModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public Nullable<int> NodalDepartmentCode { get; set; }
        public Nullable<long> ProgramSchemeTypeCode { get; set; }
        public string ProgramSchemeName { get; set; }
        public bool IsActive { get; set; }
        public string DepartmentTitle { get; set; }
        public string ProgramSchemeTypeName { get; set; }
		public Nullable<int> TotalProjectsAdded { get; set; }
	}
}
