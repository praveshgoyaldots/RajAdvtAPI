using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class TransferDeptModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Nullable<int> TotalFrom { get; set; }
        public Nullable<int> TotalTo { get; set; }
        public Nullable<int> FromDeptCode { get; set; }
        public Nullable<int> TODeptCode { get; set; }
        public string FromDept { get; set; }
        public string TODept { get; set; }
    }
}
