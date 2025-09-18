export class PageMasterModel {
  PageId: number;
  PageCode: number;
  PageTitle: string;
  ApplicationCode: string;
  PageTypeCode: string | number;
  MenuCode: number | string;
  IsActive: boolean;
  IsDelete: boolean;
  UrlList: UrlViewModel[] = [];
  IsConnectWithCMIS:boolean;
  IsVisibleForPermission: boolean;
}

export class UrlViewModel {

  PageUrlId: number;
  PageCode: number;
  PageUrl: string;
  PermissionType: string;
}

export class  PageMasterListViewModel {
  PageId: number;
  PageCode: number;
  PageTitle: string | null;
  ApplicationCode: string | null;
  ApplicationTitle: string | null;
  PageTypeCode: number;
  PageTypeName: string | null;
  MenuCode: number;
  MenuTitle: string | null;
  IsActive: boolean;
  IsDelete: boolean;
  IsConnectWithCMIS: boolean;
}
