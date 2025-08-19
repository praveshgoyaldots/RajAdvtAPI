using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class Adv_AchievementViewModel
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
        public Nullable<int> CreatedBy { get; set; }
        public string Department { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsVisible { get; set; }
        public Nullable<long> AchievementSubCategoryCode { get; set; }
        public string ImagePath { get; set; }
        public string ThumbnailPath { get; set; }
        public string AchievementCategory { get; set; }
        public string AchievementCategoryHindi { get; set; }
        public Nullable<bool> AchievementCategoryIsVisible { get; set; }
        public Nullable<bool> CategorydepVisible { get; set; }
        public string AchievementCategoryImagePath { get; set; }
        public string AchievementSubCategory { get; set; }
        public string AchievementSubCategoryHindi { get; set; }
        public string AchievementSubCategoryImagePath { get; set; }
        public string DepartmentHindi { get; set; }

        public List<string> ImageFiles { get; set; }

        public string UserName { get; set; }

        public string KeyWord { get; set; }

        public string CMOComments { get; set; }

        public int TotalCount { get; set; }
        public List<String> AchievementAttachments { get; set; }
        public List<AchievementConnectWithCMISParameterModel> ConnectWithCMIS { get; set; }

        public List<string> BenificiaryList { get; set; }
    }

    public class SubCategoryGroupAchievementListViewModel
    {
        public Nullable<long> AchievementSubCategoryCode { get; set; }
        public string AchievementSubCategory { get; set; }
        public string AchievementSubCategoryHindi { get; set; }
        public string AchievementSubCategoryImagePath { get; set; }

        public List<Adv_AchievementViewModel> Items { get; set; }


    }

    public class CategoryGroupAchievementListViewModel
    {
        public Nullable<long> AchievementCategoryCode { get; set; }
        public string AchievementCategory { get; set; }
        public string AchievementCategoryHindi { get; set; }
        public string AchievementCategoryImagePath { get; set; }

        public List<Adv_AchievementViewModel> Items { get; set; }


    }


    public class DepartmentGroupAchievementListViewModel
    {
        public Nullable<int> DepartmentCode { get; set; }
        public string Department { get; set; }
        public string DepartmentHindi { get; set; }

        public List<Adv_AchievementViewModel> Items { get; set; }
        public int TotalItems { get; set; }


    }

    public partial class AchievementSearchModel
    {
        public int AdmDepartmentCode { get; set; }
        public int DepartmentCode { get; set; }
        public int CategoryCode { get; set; }
        public int SubCategoryCode { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string SearchKeyword { get; set; }
        public bool IsUrlRequired { get; set; }
        public bool IsImageRequired { get; set; }
        public bool IsPdfRequired { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsVisibleInHome { get; set; }

        public bool? IsVisibleInFront { get; set; }

        public IndexModel IndexModel { get; set; }
        public long CommonCategoryCode { get; set; }

        public bool IsBase64File { get; set; }

    }

    #region Jankalyan Front-end

    public class AchievementDepartmentlistModel
    {
        public Nullable<int> DepartmentCode { get; set; }
        public string Department { get; set; }
        public string DepartmentHindi { get; set; }
    }

    public class ImportantDecisionSearchModel : IndexModel
    {
        public long? Id { get; set; } = 0;
        public int? AdmDepartmentCode { get; set; }
        public int? DepartmentCode { get; set; }
        public int? CategoryCode { get; set; }
        public int? SubcategoryCode { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
        public string SearchKeyword { get; set; }
        public int Status { get; set; } = 1;

    }

    public class ImportantDecisionListModel
    {
        public int Id { get; set; }
        public string Achievement { get; set; }
        public string AchievementHindi { get; set; }
        public string Description { get; set; }
        public string DescriptionHindi { get; set; }
        public int Priority { get; set; }
        public string PdfFIleName { get; set; }
        public string Url { get; set; }
        public Nullable<System.DateTime> AchievementDate { get; set; }
        public string CategoryEng { get; set; }
        public string CategoryHindi { get; set; }
        public string SubCategoryEng { get; set; }
        public string SubCategoryHindi { get; set; }
        public string SubCategoryImagePath { get; set; }
        public string DepartmentEng { get; set; }
        public string DepartmentHindi { get; set; }
        public int TotalCount { get; set; }
    }

    public class ImportantDecisionDetailModel
    {
        public int Id { get; set; }
        public string Achievement { get; set; }
        public string AchievementHindi { get; set; }
        public string Description { get; set; }
        public string DescriptionHindi { get; set; }
        public int Priority { get; set; }
        public string PdfFIleName { get; set; }
        public string Url { get; set; }
        public Nullable<System.DateTime> AchievementDate { get; set; }
        public string AchievementDateHindi { get; set; }
        public string CategoryEng { get; set; }
        public string CategoryHindi { get; set; }
        public string SubCategoryEng { get; set; }
        public string SubCategoryHindi { get; set; }
        public string SubCategoryImagePath { get; set; }
        public string DepartmentEng { get; set; }
        public string DepartmentHindi { get; set; }
    }

    public class AchievementAttachmentModel
    {
        public List<string> ImageFiles { get; set; }
    }

    #endregion

    #region Reports

    public class ImpDescSummaryReportFilterModel
    {
        public Nullable<int> DepartmentCode { get; set; }
        public string CreatedFromDate { get; set; }
        public string CreatedToDate { get; set; }
    }

    public partial class ImportantDecisionSummaryReportModel
    {
        public Nullable<int> AchievementCategoryCode { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<long> AchievementSubCategoryCode { get; set; }
        public string CategoryEng { get; set; }
        public string CategoryHindi { get; set; }
        public string SubCategoryEng { get; set; }
        public string SubCategoryHindi { get; set; }
        public string DepartmentEng { get; set; }
        public string DepartmentHindi { get; set; }
        public Nullable<int> ImpDecCount { get; set; }
        public Nullable<int> ActiveImpDecCount { get; set; }
        public Nullable<int> DeActiveImpDecCount { get; set; }
    }

    public class ImportantDecisionCountReportModel
    {
        public string DepartmentTitle { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> DeActiveOrderCount { get; set; }
        public Nullable<int> ActiveOrderCount { get; set; }
    }

    public class ImportantDecisionCountReportFilterModel
    {
        public string EntryFromDate { get; set; }
        public string EntryToDate { get; set; }
    }

    public class ImportantDecisionDetailReportModel
    {
        public int Id { get; set; }
        public string Achievement { get; set; }
        public string AchievementHindi { get; set; }
        public string Description { get; set; }
        public string DescriptionHindi { get; set; }
        public int Priority { get; set; }
        public string PdfFIleName { get; set; }
        public string Url { get; set; }
        public Nullable<System.DateTime> AchievementDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsVisible { get; set; }
        public Nullable<bool> IsAchievement { get; set; }
        public string CategoryEng { get; set; }
        public string CategoryHindi { get; set; }
        public string SubCategoryEng { get; set; }
        public string SubCategoryHindi { get; set; }
        public string SubCategoryImagePath { get; set; }
        public string DepartmentEng { get; set; }
        public string DepartmentHindi { get; set; }
    }

    #endregion

    #region Achievement Reports

    public class AchievementsCategoryCountReportModel
    {
        public int DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<int> Videos { get; set; }
        public Nullable<int> Awards { get; set; }
        public Nullable<int> Advertisement { get; set; }
        public Nullable<int> BannerImage { get; set; }
        public Nullable<int> CabinetDecisions { get; set; }
        public Nullable<int> DepartmentalAchievements { get; set; }
        public Nullable<int> ExternalLink { get; set; }
        public Nullable<int> NewsTicker { get; set; }
        public Nullable<int> PhotoGallery { get; set; }
        public Nullable<int> Posters { get; set; }
        public Nullable<int> Publications { get; set; }
        public Nullable<int> UpcomingEvents { get; set; }
        public Nullable<int> Audio { get; set; }
        public Nullable<int> Total { get; set; }
        public Nullable<int> ImportantDecisions { get; set; }
    }

    #endregion


    public class RajAdvtSideBarModel
    {
        public string Achievement { get; set; }
        public string AchievementHindi { get; set; }
        public string Url { get; set; }
        public Nullable<long> AchievementSubCategoryCode { get; set; }
        public Nullable<System.DateTime> AchievementDate { get; set; }
        public string  AchievementDateHindi { get; set; }
        public string PdfFIleName { get; set; }
        public string ImagePath { get; set; }
        public string ThumbnailImagePath { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> TotalRows { get; set; }
    }
}
