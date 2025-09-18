export class ImportantDicisionSubCategoryMasterModel {
  ImpSubCategoryId: number;
  SubCategoryCode: number;
  CategoryCode: number;
  SectorCode: number;
  Title: string;
  TitleHindi: string;
  CreatedBy: number;
  ModifiedBy: number;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsActive: boolean;
  IsDeleted: boolean;
  SectorName: string;
  CategoryName: string;
  CategoryTitleHindi: string;
  ImagePath: string;
}
export class ImportantDicisionSubCategoryMasterPostModel {
  ImpSubCategoryId: number;
  SubCategoryCode: number;
  CategoryCode: number | string;
  DepartmentCode: number | string;
  SectorCode: number | string;
  Title: string;
  TitleHindi: string;
  CreatedBy: number;
  ModifiedBy: number;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsActive: boolean;
  IsDeleted: boolean;
  ImagePath: string;
  IsApplicableToAllDPT: boolean;
}
