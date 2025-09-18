import { SetPriorityComponent } from "./../../content/scheme/set-priority/set-priority.component";
import { DdlItemModel } from "./commonddl.model";
import { IndexModel } from "./general-model";

export class CustomSearchModel extends IndexModel {
  SchemeCode: number|string;
  DepartmentCode: number|string;
  SearchField: string;
  FromDate: Date | string;
  ToDate: Date | string;
  constructor() {
    super();
    this.SchemeCode = 0;
    this.DepartmentCode = 0;
    this.SearchField = "";
    this.FromDate = "";
    this.ToDate = "";
  }
}

export class ListSchemeModel {
  Id: number;
  NameHindi: string;
  NameEnglish: string;
  TypeName: string;
  IsActive: boolean;
  FaqCount?: number;
  IsLock: boolean;
  ModifiedDate: Date;
  NodelDepartmentName: string;
  NodalDepartmentTitle : string;
  IsSaveAsDraft: Boolean;
  PageType: number;
  schemePageType: string;
  ModifiedName: string;
  ModifiedBy: number;
  NodelDepartmentCode: number;
}

export class SchemeModel {
  Id: number;
  ShortNameHindi: string;
  PageType: string | number;

  SchemeOrServiceCode: string | number;
  NameHindi: string;
  ShortNameEnglish: string;
  NameEnglish: string;
  Description: string;
  TypeCode: number | string;
  OwnedBy: string;
  OwnedBySate: number;
  OwnedByCenter: number;
  IsListedRGDPSAct: string;
  DeliveryTimeInDays: number;
  DepartmentShortName: string;
  DesignatedOfficerReceivingDetailCode: number | string;
  FirstAppeallateCode: number | string;
  SecondAppeallateCode: number | string;
  ApplyForScheme: string;
  TimeOfValidationInMonth: number;
  ExpiredOn: string;
  ExpriedOnDate: Date | string;
  ExpriedDurationInMonth: number;
  MadeOfAppling: string;
  MadeOfApplingOnlineBoth: string | number;
  DepartmentWebsiteUrl: string;
  IsServiceFees: string;
  ServiceFeeAmount: number;
  HowToPay: number[] | string[];
  HowtoPayIds: string;
  HelplineNo: string;
  DelivarebleCode: number | string;
  deliveryPaymentDetail: string;
  ModeOfDisbursmentList: number[] | string[];
  ModeOfDisbursment: string;
  PaymentDisbursmentFrequency: string;
  PaymentDisbursmentFrequencyInstallments: number | string;
  PaymentDisbursmentFrequencyTillAPeriod: string;
  ItemDetails: string;
  programAreas: number[] | string[];
  CasteCategory: string[] | string[];
  BeneficiaryCategory: string[] | number[];
  ModeOfDelivery: string;
  District: string[] | number[];
  Type: string[] | number[];
  SearchKeyWordOfDetails: string;
  SearchKeyWordOfExecution: string;
  SearchKeyWordOfEligible: string;
  SearchKeyWordOfHowToApply: string;
  SearchKeyWordOfBeneficiaryGet: string;
  SearchKeyWordOfOtherDocument: string;
  Benificiarytext: string;
  EligiblityText: string;
  HowToApplyText: string;
  WhatWillBeneficiaryGet: string;
  StartDate: string;
  Logo: string;
  Designation: string;
  Scheme_URL: string;
  BannerImage: string;
  WebsiteUrl: string;
  MobileAppIcon: string;
  MobileAppUrl: string;
  IsbeneficiaryText: boolean;
  IsEligibityText: boolean;
  IsHowToApply: boolean;
  IsWhatWillBeneficiaryGet: boolean;
  SchemeTypeName: string;
  EligibilityCriteria: EligibilityCriteriaModel[] = [];
  EntryLookUp: EntryLookUpModel[] = [];
  RequiredDocument: RequiredDocumentModel[] = [];
  OtherDocument: OtherDocumentModel[] = [];
  AdminDepartmentTitle: string;
  NodalDepartmentTitle: string;
  HowtoPayName: string;
  ModeOfDisburstmentIds: string;
  ModeOfDisburstmentName: string;
  IsSaveAsDraft: boolean;
  PriorityInList: number;
  NodelDepartmentCode: string | number;
  AdminDepartmentCode: string | number;
  SchemeType: string | number;
  ExpiryDate: string;
  ModifiedDate: Date;
  RemarksForTimeOfValidity: string;
  NumberOfMonths: number;
  GetBeneficiaryLookup: GetBeneficiaryLookupModel[] = [];
  ModeofApplicationList: string[] | number[];
  MobileAppLookupList: MobileAppLookupModel[] = [];
  ServiceFeePdf: string;
  BeneficiaryPdf: string;
  HowtoPayFeeRemarks: string;
  URLofDataofBeneficiaryonJansoochnaPortal: string;
  //#region <<seventh tab>>
  ContentGroup: ContentGroupModel[] = [];
  //SearchKeyWordOfGroupContent: string;
  //#endregion
  ModeofApplicationText: string;
  DocumentCertificateLicenseDocument: string;
  NumberOfInstallments: number;
  ConnectWithCMIS: SchemeConnectWithCMISParameterModel[]=[];
}

