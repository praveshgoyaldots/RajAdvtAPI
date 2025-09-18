import { IndexModel } from '../general-model';

export class DepartmentMasterViewModel {
  DepartmentId: number;
  DepartmentTitle: string;
  DepartmentTitleHindi: string;
  DepartmentShortTitle: string;
  DepartmentShortTitleHindi: string;
  AdmDepartmentTitle: string;
  AdmDepartmentTitleHindi: string;
  DepartmentAddress: string;
  DepartmentAddressHindi: string;
  DepartmentIsActive: boolean;
  DepartmentIsDeleted: boolean;
  GroupTitle: string;
  GroupTitleHindi: string;
  DistrictTitle: string;
  DistrictTitleHindi: string;
  DepartmentCode: number;
  DepartmentCategoryName: string;
  DisplayName: string;
  DepartmentMenuCount: number;
  DepartmentSectionCount: number;
  DepartmentSubMenuCount: number;
}

export class DepartmentMasterModel {
  DepartmentId: number;
  DepartmentTitle: string;
  DepartmentTitleHindi: string;
  DepartmentShortTitle: string;
  DepartmentShortTitleHindi: string;
  DepartmentAddress: string;
  DepartmentAddressHindi: string;
  DepartmentIsActive: number;
  DepartmentIsDeleted: number;
  Department_DistrictCode: number | string;
  DepartmentCode: number;
  Department_AdmDepartmentCode: number | string;
  Department_GroupCode: number | string;
  DepartmentCategoryCode: number | string;
  DisplayName: string;
  DepartmentDistrictCode: string | number;
  CMOOfficerCode: string | number;
  LogoUrl: string;
  DisplayOrderWithinAdminDepartment: number;
  IsWebsiteFromJankalyanPortal: boolean;
  CabinetMinisterCode: string | number;
  StateMinisterCode: string | number;
  IsAllowMultipleDistrictAndAssembly: boolean;
}

//#region <Report Scheme and department>

export class DepartmentReportModel {
  DepartmentId: number;
  DepartmentTitle: string;
  DepartmentCode: number;
}

export class DepartmentSchemeReportModel {
  Id: number;
  ShortNameHindi: string;
  NameHindi: string;
  ShortNameEnglish: string;
  NameEnglish: string;
  NodalDepartmentTitle: string;
  NodelDepartmentCode: number;
}

//#endregion <Report Scheme and department>

//#region <Website Details>

export class LoginUserDepartmentListModel {
  DepartmentId: number;
  DepartmentTitle: string;
  WebsiteName: string;
  NodalOfficerName: string;
  NodalOfficerDesignation: string;
  MobileNo: string;
  Email: string;
  SSOID: string;
  FacebookURL: string;
  TwitterURL: string;
  YoutubeURL: string;
  InstagramURL: string;
  DepartmentPassword: string;
  StateMinisterCode: number | string;
  CabinetMinisterCode: number | string;
  WebsiteImage: string;
  WebsiteDynamicCategory: string;
  WebsiteDynamictransaction: string;
  DefaultLanguage: string;
}

//#endregion <Website Details>



//#region <Department Profile>

export class DptProfileFilterModel extends IndexModel {
  DepartmentCode: string;
  FromDate: string;
  ToDate: string;
  JankalyanCategoryCode: string;
  EntryTypeCode: string;
}

export class DepartmentProfileModel {
  Id: number;
  DepartmentCode: string | number;
  EntryTypeCode: string | number;
  Details: string;
  ImageURL: string;
  PDFURL: string;
  JankalyanCategoryCode: number | string;
}

export class DepartmentProfileListModel {
  Id: number;
  DepartmentTitle: string;
  EntryTypeName: string;
  Details: string;
  ImageURL: string;
  PDFURL: string;
  IsActive: boolean;
  CreatedDate: Date;
  CreatedBy: string;
  ModifiedDate: Date;
  ModifiedBy: string;
  CreatedByName: string;
  ModifiedByName: string;
  JankalyanCategoryHindi: string;
  JankalyanCategoryEnglish: string;
}

export class DepartmentProfileExistModel {
  Id: number;
  DepartmentCode: number;
  EntryTypeCode: number;
}

//#endregion <Department Profile>

