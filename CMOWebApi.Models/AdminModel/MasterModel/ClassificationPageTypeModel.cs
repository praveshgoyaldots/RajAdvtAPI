using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class ClassificationPageTypeModel
	{
		public int Id { get; set; }
        public Nullable<int> PageId { get; set; }
        //public Nullable<int> Code { get; set; }
		public string NameHindi { get; set; }
		public string NameEnglish { get; set; }
		public Nullable<int> DisplayOrder { get; set; }
		public string Remarks { get; set; }
		public string Url { get; set; }
		public bool IsActive { get; set; } = true;
		public bool IsDeleted { get; set; } = false;
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
        public string SampleURl { get; set; }
        public string AttachmentURl { get; set; }
    }

    public class ClassificationPageTypeViewModel
    {
        public int Id { get; set; }
        public Nullable<int> PageId { get; set; }
        public string NameHindi { get; set; }
        public string NameEnglish { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
        public string Remarks { get; set; }
        public string Url { get; set; }
        public string SampleURl { get; set; }
        public string AttachmentURl { get; set; }
        public string Attachment { get; set; }
    }

}
