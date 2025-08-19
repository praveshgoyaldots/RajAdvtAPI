using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class ProjectMileStoneMasterModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public string Description { get; set; }
    }
}
