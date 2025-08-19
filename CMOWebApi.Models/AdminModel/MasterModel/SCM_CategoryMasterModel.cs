namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class SCM_CategoryMasterModel
	{
		public long? Id { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
        public bool? IsActive { get; set; } = true;
        public bool? IsDelete { get; set; } = false;
	}
}
