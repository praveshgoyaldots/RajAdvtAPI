using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel
{
    public class PageMasterViewModel
    {
        public long PageId { get; set; }
        public long PageCode { get; set; }
        [Display(Name = "Page Title")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string PageTitle { get; set; }
        [Display(Name = "Application Name")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string ApplicationCode { get; set; }
        [Display(Name = "PageType Code")]
        [Required(ErrorMessage = "{0} is Required!")]
        public int PageTypeCode { get; set; }
        [Display(Name = "Menu")]
        //[Required(ErrorMessage = "{0} is Required!")]
        public int MenuCode { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public List<PageUrlViewModel> UrlList { get; set; }
		public bool IsConnectWithCMIS { get; set; }
        public bool IsVisibleForPermission { get; set; }
    }
    public class PageUrlViewModel
    {
        public long PageUrlId { get; set; }
        public long PageCode { get; set; }
        [Display(Name = "PAge Url")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string PageUrl { get; set; }
        [Display(Name = "URL Type")]
        [Required(ErrorMessage = "{0} is Required!")]
        public string PermissionType { get; set; }
    }
    public class PageMasterListViewModel
    {
        public long PageId { get; set; }
        public long PageCode { get; set; }
        public string PageTitle { get; set; }
        public string ApplicationCode { get; set; }
        public string ApplicationTitle { get; set; }
        public int PageTypeCode { get; set; }
        public string PageTypeName { get; set; }
        public int MenuCode { get; set; }
        public string MenuTitle { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
		public bool IsConnectWithCMIS { get; set; }
        public bool IsVisibleForPermission { get; set; }
    }

}
