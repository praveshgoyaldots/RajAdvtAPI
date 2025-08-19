using System;

namespace CMOWebApi.Models.VCModel
{
    public class GraphicalReportByDistrictModel
    {
        public Nullable<int> DistrictCode { get; set; }
        public string DistrictTitle { get; set; }
        public Nullable<int> ParticipantCountByDistrict { get; set; }
    }

    public class GraphicalReportByLocationModel
    {
        public string locationName { get; set; }
        public Nullable<long> LocationCode { get; set; }
        public Nullable<int> ParticipantCountByLocation { get; set; }
    }

    public class VCGLocationFilterModel
    {
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<long> VCCreateCode { get; set; }
    }

    public class VCGParticipantFilterModel
    {
        public Nullable<int> LocationCode { get; set; }
        public Nullable<long> VCCreateCode { get; set; }
    }

    public class GraphicalParticipantReportByLocationModel
    {
        public long Id { get; set; }
        public Nullable<long> VCCreateCode { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Time { get; set; }
        public string ShortDescription { get; set; }
        public Nullable<System.DateTime> VcCreationDate { get; set; }
        public Nullable<long> ChairPersonCategoryCode { get; set; }
        public string chairpersonCategoryName { get; set; }
        public Nullable<long> ChairPersonCode { get; set; }
        public string chairpersonName { get; set; }
        public Nullable<long> TypeCode { get; set; }
        public string TypeName { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public Nullable<decimal> NoOfHours { get; set; }
        public Nullable<decimal> NoOfMinutes { get; set; }
        public string Designation { get; set; }
        public string ParticipantName { get; set; }
        public Nullable<System.DateTime> ParticipantCreatedDate { get; set; }
        public string locationName { get; set; }
        public Nullable<long> locationCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string DistrictTitle { get; set; }
        public Nullable<long> ModeCode { get; set; }
        public string ModeName { get; set; }
        public string ParticipantCategoryName { get; set; }
        public Nullable<int> ParticipantDisplayOrder { get; set; }
        public Nullable<int> ParticipantCategoryDisplayOrder { get; set; }
    }
}
