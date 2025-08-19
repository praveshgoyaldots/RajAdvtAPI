using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class ProjectCategoryMaster
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
		public Nullable<int> TotalProjectsAdded { get; set; }
		public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

    }
}
