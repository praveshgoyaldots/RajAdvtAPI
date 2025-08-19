using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.DepartmentWebsite
{
    public class DepartmentMenuClassificationModel
    {
        public long Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> MenuClassificationCode { get; set; }
        public string DisplayNameEnglish { get; set; }
        public string DisplayNameHindi { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public Nullable<bool> IsSubMenu { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<long> Code { get; set; }
        public string IconImage { get; set; }
        public Nullable<bool> IsExternalUrl { get; set; } = false;
        public string ExternalUrl { get; set; }
        public string InternalUrl { get; set; }
        }

    public class DepartmentMainMenuModel
    {
        public long Id { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> MenuClassificationCode { get; set; }
        public string DisplayNameEnglish { get; set; }
        public string DisplayNameHindi { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public Nullable<bool> IsSubMenu { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<long> Code { get; set; }
        public string IconImage { get; set; }
        public string DepartmentTitle { get; set; }
        public string MenuClassificationName { get; set; }
        public string CreatedByName { get; set; }
        public string ModifiedByName { get; set; }
    }

    public class DepartmentMainMenuFilterModel : IndexModel
        {
      
        public int? DepartmentCode { get; set; }
        public int? MenuClassificationCode { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
        public int? Status { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public int LoginUserId { get; set; }
        }
    }
