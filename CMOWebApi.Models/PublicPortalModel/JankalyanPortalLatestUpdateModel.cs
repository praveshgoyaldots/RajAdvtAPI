using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.PublicPortalModel
{
    public class JankalyanPortalLatestUpdateModel
    {
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public string IconImage { get; set; }
        public string URL { get; set; }
        public Nullable<int> TotalCount { get; set; }
    }

    public class TestimonialModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string country { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string PdfUrl { get; set; }
        public string ImageUrl { get; set; }
        public string Message { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDelete { get; set; } = false;
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<int> StateCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }

    public class TestimonialViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string country { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string PdfUrl { get; set; }
        public string ImageUrl { get; set; }
        public string Message { get; set; }
        public Nullable<int> StateCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }

    public class RegistrationModel
    {
        public string fatherName { get; set; }
        public string eligibleStatus { get; set; }
        public string searchId { get; set; }
        public string name { get; set; }
        public int status { get; set; }
        public string districtCode { get; set; }
        public string category { get; set; }
        public string message { get; set; }
    }

    public class CheranjeeviCountModel
    {
        public int SMF { get; set; }
        public int COVID { get; set; }
        public int CONTRACTUAL { get; set; }
        public int PAID { get; set; }
        public int BENEFICIARYCOUNT { get; set; }
        public int SECC { get; set; }
        public int NFSA { get; set; }
    }

    public class DistrictModelOnHospitalSearch
    {
        public int distrctCode { get; set; }
        public string districtName { get; set; }
    }

    public class DistrictHospitalSearchModel
    {
        public int statusCode { get; set; }
        public List<DistrictModelOnHospitalSearch> data { get; set; }
    }

    public class HospitalSpecialitySearchModel
    {
        public int specialityCode { get; set; }
        public string specialityName { get; set; }
    }

    public class SpecialitySearchModel
    {
        public int statusCode { get; set; }
        public List<HospitalSpecialitySearchModel> data { get; set; }
    }

    public class PackageSearchModel
    {
        public string packageName { get; set; }
        public int packageCode { get; set; }
    }

    public class PackageSearchMainModel
    {
        public int statusCode { get; set; }
        public List<PackageSearchModel> data { get; set; }
    }

    public class HospitalSearchListModel
    {
        public string nodalOfficerCellNo { get; set; }
        public string district { get; set; }
        public string type { get; set; }
        public string inchargeOwnerCellNo { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string nodalOfficer { get; set; }
        public string address { get; set; }
        public string landmark { get; set; }
        public string inchargeOwner { get; set; }
    }

    public class HospitalSearchGetAllDataListModel
    {
        public int statusCode { get; set; }
        public List<HospitalSearchListModel> data { get; set; }
    }

    public class HospitalFilterSearchModel
    {
        public int district { get; set; }
        public int hospitalType { get; set; }
        public string empanelmentType { get; set; }
        public int specialityCode { get; set; }
        public int packageCode { get; set; }
    }





    public class SearchHospitalityByDistrictModel
    {
        public string nodalOfficerCellNo { get; set; }
        public string district { get; set; }
        public string type { get; set; }
        public string inchargeOwnerCellNo { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string nodalOfficer { get; set; }
        public string address { get; set; }
        public string landmark { get; set; }
        public string inchargeOwner { get; set; }
    }

}
