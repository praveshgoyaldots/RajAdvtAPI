export class DepartmentAuthoritySignatoryModel {
    Id: number;
    Code: number;
    Name: string;
    NameHindi: string;
    Designation: string;
    DesignationHindi: string;
    DepartmentCode: string|number;
}

export class DepartmentAuthoritySignatoryViewModel {
    Id: number;
    Name: string;
    Designation: string;
    DepartmentTitle: string;
    IsActive:number;
    IsDeleted:number;
}
