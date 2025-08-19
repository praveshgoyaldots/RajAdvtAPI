using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public  class DepartmentSetupModel
    {
        public long Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string Address1 { get; set; }
        public string AddressHindi1 { get; set; }
        public string Address2 { get; set; }
        public string AddressHindi2 { get; set; }
        public string Address3 { get; set; }
        public string AddressHindi3 { get; set; }
        public string FooterLine1 { get; set; }
        public string FooterLineHindi1 { get; set; }
        public string FooterLine2 { get; set; }
        public string FooterLineHindi2 { get; set; }
        public string Logo1 { get; set; }
        public string Logo2 { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public Nullable<int> OfficeCode { get; set; }
        public Nullable<long> FileSize { get; set; }
        public string FacebookUrl { get; set; }
        public string Twitter { get; set; }
        public string Youtube { get; set; }
        public string Backgroundcolor { get; set; }
        public Nullable<bool> IsAutoEmail { get; set; }
        public Nullable<bool> IsAutoSMS { get; set; }
        public string SerialNumber { get; set; }
    }

    public class DepartmentSetupViewModel
    {
        public long Id { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string FooterLine1 { get; set; }
        public string FooterLine2 { get; set; }
        public string DepartmentTitle { get; set; }
        public string OfficeName { get; set; }
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDeleted { get; set; }
	}

    public class DepartmentSetupCancellationModel
    {
        public Nullable<bool> IsAutoEmail { get; set; }
        public Nullable<bool> IsAutoSMS { get; set; }
    }

}
