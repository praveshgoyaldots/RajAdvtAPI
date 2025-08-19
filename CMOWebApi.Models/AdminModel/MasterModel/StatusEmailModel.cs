using CMOWebApi.Models.GeneralModel;
using System.Collections.Generic;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class StatusEmailModel
    {
        public List<string> DepartmentCodeList { get; set; }
        public string CCEmail { get; set; }
		//public List<string> JankalanImportantOfficerList { get; set; }
        public List<DepartmentContactDetailsViewModel> ImportantOfficerList { get; set; }
    }

	public class ImportantDepartmentContactFilterModel : IndexModel
	{
		public int? DesignationCode { get; set; }
		public int? DepartmentCode { get; set; }
	}
}
