using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.DepartmentWebsite
{
    public class WebsiteOrderPressReleaseTenderModel
    {
        public List<WebsiteGovDocumentListModel> GovDocumentList { get; set; }
        public List<WebsitePressReleaseListModel> PressReleaseList { get; set; }
        public List<WebsiteTenderListModel> TenderList { get; set; }
    }

    public class WebsiteGovDocumentListModel
    {
        public int Id { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> EffectForm { get; set; }
        public string ReferenceLink { get; set; }
        public Nullable<long> IssueBy { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> IsOldOrder { get; set; }
        public string ReferenceNumber { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string DateHindi { get; set; }

    }

    public class WebsitePressReleaseListModel
    {
        public long Id { get; set; }
        public string GeneralDescription { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
        public string ImageUrl { get; set; }
        public string HomePageImageUrl { get; set; }
        public string KeyWords { get; set; }
        public Nullable<System.DateTime> PressreleaseDate { get; set; }
        public string PressreleaseDateHindi { get; set; }
        public string PressReleaseTime { get; set; }
    }

    public class WebsiteTenderListModel
    {
        public int Id { get; set; }
        public string RONo { get; set; }
        public Nullable<System.DateTime> ReleaseDate { get; set; }
        public string ReleaseDateHindi { get; set; }
        public string NITNo { get; set; }
        public string NITPurpose { get; set; }
        public Nullable<System.DateTime> FormIssuingDate { get; set; }
        public string FormIssuingDateHindi { get; set; }
        public Nullable<System.DateTime> FormSubmissionDate { get; set; }
        public string FormSubmissionDateHindi { get; set; }
        public Nullable<System.DateTime> TenderOpeningDate { get; set; }
        public string TenderOpeningDateHindi { get; set; }
    }

    public class MLAConstituencyListModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string MAPImagePath { get; set; }
        public string MLANameEng { get; set; }
        public string MLANameHindi { get; set; }
        public string MLAPhoto { get; set; }
        public string ShortName { get; set; }
        public string DesignationDisplayName { get; set; }
        public string DesignationDisplayNameHindi { get; set; }
        public string DesignationName { get; set; }
        public string DesignationHindi { get; set; }
        public string DistrictTitle { get; set; }
        public string DistrictTitleHindi { get; set; }
        public Nullable<int> MLACode { get; set; }
    }

    public class WebsiteHomePageSectionModel
    {
        public long Id { get; set; }
        public long Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<long> SectionMasterCode { get; set; }
        public string NameHindi { get; set; }
        public string NameEnglish { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public string IconImage { get; set; }
        public string BackGroundImage { get; set; }
        public string BackGroungColor { get; set; }
        public string BaseUrl { get; set; }
        public bool IsActive { get; set; }
        public bool Isdeleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string ComponentName { get; set; }
        public string SelectorName { get; set; }
        public string ShortDescription { get; set; }
    }
    public class DepartmentQuickLinksModel
    {
        public Nullable<long> TotalCount { get; set; }
        public string ModuleName { get; set; }
    }

    public class PressReleaseFrontModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public Nullable<int> SubCategoryCode { get; set; }
        public string GeneralDescription { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public string PDFUrl { get; set; }
        public string ImageUrl { get; set; }
        public string HomePageImageUrl { get; set; }
        public string KeyWords { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string CategoryName { get; set; }
        public string CategoryNameHindi { get; set; }
        public string SubCategoryName { get; set; }
        public string SubCategoryNameHindi { get; set; }
        public string PressReleaseLevel { get; set; }
        public string PressReleaseLevelHindi { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string DistrictNameHindi { get; set; }
        public string DistrictName { get; set; }
        public string VIPCategory { get; set; }
        public string VIPCategoryHindi { get; set; }
        public string VIPPersion { get; set; }
        public string VIPPersionHindi { get; set; }
        public List<string> Attachments { get; set; }
        public List<string> ImageAttachments { get; set; }
        public int TotalRecords { get; set; }
        public Nullable<long> CommonCategoryCode { get; set; }
        public string PressReleaseTime { get; set; }
        public Nullable<System.DateTime> PressreleaseDate { get; set; }
        public string PressReleaseDateHindi { get; set; }
    }

    public class PressReleaseFrontSearchModel : IndexModel
    {
        public int DepartmentCode { get; set; }
        public int DistrictDepartmentCode { get; set; }
        public int DistrictCode { get; set; } = 0;
        public int CategoryCode { get; set; }
        public int SubCategoryCode { get; set; }
        public bool IsBase64File { get; set; }
        public long VIPPersonCode { get; set; }
        public long EntryNumber { get; set; }

    }

    public class PressReleaseProgramPhotoFrontSearchModel : IndexModel
    {
        public int DepartmentCode { get; set; }
        public int DistrictDepartmentCode { get; set; }
        public int DistrictCode { get; set; } = 0;
        public int CategoryCode { get; set; }
        public int SubCategoryCode { get; set; }
        public bool IsBase64File { get; set; }
        public string VIPPersonCode { get; set; }
        public string VIPCategoryCode { get; set; }
        public long EntryNumber { get; set; }
        public bool IsHomePageImageRequired { get; set; }

    }

    public class PressReleaseProgramPhotoVideoModel
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
        public string HomePageImageUrl { get; set; }
        public string PressReleaseTime { get; set; }
        public Nullable<System.DateTime> PressreleaseDate { get; set; }
        public string PressreleaseDateHindi { get; set; }
    }

    public class DepartmentDetailModel
    {
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string DepartmentAddress { get; set; }
        public string DepartmentAddressHindi { get; set; }
        public Nullable<int> Department_DistrictCode { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string WebsiteName { get; set; }
        public string NodalOfficerName { get; set; }
        public string NodalOfficerDesignation { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string SSOID { get; set; }
        public string DisplayName { get; set; }
        public string FacebookURL { get; set; }
        public string TwitterURL { get; set; }
        public string YoutubeURL { get; set; }
        public string InstagramURL { get; set; }
        public string CMISDeptID { get; set; }
        public Nullable<long> DepartmentDistrictCode { get; set; }
        public Nullable<long> CMOOfficerCode { get; set; }
        public string LogoUrl { get; set; }
        public string DepartmentPassword { get; set; }
        public string WebsiteImage { get; set; }
        public string StateMinisterPhoto { get; set; }
        public string CabinetMinisterPhoto { get; set; }
        public string WebsiteDynamicCategory { get; set; }
        public string WebsiteDynamictransaction { get; set; }
        public string StateMinisterNameEnglish { get; set; }
        public string StateMinisterNameHindi { get; set; }
        public string CabinetMinisterNameEnglish { get; set; }
        public string CabinetMinisterNameHindi { get; set; }
        public List<DeparmtentWebsiteUrl> DeparmtentWebsiteUrlModel { get; set; }
        //public string DesignationShortName { get; set; }
        public string StateMinisterDesignationShortName { get; set; }
        public string CabinateMinisterDesignationShortName { get; set; }
        public string StateMinisterDesignationShortNameHindi { get; set; }
        public string CabinateMinisterDesignationShortNameHindi { get; set; }
        public string DefaultLanguage { get; set; }
    }

    public class DeparmtentWebsiteUrl
    {
        public int DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
    }

    public class DptWebsiteOtherLinkFilterModel
    {
        public int TopCount { get; set; }
        public long CommonCategoryCode { get; set; }
        public int DepartmentCode { get; set; }

    }

    public class DeptOtherLinkSubMenuModel
    {
        public long Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<long> DepartmentMainMenuCode { get; set; }
        public string ModuleName { get; set; }
        public Nullable<long> ModuleCategoryCode { get; set; }
        public string IconImage { get; set; }
        public Nullable<bool> IsSubMenu { get; set; }
        public string DisplayNameEnglish { get; set; }
        public string DisplayNameHindi { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public Nullable<long> DepartmentSubMenuCode { get; set; }
        public Nullable<long> ModuleSubCategoryCode { get; set; }
        public Nullable<long> SubMenuShowAsSeparateCode { get; set; }
        public Nullable<long> RedirectionManagementRadio { get; set; }
        public string PDFAttachment { get; set; }
        public string RedirectionURL { get; set; }

        public bool HasRecords { get; set; }
        public List<DptWebsiteOtherLinkDataModel> OtherLinkList { get; set; }
    }

    public class DptWebsiteOtherLinkDataModel
    {
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string IconPath { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string DateHindi { get; set; }
        public string RedirectURL { get; set; }
        public Nullable<bool> IsVisibleDate { get; set; }
        public Nullable<bool> IsImageMandatory { get; set; }
        public string ImagePath { get; set; }
    }

    public class DptWebsiteOtherGeneralLinkModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public Nullable<long> CommonCategoryCode { get; set; }
        public string IconPath { get; set; }
        public string NameHindi { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string ModuleName { get; set; }
    }

    public class JANDptWebsiteOtherTransactionLinkModel
    {
        public int Id { get; set; }
        public string Achievement { get; set; }
        public string AchievementHindi { get; set; }
        public Nullable<int> AchievementCategoryCode { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string Description { get; set; }
        public string DescriptionHindi { get; set; }
        public int Priority { get; set; }
        public string PdfFIleName { get; set; }
        public string Url { get; set; }
        public Nullable<System.DateTime> AchievementDate { get; set; }
        public string AchievementDateHindi { get; set; }
        public Nullable<bool> IsVisibleDate { get; set; }
        public Nullable<bool> IsImageMandatory { get; set; }
        public string ImagePath { get; set; }
    }


    public class DepartmentMenuListModel
    {
        public List<GenerateMenuListForDepartmentModel> MenuList { get; set; }
        public List<GenerateSubMenuListForDepartmentModel> SubMenuList { get; set; }
        public List<GenerateSubSubMenuListForDepartmentModel> SubSubMenuList { get; set; }
    }

    public class GenerateMenuListForDepartmentModel
    {
        public long Id { get; set; }
        public Nullable<long> MainMenuCode { get; set; }
        public string DisplayNameEnglish { get; set; }
        public string DisplayNameHindi { get; set; }
        public bool IsSubMenu { get; set; }
        public bool IsExternalUrl { get; set; }
        public string ExternalUrl { get; set; }
        public string InternalUrl { get; set; }
    }

    public class GenerateSubMenuListForDepartmentModel
    {
        public long Id { get; set; }
        public long SubMenuCode { get; set; }
        public Nullable<long> DepartmentMainMenuCode { get; set; }
        public string IconImage { get; set; }
        public bool IsSubMenu { get; set; }
        public Nullable<long> DepartmentSubMenuCode { get; set; }
        public string DisplayNameEnglish { get; set; }
        public string DisplayNameHindi { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public string Url { get; set; }
        public Nullable<long> ModuleCategoryCode { get; set; }
        public Nullable<long> RedirectionManagementRadio { get; set; }
        public string PDFAttachment { get; set; }
        public string RedirectionURL { get; set; }
    }

    public class GenerateSubSubMenuListForDepartmentModel
    {
        public long Id { get; set; }
        public Nullable<long> DepartmentMainMenuCode { get; set; }
        public string IconImage { get; set; }
        public bool IsSubMenu { get; set; }
        public Nullable<long> DepartmentSubMenuCode { get; set; }
        public string DisplayNameEnglish { get; set; }
        public string DisplayNameHindi { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public string Url { get; set; }
        public Nullable<long> ModuleCategoryCode { get; set; }
        public Nullable<long> RedirectionManagementRadio { get; set; }
        public string PDFAttachment { get; set; }
        public string RedirectionURL { get; set; }
    }

    #region DIPR ContactUs
    public class DIPRFrontContactUsModel
    {
        public long Id { get; set; }
        public string IPAddress { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
    }
    #endregion

}
