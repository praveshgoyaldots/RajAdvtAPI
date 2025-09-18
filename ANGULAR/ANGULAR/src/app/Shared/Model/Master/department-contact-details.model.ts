export class DepartmentContactDetailsModel {
  Id: number;
  WebsiteName: string;
  DepartmentCode: string | number;
  DesignationCode: string | number;
  OfficerName: string;
  MobileNo: string;
  Email: string;
  SSOID: string;
  IsVisibleOnFront: boolean;
  ContactCategory: number| string;
   Place: string;
   Address: string;
   AttachmentUrl: string;
   Url: string;
   DisplayOrderNo: string;
}

export class DepartmentContactDetailsViewModel {
  Id: number;
  DepartmentTitle: string;
  DesignationName: string;
  DepartmentCode: number;
  OfficerName: string;
  MobileNo: string;
  Email: string;
  SSOID: string;
  IsActive: boolean;
  IsVisibleOnFront: boolean;
  ContactCategoryName: string;
}

export class DepartmentWebsiteDetailsModel {
  DepartmentId: number;
  DepartmentTitle: string;
  WebsiteName: string;
  NodalOfficerName: string;
  NodalOfficerDesignation: string
  MobileNo: string;
  Email: string;
  SSOID: string;
}


export class DepartmentContactOfficerModel {
  Id: number;
  DepartmentNames: string;
  DesignationName: string;
  DepartmentCode: number;
  OfficerName: string;
  Mobile: string;
  UserEmail: string;
  SSOID: string;
  UserTypeTitle: string;
  UserType: string;

}

export class TransferDeptModel {
  ID: number;
  Name: string;
  TotalFrom: number | null;
  TotalTo: number | null;
  FromDeptCode: number | null;
  TODeptCode: number | null;
  FromDept: string;
  TODept: string;

}
