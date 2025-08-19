using System;
using System.Collections.Generic;
using CMOWebApi.Models.GeneralModel;

namespace CMOWebApi.Models.PublicPortalModel
{
    public class SchemePortalViewModel
    {

        public long Id { get; set; }
        public string ShortNameHindi { get; set; }
        public string NameHindi { get; set; }
        public string ShortNameEnglish { get; set; }
        public string NameEnglish { get; set; }
        public string Description { get; set; }
        public string Scheme_URL { get; set; }
        public string Logo { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public Nullable<long> VisitorCount { get; set; }
        public Nullable<int> PageType { get; set; }
        public string FlagshipImage { get; set; }
        public Nullable<int> TotalDepartmentScheme { get; set; }
    }

    public class SchemePortalHeaderViewModel
    {
        public long Id { get; set; }
        public string NameHindi { get; set; }
        public string NameEnglish { get; set; }
        public Nullable<long> AdminDepartmentCode { get; set; }
        public Nullable<int> PageType { get; set; }
    }

    public class schemedepartmentlistmodel
    {

        public string AdmDepartmentTitle { get; set; }
        public string AdmDepartmentTitleHindi { get; set; }
        public Nullable<int> AdmDepartmentCode { get; set; }
        public List<SchemePortalHeaderViewModel> SchemePortalHeaderViewModel { get; set; }
        public int AdmDepartmentId { get; set; }

    }


    public class SchemeFrontEndFilterModel
    {
        public int? AdmDepartmentCode { get; set; }
        public int? DepartmentCode { get; set; }
        public IndexModel indexModel { get; set; }
        public string SearchKeyword { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public int Status { get; set; }
        public long? Id { get; set; }
        public long? AreaCode { get; set; }
        public long? PayMethodCode { get; set; }
        public long? DistrictCode { get; set; }
        public long? CasteCategoryCode { get; set; }
        public long? BeneficiaryCategoryCode { get; set; }
        public long? SchemeTypeCode { get; set; }
        public int? PageTypeCode { get; set; }
        public int? IsServiceFees { get; set; }
        public int? IsListedRGDPSAct { get; set; }
        public int? SchemeOwnedBy { get; set; }
        public int? SchemeDuration { get; set; }

        public int? DelivarebleCode { get; set; }

        public int? MadeOfAppling { get; set; }

        public long? SchemeCode { get; set; }

        public string EligibilityText { get; set; }
        public int? IsFlagShipScheme { get; set; }
        }

}

