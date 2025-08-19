using System;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel
{
    public class LookupTypeViewModel
    {
        public int Id { get; set; }
        [Required]
        [Display(Name = "Lookup Type")]
        public string lookupType { get; set; }
        public Nullable<bool> IsActive { get; set; }
    }
}
