import { IndexModel } from './../general-model';
export class ChildPageMasterModel {
  Id: number;
  PageCode: number | string;
  PageTypeCode: number | string;
  PageDescriptionCategory: number | string;
  Description: string;
  PDFURL: string;
  ImageURL: string;
  LookupTypeId: number | string;
  SchemeTypeCode: number | string;
  URL: string;
  ManualTypeCode: number | string;

  constructor() {
    this.Description = "";
  }
}

export class ChildPageMasterViewModel {
  Id: number;
  Description: string;
  PageTitle: string;
  ApplicationTitle: string;
  PageTypeName: string;
  MenuTitle: string;
  IsActive: boolean;
  PageDescriptionCategoryName: string;
  PDFURL: string;
  ImageURL: string;
  URL: string;
  ManualType: string;
}

export class PageMasterDetailModel {
  PageTitle: string;
  ApplicationTitle: string;
  PageTypeName: string;
  MenuTitle: string;
}

export class ChildPageFilterModel extends IndexModel {
  PageCode: number;
  PageTypeCode: number;
  ApplicationCode: string;
  ManualTypeCode: number | string;

  constructor() {
    super();
    this.ManualTypeCode = '0';
  }
}

export class PageManualModel {
  LookupTypeId: number;
  SchemeTypeCode: number;
  menuName: string;
  constructor(menuName = "", lookupTypeId = 0, schemeTypeCode = 0) {
    this.LookupTypeId = lookupTypeId;
    this.SchemeTypeCode = schemeTypeCode;
    this.menuName = menuName;
  }
}
export class AchievementSearchModel {
  AdmDepartmentCode: number;
  DepartmentCode: number;
  CategoryCode: number;
  SubCategoryCode: number;
  FromDate: string;
  ToDate: string;
  SearchKeyword: string;
  IsUrlRequired: boolean;
  IsImageRequired: boolean;
  IsPdfRequired: boolean;
  IsActive: boolean | null;
  IsVisibleInHome: boolean | null;
  IsVisibleInFront: boolean | null;
  IndexModel: IndexModel;
  CommonCategoryCode: number;
}
