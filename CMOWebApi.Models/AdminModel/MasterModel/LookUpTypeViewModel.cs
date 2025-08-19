using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class LookUpTypeViewModel
	{
		public Int64 Id { get; set; }
		public string LookupType { get; set; }
		public bool? IsActive { get; set; } = true;
	}

}
