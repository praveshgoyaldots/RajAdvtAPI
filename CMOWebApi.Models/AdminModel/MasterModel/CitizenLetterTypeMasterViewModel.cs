using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{

    public class CitizenLetterTypeMasterViewModel
    {
        public int LetterTypeCode { get; set; }
        [Display(Name = "Letter Type")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(100, ErrorMessage = "{0} should not be more than {1} char")]
        public string LetterType { get; set; }
        [Display(Name = "Letter Type (Hindi)")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(100, ErrorMessage = "{0} should not be more than {1} char")]
        public string LetterTypeHindi { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public List<string> AttachmentCodes { get; set; }
        public string AttachmentNames { get; set; }
        public string[] AttachmentCodeList { get; set; }
    }
}
