import { Component, OnInit, Inject } from "@angular/core";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AchievementCategoryMasterService } from "src/app/Shared/Service/achievement-category-master.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AchievementCategoryMasterModel } from "src/app/Shared/Model/Master/achievement-category-master-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserViewModel } from "src/app/Shared/Model/user-model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatStepper,
  MatDialog
} from "@angular/material";
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: "app-add-update-achievement-category-master",
  templateUrl: "./add-update-achievement-category-master.component.html",
  styleUrls: ["./add-update-achievement-category-master.component.css"],
  providers: [CommonService, AchievementCategoryMasterService]
})
export class AddUpdateAchievementCategoryMasterComponent implements OnInit {
  //#region Variable
  id: number;
  model: AchievementCategoryMasterModel;
  loginData: UserViewModel;
  // firstFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  title: string;
  ImagefileValidationMsg: string = "";
  helpFileValidationMsg: string = "";
  fileSizeValidationMsg: string = "";
  isLinear = true;
  dDLList: DDLModel;
  selectedAllDepartmentDistrict = -1;
  dDLDistrictDepartment: DdlItemModel[];
  //#endregion

  //#region constructor
  constructor(
    private readonly fb: FormBuilder,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _achievementCategoryService: AchievementCategoryMasterService,
    private readonly _authService: AuthenticationService,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent,
    private readonly _router: Router,
  ) {
    this.model = new AchievementCategoryMasterModel();
    // if (data) {
    //   this.id = data;
    //   this.GetById();
    // }
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.fileSizeValidationMsg =
      "Attachment must be less than " +
      localStorage.getItem("FileValidation") +
      " MB.";

      const id = this._route.snapshot.params.id;
      if (id) {
        this.model.CategoryId = id;
        this.GetById();
        this._parentApi.setpagelayout(
          "Update General Entry Category :",
          "keyboard_backspace",
          "Back To List",
          "master/achievement-category"
        );
        this.title = "Update";
      } else {
        this._parentApi.setpagelayout(
          "Add General Entry Category :",
          "keyboard_backspace",
          "Back To List",
          "master/achievement-category"
        );
        this.title = "Add";
      }

  }
  //#endregion

  //#region Method
  ngOnInit() {
    this.formGroupInit();
    this.GetDDLList();
  }

  GetById() {
    this._achievementCategoryService.GetById(this.model.CategoryId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <AchievementCategoryMasterModel>data.Data;
          if (this.model.MenuClassificationCode) {
            this.model.MenuClassificationCode = String(this.model.MenuClassificationCode );
          }
          if (this.model.MenuClassificationPageTypeCode) {
            this.model.MenuClassificationPageTypeCode = String(this.model.MenuClassificationPageTypeCode);
          }
          if (this.model.CommonCategoryCode) {
            this.model.CommonCategoryCode = String(this.model.CommonCategoryCode);
          }
          if (this.model.GeneralDepartmentDistrictMapping) {
            this.model.GeneralDepartmentDistrictMapping = String(this.model.GeneralDepartmentDistrictMapping);
            this.GetDepartmentList(this.model.GeneralDepartmentDistrictMapping);
          }
        }
      },
      error => {
        this.model = new AchievementCategoryMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForCategory).subscribe(
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


  touchFirst(stepper: MatStepper) {
    if (!this.firstFormGroup.valid) {
      this.firstFormGroup.markAllAsTouched();
    }
  }

  touchSecond(stepper: MatStepper) {
    if (!this.secondFormGroup.valid) {
      this.secondFormGroup.markAllAsTouched();
    }
  }

  touchthird(stepper: MatStepper) {
    if (!this.thirdFormGroup.valid) {
      this.thirdFormGroup.markAllAsTouched();
    }
  }

  SaveClick() {
    
    this.firstFormGroup.markAllAsTouched();
    this.secondFormGroup.markAllAsTouched();
    this.thirdFormGroup.markAllAsTouched();
    if ( this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid ) {
      if (this.model.CategoryId) {
        this.model.ModifiedBy = this.loginData.UserId;
        this._achievementCategoryService
          .Edit(this.model.CategoryId, this.model)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(GlobalMessagesModel.updateSuccess);
                this._router.navigate(["master/achievement-category"]);
              } else {
                this._alertService.error(data.Message);
              }
            },
            error => {
              console.log(error);
              this._alertService.error(GlobalMessagesModel.updateError);
            }
          );
      } else {
        this.model.CreatedBy = this.loginData.UserId;
        this._achievementCategoryService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(GlobalMessagesModel.saveSuccess);
              this._router.navigate(["master/achievement-category"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            console.log(error);
            this._alertService.error(GlobalMessagesModel.saveError);
          }
        );
      }
    }
  }


  formGroupInit() {
    this.firstFormGroup = this.fb.group({
      Title: [null, Validators.required],
      TitleHindi: [null, Validators.required],
      ImagePath: [undefined, null],
      IsVisible: [undefined, null],
      CategoryIsVisible: [undefined, null],
      IsVisibleToEndUser: [null],
      HelpFileURL: [null],
      LabelAchievementHindi: [null],
      LabelDescriptionHindi: [null],
      LabelDate: [null],
      LabelURL: [null],
      LabelAddPDF: [null],
      LabelAttachImage: [null],

    });

    this.secondFormGroup = this.fb.group({
      IsVisibleDate: [null],
      IsVisibleDescriptionHindi: [null],
      IsShowConnectWithCMIS: [null],
      IsShowBeneficiaryCategory: [null],
      IsPDFMandatory: [null],
      IsURLMandatory: [null],
      IsImageMandatory: [null]
    });

    this.thirdFormGroup = this.fb.group({
      MenuClassificationCode: [null],
      MenuClassificationPageTypeCode: [null],
      GeneralDepartmentDistrictMapping: [null],
      GeneralDepartmentDistrictMappingList:[null],
      SubMenuNameEnglish:[null],
      SubMenuNameHindi:[null],
      CommonCategoryCode:[null]
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

  handleFileForMoreDetail(event: any) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.HelpFileURL = event.target.result;
          this.helpFileValidationMsg = "";
        };
        reader.readAsDataURL(event.target.files.item(0));
      } else {
        this.helpFileValidationMsg = this.fileSizeValidationMsg;
      }
    } else {
      this.helpFileValidationMsg = "only pdf file accepted";
    }
  }

  RemoveImageFile() {
    this.model.ImagePath = undefined;
  }

  RemoveHelpFile() {
    this.model.HelpFileURL = null;
  }

  downloadPdf(Url) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = "HelpFileDocs";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();
  }

  selectAllDepartment() {
    
    if (this.selectedAllDepartmentDistrict < 0) {
      this.model.GeneralDepartmentDistrictMappingList = this.dDLDistrictDepartment.map(function (a) {
        return a.Value;
      });
      this.selectedAllDepartmentDistrict = 1;
    } else {
      this.selectedAllDepartmentDistrict = -1;
      this.model.GeneralDepartmentDistrictMappingList = [];
    }
  }

  GetDepartmentList(data){
    if (data) {
      this._commonService.GetDepartmentDistrictList(data).subscribe(
        data => {
          if (data.IsSuccess) {
            this.dDLDistrictDepartment = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.dDLDistrictDepartment = [];
    }
  }

  //#endregion
}
