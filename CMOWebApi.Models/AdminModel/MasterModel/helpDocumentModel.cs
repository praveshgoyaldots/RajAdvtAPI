using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class HelpDocumentModel
    {
        public long Id { get; set; }

        public long TypeCode { get; set; }

        public string Url { get; set; }
		public string BlankDocUrl { get; set; }
		public bool IsImageChange { get; set; }

		public bool IsBlankDocChanges { get; set; }

		public Nullable<bool> IsActive { get; set; } = true;

        public Nullable<bool> IsDelete { get; set; } = false;

        public Nullable<System.DateTime> CreatedDate { get; set; }

        public Nullable<int> CreatedBy { get; set; }

        public Nullable<System.DateTime> ModifiedDate { get; set; }

        public Nullable<int> ModifiedBy { get; set; }
        public string DocumentName { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
    }

    public class HelpDocumentViewModel
    {
        public long Id { get; set; }

        public string TypeName { get; set; }

        public string Url { get; set; }
		public string BlankDocUrl { get; set; }

		public string SSOID { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string modifiedByName { get; set; }
        public string DocumentName { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
    }
}
