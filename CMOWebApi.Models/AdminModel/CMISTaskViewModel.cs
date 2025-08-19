using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class CMISTaskViewModel
    {

        public string Task { get; set; }
        public Nullable<int> TotalAnnouncement { get; set; }
        public Nullable<int> NoActionTaken { get; set; }
        public Nullable<int> TaskInitiated { get; set; }
        public Nullable<int> SanctionIssued { get; set; }
        public Nullable<int> TaskinProgress { get; set; }
        public Nullable<int> NotFeasible { get; set; }
        public Nullable<int> ContinuousNature { get; set; }
        public Nullable<int> TaskCompleted { get; set; }
        }
}
