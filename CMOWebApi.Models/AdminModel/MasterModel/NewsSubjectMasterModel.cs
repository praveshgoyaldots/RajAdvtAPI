using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class NewsSubjectMasterModel
    {
        public int Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public Nullable<bool> IsSubjectVisibleToAllDepartment { get; set; } = false;
    }

    public partial class NewsSubjectMasterViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<bool> IsSubjectVisibleToAllDepartment { get; set; }
    }
}
