using System;

namespace CMOWebApi.Models.PublicPortalModel
{
    public class WebsiteDipartmentDistrictFilterModel
    {
        public long DepartmentDistrictCode { get; set; }
        public bool IsLogoURLBase64 { get; set; }
    }

    public class WebsiteDipartmentDistrictListModel
    {
        public int DepartmentId { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string LogoUrl { get; set; }
    }
}
