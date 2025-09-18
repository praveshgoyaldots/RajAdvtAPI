import { Subject } from 'rxjs';
import { DepartmentSetupModel } from "./Master/department-setup.model";
import { PagedData } from './general-model';

export class OrderGenerateMasterListModel {
  Id: number;
  Title: string;
  TypeName: string;
  Description: string;
  OrderNo: string;
  IsLock: boolean;
  IsActive: boolean;
  IsSaveAsDraft: boolean;
  CreatedDate: Date;
  IsApprove: boolean;
  ESignedUrl1: string;
  ESignedUrl2: string;
  ESignedUrl3: string;
  ESignedUrl4: string;
  ESignedUrl5: string;
  ESignedFinalUrl: string;
  DepartmentTitle: string;
  Date: Date;
  DepartmentCode: number;
  IsCancel: boolean;
  ModifiedDate: Date;
  ModifiedBy: string;
  SectorIds: number;
  SectorName: string;
  ModifiedName: string;
  SubTypeCode: number;
  SubTypeName: string;
  BeneficiaryCategoryIds: number;
	BeneficiaryCategoryName: string;
}

export class OrderGenerateAuthorityListModel {
  Id: number;
  Title: string;
  TypeName: string;
  OrderNo: string;
  IsLock: boolean;
  IsActive: boolean;
  IsSaveAsDraft: boolean;
  CreatedDate: Date;
  IsApprove: boolean;
  ESignedFinalUrl: string;
  ESignedUrl1: string;
  ESignedUrl2: string;
  ESignedUrl3: string;
  ESignedUrl4: string;
  ESignedUrl5: string;
  DepartmentTitle: string;
  Date: Date;
  IsCancel: boolean;
}

export class OrderGenerateMasterModel {
  Id: number;
  Type: string | number;
  Date: Date;
  OrderNo: string;
  Title: string;
  Description: string;
  EffectForm: Date;
  ReferenceLink: string;
  IssueBy: number | string;
  IndividualBeneficiaryScheme: string;
  OrderRemarks: string;
  ReferenceNumber: string;
  DepartmentCode: number | string;
  SearchCriteria: string;
  FileNumber: string;
  LinkToScheme: string | number;
  Subject: string;
  Reference: string;
  Context: string;
  Content: string;
  AuthoritySignatureCode: number | string;
  CCSignatureCode: string | number;
  OrdGenrateRemarks: string;
  AddressTo: string;
  IsHindi: boolean;
  IsSaveAsDraft: boolean;
  RelatedToOrderParameterList: OrderRelatedToParameterModelLookup[] = []; //
  DepartmentEffectedCodes: number[] | string[];
  SectorCodes: number[] | string[];
  AttachmentList: AttachmentsLookupModel[] = []; //
  CCReferenceList: number[]; //
  CCReferenceListText: string;
  CCCategoryCode: string | number;
  IsByOrderOfGovernor: boolean;
  IsByOrderOfGovernortext: string;
  SubTypeCode: number | string;
  IsCancel: boolean;
  IsWithinSecretariat: boolean;
  DistrictCode: number| string;
  OfficeCode: number;
}

export class OrderGenerateMasterViewModel {
  Id: number;
  Type: string | number;
  Date: Date;
  OrderNo: string;
  Title: string;
  Description: string;
  EffectForm: Date;
  ReferenceLink: string;
  IssueBy: number;
  IndividualBeneficiaryScheme: string;
  OrderRemarks: string;
  ReferenceNumber: string;
  DepartmentCode: number;
  SearchCriteria: string;
  FileNumber: string;
  LinkToScheme: string | number;
  Subject: string;
  Reference: string;
  Context: string;
  Content: string;
  AuthoritySignatureCode: number | string;
  CCSignatureCode: string | number;
  OrdGenrateRemarks: string;
  AddressTo: string;
  IsHindi: boolean;
  IsSaveAsDraft: boolean;
  IsLock: boolean;
  LinkToSchemeName: string;
  AuthoritySignatureCodeName: string;
  CCSignatureCodeName: string;
  TypeName: string;
  IssueByName: string;
  DepartmentTitle: string;
  IsCancel: boolean;
  IsWithinSecretariat: boolean;
  DepartmentEffectedIds: string;
  DepartmentEffectedName: string;
  SectorIds: string;
  SectorName: string;
  RelatedToOrderParameterList: OrderRelatedToParameterModelLookup[] = []; //
  AttachmentList: AttachmentsLookupModel[] = []; //
  CCReferenceList: number[]; //
  CCReferenceListIds: number[];
  DepartmentSetupList: DepartmentSetupModel;
  CCCategoryCode: string | number;
  IsByOrderOfGovernor: boolean;
  IsByOrderOfGovernortext: string;
  SubTypeCode: number | string;
  CCReferenceListText: string;
  DistrictCode: number;
  OfficeCode: number;
}

