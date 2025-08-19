using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.DepartmentWebsite
{
    public class DepartmentSectionModel
    {
        public long Id { get; set; }
        public long Code { get; set; }
        public string ComponentName { get; set; }
        public string SelectorName { get; set; }
        public string ShortDescription { get; set; }
        public bool IsActive { get; set; }
        public bool Isdeleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
    }

    public class DepartmentSectionMappingModel
    {
        public long Id { get; set; }
        public long Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public Nullable<long> SectionMasterCode { get; set; }
        public string NameHindi { get; set; }
        public string NameEnglish { get; set; }
        public Nullable<long> DisplayOrder { get; set; }
        public string IconImage { get; set; }
        public string BackGroundImage { get; set; }
        public string BackGroungColor { get; set; }
        public string BaseUrl { get; set; }
        public bool IsActive { get; set; } = true;
        public bool Isdeleted { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string ModifiedByName { get; set; }
        public string CreatedByName { get; set; }
        public string SectionMasterName { get; set; }

    }
    public class DepartmentSectionMappingFilterModel : IndexModel
        {
        public int DepartmentCode { get; set; }
        public long SectionMasterCode { get; set; }
        public string ModifiedToDate { get; set; }
        public string ModifiedFromDate { get; set; }
        public int? Status { get; set; }
        public int ModifiedBy { get; set; }
        }

    }
