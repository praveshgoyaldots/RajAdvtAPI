import { AssignedUserPagePermissionViewModel } from "./user-permission.model";
import { NavItem } from "./nav-item";
import { IndexModel } from "./general-model";

export class UserModel {
  UserId: number;
  UserType: string;
  SSOID: string;
  Title: string;
  UserName: string;
  Designation: string;
  Gender: string;
  UserEmail: string;
  Mobile: string;
  IPNo: string;
  LandlineNo: string;
  ProfilePic: string;
  OfficeCode: string;
  OfficeName: string;
  Group: number | string;
  ADMDepartment: string[];
  Department: string[];
  Division: string[];
  // District: string[];
  District: string;
  Block: string[];
  Tehsil: string[];
  ParConstituancy: string[];
  AssConstituancy: string[];
  UserIsActive: boolean;
  UserIsDeleted: boolean;
  UserCreateDate: Date;
  ModifiedDate: Date;
  CreatedBy: number;
  ModifiedBy: number;
  SpecificPermissionCount: number;
}

export class SSOUserModel {
  Gender: string;
  MailOfficial: string;
  MailPersonal: string;
  DisplayName: string;
  Mobile: string;
  Photo: string;
  TelephoneNumber: string;
}

export class UserViewModel {
  UserId: number;
  UserType: string;
  Title: string;
  UserName: string;
  SSOID: string;
  Gender: string;
  UserEmail: string;
  Mobile: string;
  IPNo: string;
  LandlineNo: string;
  ProfilePic: string;
  UserIsActive: boolean;
  UserIsDeleted: boolean;
  isUpdateProfileFirstTime: boolean | null;
  UserCreateDate: Date;
  ModifiedDate: Date | null;
  CreatedBy: number | null;
  ModifiedBy: number | null;
  OfficeCode: number | null | string;
  OfficeName: string;
  GroupCode: number | null | string;
  GroupName: string;
  DesignationCode: number | null;
  DesignationName: string;
  CreatedByUserName: string;
  ModifiedByUserName: string;
  DivisionCodes: string;
  DivisionNames: string;
  DivisionCodeList: string[];
  DistrictCodes: string;
  DistrictNames: string;
  DistrictCodeList: string[];
  PCCodes: string;
  PCNames: string;
  PCCodeList: string[];
  AdminDepartmentCodes: string;
  AdminDepartmentNames: string;
  AdminDepartmentCodeList: string[];
  DepartmentCodes: string;
  DepartmentNames: string;
  DepartmentCodeList: string[];
  TehsilCodes: string;
  TehsilNames: string;
  TehsilCodeList: string[];
  BlockCodes: string;
  BlockNames: string;
  BlockCodeList: string[];
  ACCodes: string;
  ACNames: string;
  ACCodeList: string[];
  UserTypeTitle: string;
  FileSize: number;
  DistrictOffice: string;
}

export class LoggedInUserDetailViewModel {
  UserViewModel: UserViewModel;
  AssignedUserPagePermissionViewModelList: AssignedUserPagePermissionViewModel[];
  UserMenuViewModelList: NavItem[];
  Token: string;
  DepartmentCodes: string;
  PCCodes: string;
  ACCodes: string;
  DivisionCodes: string;
  DistrictCodes: string;
  TehsilCodes: string;
  BlockCodes: string;
  DepartmentNames: string;
  PCNames: string;
  ACNames: string;
  DivisionNames: string;
  DistrictNames: string;
  TehsilNames: string;
  BlockNames: string;
  DepartmentCodeList: string[];
  PCCodeList: string[];
  ACCodeList: string[];
  DivisionCodeList: string[];
  DistrictCodeList: string[];
  TehsilCodeList: string[];
  BlockCodeList: string[];
}

export class UserDepartmentViewModel {
  DepartmentCode: number;
  DepartmentTitle: string;
  DepartmentTitleHindi: string;
  DepartmentShortTitle: string;
  DepartmentShortTitleHindi: string;
  AdmDepartmentCode: number | string | any;
  AdmDepartmentTitle: string;
  UserId: number;
}

