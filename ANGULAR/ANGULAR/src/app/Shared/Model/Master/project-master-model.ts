import { DocumentUrlModel } from "../commonddl.model";
import { IndexModel } from '../general-model';

export class ProjectMasterModel {
  Id: number;
  Code: number;
  ProjectSchemeName: string;
  YearOfInitiationCode: number | string;
  ProjectStatusCode: string;
  ProjectSchemeProgramCode: number | string;
  NodalDepartmentCode: number | string;
  DevelopmentSectorCode: number | string;
  ProjectCategoryCode: number | string;
  ProjectSubCategoryCode: number | string;
  IsCMPriority: boolean;
  IsShilanyas: boolean;
  ProjectSchemeDescription: string;
  ProjectSchemeObjective: string;
  IsBeingInAuguratedByHCM: boolean;
  ModifiedDate: string;
  LabelName: string;
  Cost: number;
  SubSubCategoryCode: number | string;
  ProjectSchemeCode: number | string;
  IsCostCalculated: boolean;
  ProjectMappingList: ProjectMasterProjectsMappingModel[] = [];
  ShilanyasDate?: Date;
  ProjectBudgetParameter: ProjectBudgetParameterModel[] = [];
  PerformedByMLACode: number | string;
  StatusDate: Date;
  Latitude: string;
  Longitude: string;

  constructor() {
    this.ProjectSchemeObjective = "";
    this.ProjectMappingList = [];
    this.ProjectBudgetParameter = [];
  }
}

export class ProjectMasterProjectsMappingModel {
  LabelName: string;
  Cost: number;
  UrbanOrRural: string;
  MPConstituency: string | number;
  MLAConstituencyList: string[] = [];
  MLAConstituency: string;
  AreaCovered: string;
  IsPartofMLALAD: boolean;
  Attachments: DocumentUrlModel[] = [];
  ProjectWorkCategory: string | number;
  Description: string;
  AttachmentExtension: string;
  WardNo: number;
  BlockText: string;
  BlockPSList: string[] | number[];
  GramPanchayatList: string[] | number[];
  VillageList: string[] | number[];
  DistrictCodes: string[] = [];
  DistrictCode: string;
}

export class ProjectMasterViewModel {
  Id: number;
  Code: number;
  ProjectSchemeName: string;
  YearOfInitiationCode: number;
  ProjectStatusCode: number;
  ProjectSchemeProgramCode: number;
  NodalDepartmentCode: number;
  DevelopmentSectorCode: number;
  ModifiedDate: Date;
  ProjectCategoryCode: number;
  ProjectSubCategoryCode: number;
  IsCMPriority: boolean;
  ProjectSchemeDescription: string;
  ProjectSchemeObjective: string;
  IsBeingInAuguratedByHCM: boolean;
  DepartmentTitle: string;
  SubCategoryName: string;
  CategoryName: string;
  StatusName: string;
  createdByName: string;
  MLAConstituencyName: string;
  MPConstituencyName: string;
  SubSubCategoryName: string;
  ChildDescription: string;
  CreatedUserContact: string;
  Cost: number;
  DistrictNames: string;
}

//#region <Budget>

export class ProjectBudgetParameterModel {
  Id: number;
  ModuleId: string;
  ModuleName: string;
  DepartmentId: string;
  DepartmentName: string;
  YearValue: string;
  YearText: string;
  BudgetResult: ProjectBudgetParameterResultModel;
  constructor() {
    this.Id = 0;
    this.ModuleId = "";
    this.ModuleName = "";
    this.DepartmentId = "";
    this.DepartmentName = "";
    this.YearValue = "";
    this.YearText = "";
    this.BudgetResult = new ProjectBudgetParameterResultModel();
  }
}

export class ProjectBudgetParameterResultModel {
  pm_projecthdrid: string;
  modulename: string;
  prj_year: string;
  prj_dept: string;
  prj_ndept: string;
  parano: string;
  filenumber: string;
  prj_description: string;
  rowno: number;
  CMISNewTransCoreId: number;
  constructor() {
    this.pm_projecthdrid = "";
    this.modulename = "";
    this.prj_year = "";
    this.prj_dept = "";
    this.prj_ndept = "";
    this.parano = "";
    this.filenumber = "";
    this.prj_description = "";
    this.CMISNewTransCoreId = 0;
  }
}

//#endregion <Budget>

//#region <Update Progrss>

export class ProjectUpdateProgressMappingModel {
  Id: number;
  ProjectId: number;
  MileStoneCode: number | string;
  Date: Date | string;
  Description: string;
  PDF: string;
  Images: string[] = [];
  StatusCode: number | string;
  MilestoneLabel: string;
}

export class ProjectMasterShorDetailModel {
  ProjectId: number;
  ProgramSchemeName: string;
  CategoryName: string;
  SubCategoryName: string;
  DepartmentTitle: string;
}

//#endregion<Update Progrss>

//#region <Project Report>

