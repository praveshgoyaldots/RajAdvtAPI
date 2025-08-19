using CMOWebApi.Models.GeneralModel;
using System;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class DepartmentContactDetailsModel
    {
        public DepartmentContactDetailsModel()
        {
            IsActive = true;
            IsDeleted = false;
			IsVisibleOnFront = false;

		}
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }

        [Display(Name = "Department")]
        [Required(ErrorMessage = "{0} is Required!")]
        public Nullable<int> DepartmentCode { get; set; }

        [Display(Name = "Designation")]
        [Required(ErrorMessage = "{0} is Required!")]
        public Nullable<int> DesignationCode { get; set; }

        [Display(Name = "Officer Name")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string OfficerName { get; set; }

        //[Display(Name = "MobileNo")]
        //[Required(ErrorMessage = "{0} is Required!")]
        public string MobileNo { get; set; }

       // [Display(Name = "Email")]
       // [Required(ErrorMessage = "{0} is Required!")]
        public string Email { get; set; }

        public string SSOID { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
		public Nullable<bool> IsVisibleOnFront { get; set; }
        public Nullable<long> ContactCategory { get; set; }
        public string Place { get; set; }
        public string Address { get; set; }
        public string AttachmentUrl { get; set; }
        public string Url { get; set; }
    }

    public class DepartmentContactDetailsViewModel
    {
        public long Id { get; set; }
        public string OfficerName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string SSOID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string DepartmentTitle { get; set; }
        public string DesignationName { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<bool> IsVisibleOnFront { get; set; }
        public Nullable<long> ContactCategory { get; set; }
        public string ContactCategoryName { get; set; }
    }

    public class DepartmentContactDetailsFrontViewModel
        {
        public long Id { get; set; }
        public string OfficerName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string SSOID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string DepartmentTitle { get; set; }
        public string DesignationName { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<bool> IsVisibleOnFront { get; set; }
        public Nullable<long> ContactCategory { get; set; }
        public string ContactCategoryName { get; set; }
        public string AttachmentUrl { get; set; }
        public Nullable<bool> IsData { get; set; }
        public Nullable<bool> IsPDF { get; set; }
        public Nullable<bool> IsURL { get; set; }
    }



    public class DepartmentWebsiteDetailsModel
    {
        public int DepartmentId { get; set; }
        public string DepartmentTitle { get; set; }
        public string WebsiteName { get; set; }
        public string NodalOfficerName { get; set; }
        public string NodalOfficerDesignation { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string SSOID { get; set; }
    }

    public class DepartmentContactOfficerModel
    {
        public long Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string OfficerName { get; set; }
        public string Mobile { get; set; }
        public string UserEmail { get; set; }
        public string SSOID { get; set; }
        public string DepartmentNames { get; set; }
        public string DesignationName { get; set; }
        public string UserTypeTitle { get; set; }
        public string UserType { get; set; }
    }

}
