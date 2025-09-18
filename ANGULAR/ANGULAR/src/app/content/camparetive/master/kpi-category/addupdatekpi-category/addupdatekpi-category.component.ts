import { UserViewModel } from './../../../../../Shared/Model/user-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { KPICategoryMasterModel } from 'src/app/Shared/Model/Camparetive/kpicategory-model';
import { FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { KpiCategoryService } from 'src/app/Shared/Service/Comperative/kpi-category.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: 'app-addupdatekpi-category',
  templateUrl: './addupdatekpi-category.component.html',
  styleUrls: ['./addupdatekpi-category.component.css']
})
export class AddupdatekpiCategoryComponent implements OnInit {

//#region <Variable>

id: number;
model: KPICategoryMasterModel;
department = new FormControl("", [Validators.required]);
Name = new FormControl("", [Validators.required]);
NameHindi = new FormControl("", [Validators.required]);
title = "Add";
ddlDepartment: UserDepartmentViewModel[];
loginData: UserViewModel;

//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<AddupdatekpiCategoryComponent>,
  private readonly _alertService: AlertService,
  private readonly _KpiCategoryService : KpiCategoryService,
  private readonly _commonService: CommonService,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  
  if (data) {
    this.id = data;
    this.GetById();
    this.title = "Update";
  } else {
    this.model = new KPICategoryMasterModel();
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  this.getDepartment();
}

getDepartment() {
  this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
    data => {
      if (data.IsSuccess) {
        this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

GetById() {
  this._KpiCategoryService.GetById(this.id).subscribe(
    data => {
      if (data.IsSuccess) {
        this.model = <KPICategoryMasterModel>data.Data;
        if (this.model.DepartmentCode){
          this.model.DepartmentCode = String(this.model.DepartmentCode);
        }
        // if (this.model.IsDistrict){
        //   this.model.IsDistrict = String(this.model.IsDistrict);
        // }
      }
    },
    error => {
      this.model = new KPICategoryMasterModel();
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  
  this.department.markAsTouched();
  this.Name.markAsTouched();
  this.NameHindi.markAsTouched();
  if (this.Name.valid && this.NameHindi.valid && this.department.valid) {
    if (this.model.Id) {
      this._KpiCategoryService.Edit(this.model).subscribe(
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
      this._KpiCategoryService.Add(this.model).subscribe(
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
