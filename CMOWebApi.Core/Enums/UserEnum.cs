namespace CMOWebApi.Core.Enums
{
    public class UserEnum
    {
        public enum UserTypeEnum
        {
            [StringValue("ADM")]
            ADM = 1,
            [StringValue("MNSTR")]
            MNSTR = 2,
            [StringValue("CMOO")]
            CMOO = 3,
            [StringValue("CMOS")]
            CMOS = 4,
            [StringValue("DCOM")]
            DCOM = 5,
            [StringValue("COLL")]
            COLL = 6,
            [StringValue("BDO")]
            BDO = 7,
            [StringValue("TEHDR")]
            TEHDR = 8,
            [StringValue("MLAMP")]
            MLAMP = 9,
            [StringValue("TLO")]
            TLO = 10,
            [StringValue("DPTO")]
            DPTO = 11,
            [StringValue("DPTS")]
            DPTS = 12,
            [StringValue("DLO")]
            DLO = 13,
            [StringValue("DLS")]
            DLS = 14,
            [StringValue("BLO")]
            BLO = 15,
            [StringValue("SADM")]
            SADM = 16,
        }

        public enum UserIdEnum
        {
            [StringValue("till 25 user type is fixed")]
            TillTheUser = 25,
            [StringValue("Dist ITOff")]
            DistItOfc = 33,
            [StringValue("Dept ITOff")]
            DiptItOfc = 32
        }
    }
}
