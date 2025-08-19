using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class ConfigurationPermissionViewModel
    {
        public int Id { get; set; }

        public int ConfigurePermisionId { get; set; }

        public string UserType { get; set; }

        public int DepartmentCode { get; set; }

        public DateTime CreatedDate { get; set; }

        public int CreatedBy { get; set; }
      
        public List<CPDeptViewModel> DepartmentList { get; set; }
        public List<CPServiceViewModel> ServiceList { get; set; }
        public List<CPSchemeViewModel> SchemeList { get; set; }
    }

    public class CPDeptViewModel
    {
        public int? DepartmentCode { get; set; }
        public string DepartmentName { get; set; }
        public int ConfigurePermissionId { get; set; }
        public int DisplayOrder { get; set; }
        public string Type { get; set; }
    }

    public class CPServiceViewModel
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }

        public int ConfigurePermissionId { get; set; }

        public int DisplayOrder { get; set; }

        public string Type { get; set; }

    }

    public class CPSchemeViewModel
    {
        public int SchemeId { get; set; }
        public string SchemeName { get; set; }

        public int ConfigurePermissionId { get; set; }

        public int DisplayOrder { get; set; }

        public string Type { get; set; }

    }

    
}
