namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class TehsilViewModel
	{
		public int? TehsilId { get; set; }
		public int? TehsilCode { get; set; }
		public string TehsilTitle { get; set; }
		public string TehsilTitleHindi { get; set; }
		public string TehsilShortTitle { get; set; }
		public string TehsilShortTitleHindi { get; set; }
		public int? Tehsil_DistrictCode { get; set; }
		public bool? TehsilIsActive { get; set; }
		public bool? TehsilIsDeleted { get; set; }
	}
}
