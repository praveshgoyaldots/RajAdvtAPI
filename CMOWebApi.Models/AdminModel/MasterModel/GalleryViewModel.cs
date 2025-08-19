using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{

    public class GalleryViewModel
    {
        public int GalleryCode { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }

        [Required(ErrorMessage = "{0} is Required!")]
        public string Type { get; set; }
        
        [Required(ErrorMessage = "{0} is Required!")]
        public int TypeCode { get; set; }
        public int SchemeCode { get; set; }
        public string SchemeName { get; set; }
        public string SchemeNameHindi { get; set; }
        public string Caption { get; set; }
        public string Url { get; set; }
        public string UploadType { get; set; }
        public string Thumbnail { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }

        public List<GalleryFileViewModel> GalleryFileList { get; set; }
        public string DeletedFileCodes { get; set; }
    }

    public class GalleryFileViewModel
    {
        public int FileCode { get; set; }
        public int GalleryCode { get; set; }
        public string FileName { get; set; }

        [Required(ErrorMessage = "{0} is Required!")]
        public string FilePath { get; set; }

        public string Extension { get; set; }
    }

    public  class PhotoVideoGalleryFileViewModel
    {
        public int FileCode { get; set; }
        public int GalleryCode { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string Extension { get; set; }
        public string Type { get; set; }
        public int TypeCode { get; set; }
        public string Caption { get; set; }
        public string Url { get; set; }
        public string UploadType { get; set; }
        public string Thumbnail { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
    }
}
