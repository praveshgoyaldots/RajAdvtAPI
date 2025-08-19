using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class MonitoringParameterLookupModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string TypeCode { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }

    }

    public class MonitoringParameterLookupTypeModel
    {
        public long Id { get; set; }
        public string LookupTypeCode { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
    }

    public class MonitoringParameterLookupViewModel
    {
        public string lookuptypeName { get; set; }
        public string lookuptypeNameinHindi { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string TypeCode { get; set; }
        public long Id { get; set; }
    }
}
