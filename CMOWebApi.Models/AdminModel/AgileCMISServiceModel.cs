using System;

namespace CMOWebApi.Models.AdminModel
{
    public class AgileCMISModel
    {
        public AgileCMISModel()
        {
            this.TransCoreId = 0;
            this.ModuleID = 0;
        }
        public long? TransCoreId { get; set; }
        public long? ModuleID { get; set; }
    }
    public class AGILEComplianceExpactedNoOfEntriesModel
    {
        public Nullable<bool> Code { get; set; }
        public Nullable<int> ExpactedEntries { get; set; }
        public Nullable<int> ExpactedDone { get; set; }
    }
}
