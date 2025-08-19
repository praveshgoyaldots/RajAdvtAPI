namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class NewsClassificationMasterModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
    }
}
