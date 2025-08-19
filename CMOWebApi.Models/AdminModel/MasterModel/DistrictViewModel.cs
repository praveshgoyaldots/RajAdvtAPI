using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class DistrictViewModel
	{
		public int? DistrictId { get; set; }
		public int? DistrictCode { get; set; }
		public string DistrictTitle { get; set; }
		public string DistrictTitleHindi { get; set; }
		public string DistrictShortTitle { get; set; }
		public string DistrictShortTitleHindi { get; set; }
		public int? District_DivisionCode { get; set; }
		public int? District_StateCode { get; set; }
		public bool? DistrictIsActive { get; set; }
		public bool? DistrictIsDeleted { get; set; }
		public string DISTRICT_ID_TEXT { get; set; }
		public string DISTRICT_Jeelapramukh { get; set; }
		public string DistrictImage { get; set; }
        public Nullable<int> NewDistrictCode { get; set; }
    }
}
