import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { BeneficiaryCategoryMasterModel } from 'src/app/Shared/Model/Master/beneficiary-category-master-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { BeneficiaryCategoryMasterService } from 'src/app/Shared/Service/beneficiary-category-master.service';
import { FormControl, Validators } from '@angular/forms';
import { UserViewModel } from 'src/app/Shared/Model/user-model';

@Component({
  selector: 'app-addupdate-beneficiary-category-master',
  templateUrl: './addupdate-beneficiary-category-master.component.html',
  styleUrls: ['./addupdate-beneficiary-category-master.component.css']
})
export class AddupdateBeneficiaryCategoryMasterComponent implements OnInit {
//#region  Variable's
id: number;
model: BeneficiaryCategoryMasterModel;
loginData: UserViewModel;
ansmtcategory = new FormControl('', [Validators.required]);
ansmtcategoryinHindi = new FormControl('', [Validators.required]);
title:string="Add";
//#endregion

//#region Constructor
constructor(
  private readonly _commonService: CommonService,
  private readonly _alertService: AlertService,
  public readonly _dialogRef: MatDialogRef<AddupdateBeneficiaryCategoryMasterComponent>,
  private readonly _beneficiaryCategoryMasterService: BeneficiaryCategoryMasterService,
  private readonly _authService: AuthenticationService,
  @Inject(MAT_DIALOG_DATA) public data: any) {
  if (data) {
    this.title = "Update";
    this.id = data;
    this.GetById();
  }
  this.model = new BeneficiaryCategoryMasterModel();
}
//#endregion

//#region Method's
ngOnInit() {
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
}


GetById() {
  this._beneficiaryCategoryMasterService.GetById(this.id).subscribe(
    data => {
      if (
        (data.IsSuccess)
      ) {
        this.model = <BeneficiaryCategoryMasterModel>data.Data;
      }
    },
    error => {
      this.model = new BeneficiaryCategoryMasterModel();
      this._alertService.error(error.message);
    }
  );
}


SaveClick() {
  
  this.ansmtcategoryinHindi.markAsTouched();
  this.ansmtcategory.markAsTouched();
  if (this.ansmtcategory.valid && this.ansmtcategoryinHindi.valid) {
  if (this.model.cm_ansmtcategoryid) {

    this._beneficiaryCategoryMasterService.Edit(this.model).subscribe(data => {
      if (data.IsSuccess) {
        this._alertService.success(data.Message);
        this._dialogRef.close(true);
      }
      else {
        this._alertService.error(data.Message);

      }
    }, error => {
      console.log(error);
      this._alertService.error(error.message);
    });
  }
  else {
    this._beneficiaryCategoryMasterService.Add(this.model).subscribe(data => {
      if (data.IsSuccess) {
        this._alertService.success(data.Message);
        this._dialogRef.close(true);
      }
      else {
        this._alertService.error(data.Message);
      }
    }, error => {
      console.log(error);
      this._alertService.error(error.message);
    });
  }
}

}

onNoClick(): void {
  this._dialogRef.close();
}

numberOnly(value, isCommaOrDash: boolean = false): boolean {
return this._commonService.numberOnly(value, isCommaOrDash);
}

//#endregion



}

