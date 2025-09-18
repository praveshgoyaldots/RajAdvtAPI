export class GeneralModel {}
export class IndexModel {
  Page: number;
  PageSize: number;
  Search: string;
  OrderBy: string;
  OrderByAsc: number;
  IsPostBack: boolean;
  AdvanceSearchModel?: any;
  constructor() {
    this.PageSize = 10;
    this.IsPostBack = false;
    this.OrderByAsc = 0;
    this.Search = null;
    this.OrderBy = null;
    this.Page = 1;
  }
}

export class SearchListModel extends IndexModel {
  SearchField: string;
  constructor() {
    super();
    this.SearchField = "";
  }
}

export class SearchModel {
  Key: string;
  Value: string;
  constructor() {
    this.Key = "";
    this.Value = "";
  }
}
export class PermissionModel {
  ListPageAccess: boolean;
  AddPageAccess: boolean;
  DetailPageAccess: boolean;
  UpdatePageAccess: boolean;
  DeletePageAccess: boolean;
  Custome1PageAccess: boolean;
  Custom2PageAccess: boolean;
  Custom3PageAccess: boolean;
}

export class CommonDocModel {
  Url: string;
  BlankDocUrl: string;
}

export class PagedData {
  Data: GetNotificationGenericModel[] = [];
  ColumnNames: string[] = [];
  HeaderNames: string[] = [];
}

export class GetNotificationGenericModel {
  Id: number;
  Code: number;
  DepartmentCode: number;
  Reference: string;
  ReferenceHindi: string;
  OrderBy: number;
  Post: string;
  MobileNumber1: string;
  MobileNumber2: string;
  Email1: string;
  Email2: string;
  DepartmentTitle: string;
}

export class NotificationPreviewModel {
  Subject: string;
  Content: string;
  DataList: PagedData;
}

export class NotificationFinalSubmissionModel {
  MobileNumberList: string[] = [];
  EmailList: string[] = [];
  Content: string;
  Subject: string;
  NotificationType: number;
}

export class DateWiseSearchModel extends IndexModel {
  EntryFromDate: Date | string;
  EntryToDate: Date | string;
  constructor() {
    super();
    this.EntryFromDate = "";
    this.EntryToDate = "";
  }
}

export class ExportToExcelModel {
  SheetName: string;
  FileName: string;
  DataSet: any;
  constructor(dataSet, fileName, sheetName) {
    this.DataSet = dataSet;
    this.FileName = fileName;
    this.SheetName = sheetName;
  }
}

export class SendNotificationToDeptOfficerModel{
  Content: string;
  DepartmentCode: number;
}

export class ConnectWithCMISFilterModel{
  ModuleName: string;
  Department: number;
  YearText: string;
  DepartmentName: string;
  Index:number;
}

export class ConnectWithCMISListModel{
  Para_No: string;
  File_Number: string;
  Announcement_Description: string;
  modulename: string;
  CMISNewTransCoreId: number;
}
