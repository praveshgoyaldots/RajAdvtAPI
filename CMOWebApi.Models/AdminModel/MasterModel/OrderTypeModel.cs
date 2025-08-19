using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class OrderTypeModel
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public bool IsActive { get; set; } = true;
		public bool IsDelete { get; set; } = false;
		public Nullable<long> Code { get; set; }
		public string ShortName { get; set; }
		public Nullable<bool> IsSystemGenerated { get; set; }
		public string ReportOrderType { get; set; }
		public Nullable<bool> IsDateMandatory { get; set; }
		public Nullable<int> IsDocumentNoMandatory { get; set; }
		public string ImagePath { get; set; }
		public string SubMenuNameHindi { get; set; }
		public string SubMenuNameEnglish { get; set; }
		public Nullable<int> MenuClassificationCode { get; set; }
		public Nullable<int> MenuClassificationPageTypeCode { get; set; }
		public Nullable<long> GeneralDepartmentDistrictMapping { get; set; }
		public List<string> GeneralDepartmentDistrictMappingList { get; set; }
        public Nullable<long> CommonCategoryCode { get; set; }
        public Nullable<bool> IsShowInJankalyan { get; set; }
    }
}
