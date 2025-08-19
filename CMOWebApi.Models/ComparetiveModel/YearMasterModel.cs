using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.ComparetiveModel
{
	public class YearMasterModel
	{
		public int Id { get; set; }
		public Nullable<int> Code { get; set; }
		public string YearName { get; set; }
		public string Remarks { get; set; }
		public Nullable<bool> IsCurrentGovernment { get; set; }
		public Nullable<int> OrderBy { get; set; }
		public bool IsActive { get; set; } = true;
		public bool IsDeleted { get; set; } = false;
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }

	}
}
