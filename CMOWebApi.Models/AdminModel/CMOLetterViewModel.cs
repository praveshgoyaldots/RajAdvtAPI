using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class CMOLetterViewModel
    {
        public string ModuleName { get; set; }
        public Nullable<int> TotalStatus { get; set; }
        public Nullable<int> DisposedStatus { get; set; }
        public Nullable<int> PendingStatus { get; set; }
        public Nullable<int> AgeWisePendencyStatus { get; set; }
        }
}
