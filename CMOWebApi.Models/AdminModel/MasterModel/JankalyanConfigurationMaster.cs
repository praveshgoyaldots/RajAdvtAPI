using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class JankalyanConfigurationMasterModel
    {
        public int Id { get; set; }
        public Nullable<bool> IsDIPR_IdMandatory { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
    }
}
