import { IndexModel } from "./general-model";

export class AchievementModel {
  Id: number;
  Achievement: string;
  AchievementHindi: string;
  AchievementCategoryCode: number | any;
  UserBy: number | any;
  DepartmentCode: number | any;
  Description: string;
  DescriptionHindi: string;
  Priority: number;
  PdfFIleName: string;
  Url: string;
  AchievementDate: Date | string;
  CreatedBy: number;
  ModifiedBy: number;
  CreatedDate: Date | string;
  ModifiedDate: Date | string;
  IsActive: boolean;
  IsDeleted: boolean;
  IsVisible: boolean;
  AchievementSubCategoryCode: number;
  ImagePath: string;
  AchievementCategory: string;
  AchievementCategoryHindi: string;
  AchievementCategoryIsVisible: boolean;
  AchievementCategoryImagePath: string;
  AchievementSubCategory: string;
  AchievementSubCategoryHindi: string;
  AchievementSubCategoryImagePath: string;
  Department: string;
  DepartmentHindi: string;
  ImageFiles: string[] = [];
  CMOComments: string;
  KeyWord: string;
  AutoKeyWord: string;
  TotalCount: number;
  AchievementAttachments: string[] = [];
}
export class AchievementPostModel {
  constructor() {
    this.Priority = 1;
    this.AchievementDate = new Date();
  }
  Id: number;
  Achievement: string;
  AchievementHindi: string;
  AchievementCategoryCode: number | string;
  UserBy: number | any;
  DepartmentCode: number | string;
  Description: string;
  DescriptionHindi: string;
  Priority: number;
  PdfFIleName: string;
  Url: string;
  AchievementDate: Date | string;
  CreatedBy: number;
  ModifiedBy: number;
  CreatedDate: Date;
  ModifiedDate: Date;
  IsActive: boolean;
  IsDeleted: boolean;
  IsVisible: boolean;
  AchievementSubCategoryCode: number | string;
  ImageFiles: string[] = [];
  CMOComments: string;
  KeyWord: string;
  AutoKeyWord: string;
  ConnectWithCMIS: AchievementConnectWithCMISParameterModel[] = [];
  BenificiaryList: string[] = [];
}

export class CustomSearchModel {
  CategortyCode: number | string;
  SubCategortyCode: number;
  DepartmentCode: number;
  Userby: number;
  SearchKeyword: string;
  SearchField: string;
  Activeview: string | number;
  CreatedFrom: Date | string;
  CreatedTo: Date | string;
  CMOComments: string;
  KeyWord: string;
  AutoKeyWord: string;
  IsExportToExcel: boolean;
  indexmodel: IndexModel;

  constructor() {
    // super();
    this.indexmodel = new IndexModel();
    this.CategortyCode = 0;
    this.SubCategortyCode = 0;
    this.DepartmentCode = 0;
    this.Userby = 0;
    this.SearchField = "";
    this.CMOComments = "";
    this.KeyWord = "";
    this.AutoKeyWord = "";
    this.Activeview = -1;
    this.CreatedFrom = "";
    this.CreatedTo = "";
    this.IsExportToExcel = false;
  }
}

//#region <Reports>

export class ImpDescSummaryReportFilterModel {
  DepartmentCode: number | string;
  CreatedFromDate: string;
  CreatedToDate: string;
}

export class ImportantDecisionSummaryReportModel {
  DepartmentEng: string;
  CategoryEng: string;
  SubCategoryEng: string;
  ImpDecCount: number;
  ActiveImpDecCount: number;
  DeActiveImpDecCount: number;
}
export class ImportantDeciosonDepartmentCountReportModel {
  DepartmentTitle: string;
  DepartmentCode: number;
  DeActiveOrderCount: number;
  ActiveOrderCount: number;
}

export class ImportantDecisionDetailReport {
  Achievement: string;
  AchievementHindi: string;
  Description: string;
  DescriptionHindi: string;
  Priority: number;
  PdfFIleName: string;
  Url: string;
  AchievementDate: Date | string;
  IsActive: boolean;
  IsDeleted: boolean;
  IsVisible: boolean;
  IsAchievement: boolean;
  CategoryEng: string;
  CategoryHindi: string;
  SubCategoryEng: string;
  SubCategoryHindi: string;
  SubCategoryImagePath: string;
  DepartmentEng: string;
  DepartmentHindi: string;
}

//#endregion <Report>

//#region <Achievement Reports>

export class AchievementsCategoryCountReportModel {
  DepartmentCode: number;
  DepartmentTitle: string;
  Videos: number;
  Awards: number;
  BannerImage: number;
  CabinetDecisions: number;
  DepartmentalAchievements: number;
  ExternalLink: number;
  ImportantDecisions: number;
  NewsTicker: number;
  PhotoGallery: number;
  Publications: number;
  UpcomingEvents: number;
  Posters: number;
  Audio: number;
  Advertisement: number;
  Total: number;
}

//#endregion <Achievement Report>


//#region <Connect With CMIS>

export class AchievementConnectWithCMISParameterModel {
  Id: number;
  ModuleId: string;
  ModuleName: string;
  DepartmentId: string;
  DepartmentName: string;
  YearValue: string;
  YearText: string;
  ConnectWithCMISResult: AchievementConnectWithCMISParameterResultModel;
  constructor() {
    this.Id = 0;
    this.ModuleId = "";
    this.ModuleName = "";
    this.DepartmentId = "";
    this.DepartmentName = "";
    this.YearValue = "";
    this.YearText = "";
    this.ConnectWithCMISResult = new AchievementConnectWithCMISParameterResultModel();
  }
}

export class AchievementConnectWithCMISParameterResultModel {
  pm_projecthdrid: string;
  modulename: string;
  prj_year: string;
  prj_dept: string;
  prj_ndept: string;
  parano: string;
  filenumber: string;
  prj_description: string;
  rowno: number;
  CMISNewTransCoreId: number;
  constructor() {
    this.pm_projecthdrid = "";
    this.modulename = "";
    this.prj_year = "";
    this.prj_dept = "";
    this.prj_ndept = "";
    this.parano = "";
    this.filenumber = "";
    this.prj_description = "";
    this.CMISNewTransCoreId = 0;
  }
}



//#endregion <Connect With CMIS>
