using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
   public class AdvAchievementCategoryMasterModel
    {
        public AdvAchievementCategoryMasterModel()
        {
            IsVisibleToEndUser = false;
            IsVisibleDate = true;
            IsVisibleDescriptionHindi = true;
        }
        public int CategoryId { get; set; }
        public int CategoryCode { get; set; }
        [Display(Name = "Title")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string Title { get; set; }
        public string TitleHindi { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string ImagePath { get; set; }
        public bool IsVisible { get; set; }

        public bool CategoryIsVisible { get; set; }
        public Nullable<bool> IsVisibleToEndUser { get; set; }
        public string HelpFileURL { get; set; }
        public Nullable<bool> IsVisibleDate { get; set; }
        public Nullable<bool> IsVisibleDescriptionHindi { get; set; }
        public string LabelAchievementHindi { get; set; }
        public string LabelDescriptionHindi { get; set; }
        public string LabelDate { get; set; }
        public string LabelURL { get; set; }
        public string LabelAddPDF { get; set; }
        public string LabelAttachImage { get; set; }
        public Nullable<bool> IsShowConnectWithCMIS { get; set; } = false;
        public Nullable<bool> IsShowBeneficiaryCategory { get; set; } = false;
        public Nullable<bool> IsPDFMandatory { get; set; } = false;
        public Nullable<bool> IsURLMandatory { get; set; } = false;
        public Nullable<bool> IsImageMandatory { get; set; } = false;
		public Nullable<int> MenuClassificationCode { get; set; }
		public Nullable<int> MenuClassificationPageTypeCode { get; set; }

		public Nullable<long> GeneralDepartmentDistrictMappingCode { get; set; }
		public List<string> GeneralDepartmentDistrictMappingList { get; set; }
		public Nullable<long> GeneralDepartmentDistrictMapping { get; set; }
		public string SubMenuNameHindi { get; set; }
		public string SubMenuNameEnglish { get; set; }
        public string ClassificationPageTypeName { get; set; }
        public string MenuClassificationName { get; set; }
        public string CreatedByName { get; set; }
        public string ModifiedByName { get; set; }
        public Nullable<long> CommonCategoryCode { get; set; }
    }
}

