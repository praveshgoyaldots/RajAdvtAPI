export class ProjectSubCategoryMasterModel {
    Id: number;
    Name: string;
    NameHindi: string;
    LabelName: string;
    IsNumeric: boolean;
    IsActive: boolean;
    IsDelete: boolean;
    CategoryCode: number | string;
}

export class ProjectSubCategoryMasterViewModel {
  Id: number;
  Code: number;
  Name: string;
  NameHindi: string;
  LabelName: string;
  IsNumeric: boolean;
  IsActive: boolean;
  CategoryName: string;
  TotalProjectsAdded:string | number;
}
