using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace CMOWebApi.Models.AdminModel
{
    public class PdfGenerateModel
    {
        [Required]
        [RegularExpression(@"^([a-zA-Z0-9 \.\&\'\-]+)$", ErrorMessage = "Please give a valid PDF file name")]
        [Display(Name = "PDF Name*")]
        public string PDFFileName { get; set; }
        [AllowHtml]
        [Required]
        [Display(Name = "PDF Content*")]
        public string PDFContent { get; set; }
    }
}
