import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { PressReleaseUserConfigrationModel } from 'src/app/Shared/Model/TenderPressRelease/press-release-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { PressReleaseService } from 'src/app/Shared/Service/TenderPressRelease/press-release.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { DdlItemModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { UserTypeService } from 'src/app/Shared/Service/user-type.service';
import { UserTypeModel } from 'src/app/Shared/Model/user-type.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { UserPermissionService } from 'src/app/Shared/Service/user-permission.service';

@Component({
  selector: 'app-addupdate-user-configration',
  templateUrl: './addupdate-user-configration.component.html',
  styleUrls: ['./addupdate-user-configration.component.css']
})
export class AddupdateUserConfigrationComponent implements OnInit {

//#region <Variable>

id: number;
model: PressReleaseUserConfigrationModel;
UserType = new FormControl("", [Validators.required]);
UserId = new FormControl("", [Validators.required]);
StartNo = new FormControl("", [Validators.required]);
EndNo = new FormControl("", [Validators.required]);
title = "Add";
loginData: UserViewModel;
dropdownList: DDLModel;
//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<AddupdateUserConfigrationComponent>,
  private readonly _alertService: AlertService,
  private readonly _PressReleaseService: PressReleaseService,
  private readonly _commonService: CommonService,
  private readonly _userService: UserService,
  private readonly _userTypeService: UserTypeService,
  private readonly _authService: AuthenticationService,
  private readonly _userPermissionService: UserPermissionService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  
  if (data) {
    this.id = data;
    this.GetById();
    this.title = "Update";
  } else {
    this.title = "Add";
  }
  this.model = new PressReleaseUserConfigrationModel();
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  this.GetDropdownList();
}



BindUserList() {
  
  this._userPermissionService
    .GetUserListByApplicationUrl(
      this.model.UserType,
      "",
      ""
    )
    .subscribe(
      (data) => {
        if (data.IsSuccess) {
          data.Data.Value = Number(data.Data.Value);
          this.dropdownList.ddlUser = data.Data as DdlItemModel[];
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
}

GetDropdownList() {
  this._commonService
    .GetAllDDL(AppSetting.UserConfigrationDDLKey)
    .subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.dropdownList = <DDLModel>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
}

GetById() {
  this._PressReleaseService.GetByIdUser(this.id).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.model = <PressReleaseUserConfigrationModel>data.Data;
        if (this.model.UserId){
          this.model.UserId = String(this.model.UserId);
        }
        this.BindUserList()

      }
    },
    error => {
      this.model = new PressReleaseUserConfigrationModel();
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  
  this.UserType.markAsTouched();
  this.UserId.markAsTouched();
  this.StartNo.markAsTouched();
  this.EndNo.markAsTouched();
  if (this.UserType.valid && this.UserId.valid && this.StartNo.valid && this.EndNo.valid) {
    if (this.model.Id) {
      this._PressReleaseService.EditUser(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          console.log(error);
          this._alertService.error(error.message);
        }
      );
    } else {
      this._PressReleaseService.AddUser(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          console.log(error);
          this._alertService.error(error.message);
        }
      );
    }
  }
}

onNoClick(): void {
  this._dialogRef.close();
}

//#endregion <Method>
}
