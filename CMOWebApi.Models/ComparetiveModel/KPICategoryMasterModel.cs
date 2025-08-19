using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.ComparetiveModel
{
	public class KPICategoryMasterModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public Nullable<bool> IsDepartment { get; set; }
		public Nullable<bool> IsDistrict { get; set; }
		public bool IsActive { get; set; } = true;
		public bool IsDelete { get; set; } = false;
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<bool> IsAplicableToAllDpt { get; set; } = false;
		public Nullable<int> DisplayOrder { get; set; }

	}

    public class KPICategoryMasterViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<bool> IsDepartment { get; set; }
        public Nullable<bool> IsDistrict { get; set; }
        public bool IsActive { get; set; }
        public Nullable<bool> IsAplicableToAllDpt { get; set; }
        public string DepartmentTitle { get; set; }
    }
}
