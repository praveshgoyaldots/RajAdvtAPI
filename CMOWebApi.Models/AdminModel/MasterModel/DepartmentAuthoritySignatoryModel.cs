using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public  class DepartmentAuthoritySignatoryModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string Designation { get; set; }
        public string DesignationHindi { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
    }

    public class DepartmentAuthoritySignatoryViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string DepartmentTitle { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDeleted { get; set; }
	}
}
