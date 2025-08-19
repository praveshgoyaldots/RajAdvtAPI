using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class JankalyanEntryMasterModel
	{
		public int Id { get; set; }
		public Nullable<int> Code { get; set; }
		[Display(Name = "Name")]
		[Required(ErrorMessage = "{0} is Required!")]
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public Nullable<int> DisplayOrder { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
		public Nullable<bool> IsActive { get; set; } = true;
		public Nullable<bool> IsDeleted { get; set; } = false;
		[Display(Name = "Jankalyan Category")]
		[Required(ErrorMessage = "{0} is Required!")]
		public Nullable<int> JankalyanCategoryCode { get; set; }

		public Nullable<int> MenuClassificationCode { get; set; }
		public Nullable<int> MenuClassificationPageTypeCode { get; set; }
        public List<string> GeneralDepartmentDistrictMappingList { get; set; }
        public Nullable<long> GeneralDepartmentDistrictMapping { get; set; }
        public string SubMenuNameHindi { get; set; }
        public string SubMenuNameEnglish { get; set; }

    }

	public class JankalyanEntryMasterViewModel
	{
		public int Id { get; set; }
		public Nullable<int> Code { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public Nullable<int> DisplayOrder { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDeleted { get; set; }
		public Nullable<int> JankalyanCategoryCode { get; set; }
		public string CategoryName { get; set; }
		public string CategoryNameHindi { get; set; }

		public Nullable<int> MenuClassificationCode { get; set; }
		public Nullable<int> MenuClassificationPageTypeCode { get; set; }
        public string ClassificationPageTypeName { get; set; }
        public string MenuClassificationName { get; set; }
        public List<string> GeneralDepartmentDistrictMappingList { get; set; }
        public Nullable<long> GeneralDepartmentDistrictMapping { get; set; }
        public string SubMenuNameHindi { get; set; }
        public string SubMenuNameEnglish { get; set; }

        public string CreatedByName { get; set; }
        public string ModifiedByName { get; set; }

    }
}
