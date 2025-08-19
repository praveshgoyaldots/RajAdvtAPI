using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.ComparetiveModel
{
	public class PreviousGovernmentEntryModel
	{
		public int Id { get; set; }
		public Nullable<int> Code { get; set; }
		public Nullable<int> DepartmentCode { get; set; }
		public Nullable<long> ParameterCode { get; set; }
		public Nullable<int> KPICategoryCode { get; set; }
		public bool IsActive { get; set; }
		public bool IsDeleted { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<int> CreatedBy { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public Nullable<int> ModifiedBy { get; set; }
		public List<PreviousGovernmentEntryParameterMappingModel> PreviousGovernmentEntryParameterMappingModel { get; set; }

	}

	public class PreviousGovernmentEntryParameterMappingModel
	{
		public long Id { get; set; }
		public Nullable<int> PreviousGovtId { get; set; }
		public Nullable<int> YearCode { get; set; }
		public string YearName { get; set; }
		public string PhysicalValue { get; set; }
		public string FinancialValue { get; set; }
	}

	public partial class PreviousGovernmentEntryListModel
	{
		public int Id { get; set; }
		public Nullable<int> Code { get; set; }
		public Nullable<int> DepartmentCode { get; set; }
		public Nullable<int> KPICategoryCode { get; set; }
		public bool IsActive { get; set; }
		public bool IsDeleted { get; set; }
		public string DepartmentTitle { get; set; }
		public string KPICategoryName { get; set; }
		public Nullable<System.DateTime> CreatedDate { get; set; }
		public Nullable<System.DateTime> ModifiedDate { get; set; }
		public string modifiedbyName { get; set; }
		public string PhysicalParameter { get; set; }
	}
}
