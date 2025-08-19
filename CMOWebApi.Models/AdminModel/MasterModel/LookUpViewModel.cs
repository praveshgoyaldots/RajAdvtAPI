using System;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class LookUpViewModel
	{
		public Int64 Id { get; set; }
		public string LookupType { get; set; }

		public string Lookup { get; set; }

		public string Desc { get; set; }

		public bool? IsActive { get; set; } = true;

		public int? lookupTypeId { get; set; }

		public int sortOrder { get; set; }

        public string NameHindi { get; set; }
    }

    public class LookUpFilterModel
    {
        public int lookupTypeId { get; set; }
    }

    public class LookUpListViewModel
	{
        public long Id { get; set; }
        public string lookup { get; set; }
        public Nullable<bool> isActive { get; set; }
        public Nullable<int> lookupTypeId { get; set; }
        public Nullable<int> sortOrder { get; set; }
        public Nullable<bool> IsRef { get; set; }
        public string NameHindi { get; set; }
        public Nullable<System.DateTime> CreatedModifiedDate { get; set; }
        public Nullable<int> CreatedModifiedBy { get; set; }
        public string CreatedModifiedByName { get; set; }
        public string lookupTypeName { get; set; }
        public string desc { get; set; }

    }
}
