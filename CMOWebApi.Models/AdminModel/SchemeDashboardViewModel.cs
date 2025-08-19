using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
    {
  public class SchemeDashboardViewModel

        {
        public string SchemeName { get; set; }
        public int Target { get; set; }
        public int Achievement { get; set; }
        public Nullable<int> NoofBenificiary { get; set; }
        public Nullable<long> DisplayOrder { get; set; }

        }
    }
