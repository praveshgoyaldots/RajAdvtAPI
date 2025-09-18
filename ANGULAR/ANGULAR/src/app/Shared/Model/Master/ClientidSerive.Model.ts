export class ClientidServiceModel {
  Id?: number;
  UserId: string;
  Password: string;
  ClientId: string;
  ModuleName: string[] | number[];
  DepartmentCode: number|string;
}

export class ClientidServiceListModel {
  Id?: number;
  UserId: string;
  ClientId: string;
  Password: string;
  modulename: string;
}

export class ClientModuleViewDetail {
  Id?: number;
  UserId: string;
  Password: string;
  ClientId: string;
  moduleIds: string;
  modulename: string;
  DepartmentTitle: string;
  DepartmentCode: number|string;
}
