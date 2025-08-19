using CMOWebApi.Models.GeneralModel;
using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class DepartmentSubMenuModel
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
        public bool IsActive { get; set; } = true;
        public bool IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<long> DepartmentSubMenuCode { get; set; }
        public Nullable<long> ModuleSubCategoryCode { get; set; }
        public Nullable<long> SubMenuShowAsSeparateCode { get; set; }
        public Nullable<long> RedirectionManagementRadio { get; set; }
        public string PDFAttachment { get; set; }
        public string RedirectionURL { get; set; }
    }



    public class DepartmentSubMenuListModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public string ModuleName { get; set; }
        public string IconImage { get; set; }
        public Nullable<bool> IsSubMenu { get; set; }
        public string DisplayNameEnglish { get; set; }
        public string DisplayNameHindi { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public bool IsActive { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string DepartmentMainMenuName { get; set; }
        public string DepartmentTitle { get; set; }
        public string CreatedByName { get; set; }
        public string ModifiedByName { get; set; }
        public string DepartmentSubSubMenuName { get; set; }
        public string ModuleNameEnglish { get; set; }
        public string ModuleCategoryNameEnglish { get; set; }
        public Nullable<long> SubMenuShowAsSeparateCode { get; set; }
        public string SubMenuShowAsSeparateName { get; set; }
        public Nullable<long> RedirectionManagementRadio { get; set; }
        public string RedirectionManagementRadioName { get; set; }
    }

    public class DepartmentSubMenuFilterModel : IndexModel
    {
        public string ModuleName { get; set; }
        public long ModuleCategoryCode { get; set; }
        public long ModuleSubCategoryCode { get; set; }
        public long DepartmentSubMenuCode { get; set; }
        public long MainMenuCode { get; set; }
        public string ModifiedToDate { get; set; }
        public string ModifiedFromDate { get; set; }
        public int? Status { get; set; }
        public int ModifiedBy { get; set; }
        public int DepartmentCode { get; set; }
        public string SubMenuShowAsSeparateCode { get; set; }
        public string RedirectionManagementRadio { get; set; }
    }

    #region ImportSectionMenuAndSubMenu
    public class ImportSectionMenuAndSubMenuFilterModel
    {
        public int FromDepartmentCode { get; set; }
        public string ToDepartmentCodes { get; set; }
        public bool IsSectionImport { get; set; }
        public bool IsMenuImport { get; set; }
        public bool IsSubMenuImport { get; set; }
    }
    #endregion
}
