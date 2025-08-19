using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.VendorPressRelease
{
    public class PressReleaseModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public Nullable<int> SubCategoryCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string GeneralDescription { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
        public string PDFUrl { get; set; }
        public List<string> PDFUrlList { get; set; }
        public List<string> ImageUrlList { get; set; }
        public string ImageUrl { get; set; }
        public string HomePageImageUrl { get; set; }
        public string KeyWords { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public List<string> VIPCategoryList { get; set; }
        public List<string> VIPPersionList { get; set; }
        public Nullable<bool> IsSpecialPressRelease { get; set; }
        public Nullable<long> PressReleaseLevelCode { get; set; }
        public Nullable<System.DateTime> PressreleaseDate { get; set; }
        public List<string> PressReleaseDepartmentMappingList { get; set; }
        public List<string> DistrictList { get; set; }

        public Nullable<bool> IsOldRecord { get; set; }
        public string PressReleaseTime { get; set; }
        public string DistrictName { get; set; }
        public string VIPPersonName { get; set; }
        public Nullable<decimal> DIPR_Id { get; set; }
        public Nullable<long> LookupCategoryCode { get; set; }
        public string NameOfVIPPerson { get; set; }
        public string AmountinLakh { get; set; }
        public string NoOfInaugration { get; set; }
        public string NoOfLokarpan { get; set; }
        public string NoOfNewInitatives { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
    }

    public class PressReleaseListModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public Nullable<int> SubCategoryCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string GeneralDescription { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public string PDFUrl { get; set; }
        public string ImageUrl { get; set; }
        public string HomePageImageUrl { get; set; }
        public string KeyWords { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<decimal> DIPR_Id { get; set; }
        public string DepartmentTitle { get; set; }
        public string DistrictName { get; set; }
        public string ModifiedByName { get; set; }
        public Nullable<int> ImageAttachmentCount { get; set; }
        public Nullable<int> AttachmentCount { get; set; }
        public string CategoryNameEnglish { get; set; }
        public string CategoryNameHindi { get; set; }
        public string SubCategoryNameEnglish { get; set; }
        public string SubCategoryNameHindi { get; set; }
        public int TotalRecords { get; set; }
        public Nullable<System.DateTime> PressreleaseDate { get; set; }
    }

    public class PressReleaseFilterModel : IndexModel
    {
        public string DepartmentCode { get; set; }
        public string DistrictCode { get; set; }
        public string VIPCategoryCode { get; set; }
        public string VIPPersonCode { get; set; }
        public int? CategoryCode { get; set; }
        public int? SubCategoryCode { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? Status { get; set; }
        public long Id { get; set; }
        public long DIPR_Id { get; set; }
        public string PressReleaseFromDate { get; set; }
        public string PressReleaseToDate { get; set; }
        public int? ModifiedBy { get; set; }

    }

    #region Press release user configration
    public class PressReleaseUserConfigrationModel
    {
        public int Id { get; set; }
        public string UserType { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<long> StartNo { get; set; }
        public Nullable<long> EndNo { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string UserName { get; set; }
    }
    #endregion
}
