using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel
{
    public class EmailModel
    {
        [Required]
        public string ToAddress { get; set; }
        public string DisplayName { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string ToCC { get; set; }
        public string ToBCC { get; set; }
        public bool ISAttachment { get; set; }
    }
    public class DynamicMailContentForWelcomeEmail
    {
        public string Name { get; set; }
        public string ContactNo { get; set; }
    }
}
