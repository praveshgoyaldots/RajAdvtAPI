using CMOWebApi.Data;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using Foolproof;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel
{
    public class OrderEntryModel
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "Type is required")]
        public long? Type { get; set; }

        //[Required(ErrorMessage = "Order Date is required")]
        public DateTime? Date { get; set; }

        //[RequiredIf("IsOldOrder", true, ErrorMessageResourceName = "Order No. is required", ErrorMessageResourceType = typeof(string))]
        public string OrderNo { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        //[Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }
        public DateTime? EffectForm { get; set; }
        public string ReferenceLink { get; set; }
        public long? IssueBy { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }

        public string Remarks { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool? IsActive { get; set; } = false;
        public bool? IsDeleted { get; set; } = false;
        public string ReferenceNumber { get; set; }
        public bool IsOldOrder { get; set; } = false;
        public List<string> BeneficiaryCategory { get; set; }
        public List<string> DepartmentEffected { get; set; }
        public List<string> Sector { get; set; }
        [EnsureNumberNotZero(ErrorMessage = "Department is required")]
        public int? DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string SearchCriteria { get; set; }
        public string FileNumber { get; set; }
        public Nullable<long> LinkToScheme { get; set; }
        public List<OrderRelatedToParameterModel> RelatedToOrderParameterList { get; set; }
        public List<long> BenificiarySchemeIds { get; set; }
        public List<OrderAttachmentModel> AttachmentList { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<int> OfficeCode { get; set; }

    }


    public class OrderEntryListModel
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
        public DateTime? ModifiedDate { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string DepartmentTitle { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string BeneficiaryCategoryIds { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string BeneficiaryCategoryNameHindi { get; set; }
        public string SectorIds { get; set; }
        public string SectorName { get; set; }
        public string ModifiedName { get; set; }
        public int? ModifiedBy { get; set; }
        public int? SubTypeCode { get; set; }
        public string SubTypeName { get; set; }
        public string SubTypeNameHindi { get; set; }
    }

    public class CustomSearchDateModel : IndexModel
    {
        public long Id { get; set; }
        public DateTime? SearchDate { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public bool IsExportToExcel { get; set; }
    }

    public class OrderEntryListFrontEndModel
    {
        public long Id { get; set; }
        public string OrderNo { get; set; }
        public Nullable<long> Type { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }
        public string Title { get; set; }
        public DateTime? Date { get; set; }
        public string HindiDate { get; set; }
        public string SectorName { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string Description { get; set; }
        public string AttachmentPath { get; set; }
        public string AttachmentName { get; set; }
        public bool IsAnnexure { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public string SubTypeName { get; set; }
        public string SubTypeNameHindi { get; set; }
        public Nullable<bool> IsOldOrder { get; set; }
        public int TotalCount { get; set; }
        public string TypeImagePath { get; set; }
        public Nullable<int> TypeDocumentNoMandatory { get; set; }
        public bool TypeDateMandatory { get; set; }
        public List<OrderAttachmentModel> AttachmentList { get; set; }


    }

    public class OrderGenerateOrderReportSearchResultModel
    {
        public long Id { get; set; }
        public Nullable<long> Type { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> EffectForm { get; set; }
        public string SearchCriteria { get; set; }
        public string FileNumber { get; set; }
        public Nullable<long> LinkToScheme { get; set; }
        public string linktoschemeName { get; set; }
        public string ReferenceLink { get; set; }
        public Nullable<long> IssueBy { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public Nullable<bool> IsLock { get; set; }
        public string BeneficiaryCategoryIds { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string BeneficiaryCategoryNameHindi { get; set; }
        public string DepartmentEffectedIds { get; set; }
        public string DepartmentEffectedName { get; set; }
        public string DepartmentEffectedNameHindi { get; set; }
        public string SectorIds { get; set; }
        public string SectorName { get; set; }
        public string SectorNameHindi { get; set; }
        public string MediaUrls { get; set; }
        public string MediaNames { get; set; }
        public string MediaIsAnnexure { get; set; }
        public string IssueByName { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string ReferenceNumber { get; set; }
        public Nullable<bool> IsOldOrder { get; set; }
        public string BenificiarySchemeIds { get; set; }
        public Nullable<long> CCCategoryCode { get; set; }
        public Nullable<bool> IsByOrderOfGovernor { get; set; }
        public string IsByOrderOfGovernortext { get; set; }
        public Nullable<bool> IsAnnexure { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public string SubTypeName { get; set; }
        public string SubTypeNameHindi { get; set; }
        public string ESignedFinalUrl { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string districtName { get; set; }
        public Nullable<int> OfficeCode { get; set; }
        public string OfficeName { get; set; }
        public List<OrderOrderRelatedToReportResultModel> RelatedToOrderList { get; set; }
        public List<DocumentUrlModel> AttachmentList { get; set; }
    }

    public class OrderOrderRelatedToReportResultModel
    {
        public long Id { get; set; }
        public long OrderEntryID { get; set; }
        public string ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string YearValue { get; set; }
        public string YearText { get; set; }
        public Nullable<long> RelatedToParameterID { get; set; }
        public string Projecthdrid { get; set; }
        public string ResultModuleName { get; set; }
        public string ResultYear { get; set; }
        public string ResultDepartmentId { get; set; }
        public string ResultDepartmentName { get; set; }
        public string ParaNo { get; set; }
        public string FileNumber { get; set; }
        public string ResultDescription { get; set; }
    }

    public class OrderReportSearchModel
    {

        public long? DocumentType { get; set; }
        public string DateOfIssue { get; set; }
        public string DocumentNo { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public long? DepartmentCode { get; set; }
        public string OrderSearch { get; set; }
        public string FromDateOfEntry { get; set; }
        public string ToDateOfEntry { get; set; }
        public long? DocumentSubType { get; set; }
        public string LinkedWith { get; set; }

    }


    public class OrderFrontEndModel
    {
        public long? Id { get; set; }
        public long? Type { get; set; }
        public string Date { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public long? BeneficiaryCategory { get; set; }
        public long? SectorIds { get; set; }
        public long? AdmDepartmentCode { get; set; }

        public long? DepartmentCode { get; set; }
        public IndexModel indexModel { get; set; }
        public string Search { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long? SubTypeCode { get; set; }
        public string EntryFromDate { get; set; }
        public string EntryToDate { get; set; }
        public int Status { get; set; }
        public bool IsNotJankalyan { get; set; }
    }

    public class UploadAttachmentModel
    {
        [EnsureNumberNotZero(ErrorMessage = "Order is required")]
        public long OrderId { get; set; }

        [EnsureOneElement(ErrorMessage = "At least one attachment is required")]
        public List<OrderAttachmentModel> AttachmentList { get; set; }
    }



    public class OrderAttachmentModel
    {
        public long Id { get; set; }
        public long OrderId { get; set; }

        [Required(ErrorMessage = "Attachment path is required")]
        public string Path { get; set; }
        public string AttachmentsName { get; set; }
        public bool IsAnnexure { get; set; }
    }

    public class OrderRelatedToParameterModel
    {
        public long Id { get; set; }
        public long OrderEntryID { get; set; }
        public string ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string YearValue { get; set; }
        public string YearText { get; set; }

        public OrderRelatedToResultModel RelatedToResult { get; set; }
    }

    public class OrderRelatedToResultModel
    {
        public string pm_projecthdrid { get; set; }
        public string modulename { get; set; }
        public string prj_year { get; set; }
        public string prj_dept { get; set; }
        public string prj_ndept { get; set; }
        public string parano { get; set; }
        public string filenumber { get; set; }
        public string prj_description { get; set; }
        public int? CMISNewTransCoreId { get; set; }
    }

    public partial class OrderMasterViewModel
    {

        public OrderMasterViewModel()
        {
            this.MediaUrlList = new List<DocumentUrlModel>();
        }

        public long Id { get; set; }
        public long? Type { get; set; }
        public DateTime? Date { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? EffectForm { get; set; }
        public string ReferenceLink { get; set; }
        public long? IssueBy { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string Remarks { get; set; }
        public string BeneficiaryCategoryIds { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string BeneficiaryCategoryNameHindi { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }

        public string DepartmentEffectedIds { get; set; }
        public string DepartmentEffectedName { get; set; }

        public string DepartmentEffectedNameHindi { get; set; }
        public string SectorIds { get; set; }
        public string SectorName { get; set; }
        public string SectorNameHindi { get; set; }

        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public string IssueByName { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }

        public string MediaUrls { get; set; }
        public string SearchCriteria { get; set; }
        public List<DocumentUrlModel> MediaUrlList { get; set; }

        public string MediaNames { get; set; }
        public string MediaIsAnnexure { get; set; }
        public string ReferenceNumber { get; set; }
        public bool? IsOldOrder { get; set; }
        public string FileNumber { get; set; }
        public Nullable<long> LinkToScheme { get; set; }
        public string linktoschemeName { get; set; }
        public string BenificiarySchemeIds { get; set; }
        public bool IsAnnexure { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public string SubTypeName { get; set; }
        public string SubTypeNameHindi { get; set; }
        public string ESignedFinalUrl { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public string districtName { get; set; }
        public Nullable<int> OfficeCode { get; set; }
        public string OfficeName { get; set; }
        public Nullable<int> TypeDocumentNoMandatory { get; set; }
        public Nullable<bool> TypeDateMandatory { get; set; }

    }

    public partial class OrderRelatedToViewModel
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
        public int? CMISNewTransCoreId { get; set; }
    }

    public class OrderWithRelatedToViewModel
    {
        public OrderMasterViewModel OrderMasterData { get; set; }

        public List<OrderRelatedToViewModel> RelatedToData { get; set; }

    }

    public class OrderServiceModel
    {
        public long Id { get; set; }
        public long? Type { get; set; }
        public DateTime? Date { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? EffectForm { get; set; }
        public string ReferenceLink { get; set; }
        public long? IssueBy { get; set; }
        public string MediaUrls { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string Remarks { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentEffectedName { get; set; }
        public string SectorName { get; set; }
        public string IssueByName { get; set; }
        public string TypeName { get; set; }
        public string SearchCriteria { get; set; }
        public List<DocumentUrlModel> MediaUrlList { get; set; }
        public string ReferenceNumber { get; set; }
        public bool? IsOldOrder { get; set; }
        public string FileNumber { get; set; }
        public string linktoschemeName { get; set; }
    }

    public partial class OrderRelatedToServiceModel
    {
        public long Id { get; set; }
        public int rowno { get; set; }

        public long OrderEntryID { get; set; }
        public string ModuleName { get; set; }
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
    public class OrderResponseServiceModel
    {
        public List<OrderServiceModel> OrderResponse { get; set; }

        public List<OrderRelatedToServiceModel> RelatedToData { get; set; }

    }

    public class TypeGroupOrderListViewModel
    {
        public Nullable<long> Type { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }
        public string ImagePath { get; set; }

        public List<OrderEntryListFrontEndModel> OrderItem { get; set; }


    }

    public class OrderTypeMasterModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string NameHindi { get; set; }
        public Nullable<long> Code { get; set; }
        public Nullable<bool> IsDateMandatory { get; set; }
        public Nullable<int> IsDocumentNoMandatory { get; set; }
    }
    public class OrderDetailMasterViewModel
    {
        public string ReferenceNumber { get; set; }
        public long Id { get; set; }
        public Nullable<long> Type { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string OrderNo { get; set; }
        public string Title { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public string Description { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string BeneficiaryCategoryNameHindi { get; set; }
        public string SectorNameHindi { get; set; }
        public string SectorName { get; set; }
        public bool IsAnnexure { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public string SubTypeName { get; set; }
        public string SubTypeNameHindi { get; set; }
        public bool IsOldOrder { get; set; }
        public int TypeDocumentNoMandatory { get; set; }
        public bool TypeDateMandatory { get; set; }
        public Nullable<bool> isactive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    }
    public class OrderChildParentFilterModel
    {
        public IndexModel IndexModel { get; set; }
        [Required(ErrorMessage = "Order Id is Required")]
        public long Id { get; set; }

    }


    #region Report Model

    public class GetOrderCountReportViewModel
    {
        public int DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public int Total { get; set; }
        public int ActRules { get; set; }
        public int Circular { get; set; }
        public int CitizenCharter { get; set; }
        public int Notification { get; set; }
        public int Order { get; set; }
        public int PolicyGuidelines { get; set; }
        public int AnnualProgressReport { get; set; }
        public int Budget { get; set; }
        public int Covid { get; set; }
        public int Publication { get; set; }
    }

    public class OrderSummaryReportModel
    {
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<long> TypeCode { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string Type { get; set; }
        public string SubType { get; set; }
        public Nullable<int> OrderCount { get; set; }
        public Nullable<int> ActiveOrderCount { get; set; }
        public Nullable<int> DeActiveOrderCount { get; set; }
    }

    public class OrderSummaryReportWithLastTransactionModel
    {
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<long> TypeCode { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string Type { get; set; }
        public string SubType { get; set; }
        public Nullable<int> OrderCount { get; set; }
        public Nullable<int> ActiveOrderCount { get; set; }
        public Nullable<int> DeActiveOrderCount { get; set; }
        public Nullable<System.DateTime> LastTransactionDate { get; set; }
    }

	public class OrderSummaryTypeReportWithLastTransactionModel
	{
		public Nullable<int> DepartmentCode { get; set; }
		public Nullable<long> TypeCode { get; set; }
		public string DepartmentTitle { get; set; }
		public string Type { get; set; }
		public Nullable<int> OrderCount { get; set; }
		public Nullable<int> ActiveOrderCount { get; set; }
		public Nullable<int> DeActiveOrderCount { get; set; }
		public string LastTransactionDate { get; set; }
	}


	public class OrderSummaryReportFilterModel
    {
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> AdminDepartmentCode { get; set; }
        public string CreatedFromDate { get; set; }
        public string CreatedToDate { get; set; }
    }

    public class OrderDepartmentCountReportModel
    {
        public string DepartmentTitle { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> DeActiveOrderCount { get; set; }
        public Nullable<int> ActiveOrderCount { get; set; }
    }

    public class OrderDepartmentCountReportFilterModel
    {
        public string EntryFromDate { get; set; }
        public string EntryToDate { get; set; }
    }

    public class DepartmentCategoryReportFilterModel
    {
        public int DepartmentCategoryCode { get; set; }
        public Nullable<int> DepartmentCode { get; set; }
        public Nullable<int> AdminDepartmentCode { get; set; }
        public string EntryFromDate { get; set; }
        public string EntryToDate { get; set; }
    }

    #endregion


    #region Services

    public class OrderServiceParameterModel
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long? TypeCode { get; set; }
        [Required(ErrorMessage = "DepartmentCode is required")]
        public int? DepartmentCode { get; set; }
    }

    public class OrderServiceResultModel
    {
        public long Id { get; set; }
        public string OrderNo { get; set; }
        public Nullable<long> Type { get; set; }
        public string TypeName { get; set; }
        public string TypeNameHindi { get; set; }
        public string Title { get; set; }
        public DateTime? Date { get; set; }
        public string HindiDate { get; set; }
        public string SectorName { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string BeneficiaryCategoryName { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string Description { get; set; }
        public string AttachmentPath { get; set; }
        public string AttachmentName { get; set; }
        public bool IsAnnexure { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public string SubTypeName { get; set; }
        public string SubTypeNameHindi { get; set; }
        public Nullable<bool> IsOldOrder { get; set; }
        public int TotalCount { get; set; }
        public string TypeImagePath { get; set; }
        public Nullable<int> TypeDocumentNoMandatory { get; set; }
        public bool TypeDateMandatory { get; set; }
        public List<OrderAttachmentModel> AttachmentList { get; set; }


    }

    public class GovDocumentServiceModel
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "Type is required")]
        public long? Type { get; set; }
        public DateTime? Date { get; set; }
        public string OrderNo { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? EffectForm { get; set; }
        public string ReferenceLink { get; set; }
        public long? IssueBy { get; set; }
        public string IndividualBeneficiaryScheme { get; set; }
        public string Remarks { get; set; }
        public string ReferenceNumber { get; set; }
        public bool IsOldOrder { get; set; } = false;
        public List<string> BeneficiaryCategory { get; set; }
        public List<string> DepartmentEffected { get; set; }
        public List<string> Sector { get; set; }
        [EnsureNumberNotZero(ErrorMessage = "Department is required")]
        public int? DepartmentCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string SearchCriteria { get; set; }
        public string FileNumber { get; set; }
        public Nullable<long> LinkToScheme { get; set; }
        public List<long> BenificiarySchemeIds { get; set; }
        public List<OrderAttachmentModel> AttachmentList { get; set; }
        public Nullable<int> SubTypeCode { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<int> OfficeCode { get; set; }
        public long ModuleId { get; set; }

    }


    #endregion

}