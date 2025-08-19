namespace CMOWebApi.Core.Enums
{
    public class SchemeTypeMasterEnum
	{
        public enum TypeMasterEnum
        {

			[StringValue("Scheme/Service Type")]
			SchemeType = 3,

			[StringValue("Scheme/Service Programme Area")]
			SchemeProgrammeArea=4,

			[StringValue("Eligibility Criteria ")]
			EligibilityCriteria = 5,

			[StringValue("How to Pay Fees ")]
			HowtoPayFees = 6,

			[StringValue("Mode of Disbursement  ")]
			ModeofDisbursement = 7,

			[StringValue("Payment Disbursement Frequency")]
			PaymentDisbursementFrequency = 8,

			[StringValue("Mode of Delivery")]
			ModeofDelivery = 9,

			[StringValue("List Of Other Doc")]
			ListOfOtherDoc = 10,

			[StringValue("Name Of Document")]
			NameOfDocument =11

		}

        public enum SchemeAttachmentTypeEnum
        {

            [StringValue("Logo")]
            LOGO,

            [StringValue("Banner")]
            Banner,

            [StringValue("Scheme Image")]
            Image,

            [StringValue("Logo/Banner/Scheme Image")]
            IMG,

            [StringValue("Required Documents")]
            DOC,

            [StringValue("FAQ")]
            FAQ,

            [StringValue("Mobile icon")]
            MobileIcon,

            [StringValue("ServiceFeePdf")]
            ServicePdf,

            [StringValue("BeneficiaryPdf")]
            BeneficiaryPdf,
        }
    }
}