//#region Department menu classification
export class DepartmentMenuClassificationModel {
  Id: number;
  DepartmentCode: number | string | null;
  MenuClassificationCode: number | string | null;
  DisplayNameEnglish: string;
  DisplayNameHindi: string;
  DisplayOrder: number | null;
  IsSubMenu: boolean | null;
  IsActive: boolean;
  IsDelete: boolean;
  CreatedDate: Date | string | null;
  CreatedBy: number | null;
  ModifiedDate: Date | string | null;
  ModifiedBy: number | null;
  Code: number | null;
  IconImage: string;
  IsExternalUrl: boolean | null;
  ExternalUrl: string;
  InternalUrl: string;
}



export class DepartmentMainMenuModel {
  Id: number;
  DepartmentCode: number | null;
  MenuClassificationCode: number | null;
  DisplayNameEnglish: string;
  DisplayNameHindi: string;
  DisplayOrder: number | null;
  IsSubMenu: boolean | null;
  IsActive: boolean;
  IsDelete: boolean;
  CreatedDate: Date | string | null;
  CreatedBy: number | null;
  ModifiedDate: Date | string | null;
  ModifiedBy: number | null;
  Code: number | null;
  IconImage: string;
  DepartmentTitle: string;
  MenuClassificationName: string;
  CreatedByName: string;
  ModifiedByName: string;
}

export class DepartmentMainMenuFilterModel extends IndexModel {

  DepartmentCode: number | null | string;
  MenuClassificationCode: number | null | string;
  ToDate: string;
  FromDate: string;
  Status: number | null;
  CreatedBy: number | null;
  LoginUserId: number;
  constructor() {
    super();
    this.Status = 1;
  }
}


export class DepartmentSubMenuModel {
  Id: number;
  DepartmentCode: string | number | null;
  DepartmentMainMenuCode: string | number | null;
  ModuleName: string;
  ModuleCategoryCode: string | number | null;
  ModuleSubCategoryCode: string | number | null;
  IconImage: string;
  IsSubMenu: boolean | null;
  DisplayNameEnglish: string;
  DisplayNameHindi: string;
  DisplayOrder: number | null;
  IsActive: boolean;
  IsDelete: boolean;
  CreatedDate: Date | string | null;
  CreatedBy: number | null;
  ModifiedDate: Date | string | null;
  ModifiedBy: number | null;
  DepartmentSubMenuCode: string | number | null;
  SubMenuShowAsSeparateCode: number | string;
  RedirectionManagementRadio: number | null | string;
  PDFAttachment: string;
  RedirectionURL: string;
  constructor() {
    this.ModuleCategoryCode = '';
  }
}


export class DepartmentSubMenuListModel {
  Id: number;
  Code: number | null;
  ModuleName: string;
  IconImage: string;
  IsSubMenu: boolean | null;
  DisplayNameEnglish: string;
  DisplayNameHindi: string;
  DisplayOrder: number | null;
  IsActive: boolean;
  CreatedDate: Date | string | null;
  ModifiedDate: Date | string | null;
  DepartmentMainMenuName: string;
  DepartmentTitle: string;
  CreatedByName: string;
  ModifiedByName: string;
  DepartmentSubSubMenuName: string;
  ModuleNameEnglish: string;
  ModuleCategoryNameEnglish: string;
  SubMenuShowAsSeparateCode: number | null;
  SubMenuShowAsSeparateName: string;
  RedirectionManagementRadio: number | null;
  RedirectionManagementRadioName: string;
}

export class DepartmentSubMenuFilterModel extends IndexModel {
  ModuleName: string;
  ModuleCategoryCode: number;
  ModuleSubCategoryCode: number;
  DepartmentSubMenuCode: number;
  MainMenuCode: number;
  ModifiedToDate: string;
  ModifiedFromDate: string;
  Status: number | null;
  ModifiedBy: number;
  DepartmentCode: number;
  SubMenuShowAsSeparateCode: string;
  RedirectionManagementRadio: string;

  constructor() {
    super();
    this.Status = 1;
    this.SubMenuShowAsSeparateCode = "0";
    this.RedirectionManagementRadio = "0";
  }
}

//#region


//#region <ImportSectionMenuAndSubMenu>

export class ImportSectionMenuAndSubMenuFilterModel {
  FromDepartmentCode: number;
  ToDepartmentCodes: string;
  ToDepartmentList: string[] = [];
  IsSectionImport: boolean;
  IsMenuImport: boolean;
  IsSubMenuImport: boolean;
  constructor() {
    this.IsMenuImport = true;
    this.IsSectionImport = true;
    this.IsSubMenuImport = true;
  }
}
//#endregion
