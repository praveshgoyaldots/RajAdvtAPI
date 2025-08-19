using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class AdvApprovalDetailMasterModel
	{
		public long Id { get; set; }
		public long Code { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public string Email { get; set; }
		public string MobileNo { get; set; }
		public string DefaultMobileNo { get; set; }
		public string DefaultEmail { get; set; }
		public decimal? NotificationPeriod { get; set; }
		public bool? IsActive { get; set; } = true;
		public bool? IsDelete { get; set; } = false;
		public DateTime? CreatedDate { get; set; }
		public int? CreatedBy { get; set; }
		public DateTime? ModifiedDate { get; set; }
		public int? ModifiedBy { get; set; }
	}

	public class AdvApprovalDetailMasterViewModel
	{
		public long Id { get; set; }		
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public string Email { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDelete { get; set; }
	}
}
