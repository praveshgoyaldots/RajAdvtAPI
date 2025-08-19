using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.ComparetiveModel
{
	public class ComparativeTargetEntryModel
	{

		public int Id { get; set; }
		public Nullable<int> Code { get; set; }
		public Nullable<int> DepartmentCode { get; set; }
		public Nullable<int> YearCode { get; set; }
		public Nullable<int> KPICategoryCode { get; set; }
		public bool IsActive { get; set; }
		public bool IsDeleted { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
		public List<ComparativeParameterTargetParameterMappingModel> ComparativeParameterTargetParameterMappingModel { get; set; }
	}

	public class ComparativeParameterTargetParameterMappingModel
	{
		public long Id { get; set; }
		public Nullable<int> ComparativeParameterTargetId { get; set; }
		public Nullable<long> ParameterCode { get; set; }
        public string PhysicalParameter { get; set; }
        public string FinancialParameter { get; set; }
        public string physicalUnitName { get; set; }
        public string FinancialUnitName { get; set; }
        public string PhysicalValue { get; set; }
		public string FinancialValue { get; set; }
        public Nullable<bool> IsFinancial { get; set; }
        public Nullable<bool> IsPhysical { get; set; }
		public string KPICategoryName { get; set; }
		public Nullable<int> KPICategoryCode { get; set; }
	}

	public class ComparativeParameterTargetViewModel
	{
		public int Id { get; set; }
		public Nullable<int> Code { get; set; }
		public Nullable<int> DepartmentCode { get; set; }
		public Nullable<int> KPICategoryCode { get; set; }
		public bool IsActive { get; set; }
		public bool IsDeleted { get; set; }
		public string DepartmentTitle { get; set; }
		public string KPICategoryName { get; set; }
		public string YearName { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public string modifiedbyName { get; set; }
	}

	public class ComparativeTargetParmeterListModel
	{
        public long ParameterMappingId { get; set; }
        public string PhysicalValue { get; set; }
        public string FinancialValue { get; set; }
        public Nullable<long> ParameterCode { get; set; }
		public string PhysicalParameter { get; set; }
		public string FinancialParameter { get; set; }
		public string DepartmentTitle { get; set; }
		public string KPICategoryName { get; set; }
		public string physicalUnitName { get; set; }
		public string FinancialUnitName { get; set; }
        public Nullable<bool> IsFinancial { get; set; }
        public Nullable<bool> IsPhysical { get; set; }
    }
}
