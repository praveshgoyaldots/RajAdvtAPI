import { Component, OnInit, Inject } from '@angular/core';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DesignationMasterService } from 'src/app/Shared/Service/designation-master.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { DesignationMasterModel } from 'src/app/Shared/Model/Master/DesignationMaster.model';

@Component({
  selector: 'app-add-update-designation-master',
  templateUrl: './add-update-designation-master.component.html',
  styleUrls: ['./add-update-designation-master.component.css']
})
export class AddUpdateDesignationMasterComponent implements OnInit {

  //#region  Variable's
  id: number;
  model: DesignationMasterModel;
  loginData: UserViewModel;
  name = new FormControl('', [Validators.required]);
  DisplayOrder = new FormControl('', [Validators.required]);
  title:string="Add";
  //#endregion

  //#region Constructor
  constructor(
    private readonly _commonService: CommonService,
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<AddUpdateDesignationMasterComponent>,
    private readonly _designationMasterService: DesignationMasterService,
    private readonly _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.title = "Update";
      this.id = data;
      this.GetById();
    }
    this.model = new DesignationMasterModel();
  }
  //#endregion

  //#region Method's
  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }


  GetById() {
    this._designationMasterService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <DesignationMasterModel>data.Data;
        }
      },
      error => {
        this.model = new DesignationMasterModel();
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    
    this.name.markAsTouched();
    this.DisplayOrder.markAsTouched();
    if (this.name.valid && this.DisplayOrder.valid) {
    if (this.model.DesignationId) {

      this._designationMasterService.Edit(this.model).subscribe(data => {
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
      this._designationMasterService.Add(this.model).subscribe(data => {
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
