using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class BeneficiaryCategoryMasterModel
    {
        public int cm_ansmtcategoryid { get; set; }
        public string ansmtcategory { get; set; }
        public bool isDeleted { get; set; } = false;
        public bool isActive { get; set; } = true;
        public string ansmtcategoryinHindi { get; set; }
        public string AttachmentURL { get; set; }
    }
}
