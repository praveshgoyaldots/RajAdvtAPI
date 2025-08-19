namespace CMOWebApi.Models.AdminModel
{
    public class SettingViewModel
    {
        public int Id { get; set; }
        public string SmtpUser { get; set; }
        public string SmtpPassword { get; set; }
        public string SmtpPort { get; set; }
        public bool EnableSsl { get; set; }
        public string SmtpHost { get; set; }
        public string UserId { get; set; }
        public bool IsMaintainLog { get; set; }
        public bool EnableMigration { get; set; }
        public string User_Profile_Image_Directory { get; set; }
        public string User_Default_Profile_Image { get; set; }
        public bool External_Login { get; set; }
        public string Date_Format { get; set; }
        public string Dynamic_Folder { get; set; }
        public string FacebookAuthentication_AppId { get; set; }
        public string FacebookAuthentication_AppSecret { get; set; }
        public string GoogleAuthentication_ClientId { get; set; }
        public string GoogleAuthentication_ClientSecret { get; set; }

    }
}