export class AttachmentsLookupModel {
  Id: number;
  AttachmentUrl: string;
  Description: string;
  IsAnnexure: boolean;
  IsPdf: boolean;
  constructor(){
    this.IsAnnexure = false;
  }
}

export class CorrespondenceCopyReferenceLookupModel {
  Id: number;
  ReferenceCode: number;
  ReferenceText: string;
}

export class OrderRelatedToParameterModelLookup {
  Id: number;
  ModuleId: string;
  ModuleName: string;
  DepartmentId: string;
  DepartmentName: string;
  YearValue: string;
  YearText: string;
  RelatedToResult: OrderRelatedToResultModelLookup;
  constructor() {
    this.Id = 0;
    this.ModuleId = "";
    this.ModuleName = "";
    this.DepartmentId = "";
    this.DepartmentName = "";
    this.YearValue = "";
    this.YearText = "";
    this.RelatedToResult = new OrderRelatedToResultModelLookup();
  }
}

export class OrderRelatedToResultModelLookup {
  pm_projecthdrid: string;
  modulename: string;
  prj_year: string;
  prj_dept: string;
  prj_ndept: string;
  parano: string;
  filenumber: string;
  prj_description: string;
  rowno: number;
  CMISNewTransCoreId:number;
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

export class OrderRelatedToViewModelLookup {
  Id: number;
  rowno: number;
  OrderEntryID: number;
  ModuleId: string;
  ModuleName: string;
  DepartmentId: string;
  DepartmentName: string;
  YearValue: string;
  YearText: string;
  RelatedToParameterID: number;
  pm_projecthdrid: string;
  modulename: string;
  prj_year: string;
  prj_dept: string;
  prj_ndept: string;
  parano: string;
  filenumber: string;
  prj_description: string;
}

export class GeneratedPdfModel {
  Url: string;
}

export class ReferencyNotificationResponseModel {
  IsEmail: boolean;
  OrderId: number;
}

export class ESignPdfModel {
  Id: number;
  AdharNo: string;
}

export class OrderFinalAProvalListModel{
  Id: number;
  Title: string;
  TypeName: string;
  OrderNo: string;
  IsLock: boolean;
  IsActive: boolean;
  IsSaveAsDraft: boolean;
  CreatedDate: Date;
  IsApprove: boolean;
  ESignedFinalUrl: string;
  ESignedUrl5: string;
  DepartmentTitle: string;
  Date: Date;
  IsCancel: boolean;
}



export class TemplateVerifyModel {
  NotificationType: number;
  TypeCode: number;
  ModuleName: number;
  FilterId: number;
}

//#region <Order Report>

export class OrderSummaryReportModel {
  DepartmentCode: number;
  TypeCode: number;
  SubTypeCode: number;
  OrderCount: number;
  DepartmentTitle: string;
  Type: string;
  SubType: string;
  ActiveOrderCount: number;
  DeActiveOrderCount: number;

}

export class OrderSummaryReportWithLastTransactionModel {
  DepartmentCode: number;
  TypeCode: number;
  SubTypeCode: number;
  OrderCount: number;
  DepartmentTitle: string;
  Type: string;
  SubType: string;
  ActiveOrderCount: number;
  DeActiveOrderCount: number;
  LastTransactionDate: Date;
}

export class OrderSummaryTypeReportWithLastTransactionModel {
  DepartmentCode: number;
  TypeCode: number;
  OrderCount: number;
  DepartmentTitle: string;
  Type: string;
  ActiveOrderCount: number;
  DeActiveOrderCount: number;
  LastTransactionDate: string;
}

export class OrderSummaryReportFilterModel {
  DepartmentCode: number|string;
  CreatedFromDate: string;
  CreatedToDate: string;
  AdminDepartmentCode: number|string;
  constructor(){
    this.AdminDepartmentCode=String(0);
  }
}

//#endregion <Order Report>