export class ContactResponseModel {
  NodelDepartmentCode: number | string;
  schemeId: number;
}

export class ContactResponseViewModel {
  NodelOfficerName: string;
  MobileNo: string;
  Designation: string;
  SsoId: string;
  EmailId: string;
  Id: number;
  AdminDepartmentCode: number;
  NodelDepartmentCode: number;
  schemeId: number;
  DepartmentTitle: string;
  DepartmentTitleHindi: string;
  AdmDepartmentTitle: string;
  AdmDepartmentTitleHindi: string;
  DistrictTitle: string;
  DistrictTitleHindi: string;
  TehsilTitle: string;
  TehsilTitleHindi: string;
  BlockName: string;
  BlockNameHindi: string;
  Name: string;
  NameHindi: string;
  Lat: number;
  Long: number;
  Address: string;
}

export class MobileAppLookupModel {
  PlatformName: string;
  AppUrl: string;
}

export class GetBeneficiaryLookupModel {
  Category: string;
  PaymentFrequency: string;
  Remark: string;
  PhysicalItem: string;
  DelivarebleCode: number;
}

export class EligibilityCriteriaModel {
  Remarks: string;
  Description: string;
  EligibilityDropDownCode: string;
  constructor() {
    this.Remarks = "";
    this.Description = "";
    this.EligibilityDropDownCode = "";
  }
}

export class EntryLookUpModel {
  AdminDepartmentCode: string;
  NodelDepartmentCode: string;
  NodelOfficerName: string;
  MobileNo: string | number;
  EmailId: string;
  Designation: string;
  DistrictCode: number | string;
  BlockCode: number | string;
  TahsilCode: number | string;
  Type: number | string;
  Lat: number;
  Long: number;
  Address: string;
  constructor() {
    this.AdminDepartmentCode = "";
    this.NodelDepartmentCode = "";
    this.NodelOfficerName = "";
    this.MobileNo = "";
    this.EmailId = "";
    this.Designation = "";
    this.DistrictCode = 0;
    this.BlockCode = 0;
    this.TahsilCode = 0;
    this.Type = 0;
    this.Lat = null;
    this.Long = null;
    this.Address = "";
  }
}
export class RequiredDocumentModel {
  Remarks: string;
  NameOfDocumentCode: string;
  IsMandatory: string;
  TypeOfDocumentCode: string;
  constructor() {
    this.Remarks = "";
    this.TypeOfDocumentCode = "";
    this.IsMandatory = null;
    this.NameOfDocumentCode = "";
  }
}

