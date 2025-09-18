export class MonitoringParameterMasterModel {
    Id?: number;
    Name: string;
    NameHindi: string;
    MappingTableName: string;
    Type?: string;
    DepartmentCode : number|string;
}

export class MonitoringParameterMasterViewModel {
    Id?: number;
    Name: string;
    MappingTableName: string;
    Type?: string;
    DepartmentTitle: string;
    IsActive:boolean;
    IsDeleted:boolean;
}
