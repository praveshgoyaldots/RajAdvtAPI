import { DocumentUrlModel } from "./commonddl.model";
import { IndexModel } from "./general-model";

export class OrderEntryModel {
  Id: number;
  Type?: number | string;
  Title: string;
  Description: string;
  IssueBy?: number | string;
  LinkToScheme?: string | number;
  FileNumber: string;
  ReferenceLink: string;
  IndividualBeneficiaryScheme: string;
  Remarks: string;
  OrderNo: string;
  EffectForm?: Date | string;
  Date?: Date | string;
  BeneficiaryCategory: number[];
  DepartmentCode: number | string;
  DepartmentTitle: string;
  DepartmentEffected: number[];
  Sector: number[];
  File: FileList;
  RelatedToOrderParameterList: OrderRelatedToModel[] = [];
  //use for comma separated
  BeneficiaryCategoryIds: string;
  SearchCriteria: string;
  DepartmentEffectedIds: string;
  SectorIds: string;
  MediaUrls: string;
  MediaNames: string;
  TypeName: string;
  SectorName: string;
  BeneficiaryCategoryName: string;
  DepartmentEffectedName: string;
  IssueByName: string;
  ReferenceNumber: string;
  IsOldOrder: boolean;
  AttachmentList: OrderAttachmentModel[] = [];
  MediaUrlList: DocumentUrlModel[] = [];
  linktoschemeName: string;
  SubTypeCode: string | number;
  BenificiarySchemeIds: number[] | string[];
  DistrictCode: number | string;
  OfficeCode: number;
  OfficeName: string;
  SubTypeName: string;
}

export class OrderAttachmentModel {
  Path: string;
  AttachmentsName: string;
}

export class OrderEntryListModel {
  Id: number;
  SNo: number;
  Date: Date;
  OrderNo: string;
  Title: string;
  IsActive: boolean;
}

export class OrderRelatedToModel {
  Id: number;
  ModuleId: string;
  ModuleName: string;
  DepartmentId: string;
  DepartmentName: string;
  YearValue: string;
  YearText: string;
  RelatedToResult: OrderRelatedToModelResult;
  constructor() {
    this.Id = 0;
    this.ModuleId = "";
    this.ModuleName = "";
    this.DepartmentId = "";
    this.DepartmentName = "";
    this.YearValue = "";
    this.YearText = "";
    this.RelatedToResult = new OrderRelatedToModelResult();
  }
}

export class OrderRelatedToModelResult {
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
    this.CMISNewTransCoreId=0;
  }
}

export class OrderWithRelatedToViewModel {
  OrderMasterData: any;
  RelatedToData: any[] = [];
}

export class UploadAttachmentModel {
  OrderId: number | string;
  AttachmentList: OrderAttachmentModel[] = [];
}

export class CustomDateSearchModel extends IndexModel {
  SearchDate: Date | string;
  Id: number;
  FromDate: Date | string;
  ToDate: Date | string;
  DepartmentCode: number;
  IsExportToExcel: boolean;
  constructor() {
    super();
    this.SearchDate = null;
  }
}

export class DepartmentFilterModel {
  ModuleName: string;
  Year: string;
}

export class OrderReportListModel {
  DepartmentCode: number;
  DepartmentTitle: string;
  Total: number;
  ActRules: number;
  Circular: number;
  CitizenCharter: number;
  Notification: number;
  Order: number;
  PolicyGuidelines: number;
  AnnualProgressReport: number;
  Budget: number;
  Covid: number;
  Publication: number;
}

export class DepartmentCategoryReportFilterModel {
  DepartmentCategoryCode: number | string;
  DepartmentCode: number | string;
  AdminDepartmentCode: number | string;
  EntryFromDate: Date | string;
  EntryToDate: Date | string;
  constructor(){
    this.AdminDepartmentCode=String(0);
    this.DepartmentCategoryCode=String(0);
  }
}

export class OrderReportSearchModel extends IndexModel {
  FromDateOfEntry: Date | string;
  ToDateOfEntry: Date | string;
  DateOfIssue: Date | string;
  DocumentType: number | string;
  DocumentSubType: number | string;
  IndividualBeneficiaryScheme: string;
  DepartmentCode: number | string;
  DocumentNo: string;
  OrderSearch: number | string;
  LinkedWith: string;
  constructor() {
    super();
    this.FromDateOfEntry = null;
    this.ToDateOfEntry = null;
  }
}

export class OrderGenerateOrderReportSearchResultModel {
  Id: number;
  Type?: number | string;
  Date?: Date | string;
  Title: string;
  OrderNo: string;
  Description: string;
  EffectForm: Date | string;
  SearchCriteria: string;
  FileNumber: string;
  LinkToScheme: number | string;
  ReferenceLink: string;
  IssueBy: number | string;
  IndividualBeneficiaryScheme: string;
  Remarks: string;
  DepartmentCode: number | string;
  DepartmentTitle: string;
  DepartmentTitleHindi: string;
  IsLock: number;
  BeneficiaryCategoryIds: string;
  BeneficiaryCategoryName: string;
  BeneficiaryCategoryNameHindi: string;
  DepartmentEffectedIds: string | number;
  DepartmentEffectedName: string;
  DepartmentEffectedNameHindi: string;
  SectorIds: string | number;
  SectorName: string;
  SectorNameHindi: string;
  MediaUrls: string;
  MediaNames: string;
  MediaIsAnnexure: string;
  IssueByName: string;
  TypeName: string;
  TypeNameHindi: string;
  CreatedDate: Date | string;
  CreatedBy: number;
  ModifiedDate: Date | string;
  ModifiedBy: number;
  IsActive: number;
  IsDeleted: number;
  ReferenceNumber: string;
  IsOldOrder: number;
  BenificiarySchemeIds: string | number;
  CCCategoryCode: number | string;
  IsByOrderOfGovernor: number;
  IsByOrderOfGovernortext: string;
  IsAnnexure: number;
  SubTypeCode: number | string;
  SubTypeName: string;
  SubTypeNameHindi: string;
  ESignedFinalUrl: string;
  DistrictCode: number | string;
  districtName: string;
  OfficeCode: number | string;
  OfficeName: string;
  RelatedToOrderList: OrderOrderRelatedToReportResultModel[] = [];
  AttachmentList: DocumentUrlModel[];
}

export class OrderOrderRelatedToReportResultModel {
  Id: number;
  OrderEntryID: number;
  ModuleId: number | string;
  ModuleName: string;
  DepartmentId: number | string;
  DepartmentName: string;
  YearValue: string;
  YearText: string;
  RelatedToParameterID: number;
  Projecthdrid: string | number;
  ResultModuleName: string;
  ResultYear: string;
  ResultDepartmentId: number | string;
  ResultDepartmentName: string;
  ParaNo: string;
  FileNumber: string;
  ResultDescription: string;
}

export class OrderTypeMasterModel {
  Id: number;
  Name: string;
  NameHindi: string;
  Code: number;
  IsDateMandatory: boolean;
  IsDocumentNoMandatory: number;
}
