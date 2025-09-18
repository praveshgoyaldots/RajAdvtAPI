import { Component, OnInit, Inject } from '@angular/core';
import { MLAConstituencyMasterModel } from 'src/app/Shared/Model/Master/mla-constituency-master-model';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MLAContituencyMasterService } from 'src/app/Shared/Service/MLAContituencyMaster.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { UserDistrictViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';

@Component({
  selector: 'app-mlaconstituency-add-update',
  templateUrl: './mlaconstituency-add-update.component.html',
  styleUrls: ['./mlaconstituency-add-update.component.css']
})

export class MlaconstituencyAddUpdateComponent implements OnInit {
  //#region <Variable>
  ddlDistrict: UserDistrictViewModel[];
  id: number;
  model: MLAConstituencyMasterModel;
  dDLList: DDLModel;
  Name = new FormControl("", [Validators.required]);
  NameHindi = new FormControl("", [Validators.required]);
  DistrictCode = new FormControl("", [Validators.required]);
  Email = new FormControl("", [Validators.required]);
  whatsappNumber = new FormControl("", [Validators.required]);
  title = "Add";

  ImagefileValidationMsg: string = "";
  fileSizeValidationMsg: string = "";
  loginData: UserViewModel;
  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    public readonly _dialogRef: MatDialogRef<MlaconstituencyAddUpdateComponent>,
    private readonly _alertService: AlertService,
    private readonly _mLAContituencyMasterService: MLAContituencyMasterService,
    private readonly _commonService: CommonService,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
      this.GetById();
      this.title = "Update";
    } else {
      this.model = new MLAConstituencyMasterModel();
      this.title = "Add";
    }
    this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDistrict();
  }

  getDistrict() {
    this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.MLAConstituencyDDLKey).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetById() {
    this._mLAContituencyMasterService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <MLAConstituencyMasterModel>data.Data;
          if (this.model.DistrictCode) {
            this.model.DistrictCode = String(this.model.DistrictCode);
          }
          if (this.model.DesignationCode) {
            this.model.DesignationCode = String(this.model.DesignationCode);
          }
        }
      },
      error => {
        this.model = new MLAConstituencyMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    this.DistrictCode.markAsTouched();
    this.Email.markAsTouched();
    this.whatsappNumber.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid && this.DistrictCode.valid && this.Email.valid && this.whatsappNumber.valid) {
      if (this.model.Id) {
        this._mLAContituencyMasterService.Edit(this.model).subscribe(
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
        this._mLAContituencyMasterService.Add(this.model).subscribe(
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

  handleFileInput(event: any, isPhoto = false) {
    if (event.target.files.item(0).type.match("image/*")) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (isPhoto) {
          this.model.MLAPhoto = event.target.result;
        } else {
          this.model.MAPImagePath = event.target.result;
        }
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.ImagefileValidationMsg = "";
    } else {
      this.ImagefileValidationMsg = "only *image file accepted ";
    }
  }

  RemoveImageFile(isPhoto) {
    if (isPhoto) {
      this.model.MLAPhoto = null;
    } else {
      this.model.MAPImagePath = null;
    }
  }

  //#endregion <Method>

}
