namespace CMOWebApi.Core.Enums
{
    public enum UserType
    {
        [StringValue("ADM")]
        Administrator,
        [StringValue("CM")]
        ChiefMinister,
        [StringValue("CMOO")]
        CMOOfficer,
        [StringValue("CMOS")]
        CMOStaff,
        [StringValue("DCOM")]
        DivisionalCommissioner,
        [StringValue("COLL")]
        DistrictCollector,
        [StringValue("BDO")]
        BDO,
        [StringValue("TEHDR")]
        Tehsildar,
        [StringValue("MNSTR")]
        Minister,
        [StringValue("TLO")]
        TopLevelOfficer,
        [StringValue("DPTO")]
        DepartmentOfficer,
        [StringValue("DPTS")]
        DepartmentStaff,
    }

    public enum ApplicationType
    {
        [StringValue("LMS")]
        LMS,
        [StringValue("VIPLMS")]
        VIPLMS,
        [StringValue("NMS")]
        NMS,
        [StringValue("PRMS")]
        PRMS
    }

    public enum DeviceType
    {
        [StringValue("Android")]
        Android = 1,
        [StringValue("IOS")]
        IOS = 2,
    }
}
