using CMOWebApi.Models.GeneralModel;
using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class ChildPageMasterModel
    {
        public long Id { get; set; }
        public Nullable<long> PageCode { get; set; }
        public Nullable<long> PageDescriptionCategory { get; set; }
        public string Description { get; set; }
        public string PDFURL { get; set; }
        public string ImageURL { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public Nullable<int> PageTypeCode { get; set; }
        public Nullable<int> LookupTypeId { get; set; }
        public Nullable<long> SchemeTypeCode { get; set; }
        public string URL { get; set; }
        public int ManualTypeCode { get; set; }
    }

    public class ChildPageMasterViewModel
    {
        public long Id { get; set; }
        public Nullable<int> Code { get; set; }
        public Nullable<long> PageCode { get; set; }
        public Nullable<long> PageDescriptionCategory { get; set; }
        public string Description { get; set; }
        public string PDFURL { get; set; }
        public string ImageURL { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string PageTitle { get; set; }
        public string ApplicationTitle { get; set; }
        public string AplicationDisplayTitle { get; set; }
        public string PageTypeName { get; set; }
        public string MenuTitle { get; set; }
        public string DefaultUrl { get; set; }
        public Nullable<int> PageTypeCode { get; set; }
        public Nullable<int> LookupTypeId { get; set; }
        public Nullable<long> SchemeTypeCode { get; set; }
        public string PageDescriptionCategoryName { get; set; }
        public string URL { get; set; }
        public int ManualTypeCode { get; set; }
        public string ManualType { get; set; }
    }

    public class PageManualModel
    {
        public Nullable<int> LookupTypeId { get; set; }
        public Nullable<long> SchemeTypeCode { get; set; }
        public string menuName { get; set; }
    }

    public class ChildPageFilterModel:IndexModel
    {
        public long PageCode { get; set; }
        public int PageTypeCode { get; set; }
        public string ApplicationCode { get; set; }
        public int ManualTypeCode { get; set; }
    }

    public class PageMasterDetailModel
    {
        public long PageCode { get; set; }
        public long PageId { get; set; }
        public string PageTitle { get; set; }
        public string ApplicationTitle { get; set; }
        public string AplicationDisplayTitle { get; set; }
        public string PageTypeName { get; set; }
        public string MenuTitle { get; set; }
        public string DefaultUrl { get; set; }
    }

}
