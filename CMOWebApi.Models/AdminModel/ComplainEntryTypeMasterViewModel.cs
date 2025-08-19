using System;

namespace CMOWebApi.Models.AdminModel
{
    public class ComplainEntryTypeMasterViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
    }
    
}
