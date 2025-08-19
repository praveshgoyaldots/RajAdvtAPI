using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class DesignationMasterModel
	{
		public int DesignationId { get; set; }
		public int DesignationCode { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public string Code { get; set; }
		public string Level { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public bool IsActive { get; set; } = true;
		public bool IsDelete { get; set; } = false;
		public Nullable<bool> IsShowOnDepartmentContactDetails { get; set; }
		public Nullable<int> DisplayOrder { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsMLA { get; set; } = false;
    }

	public class DesignationMasterViewModel
	{
		public int DesignationId { get; set; }
		public int DesignationCode { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public string Code { get; set; }
		public string Level { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public bool IsActive { get; set; }
		public bool IsDelete { get; set; }
		public Nullable<bool> IsShowOnDepartmentContactDetails { get; set; }
		public Nullable<int> DisplayOrder { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsMLA { get; set; }
    }
}
