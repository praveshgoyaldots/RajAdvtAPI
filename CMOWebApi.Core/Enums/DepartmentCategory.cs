using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Core.Enums
{
	public class DepartmentCategory
	{
		public enum DepartmentCategoryEnum
		{
			[StringValue("DepartmentCategory")]
			DepartmentCategory = 1,

			[StringValue("districtfromlookup")]
			District = 30098,

           [StringValue("DistrictFromLookupProduction")]
            DistrictProduction = 30147,

          [StringValue("DepartmentFromLookup")]
            Department = 30097,

            [StringValue("DepartmentFromLookupProduction")]
            DepartmentProduction = 30146,
        }

        public enum MinisterListEnum
        {
            [StringValue("CabinetMinister")]
            CabinetMinister=1,

            [StringValue("StateMinister")]
            StateMinister=2,
        }

        public enum ModuleNameOfWebsiteEnum
        {
            [StringValue("Jankayan Category")]
            JankayanCategory = 1,

            [StringValue("Jankayan Entry Type")]
            JankayanType = 2,

            [StringValue("General Entry Category")]
            GeneralEntryCategory = 3,

            [StringValue("Government Document Type")]
            GovernmentDocumentType = 4,

            [StringValue("CMIS Module")]
            CMISModule = 5,

            [StringValue("Scheme")]
            Scheme = 6,

            [StringValue("Press Release")]
            PressRelease = 7,

            [StringValue("Tender")]
            Tender = 8,

            [StringValue("Projects")]
            Projects = 9,

            [StringValue("Department Contact Category")]
            DepartmentContactCategory = 10,

            [StringValue("State Policy")]
            StatePolicy = 11,

            [StringValue("MLA")]
            MLA = 12,
        }

        public enum ChiranjeeviHospitalTypeEnum
        {
            [StringValue("Private Hospital")]
            privatehospital = 1,

            [StringValue("Government Hospital")]
            governmenthospital = 0,
        }

        public enum ChiranjeeviempanelmentTypeEnum
        {
            [StringValue("Empanelled with MOU but not signed")]
            ApprovedBySEC,

            [StringValue("Empanelled with MOU signed")]
            MOUUploaded,
        }



    }
}
