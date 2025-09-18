import { Component, OnInit, Inject } from "@angular/core";
import { VCLocationMasterViewModel } from "src/app/Shared/Model/VC/vc-locationmaster.model";
import {
  UserViewModel,
  UserDepartmentViewModel,
} from "src/app/Shared/Model/user-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/Shared/Service/user.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { VcLocationmasterService } from "src/app/Shared/Service/VC/vc-locationmaster.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { CommonService } from "src/app/Shared/Service/common.service";
import { VCLocationTypeEnum } from "src/app/Shared/Enum/office-type.enum";

@Component({
  selector: "app-add-update-vclocation-master",
  templateUrl: "./add-update-vclocation-master.component.html",
  styleUrls: ["./add-update-vclocation-master.component.css"],
})
export class AddUpdateVCLocationMasterComponent implements OnInit {
  id: number;
  model: VCLocationMasterViewModel;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  Location = new FormControl("", Validators.required);
  DistrictCode = new FormControl("", Validators.required);
  InchargeCode = new FormControl("", Validators.required);
  VCTypeCode = new FormControl("", Validators.required);
  title: string = "Add";
  dDLList: DDLModel;
  vCLocationTypeEnum = VCLocationTypeEnum;
  constructor(
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    public readonly _dialogRef: MatDialogRef<
      AddUpdateVCLocationMasterComponent
    >,
    private readonly _vclocationmasterservice: VcLocationmasterService,
    private readonly _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
      this.GetById();
    }
    this.model = new VCLocationMasterViewModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDDLList();
  }

  getDDLList() {
    
    this._commonService.GetAllDDL(AppSetting.DDlKeyForLocationMaster).subscribe(
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
    
    this._vclocationmasterservice.GetById(this.id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.model = <VCLocationMasterViewModel>data.Data;
          if (this.model.Id) {
            this.model.Id = this.model.Id;
          }
          if (this.model.VCTypeCode) {
            this.model.VCTypeCode = String(this.model.VCTypeCode);
          }
          if (this.model.DistrictCode) {
            this.model.DistrictCode = String(this.model.DistrictCode);
          }
          if (this.model.InchargeCode) {
            this.model.InchargeCode = String(this.model.InchargeCode);
          }
        }
      },
      (error) => {
        this.model = new VCLocationMasterViewModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.Location.markAsTouched();
    // this.DistrictCode.markAsTouched();
    // this.InchargeCode.markAsTouched();
    if (this.Location.valid) {
      if (this.model.Id) {
        this._vclocationmasterservice.Edit(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._dialogRef.close(true);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            console.log(error);
            this._alertService.error(error.message);
          }
        );
      } else {
        this._vclocationmasterservice.Add(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._dialogRef.close(true);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
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
}
