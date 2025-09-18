export class AchievementSubCategoryMasterModel {
  SubCategoryId: number;
  SubCategoryCode: number;
  CategoryCode: number;
  Title: string;
  TitleHindi: string;
  CreatedBy: number;
  ModifiedBy: number;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsActive: boolean;
  IsDeleted: boolean;
  CategoryTitle: string;
  CategoryTitleHindi: string;
  ImagePath: string;
}
export class AchievementSubCategoryMasterPostModel {
  SubCategoryId: number;
  SubCategoryCode: number;
  CategoryCode: number | string;
  DepartmentCode: number | string;
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
  KPICategoryCode: number|string;
}
