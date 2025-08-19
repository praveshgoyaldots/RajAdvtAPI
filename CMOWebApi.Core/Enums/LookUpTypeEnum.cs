namespace CMOWebApi.Core.Enums
{
    public class LookUpTypeEnum
    {
		public enum LookUpTypeEnumKeys
		{
			[StringValue("Order Issue By")]
			OrderIssueBy = 1,

			[StringValue("Payment Disbursement Mode")]
			PaymentDisbursementMode = 2,

			[StringValue("Mode of Payment")]
			ModeofPayment = 3,

			[StringValue("Payment Through")]
			PaymentThrough = 4,

			[StringValue("Module Name")]
			ModuleName = 5,

			[StringValue("Advertisement Notification Type")]
			AdvertisementNotificationType = 6,

			[StringValue("Gender")]
			Gender = 7,

			[StringValue("Scheme File Type")]
			SchemeFileType = 8,

			[StringValue("Scheme Owned By")]
			SchemeOwnedBy = 10,

			[StringValue("RGDPS Act")]
			RGDPSAct = 11,

			[StringValue("Apply For Scheme")]
			ApplyForScheme = 12,

			[StringValue("Scheme Expried On")]
			SchemeExpriedOn = 13,

			[StringValue("Service Fee")]
			ServiceFee = 14,

			[StringValue("Payment Disbursement Frequency")]
			PaymentDisbursementFrequency = 15,

			[StringValue("Mode of Applying")]
			ModeofApplying = 16,

			[StringValue("List Of Required Doc")]
			ListOfRequiredDoc = 17,

			[StringValue("Made Of Appling Online And Both")]
			MadeOfApplingOnlineAndBoth = 18,

			[StringValue("Advertisement IsPull or IsPush")]
			AdvertisementIsPullorIsPush = 19,

			[StringValue("Linked To Scheme (If Any)")]
			LinkedToScheme = 20,

			[StringValue("Clien tModule")]
			ClientModule = 22,


			[StringValue("Other")]
			Other = 21,

			[StringValue("Scheme Type")]
			SchemeType = 23,

			[StringValue("Important Decision Category")]
			ImpCategory = 26,

			[StringValue("Scheme/Service Radio")]
			SchemeServiceRadio = 27,

			[StringValue("Project Status")]
			ProjectStatus = 28,

			[StringValue("Project/scheme Program")]
			ProjectschemeProgram = 29,

			[StringValue("Year of Initiation")]
			YearofInitiation = 30,

			[StringValue("Projects Urban or Rural")]
			ProjectsUrbanorRural = 31,

			[StringValue("Project Mile Stone Status")]
			ProjectMileStoneStatus = 32,

			[StringValue("Newspaper News Mode")]
			NewspaperNewsMode = 33,

			[StringValue("Newspaper News Type")]
			NewspaperNewsType = 34,

			[StringValue("Newspaper Source Type")]
			NewspaperSourceType = 35,

			[StringValue("Newspaper Publication Type")]
			NewspaperPublicationType = 36,

			[StringValue("Newspaper Edition")]
			NewspaperEdition = 37,

			[StringValue("Newspaper Page Number")]
			NewspaperPageNumber = 38,

			[StringValue("Newspaper news Type")]
			NewspaperProgressNewsType = 39,

			[StringValue("Newspaper Coverage Type")]
			NewspaperCoverageType = 40,

			[StringValue("Project Work Category")]
			ProjectWorkCategory = 41,

			[StringValue("Project Program Scheme Type")]
			ProjectProgramSchemeType = 1041,

			[StringValue("Child Page Description Category")]
			ChildPageDescriptionCategory = 1042,

			[StringValue("VC Category")]
			VCCategory = 1043,

			[StringValue("Department and district radio button")]
			departmentandistrictradio = 1044,

			[StringValue("CMO Officers")]
			CMOOfficers = 1045,

			[StringValue("Physical Unit")]
			PhysicalUnit = 1046,

			[StringValue("Financial Unit")]
			FinancialUnit = 1047,

			[StringValue("Month")]
			Month = 1048,
			[StringValue("Comparative parameter Year or Grand Total")]
			ComparativeYearGrandTotal = 1049,

			[StringValue("E-Booklet Category")]
			EBookletCategory = 1050,

			[StringValue("Comparative Parameter Category")]
			ComparativeParameterCategory = 1051,

			[StringValue("Menu Classification Type")]
			MenuClassificationType = 1052,

            [StringValue("Comparative Parameter Target Based")]
            ComparativeParameterTargetBased = 1053,

			[StringValue("General Department/District Mapping")]
			GeneralDepartment_DistrictMapping = 1054,

            [StringValue("Department Contact Category")]
            DepartmentContactCategory = 1055,

            [StringValue("Advertisement Pop-up Category")]
            AdvertisementPopupCategory = 1056,

            [StringValue("Press Release State and District level")]
            PressReleaseStateandDistrict = 1057,

            [StringValue("Common Category Lookup")]
            CommonCategoryLookUp = 1058,

            [StringValue("Press Release LookUp Category")]
            PressReleaseLookUpCategory = 1059,

            [StringValue("Department Sub Menu Show As Separate")]
            DepartmentSubMenuShowAsSeparate = 1061,

            [StringValue("Department sub menu redirection management")]
            DepartmentSubMenuRedirectionManagement = 1062
        }

		public enum LookUpEnumKeys
        {
            [StringValue("GOR")]
            GOR = 1,

            [StringValue("GOI")]
            GOI = 2,

            [StringValue("Fully")]
            Fully = 3,

            [StringValue("Partially")]
            Partially = 4,

            [StringValue("Cash")]
            ModeofPayment_Cash = 5,

            [StringValue("Non Cash")]
            NonCash = 6,

            [StringValue("DBT")]
            DBT = 7,

            [StringValue("Bank Cheque")]
            BankCheque = 8,

            [StringValue("DD")]
            DD = 9,

            [StringValue("Cash")]
            PaymentThrough_Cash = 10,

            [StringValue("Cabinet Decisions")]
            CabinetDecisions = 11,

            [StringValue("Jan Ghoshna Patra")]
            JanGhoshnaPatra = 12,

            [StringValue("CM Directions")]
            CMDirections = 13,

            [StringValue("CM Announcements")]
            CMAnnouncements = 14,

            [StringValue("Budget Announcements")]
            BudgetAnnouncements = 15,

            [StringValue("Admin Department")]
            AdminDepartment = 16,

            [StringValue("Department")]
            Department = 17,

            [StringValue("Platform User")]
            PlatformUser = 18,

            [StringValue("Male")]
            Male = 19,

            [StringValue("Female")]
            Female = 20,

            [StringValue("Other")]
            Other = 21,

            [StringValue("Act/Rule")]
            Act_Rule  = 22,

            [StringValue("Citizen Charter")]
            Citizen_Charter = 23,

            [StringValue("Scheme Forms")]
            Scheme_Forms = 24,

            [StringValue("no")]
            linktoSchemeNo = 51,

            [StringValue("Order")]
            Order =52,

            [StringValue("Advertisement")]
            Advertisement =53,

            [StringValue("Office Type")]
            OfficeType = 24,

            [StringValue("VCLocation Type")]
            VCLocationType = 25
            }

    }
}
