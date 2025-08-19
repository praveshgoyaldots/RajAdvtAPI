using CMOWebApi.Models.AdminModel.MasterModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class OrderGenerateMasterModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<long> Type { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> EffectForm { get; set; }
        public string ReferenceLink { get; set; }
        public Nullable<long> IssueBy { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string OrderRemarks { get; set; }
        public Nullable<bool> IsOldOrder { get; set; } = false;
        public string ReferenceNumber { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string SearchCriteria { get; set; }
        public string FileNumber { get; set; }
        public Nullable<long> LinkToScheme { get; set; }
        public string Subject { get; set; }
        public string Reference { get; set; }
        public string Context { get; set; }
        public string Content { get; set; }
        public Nullable<long> AuthoritySignatureCode { get; set; }
        public Nullable<long> CCSignatureCode { get; set; }
        public string OrdGenrateRemarks { get; set; }
        public string AddressTo { get; set; }
        public Nullable<bool> IsHindi { get; set; } = false;
        public Nullable<bool> IsSaveAsDraft { get; set; } = false;
        public Nullable<bool> IsApprove { get; set; } = false;
        public Nullable<bool> IsLock { get; set; } = false;
        public Nullable<bool> IsActive { get; set; } = false;
        public Nullable<bool> IsDeleted { get; set; } = false;
        public List<OrderRelatedToParameterModelLookup> RelatedToOrderParameterList { get; set; }
        public List<string> DepartmentEffectedCodes { get; set; }
        public List<string> SectorCodes { get; set; }
        public List<AttachmentsLookupModel> AttachmentList { get; set; }
        //public List<CorrespondenceCopyReferenceLookupModel> CCReferenceList { get; set; }
        public List<string> CCReferenceList { get; set; }
        public string CCReferenceListText { get; set; }

        public Nullable<long> CCCategoryCode { get; set; }
        public Nullable<bool> IsByOrderOfGovernor { get; set; }
        public string IsByOrderOfGovernortext { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public Nullable<bool> IsCancel { get; set; }
        public Nullable<bool> IsWithinSecretariat { get; set; }

        public Nullable<int> DistrictCode { get; set; }
        public Nullable<int> OfficeCode { get; set; }
    }
    public class OrderGenerateMasterViewModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<long> Type { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> EffectForm { get; set; }
        public string ReferenceLink { get; set; }
        public Nullable<long> IssueBy { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string OrderRemarks { get; set; }
        public Nullable<bool> IsOldOrder { get; set; }
        public string ReferenceNumber { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string SearchCriteria { get; set; }
        public string FileNumber { get; set; }
        public Nullable<long> LinkToScheme { get; set; }
        public string Subject { get; set; }
        public string Reference { get; set; }
        public string Context { get; set; }
        public string Content { get; set; }
        public Nullable<long> AuthoritySignatureCode { get; set; }
        public Nullable<long> CCSignatureCode { get; set; }
        public string OrdGenrateRemarks { get; set; }
        public string AddressTo { get; set; }
        public Nullable<bool> IsHindi { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public Nullable<bool> IsLock { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string LinkToSchemeName { get; set; }
        public string AuthoritySignatureCodeName { get; set; }
        public string CCSignatureCodeName { get; set; }
        public string TypeName { get; set; }
        public string IssueByName { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<bool> IsCancel { get; set; }
        public Nullable<bool> IsWithinSecretariat { get; set; }
        public string DepartmentEffectedIds { get; set; }
        public string DepartmentEffectedName { get; set; }
        public string SectorIds { get; set; }
        public string SectorName { get; set; }
        public Nullable<long> CCCategoryCode { get; set; }
        public Nullable<bool> IsByOrderOfGovernor { get; set; }
        public string IsByOrderOfGovernortext { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public List<OrderRelatedToParameterModelLookup> RelatedToOrderParameterList { get; set; }
        public List<AttachmentsLookupModel> AttachmentList { get; set; }
        public List<CorrespondenceCopyReferenceLookupModel> CCReferenceList { get; set; }
        public string CCReferenceListText { get; set; }
        public List<long?> CCReferenceListIds { get; set; }

        public DepartmentSetupModel DepartmentSetupList { get; set; }

        public Nullable<int> DistrictCode { get; set; }
        public Nullable<int> OfficeCode { get; set; }
    }
    public class OrderGenerateMasterListModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string TypeName { get; set; }
        public string Description { get; set; }
        public string OrderNo { get; set; }
        public Nullable<bool> IsLock { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> IsApprove { get; set; }
        public string ESignedFinalUrl { get; set; }
        public string ESignedUrl1 { get; set; }
        public string ESignedUrl2 { get; set; }
        public string ESignedUrl3 { get; set; }
        public string ESignedUrl4 { get; set; }
        public string ESignedUrl5 { get; set; }
        public string DepartmentTitle { get; set; }
		public Nullable<int> DepartmentCode { get; set; }
        public Nullable<bool> IsCancel { get; set; }
        public Nullable<bool> IsWithinSecretariat { get; set; }

    }

    public class OrderFinalAProvalListModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string TypeName { get; set; }
        public string OrderNo { get; set; }
        public Nullable<bool> IsLock { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> IsApprove { get; set; }
        public string ESignedFinalUrl { get; set; }
        public string ESignedUrl5 { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<bool> IsCancel { get; set; }
    }

    public class OrderGenerateAuthorityListModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string TypeName { get; set; }
        public string OrderNo { get; set; }
        public Nullable<bool> IsLock { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> IsApprove { get; set; }
        public string ESignedFinalUrl { get; set; }
        public string ESignedUrl1 { get; set; }
        public string ESignedUrl2 { get; set; }
        public string ESignedUrl3 { get; set; }
        public string ESignedUrl4 { get; set; }
        public string ESignedUrl5 { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<bool> IsCancel { get; set; }
    }

    public class AttachmentsLookupModel
    {
        public long Id { get; set; }
        public long OrderGenerateID { get; set; }
        public string AttachmentUrl { get; set; }
        public string Description { get; set; }
        public bool IsAnnexure { get; set; }
        public bool IsPdf { get; set; }
    }

    public class CorrespondenceCopyReferenceLookupModel
    {
        public long Id { get; set; }
        public long OrderGenerateID { get; set; }
        public Nullable<long> ReferenceCode { get; set; }
        public string ReferenceText { get; set; }
    }

    public partial class OrderRelatedToViewModelLookup
    {


        public long Id { get; set; }
        public int rowno { get; set; }

        public long OrderEntryID { get; set; }
        public string ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string YearValue { get; set; }
        public string YearText { get; set; }
        public long? RelatedToParameterID { get; set; }
        public string pm_projecthdrid { get; set; }
        public string modulename { get; set; }
        public string prj_year { get; set; }
        public string prj_dept { get; set; }
        public string prj_ndept { get; set; }
        public string parano { get; set; }
        public string filenumber { get; set; }
        public string prj_description { get; set; }
    }

    public class OrderRelatedToParameterModelLookup
    {
        public long Id { get; set; }
        public long OrderEntryID { get; set; }
        public string ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string YearValue { get; set; }
        public string YearText { get; set; }

        public OrderRelatedToResultModelLookup RelatedToResult { get; set; }
    }

    public class OrderRelatedToResultModelLookup
    {
        public long RelatedToParameterID { get; set; }
        public string pm_projecthdrid { get; set; }
        public string modulename { get; set; }
        public string prj_year { get; set; }
        public string prj_dept { get; set; }
        public string prj_ndept { get; set; }
        public string parano { get; set; }
        public string filenumber { get; set; }
        public string prj_description { get; set; }
    }


    #region OrderGenerateEnglish
    public class OrderGenerateHindiEnglishModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<long> Type { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> EffectForm { get; set; }
        public string ReferenceLink { get; set; }
		public bool IsWithinSecretariat { get; set; }
		public Nullable<long> IssueBy { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public Nullable<bool> IsOldOrder { get; set; }
        public string ReferenceNumber { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string SearchCriteria { get; set; }
        public string FileNumber { get; set; }
        public Nullable<long> LinkToScheme { get; set; }
        public string Subject { get; set; }
        public string Reference { get; set; }
        public string Context { get; set; }
        public string Content { get; set; }
        public Nullable<long> AuthoritySignatureCode { get; set; }
        public Nullable<long> CCSignatureCode { get; set; }
        public string OrdGenrateRemarks { get; set; }
        public string AddressTo { get; set; }
        public Nullable<bool> IsHindi { get; set; }
        public Nullable<bool> IsSaveAsDraft { get; set; }
        public Nullable<bool> IsLock { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public Nullable<bool> IsApprove { get; set; }
        public string ESignedFinalUrl { get; set; }
        public string ESignedUrl1 { get; set; }
        public string ESignedUrl2 { get; set; }
        public string ESignedUrl3 { get; set; }
        public string ESignedUrl4 { get; set; }
        public string ESignedUrl5 { get; set; }
        public string UINumber { get; set; }
        public Nullable<long> CCCategoryCode { get; set; }
        public Nullable<bool> IsByOrderOfGovernor { get; set; }
        public string IsByOrderOfGovernortext { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public string SubTypeName { get; set; }
        public string SubTypeNameHindi { get; set; }
        public string LinkToSchemeName { get; set; }
        public string LinkToSchemeNameHindi { get; set; }
        public string AuthoritySignatureDesignationName { get; set; }
        public string AuthoritySignatureDesignationHindi { get; set; }
        public string AuthoritySignatureName { get; set; }
        public string AuthoritySignatureNameHindi { get; set; }
        public string CCSignatureDesignation { get; set; }
        public string CCSignatureDesignationHindi { get; set; }
        public string CCSignatureName { get; set; }
        public string CCSignatureNameHindi { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }
        public string IssueByName { get; set; }
        public string IssueByNameHindi { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string DepartmentEffectedIds { get; set; }
        public string DepartmentEffectedName { get; set; }
        public string SectorIds { get; set; }
        public string SectorName { get; set; }
        public string ReferenceText { get; set; }
        public string Attachments { get; set; }
        public string DepartmentEffectedNameHindi { get; set; }
        public string SectorNameHindi { get; set; }
        public string Address1 { get; set; }
        public string AddressHindi1 { get; set; }
        public string Address2 { get; set; }
        public string AddressHindi2 { get; set; }
        public string Address3 { get; set; }
        public string AddressHindi3 { get; set; }
        public string FooterLine1 { get; set; }
        public string FooterLineHindi1 { get; set; }
        public string FooterLine2 { get; set; }
        public string FooterLineHindi2 { get; set; }
        public string Logo1 { get; set; }
        public string Logo2 { get; set; }
		public bool? IsCancel { get; set; }
        public string WithinSecretariat { get; set; }

        public string DispatchNumber { get; set; }
        public string FileWithDispatchNumber { get; set; }
    }
    #endregion

    public class ReferencyNotificationResponseModel
    {
        public bool IsEmail { get; set; }
        public long OrderId { get; set; }
    }

    public class GetReferenceForNotificationModel
    {
        public long Id { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string Reference { get; set; }
        public string ReferenceHindi { get; set; }
        public Nullable<int> OrderBy { get; set; }
        public string Post { get; set; }
        public string MobileNumber1 { get; set; }
        public string MobileNumber2 { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string DepartmentTitle { get; set; }
    }

    public class CancellationLookupModel
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public string Remarks { get; set; }
        public Nullable<long> Reason { get; set; }
        public Nullable<bool> IsAutoEmail { get; set; }
        public Nullable<bool> IsAutoSMS { get; set; }
    }
}