export class OtherDocumentModel {
  Remarks: string;
  ListOfOtherDocumentCode: string;
  URL: string;
  ImageCode: string;
  IsPdf: boolean;
  DocDate: Date | string;
  constructor() {
    this.Remarks = "";
    this.ListOfOtherDocumentCode = "";
    this.URL = "";
    this.ImageCode = "";
    this.IsPdf = false;
    this.DocDate = "";
  }
}

// end

export class filecollection {
  Type: string;
  files: File = null;
}
export class SchemResponseModel {
  Id: number;
  ShortNameHindi: string;
  NameHindi: string;
  ShortNameEnglish: string;
  NameEnglish: string;
  Description: string;
  TypeName: string;
  ModeOfDisbursmentName: string;
  TypeCode: string;
  OwnedBy: string;
  OwnedByName: string;
  ApplyForSchemeName: string;
  MadeOfApplingName: string;
  OwnedBySate: number;
  OwnedByCenter: number;
  IsListedRGDPSAct: string;
  DepartmentShortName: string;
  IsListedRGDPSActName: string;
  DeliveryTimeInDays: number;
  DesignatedOfficerReceivingDetailCode: string;
  DesignatedOfficerReceivingDetailName: string;
  FirstAppeallateCode: string;
  FirstAppeallateName: string;
  SecondAppeallateCode: string | number;
  SecondAppeallateName: string | number;
  ApplyForScheme: string;
  TimeOfValidationInMonth: number;
  ExpiredOn: string;
  ExpriedOnDate: Date;
  ExpiredOnName: string;
  ExpriedDurationInMonth: number;
  MadeOfAppling: string;
  MadeOfApplingOnlineBoth: string;
  MadeOfApplingOnlineBothName: string;
  DepartmentWebsiteUrl: string;
  IsServiceFees: string;
  IsServiceFeesName: string;
  HowtoPayIds: string;
  ModeOfDisburstmentIds: string;
  HelplineNo: string;
  DelivarebleCode: string;
  DelivarebleName: string;
  deliveryPaymentDetail: string;
  ModeOfDisbursmentIds: string;
  ModeOfDisbursmentCode: string;
  ModeOfDisbursment: string;
  PaymentDisbursmentFrequency: string;
  PaymentDisbursmentFrequencyName: string;
  PaymentDisbursmentFrequencyInstallments: string;
  PaymentDisbursmentFrequencyInstallmentsName: string;
  PaymentDisbursmentFrequencyTillAPeriod: string;
  ItemDetails: string;
  CreatedDate: Date;
  CreatedBy: string;
  ModifiedDate: Date;
  ModifiedBy: string;
  IsActive: boolean;
  IsDeleted: boolean;
  Code: string;
  ServiceFeeAmount: string;
  BeneficiaryCategoryIds: string;
  BeneficiaryCategoryName: string;
  ModeOfDeliveryIds: string;
  ModeOfDeliveryName: string;
  CasteCategoryIds: string;
  CasteCategoryName: string;
  ProgramAreaIds: string;
  ProgramAreaName: string;
  FaqCount: number;
  GetBeneficiaryLookup: GetBeneficiaryLookupModel[] = [];
  SearchKeyWordOfDetails: string;
  SearchKeyWordOfExecution: string;
  SearchKeyWordOfEligible: string;
  SearchKeyWordOfHowToApply: string;
  SearchKeyWordOfBeneficiaryGet: string;
  SearchKeyWordOfOtherDocument: string;
  Benificiarytext: string;
  EligiblityText: string;
  HowToApplyText: string;
  WhatWillBeneficiaryGet: string;
  DistrictIds: string;
  DistrictName: string;
  Scheme_URL: string;
  BannerImage: string;
  WebsiteUrl: string;
  MobileAppIcon: string;
  MobileAppUrl: string;
  IsbeneficiaryText: boolean;
  IsEligibityText: boolean;
  IsHowToApply: boolean;
  IsWhatWillBeneficiaryGet: boolean;
  TypeIds: string;
  Designation: string;
  Logo: string;
  StartDate: string;
  AdminDepartmentTitle: string;
  NodalDepartmentTitle: string;
  HowtoPayName: string;
  HowToPay: number[] | string[];
  IsSaveAsDraft: boolean;
  PriorityInList: number;
  NodelDepartmentCode: string | number;
  AdminDepartmentCode: string | number;
  EligibilityCriteria: EligibilityCriteriaModel[] = [];
  EntryLookUp: EntryLookUpModel[] = [];
  RequiredDocument: RequiredDocumentModel[] = [];
  OtherDocument: OtherDocumentModel[] = [];
  FAQList: FAQModel[] = [];
  SchemeTypeName: string;
  ModeofApplicationIds: string;
  ModeofApplicationName: string;
  MobileAppLookupList: MobileAppLookupModel[] = [];
  ModeofApplicationList: number[];
  ServiceFeePdf: string;
  BeneficiaryPdf: string;
  ContentGroup: ContentGroupModel[] = [];
  SchemeType: string | number;
  ModeofApplicationText: string;
  DocumentCertificateLicenseDocument: string;
  NumberOfInstallments: number;
  schemePageType: string;
  SchemeOrService: string;
  URLofDataofBeneficiaryonJansoochnaPortal: string;
}

