
using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel
{
    public class AdvertisementModel
    {

        public long Id { get; set; }

        public int? Category { get; set; }

        public int? SubCategory { get; set; }

        public string SubjectEng { get; set; }

        public string SubjectHin { get; set; }

        public DateTime? AdvDate { get; set; }

        public string DocumentUrl { get; set; }

        public DateTime? CreateDate { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public int? ModifiedBy { get; set; }

        public bool? IsActive { get; set; } = false;

        public bool? IsDeleted { get; set; } = false;
        public string PdfUrl { get; set; }
        public DateTime? ExpiryDate { get; set; }

        public List<string> AdminDepartment { get; set; }

        public List<string> BeneficiaryCategories { get; set; }

        public List<string> Districts { get; set; }
    }
    public class TblAdvtAdminDepartmentModel
    {
        public long Id { get; set; }

        public long AdvertisementId { get; set; }

        public long? AdminDepartmentId { get; set; }
    }
    public class TblAdvtBeneficiaryCategoryModel
    {
        public long Id { get; set; }

        public long AdvertisementId { get; set; }

        public long? BeneficiaryCategoryId { get; set; }

    }
    public class TblAdvtDistrictModel
    {
        public long Id { get; set; }

        public long AdvertisementId { get; set; }

        public long? DistrictId { get; set; }

    }
    public class AdvertisementViewModel
    {
        public long Id { get; set; }

        public int? Category { get; set; }

        public int? SubCategory { get; set; }

        public string CategoryName { get; set; }

        public string SubCategoryName { get; set; }

        public string SubjectEng { get; set; }

        public string SubjectHin { get; set; }

        public DateTime? AdvDate { get; set; }

        public string DocumentUrl { get; set; }

        public DateTime? CreateDate { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public int? ModifiedBy { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public DateTime? ExpiryDate { get; set; }
        public decimal? NotificationPeriod { get; set; }

        public string DistrictIds { get; set; }

        public string DistrictNames { get; set; }

        public string BeneficiaryCategories { get; set; }

        public string BeneficiaryCategoriesName { get; set; }

        public string AdminDepartments { get; set; }

        public string AdminDepartmentsName { get; set; }

        public string PdfUrl { get; set; }
    }
    public class AdvertisementListModel
    {

        public long Id { get; set; }

        public bool? IsActive { get; set; }

        public string SubjectEng { get; set; }

        public string SubjectHin { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public bool? IsLock { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }

    }

    public partial class RedesignRequestByPlatformUserLookupModel
    {
        public long Id { get; set; }
        public long RedesignPlatformUserLookupId { get; set; }
        public string RequestUrl { get; set; }
    }

    public partial class RedesignRequestByPlatformUserViewModel
    {
        public bool IsNew { get; set; }
        public string Url { get; set; }
    }

    public partial class RedesignRequestModel
    {

        [Required]
        public long RedesignPlatformUserLookupId { get; set; }
        public long AdvertisementId { get; set; }
        [Required]
        public List<RedesignRequestByPlatformUserLookupModel> RedesignRequestByPlatformUserList { get; set; }
    }

    public class RedesignViewForAdminModel
    {
        public string SubjectEng { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string SubjectHin { get; set; }
        public long AdvId { get; set; }
        public bool IsApproved { get; set; }
        public bool IsUploaded { get; set; }
        public string IsUploadedStatus { get; set; }
        public string IsApprovedStatus { get; set; }
        public long RedesignPlatformUserLookupId { get; set; }
        public int RequestedStatus { get; set; }
        public bool IsRejected { get; set; }
    }

    public class AdvertisementRedesignRequestIdModel
    {
        [Required(ErrorMessage = "Advertisement Id not found")]
        public long AdvId { get; set; }
        public long RedesignId { get; set; }
    }

    public class RedesignDetailModel
    {
        public AdvertisementViewModel AdvertisementList { get; set; }

        public bool? IsApproved { get; set; }

        public string Remaks { get; set; }

        public bool? IsRejected { get; set; }

        public List<RedesignRequestByPlatformUserViewModel> RequestImageList { get; set; }
    }

    public class ApproveByAdminModel
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public bool? IsApprove { get; set; }

        [Required]
        public string Remaks { get; set; }
    }

    public class AdvListForAdmindeptDptPlatformUserModel
    {
        public string SubjectEng { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string SubjectHin { get; set; }
        public long AdvId { get; set; }
        public long? Type { get; set; }
        public long? MappingCode { get; set; }
        public bool IsApproved { get; set; }
        public string IsUploadedStatus { get; set; }
        public bool IsUploaded { get; set; }
        public string UserDptName { get; set; }
        public string IsApprovedStatus { get; set; }
        public long RedesignPlatformUserLookupId { get; set; }
        public int RequestedStatus { get; set; }
        public bool IsRejected { get; set; }
        public long NotificationLookupId { get; set; }
        public string DocumentUrl { get; set; }
        public Nullable<bool> IsApprovalUserOrNot { get; set; }
    }

    public class AdvertisementByDateModel
    {

        public string SubjectEng { get; set; }

        public string SubjectHin { get; set; }

        public string DocumentUrl { get; set; }

        public string DistrictNames { get; set; }
        public string BeneficiaryCategoriesName { get; set; }

        public string AdminDepartmentsName { get; set; }

        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string PdfUrl { get; set; }
    }

    public class AdvertisementAchievementModel
    {
        public List<AdvertisementByDateModel> AdvertismentDataList { get; set; }

        public List<GovermentAchievementViewModel> GovAchievementDataList { get; set; }

        public int? IsAdvertisementorGovermentAchivement { get; set; }
    }


    public class ApiGetDataModel
    {
        public ApiGetDataModel()
        {
            this.Fromdate = string.Empty;
            this.Todate = string.Empty;
            this.Id = 0;
        }
        public string Todate { get; set; }
        public string Fromdate { get; set; }
        public long? Id { get; set; }

    }

    #region Goverment Achivement Model

    public class GovermentAchievementViewModel
    {
        public long Id { get; set; }
        public string ImageUrl { get; set; }
        public string departmentCode { get; set; }
        public string UploadAttachment { get; set; }
        public string description1 { get; set; }
        public string description2 { get; set; }
        public string description3 { get; set; }
        public string description4 { get; set; }
        public string DepartmentTitle { get; set; }
    }

    public class GovermentAchievementModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public string ImageUrl { get; set; }
        public string departmentCode { get; set; }
        public string UploadAttachment { get; set; }
        public string description1 { get; set; }
        public string description2 { get; set; }
        public string description3 { get; set; }
        public string description4 { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string DetailText { get; set; }
    }

    public class AdvertisementOrGovermentAchievementModel
    {
        public int Id { get; set; }
        public Nullable<int> IsAdvertisementorGovermentAchivement { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string AdvtPopupHeaderUrl { get; set; }

    }
    #endregion

    #region Service For All Department and other User

    public class AdvertisementByDateServiceModel
    {

        public string SubjectEng { get; set; }

        public string SubjectHin { get; set; }

        public string DocumentUrl { get; set; }
        public string PdfUrl { get; set; }
    }

    public class AdvertisementServiceModel
    {
        public string DocumentUrl { get; set; }
        public string PdfUrl { get; set; }
    }

    public class GovermentAchievementServiceModel
    {
        public long Id { get; set; }
        public string ImageUrl { get; set; }
        public string UploadAttachment { get; set; }
        public string DetailText { get; set; }
    }

    public class AllAdvertisementAndGovAchievmentListModel
    {
        public List<AdvertisementByDateServiceModel> AdvertismentDataList { get; set; }

        public List<GovermentAchievementServiceModel> GovAchievementDataList { get; set; }

        public int? IsAdvertisementorGovermentAchivement { get; set; }
    }
    #endregion

    #region RajAdvt Site 

    public class RajAdvtPortalAddLogRequestModel
    {
        [Required]
        public string WebSitUrl { get; set; }
    }

    public class RajAdvtPortalLogModel
    {
        public long Id { get; set; }
        public string IPAddress { get; set; }
        public string WebSitUrl { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
    }

    public class RajAdvtPortalLogCountModel
    {
        public long Count { get; set; }
    }

    public class VisitorCountReportViewModel
    {
        public string WebSitUrl { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> VisitorCount { get; set; }
    }

    public class PledgedCountReportViewModel
    {
        public string WebSitUrl { get; set; }
        public Nullable<int> VisitorCount { get; set; }

    }

    public partial class VisitorCountDetailReportViewModel
    {
        public string WebSitUrl { get; set; }
        public string IPAddress { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
    }

    public class VisitorCountSearchModel : IndexModel
    {
        public string WebSitUrl { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string CustomSearch { get; set; }

    }
    #endregion

    #region RajAdvt Pledge Register

    public class RajAdvtPledgeRegisterModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public Nullable<int> Gender { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public string PinCode { get; set; }
        public Nullable<int> State { get; set; }
        public Nullable<int> District { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public int OTP { get; set; }

    }

    #endregion

    #region Jankalyan advertisement model

    public class ADVTJankalyanAdvertisementModel
    {
        public int Id { get; set; }
        public string ImageIcon { get; set; }
        public string ButtonName { get; set; }
        public string ImageUrl { get; set; }
        public Nullable<bool> IsArrow { get; set; } = false;
        public Nullable<int> DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<long> AdvertisementPopupCode { get; set; }
        public Nullable<int> sortOrder { get; set; }
    }

    #endregion

    #region AdvertisementPoppup
    public class GetAdvertisementPoppupDataModel
    {
        public List<DisplayNewspaperAdvertisementPoppupModel> DisplayNewspaperAdvertisementPoppupList { get; set; }
        public List<SectorWiseAdvertisementPoppupModel> SectorWiseAdvertisementPoppupList { get; set; }
        public List<EbookletAndDisplayNewspaperAdvertisementPoppupModel> EbookletAndDisplayNewspaperAdvertisementPoppupList { get; set; }
        public List<SocialMediaAndEbookletAdvertisementPoppupModel> SocialMediaAndEbookletAdvertisementPoppupList { get; set; }
        public int? IsAdvertisementorGovermentAchivement { get; set; }
        public string AdvtPopupHeaderUrl { get; set; }

    }

    public class SectorWiseAdvertisementPoppupModel
    {
        public string ImageUrl { get; set; }
        public string DetailText { get; set; }
        public string UploadAttachment { get; set; }
    }
    public class DisplayNewspaperAdvertisementPoppupModel
    {
        public string PdfUrl { get; set; }
        public string DocumentUrl { get; set; }
        public string SubjectHin { get; set; }

    }
    public class EbookletAndDisplayNewspaperAdvertisementPoppupModel
    {
        public string ButtonName { get; set; }
        public string ImageIcon { get; set; }
        public bool IsArrow { get; set; }
        public int DisplayOrder { get; set; }
        public long AdvertisementPopupCode { get; set; }
        public string ImageUrl { get; set; }
    }
    public class SocialMediaAndEbookletAdvertisementPoppupModel
    {
        public string Achievement { get; set; }
        public string AchievementHindi { get; set; }
        public string Url { get; set; }
        public Nullable<long> AchievementSubCategoryCode { get; set; }
        public Nullable<System.DateTime> AchievementDate { get; set; }
        public string PdfFIleName { get; set; }
        public string ImagePath { get; set; }
    }
    #endregion


}