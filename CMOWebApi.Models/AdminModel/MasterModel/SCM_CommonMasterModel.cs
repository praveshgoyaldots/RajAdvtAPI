using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
	public class SCM_CommonMasterModel
	{
		public long Id { get; set; }
		public long? Code { get; set; }
		public string Name { get; set; }
		public string NameHindi { get; set; }
		public long? SchemeTypeCode { get; set; }
		public DateTime? CreatedDate { get; set; }
		public int? CreatedBy { get; set; }
		public DateTime? ModifiedDate { get; set; }
		public int? ModifiedBy { get; set; }
		public bool? IsActive { get; set; } = true;
		public bool? IsDeleted { get; set; } = false;
		public string SchemeTypeName { get; set; }
		public string SchemeTypeNameHindi { get; set; }
		public Nullable<System.DateTime> orderByColumn { get; set; }
	}
}