export class ProjectReportFilterModel extends IndexModel {
  Id: number;
  MLACode: string[] | string;
  DistrictCode: string[] | string;
  NodalDepartmentCode: number;
  SubCategoryCode: number;
  CategoryCode: number;
  SubSubCategoryCode: number;
  ToDate: string;
  FromDate: string;
  Status: number;
  ProjectStatusCode: number;
  ProjectSchemeCode: string[] | string;
  IsAllAttachment: number;
  CreatedBy: number;
  IsShilanyas: number;
  CMOOfficerCode: number;
  AdmDepartmentCode: number;
  IsShowDataWithProgress: boolean;
  constructor() {
    super();
    this.Status = 1;
    this.IsAllAttachment = 0;
    this.SubSubCategoryCode = -1;
    this.IsShilanyas = -1;
  }
}

export class ProjectReportModel {
  Id: number;
  ProjectSchemeName: string;
  IsCMPriority: boolean;
  ProjectSchemeDescription: string;
  ProjectSchemeObjective: string;
  IsBeingInAuguratedByHCM: boolean;
  LabelName: string;
  Cost: number;
  DepartmentTitle: string;
  SubCategoryName: string;
  CategoryName: string;
  StatusName: string;
  createdByName: string;
  MLAConstituencyName: string;
  MPConstituencyName: string;
  SubSubCategoryName: string;
  PDFURLs: string; //DocumentUrlModel[] = [];
  ChildDescription: string;
  ChildLabelName: string;
  DistrictNames: string;
  SubCatLabelName: string;
  UrbanOrRuralName: string;
  WardNo: string;
  AreaCovered: string;
  Block_PSNames: string;
  GramPanchayatNames: string;
  VillageNames: string;
  DistrictCount: number;
}

//#endregion<Project Report>

//#region project summary report
export class ProjectSummaryReportModel {
  DistrictTitle: string;
  MLAConstituency: string;
  MLAConstituencyCode: number;
  Completed: number;
  OnGoing: number;
  YetToBeStarted: number;
  MLARequestReceived: number;
  TechnicallyNotFeasible: number;
  PendingforInauguration: number;
  Shilanyas: number;
  Lokarpan: number;
  TaskInProgress: number;
}

export class ProjectDepartmentStatusSummaryReportModel {
  DepartmentTitle: string;
  NodalDepartmentCode: number;
  Completed: number | null;
  OnGoing: number | null;
  YetToBeStarted: number | null;
  MLARequestReceived: number | null;
  TechnicallyNotFeasible: number | null;
  PendingforInauguration: number | null;
  Shilanyas: number | null;
  Lokarpan: number | null;
  TaskInProgress: number | null;
}


//#endregion

//#region Sum Of Dynamic Label Summary Report

export class SumOfDynamicLabelSummaryReportModel {
  DistrictTitle: string;
  MLAConstituency: string;
  MLAConstituencyCode: number;
  Completed: number;
  OnGoing: number;
  YetToBeStarted: number;
  MLARequestReceived: number;
  TechnicallyNotFeasible: number;
  PendingforInauguration: number;
  Shilanyas: number;
  Lokarpan: number;
  TaskInProgress: number;
}

export class ProjectDepartmentWiseSummaryReportModel {
  DepartmentTitle: string;
  ProjectStatusName: string;
  NodalDepartmentCode: number;
  ProjectCategory: number;
  ProjectSubCategory: number;
  ProjectSubSubCategory: number;
  WithMLAConstituencyCount: number;
  WithoutMLAConstituencyCount: number;
  MLAConstituencyCount: number;
}

//#endregion

////#region Project master detail section model

export class ProjectDetailsWithProgressAndChildTableDataModel {
  Id: number;
  Code: number | null;
  ProjectSchemeName: string;
  SectorName: string;
  IsCMPriority: boolean | null;
  ProjectSchemeDescription: string;
  ProjectSchemeObjective: string;
  IsBeingInAuguratedByHCM: boolean | null;
  CreatedDate: Date | string;
  ModifiedDate: Date | string | null;
  LabelName: string;
  Cost: number | null;
  DepartmentTitle: string;
  SubCategoryName: string;
  ProgramSchemeName: string;
  CategoryName: string;
  StatusName: string;
  createdByName: string;
  IsShilanyas: boolean | null;
  CreatedUserContact: string;
  StatusDate: Date | string | null;
  PerformedByMLAName: string;
  ProjectSchemeProgramName: string;
  YearOfInitiationName: string;
  ProjectsMappingData: ProjectsMappingModel;
  BudgetParameterList: BudgetParameterModel[];
  UpdateProgressMappingList: UpdateProgressMappingModel[];

}

export class ProjectsMappingModel {
  Id: number;
  ProjectMasterId: number | null;
  Cost: number | null;
  LabelName: string;
  UrbanOrRural: number | null;
  UrbanOrRuralNAme: string;
  AreaCovered: string;
  IsPartofMLALAD: boolean | null;
  PDFURL: string;
  ProjectWorkCategoryName: string;
  Description: string;
  WardNo: number | null;
  BlockText: string;
  MLAConstituencyName: string;
  DistrictNames: string;
  BlockNames: string;
  GramPanchayatNames: string;
  VillageNames: string;
  Attachments: string[];
}

export class BudgetParameterModel {
  Id: number;
  ModuleName: string;
  DepartmentName: string;
  YearText: string;
  Description: string;
}

export class UpdateProgressMappingModel {
  Id: number;
  ProjectId: number;
  Date: Date | string | null;
  Description: string;
  PDF: string;
  MilestoneLabel: string;
  MileStoneName: string;
  StatusName: string;
  Attachments: string[];
}


////#endregion

