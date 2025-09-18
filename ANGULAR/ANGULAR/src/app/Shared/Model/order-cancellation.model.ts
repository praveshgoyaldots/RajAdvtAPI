export class CancellationLookupModel {
  Id: number;
  OrderId: number;
  Remarks: string;
  Reason: number;
  IsAutoEmail: boolean;
  IsAutoSMS: boolean;
  constructor(){
    this.IsAutoEmail = false;
    this.IsAutoSMS = false;
  }
}

export class DepartmentSetupCancellationModel {
  IsAutoEmail: boolean;
  IsAutoSMS: boolean;
  constructor(){
    this.IsAutoEmail = false;
    this.IsAutoSMS = false;
  }
}
