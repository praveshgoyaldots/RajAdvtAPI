
using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel
{
    public class SchemeModel
	{
		public long Id { get; set; }
        public Nullable<int> PageType { get; set; }
        public string ShortNameHindi { get; set; }
		public string NameHindi { get; set; }
		public string ShortNameEnglish { get; set; }

		[Required(ErrorMessage = "Please enter name in english")]
		public string NameEnglish { get; set; }
		public string Description { get; set; }
		public long? TypeCode { get; set; }
		public long? OwnedBy { get; set; }
		public decimal? OwnedBySate { get; set; }
		public decimal? OwnedByCenter { get; set; }
		public long? IsListedRGDPSAct { get; set; }
		public decimal? DeliveryTimeInDays { get; set; }
		public long? DesignatedOfficerReceivingDetailCode { get; set; }
		public long? FirstAppeallateCode { get; set; }
		public long? SecondAppeallateCode { get; set; }
		public long? ApplyForScheme { get; set; }
		public decimal? TimeOfValidationInMonth { get; set; }
		public long? ExpiredOn { get; set; }
		public DateTime? ExpriedOnDate { get; set; }
		public decimal? ExpriedDurationInMonth { get; set; }

		[Required(ErrorMessage = "Please enter mode of appling")]
		public long? MadeOfAppling { get; set; }
		public long? MadeOfApplingOnlineBoth { get; set; }
		public string DepartmentWebsiteUrl { get; set; }

		[Required(ErrorMessage = "Please enter serive fee")]
		public long? IsServiceFees { get; set; }
		public long? HowToPayFeeCode { get; set; }
		public string HelplineNo { get; set; }

		[Required(ErrorMessage = "Please enter scheme/service deliverable")]
		public long? DelivarebleCode { get; set; }

		[Required(ErrorMessage = "Please enter delivery payment detail")]
		public string deliveryPaymentDetail { get; set; }

		[Required(ErrorMessage = "Please enter mode of disbursment ")]
		public List<string> ModeOfDisbursmentList { get; set; } // after 22-07-2020 mode of disburstment field it will multi select.
		public string ModeOfDisbursment { get; set; }

		[Required(ErrorMessage = "Please enter payment disbursement frequency")]
		public long? PaymentDisbursmentFrequency { get; set; }
		public long? PaymentDisbursmentFrequencyInstallments { get; set; }
		public string PaymentDisbursmentFrequencyTillAPeriod { get; set; }
		public string ItemDetails { get; set; }
		public DateTime? CreatedDate { get; set; }
		public int? CreatedBy { get; set; }
		public DateTime? ModifiedDate { get; set; }
		public int? ModifiedBy { get; set; }
		public long? Code { get; set; }
		public decimal? ServiceFeeAmount { get; set; }
		public bool? IsActive { get; set; } = false;
		public bool? IsDeleted { get; set; } = false;
		public string Scheme_URL { get; set; }

		[Required(ErrorMessage = "Please enter scheme/service program area")]
		public List<string> programAreas { get; set; }

		[Required(ErrorMessage = "Please enter caste category")]
		public List<string> CasteCategory { get; set; }

		[Required(ErrorMessage = "Please enter beneficiary category")]
		public List<string> BeneficiaryCategory { get; set; }
        public List<string> District { get; set; }
        public List<string> Type { get; set; }
        public List<string> ModeOfDelivery { get; set; }

		public List<EligibilityCriteriaModel> EligibilityCriteria { get; set; }

		public List<EntryLookUpModel> EntryLookUp { get; set; }
		public List<RequiredDocumentModel> RequiredDocument { get; set; }
        public List<GetBeneficiaryLookupModel> GetBeneficiaryLookup { get; set; }
        
        public List<OtherDocumentModel> OtherDocument { get; set; }

        public string SearchKeyWordOfDetails { get; set; }
        public string SearchKeyWordOfExecution { get; set; }
        public string SearchKeyWordOfEligible { get; set; }
        public string SearchKeyWordOfHowToApply { get; set; }
        public string SearchKeyWordOfBeneficiaryGet { get; set; }
        public string SearchKeyWordOfOtherDocument { get; set; }
        public string Benificiarytext { get; set; }
        public string EligiblityText { get; set; }
        public string HowToApplyText { get; set; }
        public string WhatWillBeneficiaryGet { get; set; }
        public string StartDate { get; set; }
        public string TypeIds { get; set; }
        public string TypeName { get; set; }
        public string Logo { get; set; }
        public string Designation { get; set; }

            public string BannerImage { get; set; }
        public string WebsiteUrl { get; set; }
        public string MobileAppIcon { get; set; }
        public string MobileAppUrl { get; set; }
        public Nullable<bool> IsbeneficiaryText { get; set; }
        public Nullable<bool> IsEligibityText { get; set; }
        public Nullable<bool> IsHowToApply { get; set; }
        public Nullable<bool> IsWhatWillBeneficiaryGet { get; set; }

        public Nullable<long> AdminDepartmentCode { get; set; }
        public Nullable<long> NodelDepartmentCode { get; set; }
        public Nullable<long> PriorityInList { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public List<string> HowToPay { get; set; }
        public string DepartmentShortName { get; set; }
        public long? SchemeType { get; set; }

        public List<string> ModeofApplicationList { get; set; }

        public List<MobileAppLookupModel> MobileAppLookupList { get; set; }

        public string BeneficiaryPdf { get; set; }

        public string ServiceFeePdf { get; set; }
        public List<SchemeGroupContentViewModel> ContentGroup { get; set; }
		public string HowtoPayFeeRemarks { get; set; }
		public string URLofDataofBeneficiaryonJansoochnaPortal { get; set; }
		public Nullable<long> SchemeOrServiceCode { get; set; }
        public string ModeofApplicationText { get; set; }
        public string DocumentCertificateLicenseDocument { get; set; }
        public Nullable<int> NumberOfInstallments { get; set; }
        public List<SchemeConnectWithCMISParameterModel> ConnectWithCMIS { get; set; }

    }

	public class SchemeListModel
	{
		public long SNo { get; set; }
		public string NameHindi { get; set; }
		public string NameEnglish { get; set; }
		public string Description { get; set; }
	}

    public class MobileAppLookupModel
    {
        public long Id { get; set; }
        public string PlatformName { get; set; }
        public string AppUrl { get; set; }
        public long SchemeId { get; set; }
        
    }

    public class EligibilityCriteriaModel
	{
		public long Id { get; set; }
		public long schemeId { get; set; }
		public string Remarks { get; set; }
		public string Description { get; set; }
		public long? EligibilityDropDownCode { get; set; }
		
	}

	public class EntryLookUpModel
	{
		public long Id { get; set; }
		public long schemeId { get; set; }

		public long? AdminDepartmentCode { get; set; }
		public long? NodelDepartmentCode { get; set; }
		public string NodelOfficerName { get; set; }
		public string MobileNo { get; set; }
		public string EmailId { get; set; }
		public string Designation { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<int> BlockCode { get; set; }
        public Nullable<long> TahsilCode { get; set; }
        public Nullable<int> Type { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string Address { get; set; }


    }
    public class GetBeneficiaryLookupModel
    {
        public long Id { get; set; }
        public long SchemeId { get; set; }
        public string Category { get; set; }
        public string PaymentFrequency { get; set; }
        public string Remark { get; set; }
        public string PhysicalItem { get; set; }
        public Nullable<long> DelivarebleCode { get; set; }
    }
    public class RequiredDocumentModel
	{
		public long Id { get; set; }
		public long schemeId { get; set; }
		public string Remarks { get; set; }
		public long? NameOfDocumentCode { get; set; }
		public long? IsMandatory { get; set; }
		public long? TypeOfDocumentCode { get; set; }

	
	}

	public class OtherDocumentModel
	{
		public long Id { get; set; }
		public long schemeId { get; set; }
		public string Remarks { get; set; }
		public long? ListOfOtherDocumentCode { get; set; }
		public string URL { get; set; }
        public string ImageCode { get; set; }
        public Boolean IsPdf { get; set; }
        public DateTime? DocDate { get; set; }

    }

    public class CustomSearchModel: IndexModel
    {
        public long? SchemeCode { get; set; }

        public int DepartmentCode { get; set; }

		public string SearchField { get; set; }

		public DateTime? FromDate { get; set; }
		public DateTime? ToDate { get; set; }
	}

    public class SchemeGroupPostModel
    {
        public long Id { get; set; }
        public string ShortNameHindi { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }

        [Required(ErrorMessage = "Please enter name in english")]
        public string NameEnglish { get; set; }
        public string Description { get; set; }
        public long? TypeCode { get; set; }
        public long? OwnedBy { get; set; }
        public decimal? OwnedBySate { get; set; }
        public decimal? OwnedByCenter { get; set; }
        public long? IsListedRGDPSAct { get; set; }
        public decimal? DeliveryTimeInDays { get; set; }
        public long? DesignatedOfficerReceivingDetailCode { get; set; }
        public long? FirstAppeallateCode { get; set; }
        public long? SecondAppeallateCode { get; set; }
        public long? ApplyForScheme { get; set; }
        public decimal? TimeOfValidationInMonth { get; set; }
        public long? ExpiredOn { get; set; }
        public DateTime? ExpriedOnDate { get; set; }
        public decimal? ExpriedDurationInMonth { get; set; }
             
        public long? MadeOfAppling { get; set; }
        public long? MadeOfApplingOnlineBoth { get; set; }
        public string DepartmentWebsiteUrl { get; set; }
        public long? IsServiceFees { get; set; }
        public long? HowToPayFeeCode { get; set; }
        public string HelplineNo { get; set; }
    
        public long? DelivarebleCode { get; set; }

        public string deliveryPaymentDetail { get; set; }
        public long? ModeOfDisbursmentCode { get; set; }
        public string ModeOfDisbursment { get; set; }

        public long? PaymentDisbursmentFrequency { get; set; }
        public long? PaymentDisbursmentFrequencyInstallments { get; set; }
        public string PaymentDisbursmentFrequencyTillAPeriod { get; set; }
        public string ItemDetails { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public long? Code { get; set; }
        public decimal? ServiceFeeAmount { get; set; }
        public bool? IsActive { get; set; } = false;
        public bool? IsDeleted { get; set; } = false;
        public string Scheme_URL { get; set; }

      
        public List<string> programAreas { get; set; }

       
        public List<string> CasteCategory { get; set; }

        
        public List<string> BeneficiaryCategory { get; set; }
        public List<string> District { get; set; }
        public List<string> Type { get; set; }
        public List<string> ModeOfDelivery { get; set; }

        public List<EligibilityCriteriaModel> EligibilityCriteria { get; set; }

        public List<EntryLookUpModel> EntryLookUp { get; set; }
        public List<RequiredDocumentModel> RequiredDocument { get; set; }
        public List<GetBeneficiaryLookupModel> GetBeneficiaryLookup { get; set; }

        public List<OtherDocumentModel> OtherDocument { get; set; }

        public string SearchKeyWordOfDetails { get; set; }
        public string SearchKeyWordOfExecution { get; set; }
        public string SearchKeyWordOfEligible { get; set; }
        public string SearchKeyWordOfHowToApply { get; set; }
        public string SearchKeyWordOfBeneficiaryGet { get; set; }
        public string SearchKeyWordOfOtherDocument { get; set; }
        public string Benificiarytext { get; set; }
        public string EligiblityText { get; set; }
        public string HowToApplyText { get; set; }
        public string WhatWillBeneficiaryGet { get; set; }
        public string StartDate { get; set; }
        public string TypeIds { get; set; }
        public string TypeName { get; set; }
        public string Logo { get; set; }
        public string Designation { get; set; }

        public string BannerImage { get; set; }
        public string WebsiteUrl { get; set; }
        public string MobileAppIcon { get; set; }
        public string MobileAppUrl { get; set; }
        public Nullable<bool> IsbeneficiaryText { get; set; }
        public Nullable<bool> IsEligibityText { get; set; }
        public Nullable<bool> IsHowToApply { get; set; }
        public Nullable<bool> IsWhatWillBeneficiaryGet { get; set; }

        public Nullable<long> AdminDepartmentCode { get; set; }
        public Nullable<long> NodelDepartmentCode { get; set; }
        public Nullable<long> PriorityInList { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public List<string> HowToPay { get; set; }
        public string DepartmentShortName { get; set; }
        public long? SchemeType { get; set; }

        public List<string> ModeofApplicationList { get; set; }

        public List<MobileAppLookupModel> MobileAppLookupList { get; set; }
        public List<SchemeGroupContentPostModel> ContentGroup { get; set; }
    }
    public class SchemeGroupContentPostModel
    {
        public long Id { get; set; }
        public string Heading1 { get; set; }
        public string Heading2 { get; set; }
        public string Description { get; set; }
        public long SchemeId { get; set; }
    }


    public class UpdateBeneficiaryModel
    {
        public long Schemeid { get; set; }
        public List<string> BeneficiaryCodes { get; set; }
    }

    #region Connect With CMIS

    public class SchemeConnectWithCMISParameterModel
    {
        public long Id { get; set; }
        public long OrderEntryID { get; set; }
        public string ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string YearValue { get; set; }
        public string YearText { get; set; }

        public SchemeConnectWithCMISParameterResultModel ConnectWithCMISResult { get; set; }
    }

    public class SchemeConnectWithCMISParameterResultModel
    {
        public string pm_projecthdrid { get; set; }
        public string modulename { get; set; }
        public string prj_year { get; set; }
        public string prj_dept { get; set; }
        public string prj_ndept { get; set; }
        public string parano { get; set; }
        public string filenumber { get; set; }
        public string prj_description { get; set; }
        public int? CMISNewTransCoreId { get; set; }
    }

    #endregion

}