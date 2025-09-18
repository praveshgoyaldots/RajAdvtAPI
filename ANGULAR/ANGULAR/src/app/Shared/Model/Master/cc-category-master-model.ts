export class CCCategoryMasterModel {
    Id: number;
    DepartmentCode: number|string;
    Name: string;
    NameHindi: string;
}


export class CCCategoryMasterViewModel {
    Id: number;
    DepartmentCode: number|string;
    DepartmentTitle: string;
    Name: string;
    NameHindi: string;
    IsActive: boolean;
    IsDeleted: boolean;
}

export class CCCategoryReferenceListModel{
    Id: number;
    Code: number;
    Reference: string;
    ReferenceHindi: string;
    DepartmentTitle: string;
    Post: string;
    MobileNumber1: string;
    MobileNumber2: string;
    Email1: string;
    Email2: string;
    IsAssigned: string;
}

export class CCCategoryLookupModel{
    Id: number;
    CCCategoryCode: number|string;
    DepartmentCode: number|string;
    DptReferenceCode: string[]=[] ;
}

export class CCCategoryReferenceListResponseModel{
    DptReferenceCode: string[]=[] ;
    Record: CCCategoryReferenceListModel[]=[];
}