using System;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel
{
    public class NotificationSMSTemplatesModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        [Required(ErrorMessage = "Type is required")]
        public Nullable<long> TypeCode { get; set; }
        [Required(ErrorMessage = "SMS Content is required")]
        public string SMSContent { get; set; }
        public Nullable<bool> IsActive { get; set; } = true;
        public Nullable<bool> IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
    }


    public partial class NotificationSMSTemplateViewModel
    {
        public long Id { get; set; }
        public string TemplateType { get; set; }
        public string SMSContent { get; set; }
    }
}
