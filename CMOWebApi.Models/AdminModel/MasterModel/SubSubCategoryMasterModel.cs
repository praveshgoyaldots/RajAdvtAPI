using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class SubSubCategoryMasterModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public Nullable<int> SubCategoryCode { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
		public Nullable<bool> IsApplicableToAll { get; set; } = false;
	}

    public class SubSubCategoryMasterViewModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public Nullable<int> SubCategoryCode { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string CreatedByName { get; set; }
		public Nullable<bool> IsApplicableToAll { get; set; }
		public Nullable<int> TotalProjectsAdded { get; set; }
	}

}
