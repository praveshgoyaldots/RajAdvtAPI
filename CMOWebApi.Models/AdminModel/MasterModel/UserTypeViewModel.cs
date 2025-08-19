namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class UserTypePostModel
    {
        public int? UserTypeId { get; set; }
        public string UserTypeTitle { get; set; }
        public string UserType { get; set; }
		public string ParrentUserType { get; set; }
		public bool IsActive { get; set; }
		public bool IsDelete { get; set; }

	}

    public class UserTypeViewModel
    {
        public int UserTypeId { get; set; }
        public string UserTypeTitle { get; set; }
        public string UserType { get; set; }
        public string ParrentUserType { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }

    }
}
