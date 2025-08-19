using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class DepartmentProfileViewModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> EntryTypeCode { get; set; }
        public string Details { get; set; }
        public string ImageURL { get; set; }
        public string PDFURL { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string DepartmentShortTitle { get; set; }
        public string DepartmentShortTitleHindi { get; set; }
        public string EntryTypeName { get; set; }
        public string EntryTypeNameHindi { get; set; }
        public Nullable<int> EntryTypeDisplayOrder { get; set; }
    }

    public class DepartmentProfileFilterModel
    {

        public int DepartmentCode { get; set; }
        public int EntryTypeCode { get; set; }
        public int JankalyanCategoryCode { get; set; }
        public IndexModel indexModel { get; set; }
    }

    public class DepartmentContactFilterModel

    {

        public int DepartmentCode { get; set; }
        public int DesignationCode { get; set; }
        public IndexModel indexModel { get; set; }
    }
    public  class DepartmentContactViewModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> DesignationCode { get; set; }
        public string OfficerName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string SSOID { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string DesignationName { get; set; }
        public string DesignationNameHindi { get; set; }
        public string DesignationLevel { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string DepartmentShortTitle { get; set; }
        public string DepartmentShortTitleHindi { get; set; }
    }
}
