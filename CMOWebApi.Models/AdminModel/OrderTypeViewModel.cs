using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
   public class OrderTypeViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public Nullable<long> Code { get; set; }
        public string ShortName { get; set; }
        public Nullable<bool> IsSystemGenerated { get; set; }
        public string ReportOrderType { get; set; }
        public Nullable<bool> IsDateMandatory { get; set; }
        public Nullable<int> IsDocumentNoMandatory { get; set; }
        public string ImagePath { get; set; }
    }
  
}
