export class DepartmentReferenceModel {
    Id: number;
    Code: number;
    Reference: string;
    ReferenceHindi: string;
    OrderBy:string;
    DepartmentCode: string|number;
    MobileNumber1: string;
    Post: string;
    MobileNumber2: string;
    Email1: string;
    Email2: string;
}


export class DepartmentReferenceViewModel {
    Id: number;
    Reference: string;
    ReferenceHindi: string;
    DepartmentTitle: string;
    OrderBy: number;
    IsActive:number;
    IsDeleted:number;
}
