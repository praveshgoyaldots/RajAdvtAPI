using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace CMOWebApi.Models.AdminModel
{
    #region Scheme Model

    public class SchemeBeneficiaryCategoryViewModel
    {
        public SchemeBeneficiaryCategoryViewModel()
        {
        }
        public SchemeBeneficiaryCategoryViewModel(dynamic data)
        {
            if (data != null)
            {
                this.Id = data.Id == null ? 0 : data.Id;
                this.SchemeID = data.SchemeID == null ? 0 : data.SchemeID;
                this.BeneficiaryCatId = data.BeneficiaryCatId == null ? 0 : data.BeneficiaryCatId;
            }
        }
        public long Id { get; set; }
        public long SchemeID { get; set; }
        public int BeneficiaryCatId { get; set; }



    }

    public class SchemeExecutingDepartmentViewModel
    {
        public SchemeExecutingDepartmentViewModel()
        { }
        public SchemeExecutingDepartmentViewModel(dynamic data)
        {
            if (data != null && data.DepartmentId != null)
            {
                this.Id = data.Id == null ? 0 : data.Id;
                this.SchemeID = data.SchemeID == null ? 0 : data.SchemeID;
                this.DepartmentId = data.DepartmentId == null ? 0 : data.DepartmentId;
            }
        }
        public long Id { get; set; }
        public long SchemeID { get; set; }
        public Nullable<int> DepartmentId { get; set; }


    }

    public class SchemeRequiredDocumentViewModel
    {
        public SchemeRequiredDocumentViewModel()
        { }
        public SchemeRequiredDocumentViewModel(dynamic data)
        {
            if (data != null && !string.IsNullOrEmpty(data.Name))
            {
                this.Id = data.Id == null ? 0 : data.Id;
                this.SchemeID = data.SchemeID == null ? 0 : data.SchemeID;
                this.Name = string.IsNullOrEmpty(data.Name) ? 0 : data.Name;
            }
        }
        public long Id { get; set; }
        public long SchemeID { get; set; }
        public string Name { get; set; }

    }

    public class SchemeOutputViewModel
    {
        public SchemeOutputViewModel()
        { }
        public SchemeOutputViewModel(dynamic data)
        {
            if (data != null && !string.IsNullOrEmpty(data.OutputId))
            {
                this.Id = data.Id == null ? 0 : data.Id;
                this.SchemeID = data.SchemeID == null ? 0 : data.SchemeID;
                this.OutputId = data.OutputId == null ? 0 : data.OutputId;
            }
        }

        public long Id { get; set; }
        public long SchemeID { get; set; }
        public int OutputId { get; set; }

    }

    public class SchmeMediaFileViewModel
    {
        public SchmeMediaFileViewModel()
        { }
        public SchmeMediaFileViewModel(dynamic data)
        {
            if (data != null && !string.IsNullOrEmpty(data.FileName))
            {
                this.Id = data.Id == null ? 0 : data.Id;
                this.SchemeID = data.SchemeID == null ? 0 : data.SchemeID;
                this.FileName = string.IsNullOrEmpty(FileName) ? null : data.FileName;
                this.Path = string.IsNullOrEmpty(Path) ? null : data.Path;
                this.Type = data.Type == null ? 0 : data.Type;
                this.TypeName = string.IsNullOrEmpty(TypeName) ? null : data.TypeName;
            }
        }

        public long Id { get; set; }
        public long SchemeID { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }
        public Nullable<int> Type { get; set; }
        public string TypeName { get; set; }
    }

    public class PublicPortalSchemeViewModel
    {
        public PublicPortalSchemeViewModel()
        {
            schemePublicPortalViewModel = new schemePublicPortalViewModel();
            SchemeEntryLookUpViewModel = new List<SchemeEntryLookUpViewModel>();
            SchemeRequiredDocumentLookUpViewModel = new List<SchemeRequiredDocumentLookUpViewModel>();
            SchemeOtherDocumentLookUpViewModel = new List<SchemeOtherDocumentLookUpViewModel>();
            SchemeEligibilityCriteriaLookUpViewModel = new List<SchemeEligibilityCriteriaLookUpViewModel>();
            SchemeGetBeneficiaryLookupViewModel = new List<SchemeGetBeneficiaryLookupViewModel>();
            SchemeGetMobileUrlLookupViewModel = new List<SchemeGetMobileUrlLookupViewModel>();
            SchemeGroupDetailLookUpViewModel = new List<SchemeGroupDetailLookUpViewModel>();
        }
        public schemePublicPortalViewModel schemePublicPortalViewModel { get; set; }
        public List<SchemeEntryLookUpViewModel> SchemeEntryLookUpViewModel { get; set; }
        public List<SchemeRequiredDocumentLookUpViewModel> SchemeRequiredDocumentLookUpViewModel { get; set; }
        public List<SchemeOtherDocumentLookUpViewModel> SchemeOtherDocumentLookUpViewModel { get; set; }
        public List<SchemeEligibilityCriteriaLookUpViewModel> SchemeEligibilityCriteriaLookUpViewModel { get; set; }
        public List<SchemeGetBeneficiaryLookupViewModel> SchemeGetBeneficiaryLookupViewModel { get; set; }

        public List<SchemeGetMobileUrlLookupViewModel> SchemeGetMobileUrlLookupViewModel { get; set; }

        public List<SchemeGroupDetailLookUpViewModel> SchemeGroupDetailLookUpViewModel { get; set; }

    }

    public class schemePublicPortalViewModel
    {
        public long Id { get; set; }
        public string ShortNameHindi { get; set; }
        public long VisitorCount { get; set; }
        public int PageType { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public int DepartmentCode { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }
        public string NameEnglish { get; set; }
        public string Description { get; set; }
        public string shortHowToApplyText { get; set; }
        public string shortBenificiarytext { get; set; }
        public string shortEligiblityText { get; set; }
        public string shortWhatWillBeneficiaryGet { get; set; }
        public string HowToPayFeeName { get; set; }
        public string HowToPayFeeNameinhindi { get; set; }
        public string ModeOfDisbursmentName { get; set; }
        public string ModeOfDisbursmentNameinHindi { get; set; }
        public Nullable<long> OwnedBy { get; set; }
        public string OwnedByName { get; set; }
        public string OwnedByNameinhindi { get; set; }
        public string ApplyForSchemeName { get; set; }
        public string ApplyForSchemeNameinhindi { get; set; }
        public string MadeOfApplingName { get; set; }
        public string MadeOfApplingNameinhindi { get; set; }
        public Nullable<decimal> OwnedBySate { get; set; }
        public Nullable<decimal> OwnedByCenter { get; set; }
        public Nullable<long> IsListedRGDPSAct { get; set; }
        public string IsListedRGDPSActName { get; set; }
        public Nullable<decimal> DeliveryTimeInDays { get; set; }
        public string IsListedRGDPSActNameinhindi { get; set; }
        public Nullable<long> DesignatedOfficerReceivingDetailCode { get; set; }
        public string DesignatedOfficerReceivingDetailName { get; set; }
        public string DesignatedOfficerReceivingDetailNameinhindi { get; set; }
        public Nullable<long> FirstAppeallateCode { get; set; }
        public string FirstAppeallateName { get; set; }
        public string FirstAppeallateNameinhindi { get; set; }
        public Nullable<long> SecondAppeallateCode { get; set; }
        public string SecondAppeallateName { get; set; }
        public string SecondAppeallateNameinhindi { get; set; }
        public Nullable<long> ApplyForScheme { get; set; }
        public Nullable<decimal> TimeOfValidationInMonth { get; set; }
        public Nullable<long> DurationType { get; set; }
        public string DurationTypeName { get; set; }
        public string DurationTypeNameHindi { get; set; }
        public Nullable<long> ExpiredOn { get; set; }
        public string ExpiredOnName { get; set; }
        public string ExpiredOnNameinhindi { get; set; }
        public Nullable<System.DateTime> ExpriedOnDate { get; set; }
        public Nullable<decimal> ExpriedDurationInMonth { get; set; }
        public Nullable<long> MadeOfAppling { get; set; }
        public Nullable<long> MadeOfApplingOnlineBoth { get; set; }
        public string MadeOfApplingOnlineBothName { get; set; }
        public string MadeOfApplingOnlineBothNameinhindi { get; set; }
        public string DepartmentWebsiteUrl { get; set; }
        public Nullable<long> IsServiceFees { get; set; }
        public string IsServiceFeesName { get; set; }
        public string IsServiceFeesNameinhindi { get; set; }
        public Nullable<long> HowToPayFeeCode { get; set; }
        public string HelplineNo { get; set; }
        public Nullable<long> DelivarebleCode { get; set; }
        public string DelivarebleName { get; set; }
        public string DelivarebleNameinhindi { get; set; }
        public string deliveryPaymentDetail { get; set; }
        public Nullable<long> ModeOfDisbursmentCode { get; set; }
        public string ModeOfDisbursment { get; set; }
        public Nullable<long> PaymentDisbursmentFrequency { get; set; }
        public string PaymentDisbursmentFrequencyName { get; set; }
        public string PaymentDisbursmentFrequencyNameinhindi { get; set; }
        public Nullable<long> PaymentDisbursmentFrequencyInstallments { get; set; }
        public string PaymentDisbursmentFrequencyInstallmentsName { get; set; }
        public string PaymentDisbursmentFrequencyInstallmentsNameinhindi { get; set; }
        public string PaymentDisbursmentFrequencyTillAPeriod { get; set; }
        public Nullable<int> NumberOfInstallments { get; set; }
        public string BeneficiaryPdf { get; set; }
        public string DocumentCertificateLicenseDocument { get; set; }

        public string ItemDetails { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<decimal> ServiceFeeAmount { get; set; }
        public string Scheme_URL { get; set; }
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
        public string BeneficiaryCategoryIds { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string BeneficiaryCategoryNameinHindi { get; set; }
        public string DistrictNameinHindi { get; set; }
        public string TypeNameinHindi { get; set; }
        public string ModeOfDeliveryNameinHindi { get; set; }
        public string CasteCategoryNameinHindi { get; set; }
        public string ProgramAreaNameinHindi { get; set; }
        public string DistrictIds { get; set; }
        public string DistrictName { get; set; }
        public string TypeIds { get; set; }
        public string TypeName { get; set; }
        public string ModeOfDeliveryIds { get; set; }
        public string ModeOfDeliveryName { get; set; }
        public string CasteCategoryIds { get; set; }
        public string CasteCategoryName { get; set; }
        public string ProgramAreaIds { get; set; }
        public string ProgramAreaName { get; set; }
        public Nullable<int> FaqCount { get; set; }
        public Nullable<int> CategoryMasterCount { get; set; }
        public Nullable<int> CategoryLookUpCount { get; set; }
        public List<EligibilityCriteriaModel> EligibilityCriteria { get; set; }

        public List<EntryLookUpModel> EntryLookUp { get; set; }
        public List<RequiredDocumentModel> RequiredDocument { get; set; }
        public List<OtherDocumentModel> OtherDocument { get; set; }
        public List<FAQModel> FAQList { get; set; }
        public string HowtoPayFeeRemarks { get; set; }
        public string ModeofDisbursementIds { get; set; }
        public string ModeofDisbursementName { get; set; }
        public string ModeofDisbursementHindiName { get; set; }

        public string ModeofApplicationIds { get; set; }
        public string ModeofApplicationName { get; set; }
        public string ModeofApplicationHindiName { get; set; }
        public string URLofDataofBeneficiaryonJansoochnaPortal { get; set; }
        public bool schemeIsLock { get; set; }
        public Nullable<long> SchemeOrServiceCode { get; set; }
        public string SchemeOrServiceName { get; set; }

        public string SchemeOrServiceNameHindi { get; set; }
        public string ServiceFeePdf { get; set; }
    }

    public class SchemeViewModel
    {
        public long Id { get; set; }
        public string ModeOfDisbursment { get; set; }
        public string ShortNameHindi { get; set; }
        public Nullable<int> PageType { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }
        public string NameEnglish { get; set; }
        public string Description { get; set; }
        public string TypeName { get; set; }
        public string HowToPayFeeName { get; set; }
       
        public Nullable<long> TypeCode { get; set; }
        public Nullable<long> OwnedBy { get; set; }
        public string OwnedByName { get; set; }
        public string DepartmentShortName { get; set; }
        public string ApplyForSchemeName { get; set; }
        public string MadeOfApplingName { get; set; }
        public Nullable<decimal> OwnedBySate { get; set; }
        public Nullable<decimal> OwnedByCenter { get; set; }
        public Nullable<long> IsListedRGDPSAct { get; set; }
        public string IsListedRGDPSActName { get; set; }
        public Nullable<decimal> DeliveryTimeInDays { get; set; }
        public Nullable<long> DesignatedOfficerReceivingDetailCode { get; set; }
        public string DesignatedOfficerReceivingDetailName { get; set; }
        public Nullable<long> FirstAppeallateCode { get; set; }
        public string FirstAppeallateName { get; set; }
        public Nullable<long> SecondAppeallateCode { get; set; }
        public string SecondAppeallateName { get; set; }
        public Nullable<long> ApplyForScheme { get; set; }
        public Nullable<decimal> TimeOfValidationInMonth { get; set; }
        public Nullable<long> ExpiredOn { get; set; }
        public string ExpiredOnName { get; set; }
        public Nullable<System.DateTime> ExpriedOnDate { get; set; }
        public Nullable<decimal> ExpriedDurationInMonth { get; set; }
        public Nullable<long> MadeOfAppling { get; set; }
        public Nullable<long> MadeOfApplingOnlineBoth { get; set; }
        public string MadeOfApplingOnlineBothName { get; set; }
        public string DepartmentWebsiteUrl { get; set; }
        public Nullable<long> IsServiceFees { get; set; }
        public string IsServiceFeesName { get; set; }
        public Nullable<long> HowToPayFeeCode { get; set; }
        public string HelplineNo { get; set; }
        public Nullable<long> DelivarebleCode { get; set; }
        public string DelivarebleName { get; set; }
        public string deliveryPaymentDetail { get; set; }
       
        public Nullable<long> PaymentDisbursmentFrequency { get; set; }
        public string PaymentDisbursmentFrequencyName { get; set; }
        public Nullable<long> PaymentDisbursmentFrequencyInstallments { get; set; }
        public string PaymentDisbursmentFrequencyInstallmentsName { get; set; }
        public string PaymentDisbursmentFrequencyTillAPeriod { get; set; }
        public string ItemDetails { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<decimal> ServiceFeeAmount { get; set; }
        public string BeneficiaryCategoryIds { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string ModeOfDeliveryIds { get; set; }
        public string ModeOfDeliveryName { get; set; }
        public string CasteCategoryIds { get; set; }
        public string CasteCategoryName { get; set; }
        public string ProgramAreaIds { get; set; }
        public string ProgramAreaName { get; set; }
        public Nullable<int> FaqCount { get; set; }
        public string Scheme_URL { get; set; }
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
        public string DistrictIds { get; set; }
        public string DistrictName { get; set; }

        public string StartDate { get; set; }
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

        public string TypeIds { get; set; }

        public List<EligibilityCriteriaModel> EligibilityCriteria { get; set; }

        public List<EntryLookUpModel> EntryLookUp { get; set; }
        public List<RequiredDocumentModel> RequiredDocument { get; set; }
        public List<OtherDocumentModel> OtherDocument { get; set; }
        public List<GetBeneficiaryLookupModel> GetBeneficiaryLookup { get; set; }
        public List<FAQModel> FAQList { get; set; }

        public Nullable<long> AdminDepartmentCode { get; set; }
        public Nullable<long> NodelDepartmentCode { get; set; }
        public Nullable<long> PriorityInList { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public string NodalDepartmentTitle { get; set; }
        public string AdminDepartmentTitle { get; set; }
        public string HowtoPayIds { get; set; }
        public string HowtoPayName { get; set; }
		public string ModeOfDisburstmentIds { get; set; }
		public string ModeOfDisburstmentName { get; set; }
		public string ModeofApplicationIds { get; set; }
        public string ModeofApplicationName { get; set; }
        public long? SchemeType { get; set; }
        public string SchemeTypeName { get; set; }
        public List<MobileAppLookupModel> MobileAppLookupList { get; set; }
        public List<long?> ModeofApplicationList { get; set; }
        public string BeneficiaryPdf { get; set; }
        public string ServiceFeePdf { get; set; }
        public List<SchemeGroupContentViewModel> ContentGroup { get; set; }
		public string HowtoPayFeeRemarks { get; set; }
		public string URLofDataofBeneficiaryonJansoochnaPortal { get; set; }
		public string SchemeOrService { get; set; }
		public Nullable<long> SchemeOrServiceCode { get; set; }
        public string ModeofApplicationText { get; set; }
        public string DocumentCertificateLicenseDocument { get; set; }
        public Nullable<int> NumberOfInstallments { get; set; }
        public string schemePageType { get; set; }

        public List<SchemeConnectWithCMISParameterModel> ConnectWithCMIS { get; set; }

    }

    public class SchemeEntryLookUpViewModel
    {
        public long schemeId { get; set; }
        public string Admindepartmentnameinhindi { get; set; }
        public string AdmDepartmentTitleinenglish { get; set; }
        public string DepartmentTitleinEnglish { get; set; }
        public string DepartmentTitleinHindi { get; set; }
        public string Designation { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string NodelOfficerName { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Address { get; set; }
        public Nullable<int> Type { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string DistrictTitle { get; set; }
        public string DistrictTitleHindi { get; set; }
        public Nullable<int> BlockCode { get; set; }
        public string BlockName { get; set; }
        public string BlockNameHindi { get; set; }
        public Nullable<int> TahsilCode { get; set; }
        public string TehsilTitle { get; set; }
        public string TehsilTitleHindi { get; set; }
    }

    public class SchemeRequiredDocumentLookUpViewModel
    {
        public string NameOfDocumentinEnglish { get; set; }
        public string NameOfDocumentinHindi { get; set; }
        public long Id { get; set; }
        public long schemeId { get; set; }
        public string Remarks { get; set; }
        public string TypeOfDocumentinEnglish { get; set; }
        public string TypeOfDocumentinHindi { get; set; }
        public Nullable<long> IsMandatoryCode { get; set; }
        public string IsMandatoryinHindi { get; set; }
        public string IsMandatoryinEnglish { get; set; }
    }
    public class SchemeOtherDocumentLookUpViewModel
    {
        public string ListOfOtherDocumentinEnglish { get; set; }
        public string ListOfOtherDocumentinHindi { get; set; }
        public string URL { get; set; }
        public string Remarks { get; set; }
        public string ImageCode { get; set; }
    }

    public class SchemeEligibilityCriteriaLookUpViewModel
    {
        public string EligibilityDropDowninEnglish { get; set; }
        public string EligibilityDropDowninHindi { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public long Id { get; set; }
        public long schemeId { get; set; }
    }

    public class SchemeGetBeneficiaryLookupViewModel
    {
        public long Id { get; set; }
        public long schemeId { get; set; }
        public string Category { get; set; }
        public string PaymentFrequency { get; set; }
        public string Remark { get; set; }
        public string PhysicalItem { get; set; }
        public Nullable<long> DelivarebleCode { get; set; }
    }

    public class SchemeGetMobileUrlLookupViewModel
    {
        public long Id { get; set; }
        public long schemeId { get; set; }
        public string PlatformName { get; set; }
        public string AppUrl { get; set; }
    }

    public class FileCollection
    {
        public object files { get; set; }
        public string Type { get; set; }
    }

    public class SchemeResponseModel
    {
        public long Id { get; set; }
        public List<FileCollection> FileCollection { get; set; }
        [Required]
        public string NameEnglish { get; set; }
        [Required]
        public string NameHindi { get; set; }
        [Required]
        public long NodalDepartment { get; set; }
        [Required]
        public List<string> ExecutingDepartment { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool ModeOfApplication { get; set; }
        public string SourceOnlineApplication { get; set; }
        public string OnlineApplicationDepartmentUrl { get; set; }
        [Required]
        public int Category { get; set; }
        [Required]
        public List<string> BeneficiaryCategory { get; set; }
        public bool IsDirectBenefitToCitizen { get; set; }
        [Required]
        //public string RequiredDocument { get; set; }
        public List<string> RequiredDocuments { get; set; }
        public bool IsServiceFees { get; set; }
        public decimal ServiceFeesAmount { get; set; }
        public long PaymentDisbursementMode { get; set; }
        [Required]
        public List<string> output { get; set; }
        [Required]
        public long ModeOfPayment { get; set; }
        public Nullable<long> ModeOfPaymentIfCash { get; set; }
        public int ModeofDelivery { get; set; }
        public int? Type { get; set; }
        public int Area { get; set; }
        public decimal EligibilityAge { get; set; }
        public string EligibilityGender { get; set; }
        public decimal EligibilityIncome { get; set; }
        public decimal EligibilityFees { get; set; }
        [Required]
        public string NodalOfficerDetail { get; set; }
        public int DeliveryTimeInDays { get; set; }
        public bool IsRenewal { get; set; }
        public int ValidityTimeInYears { get; set; }
        public string HelplineNo { get; set; }
        public DateTime? ExpiredOn { get; set; }
        public string LogoImage { get; set; }
        public string IconImage { get; set; }
        public string BannerImage { get; set; }
        public List<string> ActRule { get; set; }
        public List<string> CitizenCharter { get; set; }
        public List<string> SchemeForms { get; set; }
    }


    public class SchemeFAQModel
    {
        public long Id { get; set; }
        public long SchemeID { get; set; }
        public string NameEnglish { get; set; }
        public string NameHindi { get; set; }
        public List<FAQModel> FAQList { get; set; }
    }

    public class FAQModel
    {
        public string Question { get; set; }
        public string Answer { get; set; }
        public string AttachmentUrl { get; set; }
        public Nullable<bool> IsActive { get; set; } = false;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public Nullable<int> OrderBy { get; set; }
        public Boolean IsPdf { get; set; }

    }

    public class ListSchemeModel
    {
        public long Id { get; set; }

        public string NameHindi { get; set; }

        public string NameEnglish { get; set; }

        public string TypeName { get; set; }

        public bool IsActive { get; set; }

        public long FaqCount { get; set; }
        public Nullable<bool> IsLock { get; set; }
        public string NodelDepartmentName { get; set; }
        public string NodalDepartmentTitle { get; set; }
        public string CraeteDate { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public Nullable<int> PageType { get; set; }
        public string schemePageType { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedName { get; set; }
        public Nullable<int> NodelDepartmentCode { get; set; }
    }

    public class AssignSchemeModel
    {
        public long Id { get; set; }
        public string NameEnglish { get; set; }
        public string SSOID { get; set; }
        public Nullable<int> PageType { get; set; }
        public Nullable<int> NodelDepartmentCode { get; set; }
    }

    public class SetSchemePriorityViewModel
    {
        public long Id { get; set; }
        public string NameEnglish { get; set; }
        public bool IsActive { get; set; }
        public Nullable<long> PriorityInList { get; set; }
        public int NodelDepartmentCode { get; set; }
        public Nullable<bool> IsFlagShipScheme { get; set; }
        public string FlagshipImage { get; set; }
        }

    public class AssignSchemeNameForUserModel
    {
        public string NameEnglish { get; set; }
        public string NameHindi { get; set; }
        public string UserName { get; set; }
        public long Id { get; set; }
        public bool IsActive { get; set; }
        public int Department { get; set; }
        public long AdminDepartment { get; set; }
		public Nullable<int> PageType { get; set; }
		public string schemePageTypeName { get; set; }
	}


    public class SchemeGroupViewModel
    {
        public long Id { get; set; }
        public string ShortNameHindi { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }
        public string NameEnglish { get; set; }
        public string Description { get; set; }
        public string TypeName { get; set; }
        public string HowToPayFeeName { get; set; }
        public string ModeOfDisbursmentName { get; set; }
        public Nullable<long> TypeCode { get; set; }
        public Nullable<long> OwnedBy { get; set; }
        public string OwnedByName { get; set; }
        public string DepartmentShortName { get; set; }
        public string ApplyForSchemeName { get; set; }
        public string MadeOfApplingName { get; set; }
        public Nullable<decimal> OwnedBySate { get; set; }
        public Nullable<decimal> OwnedByCenter { get; set; }
        public Nullable<long> IsListedRGDPSAct { get; set; }
        public string IsListedRGDPSActName { get; set; }
        public Nullable<decimal> DeliveryTimeInDays { get; set; }
        public Nullable<long> DesignatedOfficerReceivingDetailCode { get; set; }
        public string DesignatedOfficerReceivingDetailName { get; set; }
        public Nullable<long> FirstAppeallateCode { get; set; }
        public string FirstAppeallateName { get; set; }
        public Nullable<long> SecondAppeallateCode { get; set; }
        public string SecondAppeallateName { get; set; }
        public Nullable<long> ApplyForScheme { get; set; }
        public Nullable<decimal> TimeOfValidationInMonth { get; set; }
        public Nullable<long> ExpiredOn { get; set; }
        public string ExpiredOnName { get; set; }
        public Nullable<System.DateTime> ExpriedOnDate { get; set; }
        public Nullable<decimal> ExpriedDurationInMonth { get; set; }
        public Nullable<long> MadeOfAppling { get; set; }
        public Nullable<long> MadeOfApplingOnlineBoth { get; set; }
        public string MadeOfApplingOnlineBothName { get; set; }
        public string DepartmentWebsiteUrl { get; set; }
        public Nullable<long> IsServiceFees { get; set; }
        public string IsServiceFeesName { get; set; }
        public Nullable<long> HowToPayFeeCode { get; set; }
        public string HelplineNo { get; set; }
        public Nullable<long> DelivarebleCode { get; set; }
        public string DelivarebleName { get; set; }
        public string deliveryPaymentDetail { get; set; }
        public Nullable<long> ModeOfDisbursmentCode { get; set; }
        public string ModeOfDisbursment { get; set; }
        public Nullable<long> PaymentDisbursmentFrequency { get; set; }
        public string PaymentDisbursmentFrequencyName { get; set; }
        public Nullable<long> PaymentDisbursmentFrequencyInstallments { get; set; }
        public string PaymentDisbursmentFrequencyInstallmentsName { get; set; }
        public string PaymentDisbursmentFrequencyTillAPeriod { get; set; }
        public string ItemDetails { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<decimal> ServiceFeeAmount { get; set; }
        public string BeneficiaryCategoryIds { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string ModeOfDeliveryIds { get; set; }
        public string ModeOfDeliveryName { get; set; }
        public string CasteCategoryIds { get; set; }
        public string CasteCategoryName { get; set; }
        public string ProgramAreaIds { get; set; }
        public string ProgramAreaName { get; set; }
        public Nullable<int> FaqCount { get; set; }
        public string Scheme_URL { get; set; }
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
        public string DistrictIds { get; set; }
        public string DistrictName { get; set; }

        public string StartDate { get; set; }
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

        public string TypeIds { get; set; }

        public List<EligibilityCriteriaModel> EligibilityCriteria { get; set; }

        public List<EntryLookUpModel> EntryLookUp { get; set; }
        public List<RequiredDocumentModel> RequiredDocument { get; set; }
        public List<OtherDocumentModel> OtherDocument { get; set; }
        public List<GetBeneficiaryLookupModel> GetBeneficiaryLookup { get; set; }
        public List<FAQModel> FAQList { get; set; }

        public Nullable<long> AdminDepartmentCode { get; set; }
        public Nullable<long> NodelDepartmentCode { get; set; }
        public Nullable<long> PriorityInList { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public string NodalDepartmentTitle { get; set; }
        public string AdminDepartmentTitle { get; set; }
        public string HowtoPayIds { get; set; }
        public string HowtoPayName { get; set; }
        public string ModeofApplicationIds { get; set; }
        public string ModeofApplicationName { get; set; }
        public long? SchemeType { get; set; }
        public string SchemeTypeName { get; set; }
        public List<long?> ModeofApplicationList { get; set; }
        public List<MobileAppLookupModel> MobileAppLookupList { get; set; }
        public List<SchemeGroupContentViewModel> ContentGroup { get; set; }
    }
    public class SchemeGroupContentViewModel
    {
        public long Id { get; set; }
        public string Heading1 { get; set; }
        public string Heading2 { get; set; }
        public string Description { get; set; }
        public long SchemeId { get; set; }
    }

    #endregion

    #region Scheme Group Detail
    public class SchemeBasicDetailViewModel
    {
        public long Id { get; set; }
        public string NameEnglish { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }
        public string ShortNameHindi { get; set; }
        public string StartDate { get; set; }
        public string Logo { get; set; }
        public string BannerImage { get; set; }
        public string Description { get; set; }
        public Nullable<long> OwnedBy { get; set; }
        public string OwnedByName { get; set; }
        public string OwnedByNameHindi { get; set; }
        public Nullable<decimal> OwnedBySate { get; set; }
        public Nullable<decimal> OwnedByCenter { get; set; }
        public Nullable<int> AdminDepartmentCode { get; set; }
        public string AdminDepartmentName { get; set; }
        public string AdminDepartmentNameHindi { get; set; }
        public Nullable<int> NodelDepartmentCode { get; set; }
        public string NodelDepartmentName { get; set; }
        public string NodelDepartmentNameHindi { get; set; }
        public string DepartmentWebsiteUrl { get; set; }
        public string SearchKeyWordOfDetails { get; set; }
        public string ServiceTypeCodes { get; set; }
        public string ServiceTypeNames { get; set; }
        public string ServiceTypeNamesHindi { get; set; }
        public string SchemeDistrictCodes { get; set; }
        public string SchemeDistrictNames { get; set; }
        public string SchemeDistrictNamesHindi { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class SchemeGroupDetailLookUpViewModel
    {
        public long Id { get; set; }
        public string Heading1 { get; set; }
        public string Heading2 { get; set; }
        public string Description { get; set; }
        public long SchemeId { get; set; }
    }

    public class SchemeGroupDetailViewModel
    {
        public SchemeGroupDetailViewModel()
        {
            SchemeBasicDetailViewModel = new SchemeBasicDetailViewModel();
            SchemeEntryLookUpViewModel = new List<SchemeEntryLookUpViewModel>();
            SchemeGroupDetailLookUpViewModel = new List<SchemeGroupDetailLookUpViewModel>();
        }
        public SchemeBasicDetailViewModel SchemeBasicDetailViewModel { get; set; }
        public List<SchemeEntryLookUpViewModel> SchemeEntryLookUpViewModel { get; set; }
        public List<SchemeGroupDetailLookUpViewModel> SchemeGroupDetailLookUpViewModel { get; set; }
    }
    #endregion


    #region Monitoring Parameter Model

    public class MonitoringParameterMappingModel
    {
        public long Id { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<long> SchemeId { get; set; }
        public string Remark { get; set; }
        public Nullable<int> MonitoringParamId { get; set; }
    }

    public class SchemeMonitoringParameteModel
    {
        public long Id { get; set; }
        public long SchemeID { get; set; }
        public List<MonitoringParameterMappingModel> MonitoringParameterList { get; set; }
    }

    public class MonitoringParametersByIdForDataEntryViewModel
    {
        public MonitoringParametersByIdForDataEntryViewModel()
        {
            this.MonitoringParameterList = new List<MonitoringParametersByIdForDataEntry>();
        }

        public IDictionary<string, object> DataDDLList { get; set; }

        public List<DynamicDDLModel> DataDDLListDynamic { get; set; }

        public long? SchemeId { get; set; }

        public long? EntryId { get; set; }
        public long? Count { get; set; }

        public long? TotalRecords { get; set; }
        public DateTime? YearMonth { get; set; }
        public int IsEdit { get; set; }
        public List<MonitoringParametersByIdForDataEntry> MonitoringParameterList { get; set; }

        public List<MonitoringParametersByIdForDataEntryViewModel> DataEntryList { get; set; }

    }

    public class MonitoringParametersByIdForDataEntry
    {
        public int? MonitoringParamId { get; set; }
        public long? MappingId { get; set; }
        public string FieldValue { get; set; }
        public string FieldName { get; set; }
        public string FieldId { get; set; }
        public string Type { get; set; }
        public string ParamName { get; set; }
        public string MonthName { get; set; }
        public long DataEntryFieldValueId { get; set; }
        // public int IsEdit { get; set; }
        public string FieldDisplayValue { get; set; }
    }

    public class MonitoringParamDataEntryAddModel
    {
        public long? SchemeId { get; set; }

        public List<MonitoringParametersByIdForDataEntryViewModel> DataEntryList { get; set; }


    }

    public class SearchModel
    {

        public int CategortyCode { get; set; }
        public int SubCategortyCode { get; set; }
        public int DepartmentCode { get; set; }
        public int Userby { get; set; }
        public string SearchKeyword { get; set; }
        public int? Activeview { get; set; }
        public string CMOComments { get; set; }
        public string KeyWord { get; set; }
        public string AutoKeyWord { get; set; }

        public string CreatedTo { get; set; }
        public string CreatedFrom { get; set; }
		public Boolean IsExportToExcel { get; set; }
		public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }


        public IndexModel indexModel { get; set; }
    }

    public class MonitoringParameterWithCountModel
    {
        public long Id { get; set; }
        public string ShortNameHindi { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }
        public string NameEnglish { get; set; }
        public string Description { get; set; }
        public Nullable<int> MPCount { get; set; }
        public Nullable<int> MPEntryCount { get; set; }
    }

    public class MonitoringParameterMonthlyModel
    {
        public Nullable<long> SchemeId { get; set; }
        public Nullable<int> Year { get; set; }
        public Nullable<int> Months { get; set; }
        public string MonthName { get; set; }
        public Nullable<int> MPRCount { get; set; }
        public Nullable<System.DateTime> YearMonth { get; set; }
        public string ShortNameHindi { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }
        public string NameEnglish { get; set; }
        public string Description { get; set; }
    }

    public class DynamicDDLModel
    {
        public string Text { get; set; }

        public List<SelectListItem> Value { get; set; }
    }

    public class CustomParameterWithIndex : IndexModel
    {
        public int Month { get; set; }
        public int Year { get; set; }
    }

    #endregion

    public class ContactPersonDetailModel
    {
        public long? NodelDepartmentCode { get; set; }
        public long? schemeId { get; set; }
    }

    public class ContactPersonDetailViewModel
    {
        public string NodelOfficerName { get; set; }
        public string MobileNo { get; set; }
        public string Designation { get; set; }
        public string SsoId { get; set; }
        public string EmailId { get; set; }
        public long Id { get; set; }
        public Nullable<long> AdminDepartmentCode { get; set; }
        public Nullable<long> NodelDepartmentCode { get; set; }
        public long schemeId { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string AdmDepartmentTitle { get; set; }
        public string AdmDepartmentTitleHindi { get; set; }
        public string DistrictTitle { get; set; }
        public string DistrictTitleHindi { get; set; }
        public string TehsilTitle { get; set; }
        public string TehsilTitleHindi { get; set; }
        public string BlockName { get; set; }
        public string BlockNameHindi { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string Address { get; set; }
    }

}
