using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class ClientWebServiceModel
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
        public string ClientId { get; set; }
        public List<string> ModuleName { get; set; }
        public string SSOID { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public int DepartmentCode { get; set; }
    }

    public class ClientWebServiceListModel
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string ClientId { get; set; }

    }

    public class ClientModuleViewDetail
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
        public string ClientId { get; set; }
        public string SSOID { get; set; }
        public string moduleIds { get; set; }
        public string modulename { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
    }
}
