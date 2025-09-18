import { Component, OnInit } from "@angular/core";
import { AchievementPostModel } from "src/app/Shared/Model/achievement-model";
import { DDLModel, FilterDDlModel } from "src/app/Shared/Model/commonddl.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  UserViewModel,
  UserDepartmentViewModel,
} from "src/app/Shared/Model/user-model";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AchievementService } from "src/app/Shared/Service/achievement.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/Shared/Model/format-datepicker";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AchievementCategoryEnum } from "../../../../Shared/Enum/adv-notification.enum";
import { UserService } from "src/app/Shared/Service/user.service";
import { importantdesicionservice } from "src/app/Shared/Service/important-desicion-service";

@Component({
  selector: "app-addupdate-important-decision",
  templateUrl: "./addupdate-important-decision.component.html",
  styleUrls: ["./addupdate-important-decision.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class AddupdateImportantDecisionComponent implements OnInit {
  //#region <<Variable>>
  model: AchievementPostModel;
  dDLList: DDLModel;
  fromGroup: FormGroup;
  loginData: UserViewModel;
  RecordId = 0;
  fileValidationMsg = "";
  tomorrow = new Date();
  filterDDlModel: any[];
  ImagefileValidationMsg = "";
  Imeges: string[];
  PDFFile: SafeResourceUrl;
  ddlDepartment: UserDepartmentViewModel[];
  ddluser: UserViewModel[];
  isCMOCommentVisible = false;
  //#endregion

  //#region <<constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _importantDecision: importantdesicionservice,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
    public sanitizer: DomSanitizer
  ) {
    this.RecordId = this._route.snapshot.params.id;
    if (this._router.url.includes("update-ImportantDecisionComment")) {
      this.isCMOCommentVisible = true;
    }
    this.model = new AchievementPostModel();
    if (this.RecordId > 0) {
      this.appComponnet.setpagelayout(
        "Update Important Decision :",
        "keyboard_backspace",
        "Back To List",
        "master/ImportantDecision"
      );
    } else {
      this.appComponnet.setpagelayout(
        "Add Important Decision:",
        "keyboard_backspace",
        "Back To List",
        "master/ImportantDecision"
      );
    }
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  //#region <<Method>>
  ngOnInit() {
    
    this.getDDLList();
    this.formGroupInit();
    this.getDepartment();
    if (this.RecordId) {
      this.getDetail();
    }
  }

  getDetail() {
    this._importantDecision.Detail(this.RecordId).subscribe(
      (data) => {
        
        if (data.IsSuccess) {
          this.model = data.Data as AchievementPostModel;
          if (data.Data.DepartmentCode) {
            this.model.DepartmentCode = String(data.Data.DepartmentCode);
          } else {
            this.getDepartment();
          }

          this.PDFFile = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.model.PdfFIleName
          );
          this.model.AchievementCategoryCode =
            data.Data.AchievementCategoryCode || undefined !== undefined
              ? String(data.Data.AchievementCategoryCode)
              : undefined;
          this.model.AchievementSubCategoryCode =
            data.Data.AchievementSubCategoryCode || undefined !== undefined
              ? String(data.Data.AchievementSubCategoryCode)
              : undefined;

          // bind Subcategory based on category
          setTimeout(() => {
            this.getFilterdDDL(
              Number(this.model.DepartmentCode),
              this.model.AchievementCategoryCode
            );
            const ctrlCategoryCode = this.fromGroup.get(
              "AchievementCategoryCode"
            );
            ctrlCategoryCode.disable();
          }, 200);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    this.fromGroup.markAllAsTouched();
    this.Autokeyword();
    if (this.fromGroup.valid) {
      if (this.RecordId > 0) {
        const prevDate = this.model.AchievementDate;

        this.model.ModifiedBy = this.loginData.UserId;
       if (this.model.AchievementDate) {
        const uTCDate = new Date(
          Date.UTC(
            new Date(this.model.AchievementDate).getFullYear(),
            new Date(this.model.AchievementDate).getMonth(),
            new Date(this.model.AchievementDate).getDate()
          )
        ).toISOString();
        this.model.AchievementDate = uTCDate;
      }

        this._importantDecision.Edit(this.RecordId, this.model).subscribe(
          (data) => {
            if (data) {
              if (data.IsSuccess) {
                this._alertService.success(
                  GlobalMessagesModel.updateSuccess,
                  true
                );
                this._router.navigate(["master/ImportantDecision"]);
              } else {
                this.model.AchievementDate = prevDate;
                this._commonService.ScrollingTop();
                this._alertService.error(GlobalMessagesModel.updateError);
              }
            }
          },
          (error) => {
            this.model.AchievementDate = prevDate;
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.InternalError);
          }
        );
      } else {
        const prevDate = this.model.AchievementDate;

        this.model.CreatedBy = this.loginData.UserId;
        if (this.model.AchievementDate) {
        const uTCDate = new Date(
          Date.UTC(
            new Date(this.model.AchievementDate).getFullYear(),
            new Date(this.model.AchievementDate).getMonth(),
            new Date(this.model.AchievementDate).getDate()
          )
        ).toISOString();
        this.model.AchievementDate = uTCDate;
          }
        this._importantDecision.Add(this.model).subscribe(
          (data) => {
            if (data) {
              if (data.IsSuccess) {
                this._alertService.success(
                  GlobalMessagesModel.saveSuccess,
                  true
                );
                this._router.navigate(["master/ImportantDecision"]);
              } else {
                this.model.AchievementDate = prevDate;
                this._commonService.ScrollingTop();
                this._alertService.error(GlobalMessagesModel.saveError);
              }
            }
          },
          (error) => {
            this.model.AchievementDate = prevDate;
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.InternalError);
          }
        );
      }
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

  getUserList() {
    
    this._userService.GetUserList().subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddluser = <UserViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForImportantDecision)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.dDLList = <DDLModel>data.Data;
          }
        },
        (error) => {
          this._alertService.error(GlobalMessagesModel.InternalError);
        }
      );
  }

  numberOnly(value, isCommaOrDash: boolean = false): boolean {
    return this._commonService.numberOnly(value, isCommaOrDash);
  }

  handleFileInput(event: any) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.PDFFile = this.sanitizer.bypassSecurityTrustResourceUrl(
          event.target.result
        );
        this.model.PdfFIleName = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.fileValidationMsg = "";
    } else {
      this.fileValidationMsg = "only *pdf file accepted ";
    }
  }

  formGroupInit() {
    this.fromGroup = this.fb.group({
      Achievement: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(4000)]),
      ],
      AchievementHindi: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(4000)]),
      ],
      DepartmentCode: [undefined, Validators.required],
      AchievementCategoryCode: [undefined, Validators.required],
      AchievementSubCategoryCode: [undefined, null],
      CMOComments: [null, null],
      KeyWord: [
        null,
        Validators.compose([Validators.required, Validators.minLength(50)]),
      ],
      Description: [
        undefined,
        Validators.compose([Validators.maxLength(1000)]),
      ],
      DescriptionHindi: [undefined, Validators.maxLength(1000)],

      Priority: [null, null],
      Url: [null, null],
      IsVisible: [null, null],
      AchievementDate: [null, null],
      PdfFIleName: [undefined, null],
      ImageFiles: [undefined, null],
      CreatedBy: [null, null],
      ModifiedBy: [undefined, null],
      CreatedDate: [undefined, null],
      ModifiedDate: [undefined, null],
    });
  }

  // getFilterdDDL(event, key, filterFrom, defaultValue = undefined) {
  //   
  //   const item = new FilterDDlModel();
  //   item.FilterFor = key;
  //   item.Value =
  //     event.multiple == true
  //       ? JSON.stringify(event.value)
  //       : (event.value || "") == ""
  //       ? ""
  //       : event.value;
  //   item.FilterFrom = filterFrom;
  //   this.filterDDlModel = [];
  //   this.filterDDlModel.push(item);
  //   this._commonService.GetFilterdDDL(this.filterDDlModel).subscribe(
  //     (data) => {
  //       if (data.IsSuccess) {
  //         if (key == "ddlAchievementSubCategory") {
  //           this.model.AchievementSubCategoryCode = null;
  //           this.dDLList.ddlAchievementSubCategory =
  //             data.Data.ddlAchievementSubCategory;
  //           this.model.AchievementSubCategoryCode = defaultValue;
  //         }
  //       }
  //     },
  //     (error) => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

  Autokeyword() {
    
    const department = this.getDDLTextByCode(
      "ddlDepartment",
      this.model.DepartmentCode
    );
    const category = this.getDDLTextByCode(
      "ddlimpcategory",
      this.model.AchievementCategoryCode
    );
    const subcategory = this.getDDLTextByCode(
      "ddlimportantdecisionsubcategory",
      (this.model.AchievementSubCategoryCode! = null || undefined)
    );

    this.model.AutoKeyWord =
      department +
      " " +
      category +
      " " +
      subcategory +
      " " +
      this.model.AchievementHindi +
      " " +
      this.model.Url +
      " " +
      this.model.Url +
      " " +
      this.model.DescriptionHindi +
      " " +
      this.model.CMOComments +
      " " +
      this.model.KeyWord;
  }

  getDDLTextByCode(ddlKey, code) {
    
    switch (ddlKey.toLowerCase()) {
      case "ddldepartment": {
        return this.dDLList.ddlDepartment.find((x) => x.Value == code).Text;
      }
      case "ddlimpcategory": {
        return this.dDLList.ddlImpCategory.find((x) => x.Value == code).Text;
      }
      case "ddlimportantdecisionsubcategory": {
        if (this.model.AchievementSubCategoryCode) {
          return this.dDLList.ddlImportantDecisionSubCategory.find(
            (x) => x.Value == code
          ).Text;
        } else {
          return "";
        }
      }
    }
  }

  getFilterdDDL(DepartmentCode: number|string= 0, AchievementCategoryCode) {
    
    if (this.model.AchievementCategoryCode) {
      this._commonService
        .GetImpdecsubcategoryList(Number(DepartmentCode), AchievementCategoryCode)
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
              this.dDLList.ddlImportantDecisionSubCategory = data.Data;
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {
      this.dDLList.ddlAchievementSubCategory = [];
    }
  }

  checkUploadImages() {
    this.ImagefileValidationMsg = "";
    if (this.model.ImageFiles.length > 0) {
      this.model.ImageFiles = [];
      this._alertService.error(
        "Please upload images again according to selected category."
      );
    }
  }

  handleImageFileInput(files: FileList) {
    
    this.ImagefileValidationMsg = "";
    this.Imeges = [];
    let bigFileCount = 0;
    let invalidImageCount = 0;
    let valid_Height = 0,
      valid_Width = 0;
    // if (
    //   this.model.AchievementCategoryCode ==
    //   AchievementCategoryEnum.BannerImageCode
    // ) {
    //   valid_Height = parseInt(AchievementCategoryEnum.Banner_ImageHeight);
    //   valid_Width = parseInt(AchievementCategoryEnum.Banner_ImageWidth);
    // }
    // if (
    //   this.model.AchievementCategoryCode == AchievementCategoryEnum.AwardsCode
    // ) {
    //   valid_Height = parseInt(AchievementCategoryEnum.Awards_ImageHeight);
    //   valid_Width = parseInt(AchievementCategoryEnum.Awards_ImageWidth);
    // }

    for (let index = 0; index < files.length; index++) {
      if (files.item(index).type.match("image/*")) {
        if (files.item(index).size < 5000000) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            let img = new Image();
            let imgHeight = 0,
              imgWidth = 0;
            img.src = <string>reader.result;
            img.onload = () => {
              imgWidth = img.width;
              imgHeight = img.height;

              // Image dimension validation.
              if (imgHeight >= valid_Height && imgWidth >= valid_Width) {
                if (this.model.ImageFiles == undefined) {
                  this.model.ImageFiles = [];
                }
                this.model.ImageFiles.push(<string>reader.result);
                this.Imeges.push(<string>reader.result);
              } else {
                invalidImageCount += 1;
                this.ImagefileValidationMsg =
                  invalidImageCount +
                  " file must have " +
                  valid_Height +
                  "*" +
                  valid_Width +
                  " (H*W) for selected category.";
              }
            };
          };
          reader.readAsDataURL(files[index]);
        } else {
          bigFileCount += 1;
          this.ImagefileValidationMsg =
            bigFileCount + " File have more then 5MB Size";
        }
      } else {
        this.ImagefileValidationMsg = "only image/*";
        this.model.ImageFiles = [];
        return;
      }
    }
    if (bigFileCount > 0 || invalidImageCount > 0) {
      return;
    }
  }

  RemoveImageFile(i) {
    this.model.ImageFiles.splice(i, 1);
    this.Imeges.slice(i, 1);
  }
  // downloadMyFile(temp) {
  
  // const link = document.createElement("a");
  // link.setAttribute("href", temp);
  // link.setAttribute("download", `Documents` + ".pdf");
  // document.body.appendChild(link);
  // link.click();
  // link.remove();

  // }
  downloadPdf(url, name) {
    
    if (url) {
      const link = document.createElement("a");
      // link.setAttributes('')
      // link.setAttribute('target', '_blank');
      link.setAttribute("href", url);
      link.setAttribute("download", name + ".pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  //#endregion
}
