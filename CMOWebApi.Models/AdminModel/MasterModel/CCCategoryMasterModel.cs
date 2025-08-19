using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class CCCategoryMasterModel
    {
        public long Id { get; set; }

        [Display(Name = "Department")]
        [Required(ErrorMessage = "{0} is Required!")]
        public Nullable<int> DepartmentCode { get; set; }

        [Display(Name = "Name")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string Name { get; set; }

        public string NameHindi { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
    }

    public class CCCategoryMasterViewModel
    {
        public long Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }

    public class CCCategoryLookupModel
    {
        public long Id { get; set; }
        public long? CCCategoryCode { get; set; }
        public int? DepartmentCode { get; set; }
        public List<long> DptReferenceCode { get; set; }
        
    }


    public partial class CCCategoryReferenceListModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public string Reference { get; set; }
        public string ReferenceHindi { get; set; }
        public string DepartmentTitle { get; set; }
        public string Post { get; set; }
        public string MobileNumber1 { get; set; }
        public string MobileNumber2 { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public int IsAssigned { get; set; }
        public long? DptReferenceCode { get; set; }
    }

    public class CCCategoryReferenceListResponseModel
    {
        public List<long> DptReferenceCode { get; set; }
        public List<CCCategoryReferenceListModel> Record { get; set; }
    }


}

