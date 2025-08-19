using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class OrderSubTypeMasterModel
    {

        public int Id { get; set; }
        public Nullable<int> Code { get; set; }

		[Display(Name = "Type")]
		[Required(ErrorMessage = "{0} is Required!")]
		public Nullable<long> TypeCode { get; set; }


        [Display(Name = "Department")]
        [Required(ErrorMessage = "{0} is Required!")]
        public Nullable<int> DepartmentCode { get; set; }

        [Display(Name = "Name")]
		[Required(ErrorMessage = "{0} is Required!")]
		public string Name { get; set; }

        public string NameHindi { get; set; }
		public Nullable<bool> IsActive { get; set; } = true;
		public Nullable<bool> IsDelete { get; set; } = false;
		public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
		public Nullable<bool> IsApplicableToAllDPT { get; set; } = false;

	}
    public class OrderSubTypeMasterViewModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }
        public Nullable<int> CreatedBy { get; set; }
		public string CreatedByName { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
    }
}
