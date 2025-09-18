export class GlobalMessagesModel {
  //#region Common

  static ConfirmDeleted: string = 'Are you sure want to delete record? ';
  static saveSuccess: string = "Record added successfully";
  static saveProfileSuccess: string = "Profile updated successfully";
  static saveFaild: string = "Record not Saved";
  static saveError: string = "Record not Saved, please try again....!";
  static ExistError: string =
    "SSO Id Already Exists, please change new one....!";
  static updateSuccess: string = "Record Update  successfully";
  static updateError: string = "Record not update, please try again....!";
  static deleteSuccess: string = "Record deleted successfully";
  static deleteError: string = "Record not delete, please try again....!";
  static InternalError: string = "Getting error, please try again....!";
  static ConfirmStatusChanged: string = "Are you sure want to update status? ";
  static FieldsAreEmpty: string = "Need to add at least one record....!";
  static Exist: string = "This record already added, Please select other..!";
  static AllFieldsAreEmpty: string =
    "Need to fill all fields, Then try again....!";
  static EmptyField: string = "field must have value!";
  static NotificationItemNotExist: string =
    "Please select at least one item from list...!";

    static NoRecord: string =
    "No Record Found...!";

  //#endregion

  //#region User Permission
  static updateDefaultPagePermissionSuccess: string =
    "Default permissions updated successfully.";
  static updateDefaultPagePermissionError: string =
    "Default permissions not updated.";
  static updateDefaultPagePermissionFailed: string =
    "Failed to update default permissions.";

  static updateUserPagePermissionSuccess: string =
    "User permissions updated successfully.";
  static updateUserPagePermissionError: string =
    "User permissions not updated.";
  static updateUserPagePermissionFailed: string =
    "Failed to update user permissions.";
  //#endregion

  //#region Monitoring Parameters
  static yearMonthFieldMandatory: string =
    "You have to add Year and Month! this is mandatory..!";
  //#endregion

  //#region User Login
  static LogOut: string = "Log Out Successfully";
  //#endregion

  //#region User ESign
  static EsignSuccess: string = "Document Sign Successfully";
  static EsignError: string = "Failed To Sign Document";
  //#endregion

  //#region Order Cancellation
  static CancellationIdNotExist: string = "Cancellation Order Not found";
  //#endregion

  //#region Order Cancellation
  static CCCategoryMapping: string = "Record Save Successfully";
  //#endregion

  //#region VC
  static VCNameNotExist: string = "Please select VC name first ..!";
  //#endregion

  //#region <Department Profile>
  static DptProfileExistPrefix = "Record of Entry “ ";
  static DptProfileExistSufix = " “ for the selected department already exists..!";
  //#endregion <Department Profile>

    //#region <Scheme>
  static SchmeExist:string = "Scheme Name Already Exist !";
   //#endregion <Scheme>


    //#region <Project>
  static ProjectCost:string = "We have to enter cost for every Works Entry detail record !";
  //#endregion <Project>


}
