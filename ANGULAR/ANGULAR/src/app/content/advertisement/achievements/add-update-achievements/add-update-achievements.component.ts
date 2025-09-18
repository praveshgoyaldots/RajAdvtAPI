import { isNullOrUndefined } from 'util';
import { Component, OnInit } from "@angular/core";
import {
  AchievementPostModel,
  AchievementConnectWithCMISParameterModel,
  AchievementConnectWithCMISParameterResultModel
} from "src/app/Shared/Model/achievement-model";
import { DdlItemModel, DDLModel, FilterDDlModel } from "src/app/Shared/Model/commonddl.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  UserViewModel,
  UserDepartmentViewModel
} from "src/app/Shared/Model/user-model";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AchievementService } from "src/app/Shared/Service/achievement.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DateAdapter, MAT_DATE_FORMATS, MatDialog } from "@angular/material";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "src/app/Shared/Model/format-datepicker";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AchievementCategoryEnum } from "../../../../Shared/Enum/adv-notification.enum";
import { UserService } from "src/app/Shared/Service/user.service";
import { AchievementCategoryModel } from "src/app/Shared/Model/Master/achievement-category-master-model";
import { ConnectWithCMISFilterModel } from "src/app/Shared/Model/general-model";
import { ConnectWithCmisDialogComponent } from "src/app/connect-with-cmis-dialog/connect-with-cmis-dialog.component";
import { ResponseDialogModel } from "src/app/Shared/Model/service.model";
import { EbookletEnum, EbookletEnumProd, EbookletFilterProdEnum } from 'src/app/Shared/Enum/ebooklet.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-add-update-achievements",
  templateUrl: "./add-update-achievements.component.html",
  styleUrls: ["./add-update-achievements.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AddUpdateAchievementsComponent implements OnInit {
  //#region <<Variable>>
  model: AchievementPostModel;
  achievementCategory: AchievementCategoryModel;
  dDLList: DDLModel;
  fromGroup: FormGroup;
  loginData: UserViewModel;
  RecordId: number = 0;
  fileValidationMsg: string = "";
  tomorrow = new Date();
  filterDDlModel: any[];
  ImagefileValidationMsg: string = "";
  Imeges: string[];
  PDFFile: SafeResourceUrl;
  ddlDepartment: UserDepartmentViewModel[];
  isCMOCommentVisible = false;
  categoryCode = environment.production ? EbookletFilterProdEnum.GeneralEntryEBookletCode : EbookletFilterProdEnum.GeneralEntryEBookletCodeLocal;
  connectWithCMISModel: AchievementConnectWithCMISParameterModel;
  responseReqModel: ConnectWithCMISFilterModel;
  moduleNameItems: { [index: string]: any } = {};
  yearItems: { [index: string]: any } = {};
  departmentItems: { [index: string]: any } = {};
  catCode: number | string;
  ddlAchievementCategory: DdlItemModel[];
  callBackUrl: string;
  //#endregion

  //#region <<constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _achievementService: AchievementService,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
    public sanitizer: DomSanitizer,
    private _dialog: MatDialog,
    // private _location: Location
  ) {
    this.model = new AchievementPostModel();
    this.RecordId = this._route.snapshot.params.id;
    this.connectWithCMISModel = new AchievementConnectWithCMISParameterModel();

    if (this._router.url.includes("update-achievements-comment")) {
      this.isCMOCommentVisible = true;
    }

    if (this._router.url.includes("add-e-booklet") || this._router.url.includes("update-e-booklet")) {
      if (isNullOrUndefined(this.model.AchievementCategoryCode)) {
        this.model.AchievementCategoryCode = String(this.categoryCode);
        //if (this.model.AchievementCategoryCode =='27') {
        this.catCode = this.model.AchievementCategoryCode;
        //}
      }
    }
    this.callBackUrl = this._route.snapshot.params.report;
    if (this.callBackUrl) {
      var datas = JSON.parse(sessionStorage.getItem("EntryInJankalyan"));
      this.appComponnet.setpagelayout(
        "Update General Entry :",
        "keyboard_backspace",
        "Back To Entry In Jankalyan Report",
        "/master/" + this.callBackUrl + '/' + datas.DepartmentName + '/' + datas.ModuleName + '/' + datas.DepartmentCode + '/' + datas.ModuleId + (datas.IsDashBoard ? "/dsb/" : '/report/') + datas.NumberOfEntry
      );
    } else {

      this.achievementCategory = new AchievementCategoryModel()
      if (this.RecordId > 0) {
        this.appComponnet.setpagelayout(
          this.model.AchievementCategoryCode ? " Update E-Booklet " : " Update General-Multiple Entry",
          "keyboard_backspace",
          "Back To List",
          "advertisement/achievements"
        );
      } else {

        this.appComponnet.setpagelayout(
          this.model.AchievementCategoryCode ? " Add E-Booklet " : " Add General-Multiple Entry",
          "keyboard_backspace",
          "Back To List",
          this.catCode == this.categoryCode ? '/advertisement/e-booklet/' + this.categoryCode : "advertisement/achievements"
        );
      }

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
    this.Getcategorybydepartmentcode(0);
  }

  getDetail() {
    this._achievementService.Detail(this.RecordId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = data.Data as AchievementPostModel;
          this.model.DepartmentCode = String(data.Data.DepartmentCode);

          if (this.model.DepartmentCode) {
            this.Getcategorybydepartmentcode(Number(this.model.DepartmentCode));
          }
          if (this.model.AchievementCategoryCode) {
            this.getDataByCategoryCode(
              Number(this.model.AchievementCategoryCode), true
            );
          }
          this.model.AchievementCategoryCode =
            data.Data.AchievementCategoryCode || undefined !== undefined
              ? String(data.Data.AchievementCategoryCode)
              : undefined;
          this.model.AchievementSubCategoryCode =
            data.Data.AchievementSubCategoryCode || undefined !== undefined
              ? String(data.Data.AchievementSubCategoryCode)
              : undefined;
          this.model.CMOComments =
            data.Data.CMOComments || undefined !== undefined
              ? data.Data.CMOComments
              : undefined;

          //bind Subcategory based on category
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
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    
    this.Autokeyword();
    this.fromGroup.markAllAsTouched();
    this.setCategoryDependentValidators();
    if (this.fromGroup.valid || (!this.fromGroup.get("ImageFiles").valid && this.model.ImageFiles != null && this.model.ImageFiles.length > 0)) {
      this.model.Achievement = this.model.AchievementHindi;
      this.model.Description = this.model.DescriptionHindi;

      if (this.RecordId > 0) {
        const prevDate = this.model.AchievementDate;
        if (this.model.AchievementDate) {
          this.model.AchievementDate = this.model.AchievementDate;
        }
        this.model.ModifiedBy = this.loginData.UserId;
        this._achievementService.Edit(this.RecordId, this.model).subscribe(
          data => {
            if (data) {
              if (data.IsSuccess) {
                this._alertService.success(
                  GlobalMessagesModel.updateSuccess,
                  true
                );
                if (this.categoryCode == this.model.AchievementCategoryCode) {
                  this._router.navigate(["advertisement/e-booklet/" + this.categoryCode]);
                } else {
                  this._router.navigate(["advertisement/achievements"]);
                }

              } else {
                this.model.AchievementDate = prevDate;
                this._commonService.ScrollingTop();
                this._alertService.error(GlobalMessagesModel.updateError);
              }
            }
          },
          error => {
            this.model.AchievementDate = prevDate;
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.InternalError);
          }
        );
      } else {
        const prevDate = this.model.AchievementDate;
        if (this.model.AchievementDate) {
          this.model.AchievementDate = this.model.AchievementDate;
        }
        this.model.CreatedBy = this.loginData.UserId;
        
        this._achievementService.Add(this.model).subscribe(
          data => {
            if (data) {
              if (data.IsSuccess) {
                this._alertService.success(
                  GlobalMessagesModel.saveSuccess,
                  true
                );
                // this._router.navigate(["advertisement/achievements"]);
                if (this.categoryCode == this.model.AchievementCategoryCode) {
                  this._router.navigate(["advertisement/e-booklet/" + this.categoryCode]);
                } else {
                  this._router.navigate(["advertisement/achievements"]);
                }
              } else {
                this.model.AchievementDate = prevDate;
                this._commonService.ScrollingTop();
                this._alertService.error(GlobalMessagesModel.saveError);
              }
            }
          },
          error => {
            this.model.AchievementDate = prevDate;
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.InternalError);
          }
        );
      }
    }
  }

  setCategoryDependentValidators() {
    if (
      this.achievementCategory.IsImageMandatory ||
      this.achievementCategory.IsPDFMandatory ||
      this.achievementCategory.IsURLMandatory
    ) {
      if (
        (this.fromGroup.get("ImageFiles").valid && this.achievementCategory.IsImageMandatory) ||
        (this.fromGroup.get("PdfFIleName").valid && this.achievementCategory.IsPDFMandatory) ||
        (this.fromGroup.get("Url").valid && this.achievementCategory.IsURLMandatory)
      ) {
        if (!this.fromGroup.get("ImageFiles").valid) {
          this.fromGroup.get("ImageFiles").setValidators(null);
        }
        if (!this.fromGroup.get("PdfFIleName").valid) {
          this.fromGroup.get("PdfFIleName").setValidators(null);
        }
        if (!this.fromGroup.get("Url").valid) {
          this.fromGroup.get("Url").setValidators(null);
        }
        this.fromGroup.get("Url").updateValueAndValidity();
        this.fromGroup.get("PdfFIleName").updateValueAndValidity();
        this.fromGroup.get("ImageFiles").updateValueAndValidity();
      }
    }
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

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForAchievement).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
          if (this.dDLList.ddlOrderModuleName) {
            this.dDLList.ddlOrderModuleName.forEach(obj => {
              this.moduleNameItems[obj.Value] = obj.Text;
            });
          }

          if (this.dDLList.ddlCMISBudgetYear) {
            this.dDLList.ddlCMISBudgetYear.forEach(obj => {
              this.yearItems[obj.Value] = obj.Text;
            });
          }

          this.dDLList.ddlDepartmentForCMISReport.forEach(obj => {
            this.departmentItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
  }

  numberOnly(value, isCommaOrDash: boolean = false): boolean {
    return this._commonService.numberOnly(value, isCommaOrDash);
  }

  handleFileInput(event: any) {
    
    let fileMime = event.target.files.item(0).type;

    if (fileMime.match("application/pdf")
      || fileMime.match("application/vnd.openxmlformats-officedocument.wordprocessingml.document") || fileMime.match("application/msword")
      || fileMime.match("application/vnd.openxmlformats-officedocument.presentationml.presentation") || fileMime.match("application/vnd.ms-powerpoint")) {

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.PDFFile = this.sanitizer.bypassSecurityTrustResourceUrl(
          event.target.result
        );
        this.model.PdfFIleName = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.fileValidationMsg = "";
    } else {
      this.fileValidationMsg = "File not supported...!";
    }
  }

  UrlValidator(url): any {
    if (url.pristine) {
      return null;
    }
    const URL_REGEXP = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/;
    url.markAsTouched();
    if (URL_REGEXP.test(url.value)) {
      return null;
    }
    return {
      invalidUrl: true
    };
  }

  formGroupInit() {
    this.fromGroup = this.fb.group({
      Achievement: [null, null],
      AchievementHindi: [null, Validators.compose([Validators.required, Validators.maxLength(4000)])],
      DepartmentCode: [undefined, Validators.required],
      CMOComments: [undefined, null],
      KeyWord: [null, null],
      AchievementCategoryCode: [undefined, Validators.required],
      AchievementSubCategoryCode: [undefined, null],
      Description: [undefined, null],
      DescriptionHindi: [undefined, Validators.compose([Validators.maxLength(4000)])],
      Priority: [undefined, Validators.compose([Validators.required, Validators.maxLength(3)])],
      Url: [undefined, Validators.compose([Validators.maxLength(1000), this.UrlValidator])],
      IsVisible: [null, null],
      AchievementDate: [null, null],
      PdfFIleName: [undefined, null],
      ImageFiles: [undefined, null],
      CreatedBy: [null, null],
      ModifiedBy: [undefined, null],
      CreatedDate: [undefined, null],
      ModifiedDate: [undefined, null],
      YearValueConnectWithCMIS: [null],
      DepartmentIdConnectWithCMIS: [null],
      ModuleIdConnectWithCMIS: [null],
      BenificiaryList: [null]
    });
  }

  Autokeyword() {
    let department = this.getDDLTextByCode(
      "ddlDepartment",
      this.model.DepartmentCode
    );
    let category = this.getDDLTextByCode(
      "ddlAchievementCategory",
      this.model.AchievementCategoryCode
    );
    let subcategory = "";
    if (this.model.AchievementSubCategoryCode) {
      subcategory = this.getDDLTextByCode(
        "ddlAchievementSubCategory",
        this.model.AchievementSubCategoryCode != null
          ? this.model.AchievementSubCategoryCode
          : 0
      );
    }

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
        const temp = this.dDLList.ddlDepartment.find(x => x.Value == code);
        if (temp) {
          return temp.Text;
        } else {
          return "";
        }
      }
      case "ddlachievementcategory": {
        const temp = this.dDLList.ddlAchievementCategory.find(
          x => x.Value == code
        );
        if (temp) {
          return temp.Text;
        } else {
          return "";
        }
      }
      case "ddlachievementsubcategory": {
        const temp = this.dDLList.ddlAchievementSubCategory.find(
          x => x.Value == code
        );
        if (temp) {
          return temp.Text;
        } else {
          return "";
        }
      }
    }
  }

  // getddlFilterd(event, key, filterFrom, defaultValue = undefined) {
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
  //   this._commonService.GetFilterdDDL(this.filterDDlModel,this._authService.GetCurrentUserDetail.user).subscribe(
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

  Getcategorybydepartmentcode(DepartmentCode: number = 0) {
    // if (DepartmentCode) {
    this._commonService.Getcategorybydepartmentcode(Number(DepartmentCode)).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlAchievementCategory = data.Data as DdlItemModel[];
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getFilterdDDL(DepartmentCode: number | string = 0, AchievementCategoryCode) {
    
    if (this.model.AchievementCategoryCode) {
      this._commonService
        .GetsubcategoryList(Number(DepartmentCode), AchievementCategoryCode)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              this.dDLList.ddlAchievementSubCategory = data.Data;
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
    } else {
      this.dDLList.ddlAchievementSubCategory = [];
    }
  }

  checkUploadImages() {
    this.ImagefileValidationMsg = "";
    if (this.model.ImageFiles && this.model.ImageFiles.length > 0) {
      this.model.ImageFiles = [];
      this._alertService.error(
        "Please upload images again according to selected category."
      );
    }
  }

  handleImageFileInput(files: FileList) {
    this.ImagefileValidationMsg = "";
    this.Imeges = [];
    var bigFileCount: number = 0;
    var invalidImageCount: number = 0;
    var valid_Height = 0,
      valid_Width = 0;
    if (
      this.model.AchievementCategoryCode ==
      AchievementCategoryEnum.BannerImageCode
    ) {
      valid_Height = parseInt(AchievementCategoryEnum.Banner_ImageHeight);
      valid_Width = parseInt(AchievementCategoryEnum.Banner_ImageWidth);
    }
    if (
      this.model.AchievementCategoryCode == AchievementCategoryEnum.AwardsCode
    ) {
      valid_Height = parseInt(AchievementCategoryEnum.Awards_ImageHeight);
      valid_Width = parseInt(AchievementCategoryEnum.Awards_ImageWidth);
    }

    for (let index = 0; index < files.length; index++) {
      if (files.item(index).type.match("image/*")) {
        if (files.item(index).size < 6000000) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            var img = new Image();
            var imgHeight = 0,
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
  downloadFile(url, name) {
    if (url) {
      
      let mimeType = (url.split(';')[0]).split(":")[1];
      let ext = "";
      switch (mimeType) {
        case 'application/msword':
          ext = ".doc";
          break;

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ext = ".docx";
          break;
        case 'application/vnd.ms-powerpoint':
          ext = ".ppt";
          break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          ext = ".pptx";
          break;
        case 'text/csv':
          ext = ".csv";
          break;
        default:
          ext = ".pdf";
          break;
      }

      const link = document.createElement("a");
      // link.setAttributes('')

      link.setAttribute("href", url);
      link.setAttribute("download", name + ext);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  getDataByCategoryCode(code, isPageload = false) {
    
    if (!isPageload) {
      this.checkUploadImages();
      this.getFilterdDDL(
        this.model.DepartmentCode,
        this.model.AchievementCategoryCode
      );
    }
    this._commonService.GetAchievementCategoryByCode(code).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.achievementCategory = <AchievementCategoryModel>data.Data;
          if (this.achievementCategory.IsImageMandatory) {
            this.fromGroup
              .get("ImageFiles")
              .setValidators([Validators.required]);
          } else {
            this.fromGroup.get("ImageFiles").setValidators(null);
          }
          if (this.achievementCategory.IsPDFMandatory) {
            this.fromGroup
              .get("PdfFIleName")
              .setValidators([Validators.required]);
          } else {
            this.fromGroup.get("PdfFIleName").setValidators(null);
          }
          if (this.achievementCategory.IsURLMandatory) {
            this.fromGroup
              .get("Url")
              .setValidators([
                Validators.compose([
                  Validators.required,
                  Validators.maxLength(1000),
                  this.UrlValidator
                ])
              ]);
          } else {
            this.fromGroup.get("Url").setValidators(null);
          }
          this.fromGroup.get("Url").updateValueAndValidity();
          this.fromGroup.get("PdfFIleName").updateValueAndValidity();
          this.fromGroup.get("ImageFiles").updateValueAndValidity();
        }
      },
      error => {
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
  }

  OpenFile(url) {
    if (url) {
      const link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.setAttribute("href", url);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
  //#endregion

  //#region <Connect With CMIS>

  AddMoreItems() {
    if (this.connectWithCMISModel.ModuleId) {
      this.connectWithCMISModel.ModuleName = this.moduleNameItems[
        this.connectWithCMISModel.ModuleId
      ];
    }
    if (this.connectWithCMISModel.YearValue) {
      this.connectWithCMISModel.YearText = this.yearItems[
        this.connectWithCMISModel.YearValue
      ];
    }
    if (this.connectWithCMISModel.DepartmentId) {
      this.connectWithCMISModel.DepartmentName = this.departmentItems[
        this.connectWithCMISModel.DepartmentId
      ];
    }
    this.model.ConnectWithCMIS.push(this.connectWithCMISModel);
    this.connectWithCMISModel = new AchievementConnectWithCMISParameterModel();
  }

  GetConnectWithCMISResult(
    ModuleName,
    DepartmentId,
    DepartmentName,
    YearText,
    index
  ) {
    this.responseReqModel = new ConnectWithCMISFilterModel();
    if (YearText) {
      this.responseReqModel.YearText = YearText;
    }
    if (DepartmentName) {
      this.responseReqModel.DepartmentName = DepartmentName;
    }
    if (DepartmentId) {
      this.responseReqModel.Department = DepartmentId;
    }
    if (ModuleName) {
      this.responseReqModel.ModuleName = ModuleName;
    }

    this.responseReqModel.Index = index;

    const _dialogRef = this._dialog.open(ConnectWithCmisDialogComponent, {
      width: "1000px",
      data: this.responseReqModel
    });
    _dialogRef.afterClosed().subscribe((result: ResponseDialogModel) => {
      if (result) {
        
        this.model.ConnectWithCMIS[result.index].ConnectWithCMISResult = <
          AchievementConnectWithCMISParameterResultModel
          >result.resultModel;
      }
    });
  }

  RemoveConnectWithCMISClick(index) {
    this.model.ConnectWithCMIS.splice(index, 1);
  }

  //#endregion <Connect With CMIS>
}
