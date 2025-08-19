using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class MPConstituencyMasterModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string MAPImagePath { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string MPNameEng { get; set; }
        public string MPNameHindi { get; set; }
        public string MPPhoto { get; set; }
        public string ShortName { get; set; }
    }
}
