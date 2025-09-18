import { IndexModel } from "./general-model";

export class ComplaintListModel {
  Id: number;
  Description: string;
  EntryTypeId: number | string;
  PriorityId: number | string;
  ModuleId: number | string;
  ScreenURL: string;
  StatusId: number | string;
  IsActive: boolean;
  IsDelete: boolean;
  CreatedDate: Date;
  AttachmentList: ComplaintAttachmentModel[] = [];
  ApplicationCode: number | string;
  PageCode: number | string;

}

export class ComplaintAttachmentModel {
  Id: number;
  ComplaintEntryId: number;
  AttachmentsUrl: string;
}

// export class CompliantSearchModel extends IndexModel {
//   status: number | string;
// }

export class CompliantSearchModel {//extends IndexModel
  constructor() {
    this.indexModel = new IndexModel();
    //  this.ApplicationCode = 0;
    this.StatusId = null;
    // this.EntryTypeId = 0;
  }
  LoginUserCode: number;
  FromDate: string;
  ToDate: string;
  ActionFromDate: string;
  ActionToDate: string;
  ApplicationCode: number | string;
  StatusId: number | string;
  StatusIds: number[] | string[];
  EntryTypeId: number | string;
  indexModel: IndexModel;
}

export class ComplaintEntryListModel {
  Id: number;
  Description: string;
  PriorityId: number;
  ScreenURL: string;
  IsActive: boolean;
  CreatedDate: Date | string;
  PriorityName: string;
  EntryTypeName: string;
  StatusName: string;
  ModuleName: string;
  ModuleId: number;
  EntryTypeId: number;
  StatusId : number;
  PageTitle: string;
  ApplicationTitle: string;
	AttachmentList: string[]=[];
  createdByName: string;
  CreatedUserContact: string;

  PermissionTitle: string;

  ActionList: ComplaintActionHistory[] = [];
  UserName: string;
  UserMobile: string;
  SSOID: string;
  UserDepartmentName: string;
  UserType: string;
  ActionDate: Date | string;
  ActionBy: string;
  ActionBySSOID: string;
  ActionUserMobile: string;
}

export class ComplaintActionModel {
  Id?: number;
  ComplaintEntryId?: number ;
  Comment?: number;
  StatusId?: number | string;
  AttachmentURL?: string;
  IsActive?: boolean;
  Extension: string;
}
export class ComplaintActionHistory {
  Id: number;
  ComplaintEntryId: number;
  AttachmentURL: string;
  Comment: string;
  StatusId: number | null;
  Status: string;
  IsActive: boolean | null;
  IsDeleted: boolean | null;
  CreatedBy: number | null;
  CreatedDate: string | null;
  UserName: string;
  UserType: string;
  UserTypeTitle: string;
  FromBaseUserType: string;
  FromBaseUserTypeTitle: string;
  FromUser: string;
}
