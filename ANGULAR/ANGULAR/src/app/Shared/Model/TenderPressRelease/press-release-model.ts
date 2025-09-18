import { IndexModel } from "../general-model";

export class PressReleaseModel {
    Id: number;
    Code: number | null;
    DepartmentCode: number | string | null;
    CategoryCode: number | string | null;
    LookupCategoryCode: number | string | null;
    SubCategoryCode: number | string | null;
    DistrictCode: number | string | null;
    GeneralDescription: string;
    Description: string;
    URL: string;
    DisplayOrder: number | null;
    PDFUrl: string;
    ImageUrl: string;
    HomePageImageUrl: string;
    KeyWords: string;
    CreatedBy: number | null;
    ModifiedBy: number | null;
    CreatedDate: Date | string;
    ModifiedDate: Date | string | null;
    IsActive: boolean;
    IsDeleted: boolean;
    VIPCategoryList: string[] | number[];
    VIPPersionList: string[];
    IsSpecialPressRelease: boolean;
    PressReleaseLevelCode: number | string;
    PressreleaseDate: Date | string | null;
    PressReleaseDepartmentMappingList: string[] | number[];
    PDFUrlList: string[] = [];
    DistrictList: string[] = [];
    ImageUrlList: string[] = [];
    IsOldRecord: boolean;
    PressReleaseTime: string;
    DistrictName: string;
    VIPPersonName: string;
    DIPR_Id: number;
    NameOfVIPPerson: string;
    AmountinLakh: string;
    NoOfInaugration: string;
    NoOfLokarpan: string;
    NoOfNewInitatives: string;
    Latitude: string;
    Longitude: string;
}

export class PressReleaseResponseModel {
    Id: number;
    Code: number | null;
    DepartmentCode: number | string | null;
    CategoryCode: number | string | null;
    SubCategoryCode: number | string | null;
    DistrictCode: number | null;
    GeneralDescription: string;
    Description: string;
    URL: string;
    DisplayOrder: number | null;
    PDFUrl: string;
    ImageUrl: string;
    HomePageImageUrl: string;
    KeyWords: string;
    CreatedBy: number | null;
    ModifiedBy: number | null;
    CreatedDate: Date | string;
    ModifiedDate: Date | string | null;
    IsActive: boolean;
    IsDeleted: boolean;
    VIPCategoryList: string;
    VIPPersionList: string[];
}

// export class PressReleaseListModel {
//     Id: number;
//     Description: string;
//     URL: string;
//     PDFUrl: string;
//     ImageUrl: string;
//     HomePageImageUrl: string;
//     IsActive: boolean;
//     DepartmentTitle: string;
//     DistrictName: string;
// }

export class PressReleaseListModel {
    Id: number;
    Description: string;
    URL: string;
    PDFUrl: string;
    ImageUrl: string;
    HomePageImageUrl: string;
    IsActive: boolean;
    DepartmentTitle: string;
    DistrictName: string;
    CreatedDate: Date | string;
    ModifiedDate: Date | string | null;
    DIPR_Id: number | null;
    ModifiedByName: string;
    ImageAttachmentCount: number;
    AttachmentCount: number;
    CategoryNameEnglish: string;
    CategoryNameHindi: string;
    SubCategoryNameEnglish: string;
    SubCategoryNameHindi: string;
}

export class PressReleaseUserConfigrationModel {
    Id: number;
    UserType: string;
    UserId: number | string | null;
    StartNo: number | null;
    EndNo: number | null;
    IsActive: boolean;
    IsDeleted: boolean;
    CreatedDate: Date | string | null;
    CreatedBy: number | null;
    ModifiedDate: Date | string | null;
    ModifiedBy: number | null;
    UserName: string;
}

export class PressReleaseFilterModel extends IndexModel {
    DepartmentCode: string;
    DistrictCode: string;
    VIPCategoryCode: string;
    VIPPersonCode: string;
    CategoryCode: number | null;
    SubCategoryCode: number | null;
    ToDate: string;
    FromDate: string;
    PressReleaseFromDate: string;
    PressReleaseToDate: string;
    IsActive: boolean;
    IsDeleted: boolean;
    Status: number | null;
    Id: number;
    DIPR_Id: number;
    DeptValue: string[];
    DistValue: string[];
    VipPerson: string[];
    VipCategory: string[];
    ModifiedBy: number;

}
