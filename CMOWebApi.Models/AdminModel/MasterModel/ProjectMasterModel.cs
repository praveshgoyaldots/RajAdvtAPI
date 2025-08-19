using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.AdminModel.MasterModel
{
    public class ProjectMasterModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string ProjectSchemeName { get; set; }

        [Required(ErrorMessage = "Year of initiation is required")]
        public long YearOfInitiationCode { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public long ProjectStatusCode { get; set; }
        [Required(ErrorMessage = "Scheme program is required")]
        public long ProjectSchemeProgramCode { get; set; }
        [Required(ErrorMessage = "Nodal department is required")]
        public int NodalDepartmentCode { get; set; }
        public long DevelopmentSectorCode { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public int ProjectCategoryCode { get; set; }
        [Required(ErrorMessage = "Sub category is required")]
        public int ProjectSubCategoryCode { get; set; }
        public Nullable<bool> IsCMPriority { get; set; }
        public string ProjectSchemeDescription { get; set; }
        public string ProjectSchemeObjective { get; set; }
        public Nullable<bool> IsBeingInAuguratedByHCM { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public string LabelName { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public List<ProjectMasterProjectsMappingModel> ProjectMappingList { get; set; }
        [Required(ErrorMessage = "Work type is required")]
        public int? SubSubCategoryCode { get; set; }
        public Nullable<int> ProjectSchemeCode { get; set; }
        public Nullable<bool> IsCostCalculated { get; set; } = false;
        public Nullable<bool> IsShilanyas { get; set; } = false;
        public Nullable<System.DateTime> ShilanyasDate { get; set; }
        //For service 
        public long ModuleId { get; set; }
        public List<ProjectBudgetParameterModel> ProjectBudgetParameter { get; set; }
        public Nullable<int> PerformedByMLACode { get; set; }
        public Nullable<System.DateTime> StatusDate { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
    }

    public class ProjectMasterProjectsMappingModel
    {
        public long Id { get; set; }
        public Nullable<int> ProjectMasterId { get; set; }
        [Required(ErrorMessage = "Cost is required")]
        public Nullable<decimal> Cost { get; set; }
        [Required(ErrorMessage = "Label Name is required")]
        public string LabelName { get; set; }
        [Required(ErrorMessage = "Urban Or Rural is required")]
        public Nullable<long> UrbanOrRural { get; set; }
        public Nullable<int> MPConstituency { get; set; }
        [Required(ErrorMessage = "MLA Constituency is required")]
        public List<string> MLAConstituencyList { get; set; }
        public string AreaCovered { get; set; }
        public Nullable<bool> IsPartofMLALAD { get; set; }
        public List<DocumentUrlModel> Attachments { get; set; }
        public string AttachmentExtension { get; set; }
        public Nullable<long> ProjectWorkCategory { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> WardNo { get; set; }
        public string BlockText { get; set; }
        public List<string> BlockPSList { get; set; }
        public List<string> GramPanchayatList { get; set; }
        public List<string> VillageList { get; set; }
        public List<string> DistrictCodes { get; set; }

    }

    public class ProjectMasterViewModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string ProjectSchemeName { get; set; }
        public long YearOfInitiationCode { get; set; }
        public long ProjectStatusCode { get; set; }
        public long ProjectSchemeProgramCode { get; set; }
        public int NodalDepartmentCode { get; set; }
        public long DevelopmentSectorCode { get; set; }
        public int ProjectCategoryCode { get; set; }
        public Nullable<int> ProjectSubCategoryCode { get; set; }
        public Nullable<bool> IsCMPriority { get; set; }
        public string ProjectSchemeDescription { get; set; }
        public string ProjectSchemeObjective { get; set; }
        public Nullable<bool> IsBeingInAuguratedByHCM { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string DepartmentTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string StatusName { get; set; }
        public string createdByName { get; set; }
        public string MLAConstituencyName { get; set; }
        public string MPConstituencyName { get; set; }
        public string SubSubCategoryName { get; set; }
        public string ChildDescription { get; set; }
        public string CreatedUserContact { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public string DistrictNames { get; set; }
    }

    public partial class ProjectSearchModel
    {
        public int AdmDepartmentCode { get; set; }
        public int DistrictDepartmentCode { get; set; }

        public int DepartmentCode { get; set; }
        public int DistrictCode { get; set; } = 0;
        public int MPConstituencyCode { get; set; }
        public int MLAConstituencyCode { get; set; }
        public long StatusCode { get; set; }

        public long StartYearCode { get; set; }
        public int SectorCode { get; set; }
        public int CategoryCode { get; set; }
        public int SubCategoryCode { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string KeywordSearch { get; set; }

        public bool? IsActive { get; set; }

        public IndexModel IndexModel { get; set; }
        public int WorkTypeCode { get; set; }

    }

    public class ProjectMasterFrontViewModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string ProjectSchemeName { get; set; }
        public long YearOfInitiationCode { get; set; }
        public long ProjectStatusCode { get; set; }
        public long ProjectSchemeProgramCode { get; set; }
        public int NodalDepartmentCode { get; set; }
        public long DevelopmentSectorCode { get; set; }
        public int ProjectCategoryCode { get; set; }
        public Nullable<int> ProjectSubCategoryCode { get; set; }
        public Nullable<bool> IsCMPriority { get; set; }
        public string ProjectSchemeDescription { get; set; }
        public string ProjectSchemeObjective { get; set; }
        public Nullable<bool> IsBeingInAuguratedByHCM { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string LabelName { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public Nullable<int> SubSubCategoryCode { get; set; }
        public Nullable<int> ProjectSchemeCode { get; set; }
        public Nullable<bool> IsCostCalculated { get; set; }
        public Nullable<bool> IsShilanyas { get; set; }
        public Nullable<System.DateTime> ShilanyasDate { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public int AdmDepartmentCode { get; set; }
        public string AdmDepartmentTitle { get; set; }
        public string AdmDepartmentTitleHindi { get; set; }
        public string CategoryName { get; set; }
        public string CategoryNameHindi { get; set; }
        public Nullable<int> SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public string SubCategoryNameHindi { get; set; }
        public string SubCategoryLabelName { get; set; }
        public string SectorName { get; set; }
        public string SectorNameHindi { get; set; }
        public string YearOfInitiationName { get; set; }
        public string YearOfInitiationNameHindi { get; set; }
        public string StatusName { get; set; }
        public string StatusNameHindi { get; set; }
        public string ProjectSchemeProgramName { get; set; }
        public string ProjectSchemeProgramNameHindi { get; set; }
        public string MLAConstituencyCode { get; set; }
        public string MLAConstituencyName { get; set; }
        public string MLAConstituencyNameHindi { get; set; }
        public string MLAName { get; set; }
        public string MLANameHindi { get; set; }
        public string MLAConstituencyDistrictCode { get; set; }
        public string MLAConstituencyDistrictName { get; set; }
        public string MLAConstituencyDistrictNameHindi { get; set; }
        public Nullable<int> MPConstituencyCode { get; set; }
        public string MPConstituencyName { get; set; }
        public string MPConstituencyNameHindi { get; set; }
        public string MPName { get; set; }
        public string MPNameHindi { get; set; }
        public Nullable<int> MPConstituencyDistrictCode { get; set; }
        public string MPConstituencyDistrictName { get; set; }
        public string MPConstituencyDistrictNameHindi { get; set; }
        public string ProgramSchemeName { get; set; }
        public string ProjectWorkCategoryName { get; set; }
        public string ProjectWorkCategoryNameHindi { get; set; }
        public Nullable<int> WorkTypeCode { get; set; }
        public string WorkTypeName { get; set; }
        public string WorkTypeNameHindi { get; set; }
        public string KeyWord { get; set; }
        public string Description { get; set; }
        public List<ProjectMasterProjectsMappingViewModel> ProjectMappingItems { get; set; }
    }
    public class ProjectMasterProjectsMappingViewModel
    {
        public long Id { get; set; }
        public Nullable<int> ProjectMasterId { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public string LabelName { get; set; }
        public Nullable<long> UrbanOrRural { get; set; }
        public Nullable<int> MPConstituency { get; set; }
        public string MLAConstituency { get; set; }
        public string AreaCovered { get; set; }
        public Nullable<bool> IsPartofMLALAD { get; set; }
        public string PDFURL { get; set; }
        public Nullable<long> ProjectWorkCategory { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> WardNo { get; set; }
        public string BlockText { get; set; }
        public string MLAConstituencyName { get; set; }
        public string MLAConstituencyNameHindi { get; set; }
        public string MLANameEng { get; set; }
        public string MLANameHindi { get; set; }
        public string MLADistrictCode { get; set; }
        public string MLADistrictTitle { get; set; }
        public string MLADistrictTitleHindi { get; set; }
        public string MPConstituencyName { get; set; }
        public string MPConstituencyNameHindi { get; set; }
        public string MPNameEng { get; set; }
        public string MPNameHindi { get; set; }
        public Nullable<int> MPDistrictCode { get; set; }
        public string MPDistrictTitle { get; set; }
        public string MPDistrictTitleHindi { get; set; }
        public string AreaName { get; set; }
        public string AreaNameHindi { get; set; }
        public string ProjectWorkCategoryName { get; set; }
        public string ProjectWorkCategoryNameHindi { get; set; }

        public List<string> Attachements { get; set; }
    }

    #region Budget

    public class ProjectBudgetParameterModel
    {
        public long Id { get; set; }
        public long OrderEntryID { get; set; }
        public string ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string YearValue { get; set; }
        public string YearText { get; set; }

        public ProjectBudgetParameterResultModel BudgetResult { get; set; }
    }

    public class ProjectBudgetParameterResultModel
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

    #endregion

    #region Update Progress

    public class ProjectUpdateProgressMappingModel
    {
        public long Id { get; set; }
        public int ProjectId { get; set; }
        public Nullable<int> MileStoneCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Description { get; set; }
        public string PDF { get; set; }
        public List<string> Images { get; set; }
        public Nullable<long> StatusCode { get; set; }
        public string MilestoneLabel { get; set; }
    }

    public class ProjectMasterShorDetailModel
    {
        public int ProjectId { get; set; }
        public string ProgramSchemeName { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string DepartmentTitle { get; set; }
    }

    #endregion

    #region Reports

    public class ProjectReportFilterModel : IndexModel
    {
        public int Id { get; set; }
        public string MLACode { get; set; }
        public string DistrictCode { get; set; }
        public int? NodalDepartmentCode { get; set; }
        public int? SubCategoryCode { get; set; }
        public int? CategoryCode { get; set; }
        public int? SubSubCategoryCode { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
        public int? Status { get; set; }
        public long ProjectStatusCode { get; set; }
        public string ProjectSchemeCode { get; set; }
        public int IsAllAttachment { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> IsShilanyas { get; set; }
        public long CMOOfficerCode { get; set; }
        public int AdmDepartmentCode { get; set; }
        public int LoginUserId { get; set; }
        public bool IsShowDataWithProgress { get; set; }
    }

    public class ProjectReportModel
    {
        public int Id { get; set; }
        public string ProjectSchemeName { get; set; }
        public Nullable<bool> IsCMPriority { get; set; }
        public string ProjectSchemeDescription { get; set; }
        public string ProjectSchemeObjective { get; set; }
        public Nullable<bool> IsBeingInAuguratedByHCM { get; set; }
        public string LabelName { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public string DepartmentTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string StatusName { get; set; }
        public string createdByName { get; set; }
        public string MLAConstituencyName { get; set; }
        public string MPConstituencyName { get; set; }
        public string SubSubCategoryName { get; set; }
        public string PDFURLs { get; set; }
        public string ChildDescription { get; set; }
        public string ChildLabelName { get; set; }
        public string DistrictName { get; set; }
        public string SubCatLabelName { get; set; }
        public string ProjectSchemeProgramName { get; set; }
        public string YearOfInitiationName { get; set; }
        public string DevelopmentSectorName { get; set; }
        public string UrbanOrRuralName { get; set; }
        public Nullable<decimal> WardNo { get; set; }
        public string AreaCovered { get; set; }
        public string Block_PSNames { get; set; }
        public string GramPanchayatNames { get; set; }
        public string VillageNames { get; set; }
        public string DistrictNames { get; set; }
        public Nullable<int> DistrictCount { get; set; }
    }

    public class ProjectSummaryReportModel
    {
        public string DistrictTitle { get; set; }
        public Nullable<int> MLAConstituencyCode { get; set; }
        public string MLAConstituency { get; set; }
        public Nullable<int> Completed { get; set; }
        public Nullable<int> OnGoing { get; set; }
        public Nullable<int> YetToBeStarted { get; set; }
        public Nullable<int> MLARequestReceived { get; set; }
        public Nullable<int> TechnicallyNotFeasible { get; set; }
        public Nullable<int> PendingforInauguration { get; set; }
        public Nullable<int> Shilanyas { get; set; }
        public Nullable<int> Lokarpan { get; set; }
        public Nullable<int> TaskInProgress { get; set; }
    }

    public class ProjectDepartmentStatusSummaryReportModel
    {
        public string DepartmentTitle { get; set; }
        public int NodalDepartmentCode { get; set; }
        public Nullable<int> Completed { get; set; }
        public Nullable<int> OnGoing { get; set; }
        public Nullable<int> YetToBeStarted { get; set; }
        public Nullable<int> MLARequestReceived { get; set; }
        public Nullable<int> TechnicallyNotFeasible { get; set; }
        public Nullable<int> PendingforInauguration { get; set; }
        public Nullable<int> Shilanyas { get; set; }
        public Nullable<int> Lokarpan { get; set; }
        public Nullable<int> TaskInProgress { get; set; }
    }
    public class SumOfDynamicLabelSummaryReportModel
    {
        public string DistrictTitle { get; set; }
        public string MLAConstituency { get; set; }
        public Nullable<int> MLAConstituencyCode { get; set; }
        public Nullable<decimal> Completed { get; set; }
        public Nullable<decimal> OnGoing { get; set; }
        public Nullable<decimal> YetToBeStarted { get; set; }
        public Nullable<decimal> MLARequestReceived { get; set; }
        public Nullable<decimal> TechnicallyNotFeasible { get; set; }
        public Nullable<decimal> PendingforInauguration { get; set; }
        public Nullable<decimal> Shilanyas { get; set; }
        public Nullable<decimal> Lokarpan { get; set; }
        public Nullable<decimal> TaskInProgress { get; set; }
    }

    public class ProjectDepartmentWiseSummaryReportModel
    {
        public string DepartmentTitle { get; set; }
        public int NodalDepartmentCode { get; set; }
        public string ProjectStatusName { get; set; }
        public string ProjectCategory { get; set; }
        public string ProjectSubCategory { get; set; }
        public string ProjectSubSubCategory { get; set; }
        public Nullable<int> WithMLAConstituencyCount { get; set; }
        public Nullable<int> WithoutMLAConstituencyCount { get; set; }
        public Nullable<int> MLAConstituencyCount { get; set; }
    }

    #endregion

    #region Web Service

    public class WorksEntryServiceModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Year of initiation is required")]
        public long YearOfInitiationCode { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public long StatusCode { get; set; }
        [Required(ErrorMessage = "Scheme program is required")]
        public long ProjectSchemeProgramCode { get; set; }
        [Required(ErrorMessage = "Nodal department is required")]
        public int NodalDepartmentCode { get; set; }
        public long DevelopmentSectorCode { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public int CategoryCode { get; set; }
        [Required(ErrorMessage = "Sub category is required")]
        public int SubCategoryCode { get; set; }
        public Nullable<bool> IsCMPriority { get; set; }
        public string Description { get; set; }
        public string Objective { get; set; }
        public Nullable<bool> IsBeingInAuguratedByHCM { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string LabelName { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public List<WokrsMappingModel> WorksMappingList { get; set; }
        [Required(ErrorMessage = "Work type is required")]
        public int? WorkTypeCode { get; set; }
        public Nullable<int> SchemeCode { get; set; }
        public Nullable<bool> IsCostCalculated { get; set; } = false;
        public Nullable<bool> IsShilanyas { get; set; } = false;
        public Nullable<System.DateTime> ShilanyasDate { get; set; }
        //For service 
        public long ModuleId { get; set; }
        //  public List<ProjectBudgetParameterModel> ProjectBudgetParameter { get; set; }
        public Nullable<int> PerformedByMLACode { get; set; }
        public Nullable<System.DateTime> StatusDate { get; set; }
        public bool IsActive { get; set; } = false;
    }


    public class WokrsMappingModel
    {
        public long Id { get; set; }
        public Nullable<int> WorksMasterId { get; set; }
        [Required(ErrorMessage = "Cost is required")]
        public Nullable<decimal> Cost { get; set; }
        [Required(ErrorMessage = "Label Name is required")]
        public string LabelName { get; set; }
        [Required(ErrorMessage = "Urban Or Rural is required")]
        public Nullable<long> UrbanOrRural { get; set; }
        public Nullable<int> MPConstituency { get; set; }
        [Required(ErrorMessage = "MLA Constituency is required")]
        public List<string> MLAConstituencyList { get; set; }
        public string AreaCovered { get; set; }
        public Nullable<bool> IsPartofMLALAD { get; set; }
        public List<DocumentUrlModel> Attachments { get; set; }
        public string AttachmentExtension { get; set; }
        public Nullable<long> WorkCategory { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> WardNo { get; set; }
        public string BlockText { get; set; }
        public List<string> BlockPSList { get; set; }
        public List<string> GramPanchayatList { get; set; }
        public List<string> VillageList { get; set; }
        public List<string> DistrictCodes { get; set; }

    }

    #endregion

    public class ProjectDetailsWithProgressAndChildTableDataModel
    {
        public int Id { get; set; }
        public Nullable<int> Code { get; set; }
        public string ProjectSchemeName { get; set; }
        public string SectorName { get; set; }
        public Nullable<bool> IsCMPriority { get; set; }
        public string ProjectSchemeDescription { get; set; }
        public string ProjectSchemeObjective { get; set; }
        public Nullable<bool> IsBeingInAuguratedByHCM { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string LabelName { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public string DepartmentTitle { get; set; }
        public string SubCategoryName { get; set; }
        public string ProgramSchemeName { get; set; }
        public string CategoryName { get; set; }
        public string StatusName { get; set; }
        public string createdByName { get; set; }
        public Nullable<bool> IsShilanyas { get; set; }
        public string CreatedUserContact { get; set; }
        public Nullable<System.DateTime> StatusDate { get; set; }
        public string PerformedByMLAName { get; set; }
        public string ProjectSchemeProgramName { get; set; }
        public string YearOfInitiationName { get; set; }
        public ProjectsMappingModel ProjectsMappingData { get; set; }
        public List<BudgetParameterModel> BudgetParameterList { get; set; }
        public List<UpdateProgressMappingModel> UpdateProgressMappingList { get; set; }

    }

    public class ProjectsMappingModel
    {
        public long Id { get; set; }
        public Nullable<int> ProjectMasterId { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public string LabelName { get; set; }
        public Nullable<long> UrbanOrRural { get; set; }
        public string UrbanOrRuralNAme { get; set; }
        public string AreaCovered { get; set; }
        public Nullable<bool> IsPartofMLALAD { get; set; }
        public string PDFURL { get; set; }
        public string ProjectWorkCategoryName { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> WardNo { get; set; }
        public string BlockText { get; set; }
        public string MLAConstituencyName { get; set; }
        public string DistrictNames { get; set; }
        public string BlockNames { get; set; }
        public string GramPanchayatNames { get; set; }
        public string VillageNames { get; set; }
        public List<string> Attachments { get; set; }
    }

    public class BudgetParameterModel
    {
        public long Id { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentName { get; set; }
        public string YearText { get; set; }
        public string Description { get; set; }
    }

    public class UpdateProgressMappingModel
    {
        public long Id { get; set; }
        public int ProjectId { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Description { get; set; }
        public string PDF { get; set; }
        public string MilestoneLabel { get; set; }
        public string MileStoneName { get; set; }
        public string StatusName { get; set; }
        public List<string> Attachments { get; set; }
    }

    public class ProjectMasterListByFilterNewModel
    {
        public int Id { get; set; }
        public string ProjectSchemeName { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public string DepartmentTitle { get; set; }
        public string DepartmentTitleHindi { get; set; }
        public string AdmDepartmentTitle { get; set; }
        public string AdmDepartmentTitleHindi { get; set; }
        public string CategoryName { get; set; }
        public string CategoryNameHindi { get; set; }
        public string SubCategoryName { get; set; }
        public string SubCategoryNameHindi { get; set; }
        public string SubCategoryLabelName { get; set; }
        public string SectorName { get; set; }
        public string SectorNameHindi { get; set; }
        public string YearOfInitiationName { get; set; }
        public string ProjectSchemeProgramName { get; set; }
        public string ProjectSchemeProgramNameHindi { get; set; }
        public string MLAConstituencyName { get; set; }
        public string MLAConstituencyNameHindi { get; set; }
        public string MLAConstituencyDistrictName { get; set; }
        public string MLAConstituencyDistrictNameHindi { get; set; }
        public string ProgramSchemeName { get; set; }
        public string WorkTypeName { get; set; }
        public string WorkTypeNameHindi { get; set; }
        public string Description { get; set; }
        public int TotalRecords { get; set; }
    }
}
