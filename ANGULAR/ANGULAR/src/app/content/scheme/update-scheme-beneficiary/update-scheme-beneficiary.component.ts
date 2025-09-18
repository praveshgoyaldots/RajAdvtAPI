import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { UpdateBeneficiaryModel } from 'src/app/Shared/Model/scheme-model';

@Component({
  selector: 'app-update-scheme-beneficiary',
  templateUrl: './update-scheme-beneficiary.component.html',
  styleUrls: ['./update-scheme-beneficiary.component.css']
})
export class UpdateSchemeBeneficiaryComponent implements OnInit {

  id: number;
  model = new UpdateBeneficiaryModel();
  loginData: UserViewModel;
  BeneficiaryCategory = new FormControl('', [Validators.required]);

  title:string;
  dDLList: DDLModel;
  constructor(
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<UpdateSchemeBeneficiaryComponent>,
    private readonly _schemeService: SchemeService,
    private readonly _authService: AuthenticationService,
    public readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        this.id = data;
        this.GetById();
        this.title = "Update";
      }



    }

    ngOnInit() {
      this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
      this.GetDDLList();
      // this.GetById();
    }


  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForUpdateBeneficiary).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;

        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  GetById() {
    this._schemeService.GetByBeneficiaryId(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <UpdateBeneficiaryModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    this.BeneficiaryCategory.markAsTouched();
    if (this.BeneficiaryCategory.valid) {
    if (this.model.BeneficiaryCodes) {
      this.model.Schemeid = this.id;
      this._schemeService.updateBeneficiaryCategory(this.model).subscribe(data => {
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


}

