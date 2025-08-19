namespace CMOWebApi.Core.Enums
{
	public class NotificationTemplatesTypeEnum
	{
		public enum TemplatesTypeEnum
		{
			[StringValue("Admin Notification for add Department And admin department in notification table")]
			AdminNotificationToAddUserForNotification = 1,

			[StringValue("Platform Notification")]
			PlatformNotification = 2,

			[StringValue("Admin Department Notification")]
			AdminDepartmentNotification = 3,

			[StringValue("Department Notification")]
			DepartmentNotification = 4,

			[StringValue("Admin Department/Department Notification")]
			AdminDepartmentDepartmentNotification = 5,

			[StringValue("Non Approve Platform Notification")]
			NonApprovePlatformNotification = 6,

			[StringValue("Mail for admin to Approve Redesign")]
			MailForAdminToApproveRedesign = 7,

			[StringValue("Mail for User regarding Redesign Approve")]
			MailForUserRegardingRedesignApprove = 8,

			[StringValue("Mail to CC Referency about Order")]
			MailtoCCReferencyaboutOrder = 11,

			[StringValue("OTP Content")]
			OTPContent = 12,

			[StringValue("Order Cancellation Mail to CC Referency")]
			OrderCancellation = 13
		}

		public enum MessageTypeEnum
		{
			[StringValue("Email Type")]
			EmailType = 1,
			[StringValue("Sms Type")]
			SmsType = 2
		}

        public enum NotificationModuleNameEnum
        {
            [StringValue("Order Generation Notification")]
            OrderGenerationNotification = 1
        }
    }
}
