using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
  
    public class SectionMasterModel
    {
        public long Id { get; set; }
        public long Code { get; set; }
        public string ComponentName { get; set; }
        public string SelectorName { get; set; }
        public string ShortDescription { get; set; }
        public bool IsActive { get; set; } = true;
        public bool Isdeleted { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<int> DefaultOrder { get; set; }
        public string NameEnglish { get; set; }
        public string NameHindi { get; set; }
        public Nullable<bool> IsDIPRSection { get; set; } = false;
        }
}
