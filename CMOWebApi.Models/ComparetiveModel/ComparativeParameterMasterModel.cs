using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.ComparetiveModel
{
	public class ComparativeParameterMasterModel
	{
		public long Id { get; set; }
		public Nullable<int> DepartmentCode { get; set; }
		public Nullable<int> KPICategoryCode { get; set; }
		public string PhysicalParameter { get; set; }
		public string FinancialParameter { get; set; }
		public Nullable<bool> IsPhysical { get; set; }
		public Nullable<long> PhysicalUnitCode { get; set; }
		public Nullable<bool> IsFinancial { get; set; }
		public Nullable<long> FinancialUnitCode { get; set; }
		public Nullable<bool> IsDepartment { get; set; }
		public Nullable<bool> IsDistrict { get; set; }
		public Nullable<bool> IsConnectWithScheme { get; set; }
		public Nullable<long> SchemeCode { get; set; }
		public bool IsActive { get; set; } = true;
		public bool IsDelete { get; set; } = false;
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
        public string Description1 { get; set; }
        public string Description2 { get; set; }
        public Nullable<long> YearGrandTotalCode { get; set; }
        public List<string> BenificiaryList { get; set; }
		public Nullable<bool> IsComparativeReport { get; set; }
		public Nullable<bool> IsEbookletReport { get; set; }
		public Nullable<bool> IsCompilationReport { get; set; }
		public Nullable<bool> IsDistrictParameterReport { get; set; }
		public Nullable<int> DisplayOrder { get; set; }
        public Nullable<long> CategoryCode { get; set; }
        public Nullable<bool> IsWebservice { get; set; } = false;
        public string WebserviceUserName { get; set; }
        public string WebServicePassword { get; set; }
        public string WebserviceURL { get; set; }
        public Nullable<long> TargetBasedCode { get; set; }
        public Nullable<decimal> Weighted { get; set; }
    }

	public class ComparativeParameterMasterViewModel
	{
		public long Id { get; set; }
		public Nullable<long> Code { get; set; }
		public Nullable<int> DepartmentCode { get; set; }
		public Nullable<int> KPICategoryCode { get; set; }
		public string PhysicalParameter { get; set; }
		public string FinancialParameter { get; set; }
		public Nullable<bool> IsPhysical { get; set; }
		public Nullable<long> PhysicalUnitCode { get; set; }
		public Nullable<bool> IsFinancial { get; set; }
		public Nullable<long> FinancialUnitCode { get; set; }
		public Nullable<bool> IsDepartment { get; set; }
		public Nullable<bool> IsDistrict { get; set; }
		public Nullable<bool> IsConnectWithScheme { get; set; }
		public Nullable<long> SchemeCode { get; set; }
		public bool IsActive { get; set; }
		public bool IsDeleted { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
		public string DepartmentTitle { get; set; }
		public string KPICategoryName { get; set; }
		public string SchemeName { get; set; }
        public string Description1 { get; set; }
        public string Description2 { get; set; }
        public Nullable<long> CategoryCode { get; set; }
        public Nullable<bool> IsWebservice { get; set; }
        public string WebserviceUserName { get; set; }
        public string WebServicePassword { get; set; }
        public string WebserviceURL { get; set; }
    }
}
