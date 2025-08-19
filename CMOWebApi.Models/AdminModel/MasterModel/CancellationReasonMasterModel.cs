using System;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class CancellationReasonMasterModel
    {
        public long Id { get; set; }

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

    public class CancellationReasonViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
    }
}
