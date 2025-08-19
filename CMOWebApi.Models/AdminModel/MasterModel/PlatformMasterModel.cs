using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class PlatformMasterModel
	{
		public long PlatformId { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public bool? IsActive { get; set; } = true;
		public bool? IsDelete { get; set; } = false;
		public DateTime? CreatedDate { get; set; }
		public int? CreatedBy { get; set; }
		public DateTime? ModifiedDate { get; set; }
		public int? ModifiedBy { get; set; }
	}

	public class PlatformMasterViewModel
	{
		public long PlatformId { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDelete { get; set; }
	}
}
