namespace CMOWebApi.Core.Enums
{
    public class AdvUserTypeEnum
    {
        public enum UserType
        {
            [StringValue("PlatformUser")]
            PlatformUser= 3,

            [StringValue("AdminDepartment")]
            AdminDepartment = 1,

            [StringValue("Department")]
            Department =2
        }

        public enum AdvNotificationPullPush
        {
            [StringValue("pull Advertisement by service")]
            Pull=46,

            [StringValue("Push Advertisement by service")]
            Push = 47
        }

        }
}
