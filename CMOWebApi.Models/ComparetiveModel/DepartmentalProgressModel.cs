using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.ComparetiveModel
{
    public class DepartmentalProgressModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public int DepartmentCode { get; set; }
        public int YearCode { get; set; }
        public long MonthCode { get; set; }
        public Nullable<int> KPICategoryCode { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<long> ParameterCategoryCode { get; set; }
        public List<DepartmentalProgressParameterMappingModel> DepartmentalProgressParameterMappingModel { get; set; }
    }

    public class DepartmentalProgressParameterMappingModel
    {
        public long Id { get; set; }
        public Nullable<int> CurrentGovtEntryId { get; set; }
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
        public Nullable<decimal> PhysicalTargetValue { get; set; }
        public Nullable<decimal> FinancialTargetValue { get; set; }
        public Nullable<decimal> FinancialCumulativeValue { get; set; }
        public Nullable<decimal> PhysicalCumulativeValue { get; set; }
    }

    public class DepartmentalProgressListViewModel
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
        public string MonthName { get; set; }
    }

    #region Web Service

    public class DepartmentalProgressWebServiceModel
    {
        public int Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> YearCode { get; set; }
        public Nullable<int> MonthCode { get; set; }
        public Nullable<long> ParameterCode { get; set; }
        public string PhysicalValue { get; set; }
        public string FinancialValue { get; set; }
        public Nullable<int> PhysicalTargetValue { get; set; }
        public Nullable<int> FinancialTargetValue { get; set; }
        public Nullable<int> PendingValue { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; } = DateTime.Now;
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }= DateTime.Now;
        public Nullable<int> ModifiedBy { get; set; }
        public long ModuleId { get; set; }
    }

    #endregion

}
