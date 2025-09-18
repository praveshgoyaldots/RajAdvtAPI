import { Component, OnInit, Inject } from "@angular/core";
import { ImportantDicisionSubCategoryMasterPostModel } from "src/app/Shared/Model/Master/important-decision-subcategory-master-model";
import {
  UserViewModel,
  UserDepartmentViewModel,
} from "src/app/Shared/Model/user-model";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ImportantDecisionSubCategoryMasterService } from "src/app/Shared/Service/important-decision-sub-category-master";

@Component({
  selector: "app-add-update-important-dicision-sub-category-master",
  templateUrl:
    "./add-update-important-dicision-sub-category-master.component.html",
  styleUrls: [
    "./add-update-important-dicision-sub-category-master.component.css",
  ],
})
export class AddUpdateImportantDicisionSubCategoryMasterComponent
  implements OnInit {
  //#region Variable
  id: number;
  model: ImportantDicisionSubCategoryMasterPostModel;
  loginData: UserViewModel;
  dDLList: DDLModel;
  fromGroup: FormGroup;
  ImagefileValidationMsg: string = "";
  ddlDepartment: UserDepartmentViewModel[];
  //#endregion

  //#region constructor
  constructor(
    private readonly fb: FormBuilder,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _userService: UserService,
    public readonly _dialogRef: MatDialogRef<
      AddUpdateImportantDicisionSubCategoryMasterComponent
    >,
    private readonly _importantDecisionSubCategoryService: ImportantDecisionSubCategoryMasterService,
    private readonly _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model = new ImportantDicisionSubCategoryMasterPostModel();
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
  GetById() {
    
    this._importantDecisionSubCategoryService.GetById(this.id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.model = <ImportantDicisionSubCategoryMasterPostModel>data.Data;
          this.model.CategoryCode = String(this.model.CategoryCode);
          // this.model.SectorCode = String(this.model.SectorCode);
          this.model.DepartmentCode = String(this.model.DepartmentCode);
          //alert(this.model.CategoryCode);
        }
      },
      (error) => {
        this.model = new ImportantDicisionSubCategoryMasterPostModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.fromGroup.markAllAsTouched();
    if (this.fromGroup.valid) {
      if (this.model.ImpSubCategoryId) {
        this.model.ModifiedBy = this.loginData.UserId;
        this._importantDecisionSubCategoryService
          .Edit(this.model.ImpSubCategoryId, this.model)
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
        this._importantDecisionSubCategoryService.Add(this.model).subscribe(
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
      .GetAllDDL(AppSetting.DDlKeyForImportantDecisionSubCategoryMaster)
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
       IsApplicableToAllDPT: [null, null],
      Title: [null, Validators.required],
      TitleHindi: [null, Validators.required],
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
