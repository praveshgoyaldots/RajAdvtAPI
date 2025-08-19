using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.VCModel
{

    public class VCParticipantModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<long> VCCreateCode { get; set; }
        public Nullable<long> ParticipantCategoryCode { get; set; }
        public Nullable<long> ParticipantCode { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<long> LocationCode { get; set; }
        public string LocationTextBox { get; set; }
        public Nullable<long> ModeCode { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public List<string> ParticipantCodeList { get; set; }
		public string MobileNo { get; set; }
        public Nullable<bool> IsPresent { get; set; } = true;
    }

    public class VCParticipantViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string LocationTextBox { get; set; }
        public string Designation { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string DistrictTitle { get; set; }
        public string ModeName { get; set; }
        public string LocationName { get; set; }
        public string ParticipantCategoryEnglish { get; set; }
        public string VcCreationTitle { get; set; }
        public Nullable<bool> IsPresent { get; set; }
    }

	public class VCParticipantReportViewModel
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
        public string participantName { get; set; }
        public Nullable<System.DateTime> participantCreatedDate { get; set; }
        public string locationName { get; set; }
        public Nullable<long> locationCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string DistrictTitle { get; set; }
        public Nullable<long> ModeCode { get; set; }
        public string ModeName { get; set; }
        public string ParticipantCategoryName { get; set; }
        public string MobileNo { get; set; }
        public Nullable<bool> IsPresent { get; set; }
    }

		public class VCCreationDDLModel
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
		public Nullable<bool> IsActive { get; set; }
		public Nullable<bool> IsDelete { get; set; }
		public Nullable<long> ChairPersonCategoryCode { get; set; }
		public Nullable<long> ChairPersonCode { get; set; }
		public Nullable<long> TypeCode { get; set; }
		public string StartTime { get; set; }
		public string EndTime { get; set; }
		public Nullable<decimal> NoOfHours { get; set; }
		public Nullable<decimal> NoOfMinutes { get; set; }
		public string MeetingParticipant { get; set; }
		public string chairPersoncategoryName { get; set; }
		public string chairPersonName { get; set; }
	}

    public partial class VCParticipantDDLModel
    {
        public Nullable<long> Code { get; set; }
        public Nullable<long> ParticipantCategoryId { get; set; }
        public string DesignationHindi { get; set; }
        public string DesignationEnglish { get; set; }
        public string NameHindi { get; set; }
        public string NameEnglish { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
    }

    public class VCCustomFilter
    {
		public Nullable<long> VcCode { get; set; }
		public Nullable<long> TypeCode { get; set; }
		public DateTime? Date { get; set; }
        public string VCDate { get; set; }
        public Nullable<long> ChairPersonCategoryCode { get; set; }
		public Nullable<long> ChairPersonCode { get; set; }
		public Nullable<long> DistrictCode { get; set; }
		public Nullable<long> locationCode { get; set; }
        public bool IsAllVC { get; set; }
        public int IsPresent { get; set; }
        public int IsOrderByDLPCorPCDL { get; set; }
        public long ParticipantCategoryCode { get; set; }
    }

    #region Bulk upload
    public class ParticipantTempBulkViewModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<long> VCCreateCode { get; set; }
        public Nullable<long> ParticipantCategoryCode { get; set; }
        public Nullable<long> ParticipantCode { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<long> LocationCode { get; set; }
        public string LocationTextBox { get; set; }
        public Nullable<long> ModeCode { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string MobileNo { get; set; }
        public string DistrictTitle { get; set; }
        public string NameEnglish { get; set; }
        public string DesignationEnglish { get; set; }
        public string ModeName { get; set; }
        public string LocationName { get; set; }
        public string ParticipantCategoryEnglish { get; set; }
        public string VcCreationTitle { get; set; }
    }

    public class ParticipantTempBulkModel
    {
        public Nullable<long> LocationCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<long> VCCreateCode { get; set; }
    }

    #endregion
}
