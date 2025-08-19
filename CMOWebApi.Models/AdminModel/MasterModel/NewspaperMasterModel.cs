using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class NewspaperMasterModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<long> ModeCode { get; set; }
        public Nullable<long> NewsTypeCode { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
    }

    public class NewspaperMasterViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; }
        public string ModeName { get; set; }
        public string NewsTypeName { get; set; }
    }
}
