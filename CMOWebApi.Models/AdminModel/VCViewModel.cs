using CMOWebApi.Models.GeneralModel;
using System;

namespace CMOWebApi.Models.AdminModel
{
    public class VCCreationModel
        {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Time { get; set; }
        public string ShortDescription { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }

		public Nullable<bool> IsActive { get; set; } = true;
		public Nullable<bool> IsDelete { get; set; } = false;
		        public Nullable<long> ChairPersonCategoryCode { get; set; }
        public Nullable<long> ChairPersonCode { get; set; }
        public Nullable<long> TypeCode { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public Nullable<decimal> NoOfHours { get; set; }
        public Nullable<decimal> NoOfMinutes { get; set; }
        public string MeetingParticipant { get; set; }
        public Nullable<long> VCCategoryCode { get; set; }
        public Nullable<int> DepartmentCode { get; set; }

    }

    public class VCCreationViewModel
    {
        public long Id { get; set; }
		public Nullable<long> Code { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		public Nullable<System.DateTime> Date { get; set; }
        public string Time { get; set; }
        public string ChairPersonCategoryName { get; set; }
        public string ChairPersonName { get; set; }
        public string TypeName { get; set; }
		public string StartTime { get; set; }
		public string EndTime { get; set; }
        public string VCCategoryName { get; set; }
        public string DepartmentTitle { get; set; }
    }

    public class VCReportModel
    {
        public Nullable<long> Code { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Time { get; set; }
        public string ShortDescription { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string NoOfHours { get; set; }
        public string NoOfMinutes { get; set; }
        public string ChairPersonCategoryName { get; set; }
        public string ChairPersonName { get; set; }
        public string TypeName { get; set; }
        public string VCCategoryName { get; set; }
        public string DepartmentTitle { get; set; }
    }

    public class VCSearchModel:IndexModel
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public Nullable<long> ChairPersonCategoryCode { get; set; }
        public Nullable<long> ChairPersonCode { get; set; }
        public Nullable<long> TypeCode { get; set; }
    }

    public class VCReportSearchModel : IndexModel
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public Nullable<long> ChairPersonCategoryCode { get; set; }
        public Nullable<long> ChairPersonCode { get; set; }
        public int OrderByDateDptVCCat { get; set; }
    }

    public class CategoryAndDptWiseSummaryVCReportFilterModel 
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public Nullable<long> ChairPersonCategoryCode { get; set; }
        public Nullable<long> ChairPersonCode { get; set; }
        public long Type { get; set; }
        public string VCCategoryCodes { get; set; }
        public int OrderByDptOrVCCat { get; set; }
    }

    public partial class CatDptWiseSummaryReportModel
    {
        public string VCCategoryName { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<long> VCCategoryCode { get; set; }
        public Nullable<int> VCCount { get; set; }
        public string VCDates { get; set; }
    }

    public partial class AdminDptCatWiseSummaryReportModel
    {
        public Nullable<int> VCCount { get; set; }
        public string AdmDepartmentTitle { get; set; }
        public string VCCategoryName { get; set; }
        public string DepartmentTitle { get; set; }
    }
    public partial class ReportSummeryViewModel
    {
        public long Id { get; set; }
        public string ChairPersonCategoryName { get; set; }
        public string ChairPersonName { get; set; }
        public Nullable<long> ChairPersonCode { get; set; }
        public Nullable<int> VCCount { get; set; }
        public Nullable<decimal> NoOfHours { get; set; }
        public Nullable<decimal> NoOfMinutes { get; set; }
        public Nullable<decimal> TotalTimeInHours { get; set; }
        public Nullable<decimal> TotalTimeInMinutes { get; set; }
        public Nullable<int> Participant_Count { get; set; }
    }
    public class ReportSummerySearchModel
    {
        public Nullable<long> ChairPersonCategoryCode { get; set; }
        public Nullable<long> ChairPersonCode { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }

    public class ChairpersonSummeryReportSearchModel
    {
        public Nullable<long> ChairPersonCategoryCode { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }

    public partial class ChairPersonCategorySummaryReportModel
    {
        public Nullable<long> ChairPersonCategoryCode { get; set; }
        public string ChairPersonCategoryName { get; set; }
        public Nullable<int> VCCount { get; set; }
        public decimal NoOfHours { get; set; }
        public decimal NoOfMinutes { get; set; }
        public decimal TotalTimeInHours { get; set; }
        public decimal TotalTimeInMinutes { get; set; }
        public int CategoryDisplayOrder { get; set; }
        public int Participant_Count { get; set; }
    }

    public  class ParticipantByDistrictReportModel
    {
        public Nullable<long> VCCode { get; set; }
    }

    public class ParticipantCountByDistrictReportModel
    {
        public Nullable<int> ParticipantCount { get; set; }
        public int DistrictCode { get; set; }
        public string DistrictTitle { get; set; }
    }

    public class ExcelFileViewModel
    {
        public string BlankDocUrl { get; set; }

    }
}
