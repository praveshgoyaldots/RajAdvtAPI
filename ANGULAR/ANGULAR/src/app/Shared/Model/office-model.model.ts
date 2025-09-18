export class OfficeModel {
  OfficeId: number;
  OfficeCode: string;
  OfficeName: string;
  OfficeNameHindi: string;
  OfficeAddress: string;
  OfficeShortName: string;
  OfficeShortNameHindi: string;
  DepartmentCode: number | string;
  AdmDepartmentCode: number | string;
  DistrictCode: number | string;
  TehsilCode: number | string;
  BlockCode: number | string;
  EmailId: string;
  LandlineNo: string;
  Mobile: string;
  IPNo: string;
  Department: string;
  AdmDepartmentTitle: string;
  District: string;
  Tehsil: string;
  Block: string;
  ModifiedBy: number;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsActive: boolean;
  IsDelete: boolean;
  // IsHeadOffice: string;
}

export class CustomSearchModel {
  KeywordSearch: string;
  Userid: number;
  DepartmentCode: string[];
  OfficeCode: string[];
  OfficeName: string[];
  OfficeNameHindi: string;
  OfficeShortName: string;
  ActiveView: boolean = true;
  CreatedFrom: Date | string;
  CreatedTo: Date | string;
}
