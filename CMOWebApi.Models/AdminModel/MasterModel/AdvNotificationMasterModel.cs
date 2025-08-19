using System;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class AdvNotificationMasterModel
	{
		public long Id { get; set; }
		public long Code { get; set; }

        [Required(ErrorMessage = "Type is required")]
        public long? Type { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
		public string NameHindi { get; set; }
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
		public string MobileNo { get; set; }
        [Required(ErrorMessage = "Mapping(Platform/Admin Department/Department) is required")]
        public long? MappingCode { get; set; }
        public string PortalURL { get; set; }
        [Required(ErrorMessage = "Notification period is required")]
        public decimal? NotificationPeriod { get; set; }
        public string AttachmentPath { get; set; }
       // public decimal? IsPullOrPushCode { get; set; }
        public Nullable<int> IsPullOrPushCode { get; set; }
        public string PullUserId { get; set; }
        public string PullPassword { get; set; }
        public string PushURL { get; set; }
        public string PushUserId { get; set; }
        public string PushPassword { get; set; }
        public long? ParentCode { get; set; }
		public bool? IsApprove { get; set; }
		public bool? IsActive { get; set; }
		public bool? IsDelete { get; set; }
		public DateTime? CreatedDate { get; set; }
		public int? CreatedBy { get; set; }
		public DateTime? ModifiedDate { get; set; }
		public int? ModifiedBy { get; set; }
        public string SSOId { get; set; }

    }

	public class AdvNotificationMasterViewModel
	{
		public long? Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string MobileNo { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDelete { get; set; }
	}
}
