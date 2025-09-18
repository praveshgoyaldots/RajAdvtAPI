import { Component, OnInit, Inject } from "@angular/core";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AchievementSubCategoryMasterPostModel } from "src/app/Shared/Model/Master/achievement-sub-category-master-model";
import {
  UserViewModel,
  UserDepartmentViewModel,
} from "src/app/Shared/Model/user-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AchievementSubCategoryMasterService } from "src/app/Shared/Service/achievement-sub-category-master.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/Shared/Service/user.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-add-update-achievement-sub-category-master",
  templateUrl: "./add-update-achievement-sub-category-master.component.html",
  styleUrls: ["./add-update-achievement-sub-category-master.component.css"],
  providers: [CommonService, AchievementSubCategoryMasterService],
})
export class AddUpdateAchievementSubCategoryMasterComponent implements OnInit {
  //#region Variable
  id: number;
  model: AchievementSubCategoryMasterPostModel;
  loginData: UserViewModel;
  dDLList: DDLModel;
  fromGroup: FormGroup;
  ImagefileValidationMsg: string = "";
  ddlDepartment: UserDepartmentViewModel[];
  ddlKPICategory: DdlItemModel[]=[];
  //#endregion

  //#region constructor
  constructor(
    private readonly fb: FormBuilder,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _userService: UserService,
    public readonly _dialogRef: MatDialogRef<
      AddUpdateAchievementSubCategoryMasterComponent
    >,
    private readonly _achievementSubCategoryService: AchievementSubCategoryMasterService,
    private readonly _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model = new AchievementSubCategoryMasterPostModel();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetDDLList();

    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  //#region Method
  ngOnInit() {
    this.formGroupInit();
    this.getDepartment();
    if (this.data || 0 > 0) {
      this.id = this.data;
      this.GetById();
    }
  }
  getDepartment() {
    
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getKPIList(code) {
    this._commonService.GetKPIByDepartmentCode(Number(code)).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.ddlKPICategory = data.Data as DdlItemModel[];
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  GetById() {
    this._achievementSubCategoryService.GetById(this.id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.model = <AchievementSubCategoryMasterPostModel>data.Data;
          this.model.CategoryCode = String(this.model.CategoryCode);
          this.model.DepartmentCode = String(this.model.DepartmentCode);
          this.getKPIList(this.model.DepartmentCode);
          if (this.model.KPICategoryCode) {
            this.model.KPICategoryCode = String(this.model.KPICategoryCode);
          }
         // this.model.IsApplicableToAllDPT = String(this.model.IsApplicableToAllDPT);
          //alert(this.model.CategoryCode);
        }
      },
      (error) => {
        this.model = new AchievementSubCategoryMasterPostModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.fromGroup.markAllAsTouched();
    if (this.fromGroup.valid) {
      if (this.model.SubCategoryId) {
        this.model.ModifiedBy = this.loginData.UserId;
        this._achievementSubCategoryService
          .Edit(this.model.SubCategoryId, this.model)
          .subscribe(
            (data) => {
              if (data.IsSuccess) {
                this._alertService.success(GlobalMessagesModel.updateSuccess);
                this._dialogRef.close(true);
              } else {
                this._alertService.error(data.Message);
              }
            },
            (error) => {
              console.log(error);
              this._alertService.error(GlobalMessagesModel.updateError);
            }
          );
      } else {
        this.model.CreatedBy = this.loginData.UserId;
        this._achievementSubCategoryService.Add(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(GlobalMessagesModel.saveSuccess);
              this._dialogRef.close(true);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            console.log(error);
            this._alertService.error(GlobalMessagesModel.saveError);
          }
        );
      }
    }
  }

  GetDDLList() {
    
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForAchievementSubCategoryMaster)
      .subscribe(
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
  onNoClick(): void {
    this._dialogRef.close();
  }
  formGroupInit() {
    this.fromGroup = this.fb.group({
      DepartmentCode: [null, Validators.required],
      CategoryCode: [null, Validators.required],
      Title: [null, Validators.required],
      TitleHindi: [null, Validators.required],
      IsApplicableToAllDPT: [null],
      KPICategoryCode:[null]
    });
  }

  handleFileInput(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.model.ImagePath = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.ImagefileValidationMsg = "";
    } else {
      this.ImagefileValidationMsg = "only *image file accepted ";
    }
  }

  RemoveImageFile() {
    this.model.ImagePath = undefined;
  }
  //#endregion
}
