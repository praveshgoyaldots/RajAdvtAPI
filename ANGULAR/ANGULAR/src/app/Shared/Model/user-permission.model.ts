export class UserPermission {}

export class DefaultPagePermissionListModel {
  ApplicationCode: string;
  DefaultPermissionId: number;
  Userid: number;
  MenuCode: number;
  MenuTitle: string;
  PageCode: number;
  PageTitle: string;
  PageTypeCode: number;
  PageTypeName: string;
  UserType: string;
  AddPermission: boolean;
  EditPermission: boolean;
  DeletePermission: boolean;
  ViewPermission: boolean;
  IsLoadPermission: boolean;
  isUserMAnual: boolean;
}

export class UserPagePermissionListModel {
  ApplicationCode: string;
  UserPagePermissionId: number;
  MenuCode: number;
  MenuTitle: string;
  PageCode: number;
  PageTitle: string;
  PageTypeCode: number;
  PageTypeName: string;
  UserId: number;
  AddPermission: boolean;
  EditPermission: boolean;
  DeletePermission: boolean;
  ViewPermission: boolean;
  IsLoadPermission: boolean;
}

export class AssignedUserPagePermissionViewModel {
  UserId: number;
  PageCode: number;
  PageTitle: string;
  ApplicationCode: string;
  PageTypeCode: number;
  PageTypeName: string;
  MenuCode: number;
  MenuTitle: string;
  PageUrl: string;
  UserPagePermissionId: number;
  AddPermission: boolean;
  EditPermission: boolean;
  DeletePermission: boolean;
  ViewPermission: boolean;
  IsLoadPermission: boolean;
}
