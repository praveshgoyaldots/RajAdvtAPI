namespace CMOWebApi.Core.Enums
{
    public class SchemeValueTypeEnum
	{
		public enum SchemeValueTypeEnumKey
		{
			[StringValue("Both")]
			Both = 28,

			[StringValue("Apply For Scheme")]
			ApplyForScheme =32,

			[StringValue("Is Listed RGDPS Act")]
			IsListedRGDPSAct=30,

			[StringValue("Made Of Appling offline")]
			MadeOfAppling=38,

            [StringValue("Made Of Appling offline/Online")]
            MadeOfApplingOfflineOnline = 39,

            [StringValue("Is Service Fees")]
			IsServiceFees=36,

			[StringValue("Certificate/Licence/Document")]
			CertificateLicenceDocument = 5,

			[StringValue("Physical Item")]
			PhysicalItem = 6,

            [StringValue("Date")]
            Date = 33,

            [StringValue("In Duration")]
            InDuration = 34,

            [StringValue("E-Mitra")]
            E_Mitra = 44,

            [StringValue("SchemeWebsite")]
            SchemeWebsite = 45,

            [StringValue("E-Mitra/departmentwebsite")]
            E_Mitraanddepartmentwebsite = 48,

            [StringValue("mobileapp")]
            MobileApp = 49,

            [StringValue("mobileapp")]
            PaymentDisbursmentFrequencyIninstallments = 41


        }
        public enum SchemeTypeEnum
        {
            [StringValue("GovermentAchievement")]
            GovermentAchievement = 1,
            [StringValue("Advertisement")]
            Advertisement = 2,
            [StringValue("Jankalyan")]
            Jankalyan = 3,
            [StringValue("IsSocialMedia")]
            IsSocialMedia = 4,
        }
    }
}
