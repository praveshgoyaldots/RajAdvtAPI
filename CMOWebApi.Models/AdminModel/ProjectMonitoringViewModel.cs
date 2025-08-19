using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
    {
    public class ProjectMonitoringViewModel
        {
        public string Department { get; set; }
        public int OnGoingProject { get; set; }
        public Nullable<decimal> TotalProjectCost { get; set; }
        public int WithinThreeMonth { get; set; }
        public int WithinSixMonth { get; set; }
        public int WithinYearMonth { get; set; }
        public int ProjectReqIntervention { get; set; }
        }
    }
