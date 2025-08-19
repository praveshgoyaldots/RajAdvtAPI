using System;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class ParticipantCategoryMasterModel
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Name Hindi is required")]
        public string NameHindi { get; set; }
        public string NameEnglish { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public Nullable<int> DisplayOrder { get; set; }
    }
}
