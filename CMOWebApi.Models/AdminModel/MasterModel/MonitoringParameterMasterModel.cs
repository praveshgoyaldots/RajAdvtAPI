using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class MonitoringParameterMasterModel
    {
        public int Id { get; set; }
        public Nullable<long> Code { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string MappingTableName { get; set; }
        public string Type { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public Nullable<int> DepartmentCode { get; set; }
    }

    public class MonitoringParameterMasterViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string MappingTableName { get; set; }
        public string Type { get; set; }
        public string DepartmentTitle { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDeleted { get; set; }
	}
}
