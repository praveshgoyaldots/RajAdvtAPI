using System;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class MLAConstituencyMasterModel
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
        public string MLANameEng { get; set; }
        public string MLANameHindi { get; set; }
        public string MLAPhoto { get; set; }
        public string ShortName { get; set; }
        public string DesignationDisplayName { get; set; }
        public string DesignationDisplayNameHindi { get; set; }
        public Nullable<int> DesignationCode { get; set; }
        public string DisplayName { get; set; }
        public string URL { get; set; }
        public string Email { get; set; }
        public string whatsappNumber { get; set; }
        public string FBLink { get; set; }
        public string TwitterLink { get; set; }
        public string DesignationShortName { get; set; }
        public string MLAAddress { get; set; }
        public string DesignationShortNameHindi { get; set; }
    }

    public class MLAConstituencyViewModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public bool IsActive { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string MAPImagePath { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string MLANameEng { get; set; }
        public string MLANameHindi { get; set; }
        public string MLAPhoto { get; set; }
        public string ShortName { get; set; }
        public string DistrictTitle { get; set; }
        public string ModifiedByName { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string DesignationDisplayName { get; set; }
        public string DesignationName { get; set; }
        public string Email { get; set; }
        public string whatsappNumber { get; set; }
        public string FBLink { get; set; }
        public string TwitterLink { get; set; }
        public string DesignationShortName { get; set; }
        public string DesignationShortNameHindi { get; set; }

    }
}
