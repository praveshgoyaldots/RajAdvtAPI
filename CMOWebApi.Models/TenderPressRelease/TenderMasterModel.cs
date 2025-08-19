using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.VendorPressRelease
    {
    public class TenderMasterModel
        {

        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string RONo { get; set; }
        public Nullable<System.DateTime> ReleaseDate { get; set; }
        public string NITNo { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string NITPurpose { get; set; }
        public Nullable<System.DateTime> FormIssuingDate { get; set; }
        public Nullable<System.DateTime> FormSubmissionDate { get; set; }
        public Nullable<System.DateTime> TenderOpeningDate { get; set; }
        public string SoftCopyURL { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        }

    public partial class TenderMasterListModel
        {
        public int Id { get; set; }
        public string RONo { get; set; }
        public Nullable<System.DateTime> ReleaseDate { get; set; }
        public string NITNo { get; set; }
        public string NITPurpose { get; set; }
        public Nullable<System.DateTime> FormIssuingDate { get; set; }
        public Nullable<System.DateTime> FormSubmissionDate { get; set; }
        public Nullable<System.DateTime> TenderOpeningDate { get; set; }
        public string SoftCopyURL { get; set; }
        public bool IsActive { get; set; }
        public string DepartmentTitle { get; set; }
        }

    public class TenderMappingModel
        {
        public long Id { get; set; }
        public int TenderId { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string PDFUrl { get; set; }
        }

    public class TenderDetailModel
        {
        public TenderMasterListModel TenderMasterData { get; set; }
        public List<TenderMappingModel> TenderMappingList { get; set; }


        }

    public partial class DiprTenderMasterModel 
        {
        public int Id { get; set; }
        public string RONo { get; set; }
        public Nullable<System.DateTime> ReleaseDate { get; set; }
        public string NITNo { get; set; }
        public string NITPurpose { get; set; }
        public Nullable<System.DateTime> FormIssuingDate { get; set; }
        public Nullable<System.DateTime> FormSubmissionDate { get; set; }
        public Nullable<System.DateTime> TenderOpeningDate { get; set; }
        public string SoftCopyURL { get; set; }
        public bool IsActive { get; set; }
        public List<TenderMappingModel> TenderMappingList { get; set; }

        }

    }
