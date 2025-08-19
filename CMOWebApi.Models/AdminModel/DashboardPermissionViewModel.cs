using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class DashboardPermissionViewModel
    {
        public int Id { get; set; }
        public int Permission { get; set; }

        public string UserType { get; set; }

        public int UserId { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public int NoofRecords { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ModifiedDate { get; set; }


        public int CreatedBy { get; set; }

        public int ModifiedBy { get; set; }

        public Boolean IsActive { get; set; }

        public Boolean IsDeleted { get; set; }

        public string[] orders { get; set; }
        
    }
}
