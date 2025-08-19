using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
    {
    public class GovtOrderViewModel
        {
        public string Department { get; set; }

        public int Total { get; set; }
        public int CMDirections { get; set; }
        public int CMAnnouncements { get; set; }
        public int BudgetAnnouncements { get; set; }
        public int CabinetDecisions { get; set; }
        public int JanGhoshnaPatra { get; set; }
        public int GeneralOfficeOrder { get; set; }

        }
    }
