using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.VCModel
    {
     public  class LocationMasterViewModel
        {
        public long Id { get; set; }

        public long Code { get; set; }

        public long DistrictCode { get; set; }

        public string DistrictTitle { get; set; }

        public long InchargeCode { get; set; }

        public string VCType { get; set; }

        public long VCTypeCode { get; set; }


        public string Location { get; set; }

        public string LocationName { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        public int CreatedBy { get; set; }

        public int ModifiedBy { get; set; }

        public bool IsActive { get; set; } = true;

        public bool IsDeleted { get; set; } = false;


        }

	public class VCLocationSearchModel : IndexModel
	{
		public Nullable<long> DistrictCode { get; set; }
		
	}
}