export class UserOfficeViewModel {
  OfficeCode: number;
  OfficeName: string;
  OfficeNameHindi: string;
  OfficeShortName: string;
  OfficeShortNameHindi: string;
  DepartmentCode: number;
  DistrictCode: number;
  BlockCode: number;
  UserId: number;
}

export class UserAchievementCategoryViewModel {
  AchievementCategoryCode: number;
  AchievementCategoryTitle: string;
  AchievementCategoryHindi: string;
  AdmDepartmentCode: number;
  AdmDepartmentTitle: string;
  DepartmentCode: number;
  DepartmentTitle: string;
  UserId: number;
}
export class UserAchievementSubCategoryViewModel {
  SubCategoryCode: number;
  Title: string;
  TitleHindi: string;
  AdmDepartmentCode: number;
  AdmDepartmentTitle: string;
  DepartmentCode: number;
  DepartmentTitle: string;
  UserId: number;
}

export class UserDivisionViewModel {
  DivisionCode: number;
  DivisionTitle: string;
  DivisionTitleHindi: string;
  DivisionShortTitle: string;
  DivisionShortTitleHindi: string;
  UserId: number;
}
export class UserDistrictViewModel {
  DistrictCode: number;
  DistrictTitle: string;
  DistrictTitleHindi: string;
  DistrictShortTitle: string;
  DistrictShortTitleHindi: string;
  DivisionCode: number;
  DivisionTitle: string;
  UserId: number;
}

export class UserBlockViewModel {
  BlockCode: number;
  BlockTitle: string;
  BlockTitleHindi: string;
  DistrictCode: number;
  DistrictTitle: string;
  UserId: number;
}

export class UserTehsilViewModel {
  TehsilCode: number;
  TehsilTitle: string;
  TehsilTitleHindi: string;
  DistrictCode: number;
  DistrictTitle: string;
  UserId: number;
}

export class LoginUserLogModel {
  Id: number;
  UserName: string;
  SSOID: string;
  LogOutTime: Date | string;
  LoginLogOutStaus: string;
}

export class UserForNotificationListModel {
  UserName: string;
  SSOID: string;
  UserId: number;
  UserEmail: string;
  Mobile: string;
  User_DepartmentCode: number;
  DepartmentTitle: string;
  OfficeCode: number;
  OfficeName: string;
}

export class UserNotificationFilterModel extends IndexModel {
  OfficeCode: number;
  DepartmentCode: number;

  constructor() {
    super();
  }
}

export class UserNotificationModel {
  Content: string;
  MobileNo: string[] = [];
  MobileNumber: string;
  IsSelectAll: boolean;
  UnSelectedList: string[] = [];
  FilterModel: UserNotificationFilterModel;
}

export class CustomSearchModel {
  Application: string;
  KeywordSearch: string;
  UserId: number;
  UserTypes: string;
  UserName: string;
  AdmDepartmentCode: string[];
  DepartmentCode: string[];
  OfficeCode: string[];
  DistrictCode: string[];
  SSOID: string;
  Mobile: string;
  Email: string;
  Activeview: number;
  OfficeActiveview: number;
  CreatedFrom: Date | string;
  CreatedTo: Date | string;
  IsExportToExcel: boolean;
  IsShowUserWithSpecificPermission: boolean;
  constructor(){
    this.IsExportToExcel=false;
    this.Activeview = -1;
    this.OfficeActiveview = -1;
  }
}



export interface UserPagePermissionByUserModel {
    UserPagePermissionId: number;
    UserId: number;
    ApplicationTitle: string;
    PageTitle: string;
    AddPermission: boolean;
    EditPermission: boolean;
    DeletePermission: boolean;
    ViewPermission: boolean;
}

export interface UserTypeWhichHasApefificPermissionModel {
    UserTypeId: number;
    UserTypeTitle: string;
    UserType: string;
}

export interface UserWhichHasApefificPermissionModel {
    UserId: number;
    UserType: string;
    UserTypeTitle: string;
    UserName: string;
}

export interface UserWhichHasDefaultPermissionModel {
    UserTypeId: number;
    UserType: string;
    UserTypeTitle: string;
    PageCode: number;
}
