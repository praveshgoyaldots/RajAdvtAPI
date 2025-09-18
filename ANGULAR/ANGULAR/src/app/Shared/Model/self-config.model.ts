export class SelfConfigModel {
  District: string[];
  Block: string[];
  Tehsil: string[];
  Service: string[];
}

export class ConfigDataModel {
  DataValue: string;
  DataText: string;
  Priority: string;
  DepartmentCode: number;
  PermissionId: number;
  Type: string;

}

export class ConfigDataViewModel {
  Id: number;
  UserId: number;
  UserType: string;
  DepartmentCode: number;
  CreatedDate: Date;
  CreatedBy: number;
  departmentConfig: DepartmentConfig[];
  schemeConfig: SchemeConfig[];
  serviceConfig: ServiceConfig[];
}

export class ServiceConfig {
  ServiceId: number;
  ServiceName: string;
  DisplayOrder: number;
  DepartmentCode: number;
  PermissionId: number | any;
  Type: string;
}

export class SchemeConfig {
  SchemeId: number;
  SchemeName: string;
  DisplayOrder: number;
  DepartmentCode: number;
  PermissionId: number | any;
  Type: string;
}

export class DepartmentConfig {
  DepartmentCode: number;
  DepartmentName: string;
  DisplayOrder: number;
  PermissionId: number | any;
  Type: string;
}
