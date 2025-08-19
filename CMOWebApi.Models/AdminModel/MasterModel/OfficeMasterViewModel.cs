using System;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{

    public class OfficeMasterViewModel
    {
        public long OfficeId { get; set; }
        public Nullable<long> OfficeCode { get; set; }
        [Display(Name = "Office Name")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(500, ErrorMessage = "{0} should not be more than {1} char")]
        public string OfficeName { get; set; }
        [Display(Name = "Office Name(Hindi)")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(500, ErrorMessage = "{0} should not be more than {1} char")]
        public string OfficeNameHindi { get; set; }
        [Display(Name = "Office Address")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(1000, ErrorMessage = "{0} should not be more than {1} char")]
        public string OfficeAddress { get; set; }
        [Display(Name = "Office Short Name")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(250, ErrorMessage = "{0} should not be more than {1} char")]
        public string OfficeShortName { get; set; }
        [Display(Name = "Office Short Name(Hindi)")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(250, ErrorMessage = "{0} should not be more than {1} char")]
        public string OfficeShortNameHindi { get; set; }

        [Display(Name = "AdminDepartment")]
        public Nullable<int> AdmDepartmentCode { get; set; }
        public string AdmDepartmentTitle { get; set; }

        [Display(Name = "Department")]
        [Required(ErrorMessage = "{0} is Required!")]
        public Nullable<int> DepartmentCode { get; set; }       
        public string Department { get; set; }       
        [Display(Name = "District")]
        [Required(ErrorMessage = "{0} is Required!")]
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<int> TehsilCode { get; set; }
        public Nullable<int> BlockCode { get; set; }
        public string EmailId { get; set; }
        public string Mobile { get; set; }
        public string LandlineNo { get; set; }
        public string IPNo { get; set; }
        public string District { get; set; }
        public string Tehsil { get; set; }
        public string Block { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }

    }
}
