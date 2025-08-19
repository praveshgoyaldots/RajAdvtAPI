using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class SCM_OutputMasterModel
	{
		public long? Id { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public bool? IsActive { get; set; } = true;
		public bool? IsDeleted { get; set; } = false;
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
	}
}