export class SchemeFAQModel {
  SchemeID: number | string;
  FAQList: FAQModel[] = [];
}

export class FAQModel {
  Question: string;
  Answer: string;
  AttachmentUrl: string;
  OrderBy: number;
  IsActive: boolean;
  IsPdf: boolean;
  IsNotValid: boolean;
  constructor() {
    this.Question = "";
    this.Answer = "";
    this.OrderBy = 0;
    this.IsActive = false;
    this.IsPdf = false;
    this.IsNotValid=false;
  }
}

export class SchemeMonitoringParameterModel {
  SchemeID: number | string;
  MonitoringParameterList: MonitoringParameterMappingModel[] = [];
}

export class MonitoringParameterMappingModel {
  Remark: string;
  IsActive: boolean;
  Id: number;
  MonitoringParamId: number;
  IsNew: boolean = false;
}

export class MonitoringParametersByIdForDataEntryViewModel {
  DataDDLListDynamic: DynamicDDLModel[];
  DataDDLList: MonitoringParamDDLModel;
  SchemeId: number;
  Count: number;
  IsEdit: number;
  TotalRecords: number;
  YearMonth: Date | string;
  EntryId: number;
  MonitoringParameterList: MonitoringParametersByIdForDataEntry[] = [];
  DataEntryList: MonitoringParametersByIdForDataEntryViewModel[] = [];
  constructor() {
    this.SchemeId = 0;
    this.Count = null;
    this.IsEdit = 0;
    this.EntryId = 0;
    this.YearMonth = null;
    this.TotalRecords = 0;
    for (let index = 0; index < 15; index++) {
      this.MonitoringParameterList.push(
        new MonitoringParametersByIdForDataEntry()
      );
    }
  }
}

export class MonitoringParametersByIdForDataEntry {
  MonitoringParamId: number;
  FieldValue: string;
  FieldName: string;
  Type: string;
  ParamName: string;
  MappingId: number;
  FieldDisplayValue: string;
  MonthName: string;
  DataEntryFieldValueId: number;

  constructor() {
    this.MonitoringParamId = 0;
    this.FieldValue = "";
    this.FieldName = "";
    this.Type = "";
    this.ParamName = "";
    this.MappingId = 0;
    this.FieldDisplayValue = "";
    this.MonthName = "";
  }
}

export class MonitoringParamDDLModel {
  ddlSchemeMaster: DdlItemModel[];
  tblDepartmentMaster: DdlItemModel[];
  tblCategoryMaster: DdlItemModel[];
  tblBeneficiaryCagegory: DdlItemModel[];
}

