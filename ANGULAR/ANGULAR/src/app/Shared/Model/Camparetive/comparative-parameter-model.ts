export class ComparativeParameterMasterModel {
  Id: number;
  DepartmentCode: number | string;
  KPICategoryCode: number | string;
  PhysicalParameter: string;
  FinancialParameter: string;
  IsPhysical: boolean;
  PhysicalUnitCode: number | string;
  IsFinancial: boolean;
  FinancialUnitCode: number | string;
  IsDepartment: boolean;
  IsDistrict: boolean;
  IsConnectWithScheme: boolean;
  SchemeCode: number | string;
  IsActive: boolean;
  Description1: string;
  Description2: string;
  YearGrandTotalCode: number|string;
  BenificiaryList: string[]=[];
  IsComparativeReport: boolean;
  IsEbookletReport : boolean;
  IsCompilationReport: boolean;
  IsDistrictParameterReport: boolean;
  DisplayOrder: number;
  CategoryCode: number|string;
  IsWebservice: boolean;
  WebserviceUserName: string;
  WebServicePassword: string;
  WebserviceURL: string;
  TargetBasedCode: number|string;
  Weighted: number;
}

export class ComparativeParameterMasterViewModel {
  Id: number;
  PhysicalParameter: string;
  FinancialParameter: string;
  IsPhysical: boolean ;
  IsFinancial: boolean ;
  IsDepartment: boolean ;
  IsDistrict: boolean ;
  IsConnectWithScheme: boolean ;
  IsActive: boolean;
  DepartmentTitle: string;
  KPICategoryName: string;
  SchemeName: string;
  Description1: string;
  Description2: string;
}
