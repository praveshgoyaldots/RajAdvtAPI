using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class CMOLetterModel
    {
        public string ModuleName { get; set; }
        public int TotalStatus { get; set; }
        public int DisposedStatus { get; set; }
        public int PendingStatus { get; set; }
        public int AgeWisePendencyStatus { get; set; }
    }
}
