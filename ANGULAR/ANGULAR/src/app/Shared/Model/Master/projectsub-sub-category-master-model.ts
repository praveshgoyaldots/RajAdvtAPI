export class SubSubCategoryMasterModel {
  Id: number;
  CategoryCode: number|string;
  SubCategoryCode: string|number;
  Name: string;
  NameHindi: string;
  IsApplicableToAll: boolean | string;
}

export class SubSubCategoryMasterViewModel {
  Id: number;
  Code: number;
  SubCategoryName: string;
  CategoryName: string;
  Name: string;
  NameHindi: string;
  IsApplicableToAll: string;
  IsActive: boolean;
  ModifiedDate: Date;
  CreatedByName: string;
  TotalProjectsAdded: string|number;
}
