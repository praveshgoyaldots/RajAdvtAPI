using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class DepartmentMasterModel
    {
        public int DepartmentId { get; set; }
        [Display(Name = "Department Title")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string DepartmentShortTitle { get; set; }
        public string DepartmentShortTitleHindi { get; set; }
        public string DepartmentAddress { get; set; }
        public string DepartmentAddressHindi { get; set; }
        public Nullable<int> Department_DistrictCode { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        [Display(Name = "Admin Department")]
        [Required(ErrorMessage = "{0} is Required!")]
        public Nullable<int> Department_AdmDepartmentCode { get; set; }
        public Nullable<int> Department_GroupCode { get; set; }
        public Nullable<bool> DepartmentIsActive { get; set; } = true;
        public Nullable<bool> DepartmentIsDeleted { get; set; } = false;
        public string WebsiteName { get; set; }
        public string NodalOfficerName { get; set; }
        public string NodalOfficerDesignation { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string SSOID { get; set; }
        public Nullable<int> DepartmentCategoryCode { get; set; }
        public string DisplayName { get; set; }
        public string FacebookURL { get; set; }
        public string TwitterURL { get; set; }
        public string YoutubeURL { get; set; }
        public string InstagramURL { get; set; }
        public string CMISDeptID { get; set; }
        public Nullable<long> DepartmentDistrictCode { get; set; }
        public Nullable<long> CMOOfficerCode { get; set; }
        public string LogoUrl { get; set; }
        public Nullable<int> DisplayOrderWithinAdminDepartment { get; set; }
        public string DepartmentPassword { get; set; }
        public Nullable<bool> IsWebsiteFromJankalyanPortal { get; set; }
        public Nullable<int> CabinetMinisterCode { get; set; }
        public Nullable<int> StateMinisterCode { get; set; }
        public string WebsiteImage { get; set; }
        public string WebsiteDynamicCategory { get; set; }
        public string WebsiteDynamictransaction { get; set; }
        public Nullable<bool> IsAllowMultipleDistrictAndAssembly { get; set; } = false;
        public string DefaultLanguage { get; set; }
    }

    public class DepartmentMasterViewModel
    {
        public int DepartmentId { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string DepartmentShortTitle { get; set; }
        public string DepartmentShortTitleHindi { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentAddress { get; set; }
        public string DepartmentAddressHindi { get; set; }
        public Nullable<bool> DepartmentIsActive { get; set; }
        public Nullable<bool> DepartmentIsDeleted { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string AdmDepartmentTitle { get; set; }
        public string AdmDepartmentTitleHindi { get; set; }
        public string GroupTitle { get; set; }
        public string GroupTitleHindi { get; set; }
        public string DistrictTitle { get; set; }
        public string DistrictTitleHindi { get; set; }
        public string DepartmentCategoryName { get; set; }
        public string DisplayName { get; set; }
        public Nullable<int> DepartmentMenuCount { get; set; }
        public Nullable<int> DepartmentSectionCount { get; set; }
        public Nullable<int> DepartmentSubMenuCount { get; set; }
    }

    #region Report Scheme and department

    public class DepartmentReportModel
    {
        public int DepartmentId { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
    }

    public class DepartmentSchemeReportModel
    {
        public long Id { get; set; }
        public string ShortNameHindi { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }
        public string NameEnglish { get; set; }
        public string NodalDepartmentTitle { get; set; }
        public Nullable<int> NodelDepartmentCode { get; set; }
    }

    #endregion

    #region Website Details

    public class LoginUserDepartmentListModel
    {
        public int DepartmentId { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string DepartmentShortTitle { get; set; }
        public string DepartmentShortTitleHindi { get; set; }

        [Display(Name = "Website Name")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string WebsiteName { get; set; }

        [Display(Name = "Nodal Officer Name")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string NodalOfficerName { get; set; }

        [Display(Name = "Nodal Officer Designation")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string NodalOfficerDesignation { get; set; }

        [Display(Name = "Mobile No.")]
        [Required(ErrorMessage = "{0} is Required!")]
        //[RegularExpression(@"^([0]|\+91[\-\s]?)?[6789]\d{9}$", ErrorMessage = "Entered Mobile No is not valid.")]
        public string MobileNo { get; set; }

        [Display(Name = "Email")]
        //[Required(ErrorMessage = "{0} is Required!")]
        public string Email { get; set; }
        public string SSOID { get; set; }
        public string FacebookURL { get; set; }
        public string TwitterURL { get; set; }
        public string YoutubeURL { get; set; }
        public string InstagramURL { get; set; }
        public string DepartmentPassword { get; set; }
        public Nullable<int> CabinetMinisterCode { get; set; }
        public Nullable<int> StateMinisterCode { get; set; }
        public string WebsiteImage { get; set; }
        public string WebsiteDynamicCategory { get; set; }
        public string WebsiteDynamictransaction { get; set; }
        public string DefaultLanguage { get; set; }
    }

    #endregion

    #region Department Profile

    public class DepartmentProfileModel
    {
        public long Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> EntryTypeCode { get; set; }
        public string Details { get; set; }
        public string ImageURL { get; set; }
        public string PDFURL { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public Nullable<int> JankalyanCategoryCode { get; set; }
    }

    public class DepartmentProfileListModel
    {
        public long Id { get; set; }
        public string Details { get; set; }
        public string ImageURL { get; set; }
        public string PDFURL { get; set; }
        public string DepartmentTitle { get; set; }
        public string EntryTypeName { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string CreatedByName { get; set; }
        public string ModifiedByName { get; set; }
        public string JankalyanCategoryHindi { get; set; }
        public string JankalyanCategoryEnglish { get; set; }
    }

    public class DepartmentProfileExistModel
    {
        public long Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> EntryTypeCode { get; set; }
    }

    public class DptProfileFilterModel : IndexModel
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int DepartmentCode { get; set; }

        public int JankalyanCategoryCode { get; set; }

        public int EntryTypeCode { get; set; }
    }

    #endregion
}