export class DynamicDDLModel {
  Text: string;
  Value: any;
}

export class MonitoringParamDataEntryAddModel {
  SchemeId: number | string;
  DataEntryList: MonitoringParametersByIdForDataEntryViewModel[] = [];
  constructor() {
    this.SchemeId = 0;
    this.DataEntryList.push(
      new MonitoringParametersByIdForDataEntryViewModel()
    );
  }
}

export class SearchModel {
  ToDate: Date;
  FromDate: Date;
}

export class MonitoringParameterWithCountModel {
  Id: number;
  NameEnglish: string;
  MPCount: number;
  MPEntryCount: number;
}

export class MonitoringParameterMonthlyModel {
  SchemeId: number;
  Year: number;
  Months: number;
  MonthName: string;
  MPRCount: number;
  YearMonth: string;
}

export class CustomParameterWithIndex extends IndexModel {
  Month: number;
  Year: number;
  constructor() {
    super();
    this.Month = 0;
    this.Year = 0;
  }
}

export class EntryDefaultModel {
  SchemeId: number;
  Month: number;
  Year: number;
}

export class AssignSchemeModel {
  Id: number;
  NameEnglish: string;
  SSOID: string;
  PageType: string | number;
  NodelDepartmentCode: number;

}

export class AssignSchemeViewModel {
  NameEnglish: string;
  NameHindi: string;
  UserName: string;
  Id: number;
  IsActive: number;
  PageType: number;
	schemePageTypeName:string;

}

export class SetPriorityViewModel {
  Id: number;
  NameEnglish: string;
  IsActive: boolean;
  PriorityInList: number;
  IsFlagShipScheme: boolean;
  FlagshipImage: string;
}

export class SchemeGroupModel {
  //#region <<First Tab>>

  Id: number;
  TypeCode: string;
  SchemeType: string | number;
  ShortNameHindi: string;
  NameHindi: string;
  ShortNameEnglish: string;
  NameEnglish: string;
  StartDate: string;
  Logo: string;
  BannerImage: string;
  Type: string[] | number[];
  OwnedBy: string;
  OwnedBySate: number;
  OwnedByCenter: number;
  NodelDepartmentCode: string | number;
  AdminDepartmentCode: string | number;
  DepartmentWebsiteUrl: string;
  Description: string;
  SearchKeyWordOfDetails: string;
  EntryLookUp: EntryLookUpModel[] = [];
  IsSaveAsDraft: boolean;
  ExpriedOnDate: Date | string;
  //#endregion

  //#region <<Second tab>>
  ContentGroup: ContentGroupModel[] = [];
  //SearchKeyWordOfGroupContent: string;
  //#endregion
}

export class ContentGroupModel {
  Id: number | string;
  Heading1: string;
  Heading2: string;
  Description: string;
  SchemeId: number | string;
  constructor() {
    this.Id = "";
    this.Heading1 = "";
    this.Heading2 = "";
    this.Description = "";
    this.SchemeId = 0;
  }
}

//#region <Connect With CMIS>

export class SchemeConnectWithCMISParameterModel {
  Id: number;
  ModuleId: string;
  ModuleName: string;
  DepartmentId: string;
  DepartmentName: string;
  YearValue: string;
  YearText: string;
  ConnectWithCMISResult: SchemeConnectWithCMISParameterResultModel;
  constructor() {
    this.Id = 0;
    this.ModuleId = "";
    this.ModuleName = "";
    this.DepartmentId = "";
    this.DepartmentName = "";
    this.YearValue = "";
    this.YearText = "";
    this.ConnectWithCMISResult = new SchemeConnectWithCMISParameterResultModel();
  }
}

export class SchemeConnectWithCMISParameterResultModel {
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

export class UpdateBeneficiaryModel {
  Schemeid: number;
  BeneficiaryCodes: string[] = [];
}



//#endregion <Connect With CMIS>




