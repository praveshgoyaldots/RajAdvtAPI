export class JankalyanEntryMasterViewModel {
  Id: number;
  Code: number;
  Name: string;
  NameHindi: string;
  DisplayOrder: number;
  IsActive: boolean;
  IsDeleted: boolean;
  JankalyanCategoryCode: number;
  CategoryName: string;
  CategoryNameHindi: string;
  ClassificationPageTypeName: string;
  MenuClassificationName: string;
  GeneralDepartmentDistrictMappingList:string[]|number[];
  GeneralDepartmentDistrictMapping: number;
  SubMenuNameHindi: string;
  SubMenuNameEnglish: string;
  CreatedByName: string;
  ModifiedByName: string;
}

export class JankalyanEntryMasterModel {
  Id: number;
  DisplayOrder: number|string;
  Name: string;
  NameHindi: string;
  JankalyanCategoryCode: number | string;
  MenuClassificationCode: number | string;
  MenuClassificationPageTypeCode: number | string;
  GeneralDepartmentDistrictMappingList:string[]|number[];
  GeneralDepartmentDistrictMapping: number|string;
  SubMenuNameHindi: string;
  SubMenuNameEnglish: string;
}
