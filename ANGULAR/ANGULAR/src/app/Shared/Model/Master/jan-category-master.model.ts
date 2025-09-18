export class JANCategoryMasterModel {
    Id?: number;
    Name: string;
    Code:number;
    NameHindi: string;
    IsActive?: boolean;
    IsDelete?: boolean;
    SubMenuNameHindi: string;
		SubMenuNameEnglish: string;
		MenuClassificationCode: number | string;
		MenuClassificationPageTypeCode: number | string;
		GeneralDepartmentDistrictMapping: number | string;
		GeneralDepartmentDistrictMappingList: string[] | number[];
    IsPressRelease?:boolean;
    CreatedByName: string;
    ModifiedByName: string;
    ModifiedDate:Date;
    CreatedDate:Date;
    CommonCategoryCode:number | string;
}

