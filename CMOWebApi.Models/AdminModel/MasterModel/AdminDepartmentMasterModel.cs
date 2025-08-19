using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class AdminDepartmentMasterModel
	{
		public int AdmDepartmentId { get; set; }
		public int AdmDepartmentCode { get; set; }
		[Display(Name = "Admin Department Name")]
		[Required(ErrorMessage = "{0} is Required!")]
		public string AdmDepartmentTitle { get; set; }
		public string AdmDepartmentTitleHindi { get; set; }
		public string AdmDepartmentShortTitle { get; set; }
		public string AdmDepartmentShortTitleHindi { get; set; }
		public bool AdmDepartmentIsActive { get; set; } = true;
		public bool AdmDepartmentIsDeleted { get; set; } = false;
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
	}
	public class AdminDepartmentMasterViewModel
	{
		public int AdmDepartmentId { get; set; }
		public string AdmDepartmentTitle { get; set; }
		public string AdmDepartmentTitleHindi { get; set; }
		public bool AdmDepartmentIsActive { get; set; }
		public bool AdmDepartmentIsDeleted { get; set; }
	}
}
