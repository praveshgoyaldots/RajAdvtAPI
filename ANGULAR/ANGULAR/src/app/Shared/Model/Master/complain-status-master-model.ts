
export class ComplainStatusMasterViewModel {
  Id: number;
  Name: string;
  NameHindi: string;
  IsDevFilter: boolean | null;
  IsAdmFilter: boolean | null;
  IsUserFilter: boolean | null;
  IsDevAction: boolean | null;
  IsAdmAction: boolean | null;
  IsUserAction: boolean | null;
  IsSMS: boolean | null;
  SMSContent: string;
  NoOfDaysForAutoClose: number | null;
  IsActive: boolean | null;
  IsDelete: boolean | null;
  CreatedDate: string | null;
  CreatedBy: number | null;
  ModifiedDate: string | null;
  ModifiedBy: number | null;
  constructor() {
    this.Id = 0;
    this.IsDevFilter = false
    this.IsAdmFilter = false
    this.IsUserFilter = false
    this.IsDevAction = false
    this.IsAdmAction = false
    this.IsUserAction = false
    this.IsSMS = false
    this.IsActive = false
    this.IsDelete = false
  }
}
export class ChangeStatus {
  Id: number;
  UserType: string;
  ActionType: string;
  UserId: number;
}
