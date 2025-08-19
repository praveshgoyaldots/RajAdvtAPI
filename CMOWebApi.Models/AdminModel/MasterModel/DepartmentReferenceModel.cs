using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class DepartmentReferenceModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string Reference { get; set; }
        public string ReferenceHindi { get; set; }
        public Nullable<int> OrderBy { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public string Post { get; set; }
        public string MobileNumber1 { get; set; }
        public string MobileNumber2 { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
    }

    public class DepartmentReferenceViewModel
    {
        public long Id { get; set; }
        public string Reference { get; set; }
        public string ReferenceHindi { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<int> OrderBy { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDeleted { get; set; }
	}
}
