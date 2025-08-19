using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class ProjectSubCategoryMasterModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string LabelName { get; set; }
        public Nullable<bool> IsNumeric { get; set; }
        public Nullable<int> CategoryCode { get; set; }
    }

    public class ProjectSubCategoryMasterViewModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; }
        public string LabelName { get; set; }
        public Nullable<bool> IsNumeric { get; set; }
        public string CategoryName { get; set; }
		public Nullable<int> TotalProjectsAdded { get; set; }
	}
}
