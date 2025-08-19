using System.Collections.Generic;

namespace CMOWebApi.Models.GeneralModel
{
    public class SmsExternalApiInfo
    {
        public string UniqueID { get; set; }
        public string serviceName { get; set; }
        public string language { get; set; }
        public string messagetype { get; set; }
        public string message { get; set; }
        public string voicemessage { get; set; }
        public List<string> mobileNo { get; set; }

    }
}
