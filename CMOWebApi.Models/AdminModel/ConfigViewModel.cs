using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class ConfigViewModel
    {

        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserType { get; set; }

        public string Type { get; set; }
        public long DepartmentCode { get; set; }

        public int NumberOfLines { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public List<DepartmentConfigViewModel> departmentConfig { get; set; }
        public List<SchemeConfigViewModel> schemeConfig { get; set; }
        public List<ServiceConfigViewModel> serviceConfig { get; set; }

    }

    public class DepartmentConfigViewModel
    {
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentName { get; set; }
        public Nullable<int> PermissionId { get; set; }
        public Nullable<int> DisplayOrder { get; set; }

        public Nullable<int> NumberOfLines { get; set; }
        public string Type { get; set; }
    }

    public partial class SchemeConfigViewModel
    {
        public long Id { get; set; }
        public Nullable<long> SchemeId { get; set; }
        public string SchemeName { get; set; }
        public Nullable<long> DepartmentCode { get; set; }
        public Nullable<int> PermissionId { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
        public string Type { get; set; }
    }

    public partial class ServiceConfigViewModel
    {
        public long Id { get; set; }
        public Nullable<int> ServiceId { get; set; }
        public string ServiceName { get; set; }
        public long DepartmentCode { get; set; }
        public Nullable<int> PermissionId { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
        public string Type { get; set; }

    }
}
