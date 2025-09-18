export class DashboardPermissionModel {
    Permission: number;
    UserType: number;
    UserId: number;
    DashboardPermissionId: number;
    NumberOfRecord:number|string;
    DateFrom:Date|any;
    DateTo:Date|any;
    orders: number[];
    

    IsActive: boolean;
    IsDeleted: boolean;
    CreateDate: Date;
    ModifiedDate: Date;
    CreatedBy: number;
    ModifiedBy: number;
    Widget: number;

}
