using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class VisitorCountViewModel
    {
        public int Id  { get; set; }
        public string VisitorLogId { get; set; }
        public string VisitorIpAddress { get; set; }
        public System.DateTime VisitorDate { get; set; }
        public int TotalVisitor { get; set; }

    }


    public class WebsiteUpdateInfoViewModel
    {
        public DateTime LastUpdatedDate { get; set; }
        public string LastUpdatedDateHindi { get; set; }
    }


}
