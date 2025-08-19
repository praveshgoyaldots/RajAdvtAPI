using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class HelpDocumentTypeMasterModel
	{
		public long Id { get; set; }
		public Nullable<long> Code { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public Nullable<bool> IsActive { get; set; } = true;
		public Nullable<bool> IsDelete { get; set; } = false;
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
		public string SSOID { get; set; }
		public Nullable<bool> IsShowInWebServiceMaster { get; set; }

	}
}
