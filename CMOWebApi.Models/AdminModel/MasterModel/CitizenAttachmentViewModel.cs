using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{

    public class CitizenAttachmentViewModel
    {
        public int AttachmentCode { get; set; }
        [Display(Name = "Attachment")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(100, ErrorMessage = "{0} should not be more than {1} char")]
        public string Attachment { get; set; }
        [Display(Name = "Attachment (Hindi)")]
        [Required(ErrorMessage = "{0} is Required!")]
        [StringLength(100, ErrorMessage = "{0} should not be more than {1} char")]
        public string AttachmentHindi { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
    }
}
