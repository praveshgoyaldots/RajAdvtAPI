import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DdlItemModel, DDLModel } from "src/app/Shared/Model/commonddl.model";
import { PressReleaseModel, PressReleaseResponseModel } from "src/app/Shared/Model/TenderPressRelease/press-release-model";
import { UserDepartmentViewModel, UserDistrictViewModel, UserViewModel } from "src/app/Shared/Model/user-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { PressReleaseService } from "src/app/Shared/Service/TenderPressRelease/press-release.service";
import { UserService } from "src/app/Shared/Service/user.service";
import { AppDateAdapter, APP_DATE_FORMATS } from "src/app/Shared/Model/format-datepicker";
import { PressReleaseSubjectPasswordDialogComponent } from '../press-release-subject-password-dialog/press-release-subject-password-dialog.component';
import { JankalyanConfigurationService } from 'src/app/Shared/Service/jankalyan-configuration.service';
import { JankalyanConfigurationMasterModel } from 'src/app/Shared/Model/Master/jankalyan-configuration-model';

@Component({
  selector: "app-addupdate-press-release",
  templateUrl: "./addupdate-press-release.component.html",
  styleUrls: ["./addupdate-press-release.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})

export class AddupdatePressReleaseComponent implements OnInit {
  //#region angular editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "1000px !important",
    minHeight: "300px",
    maxHeight: "0",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" }
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ],
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]]
  };
  //#endregion
  //#region << Variable >>

  formGroup: FormGroup;
  model: PressReleaseModel;
  title: string;
  loginData: UserViewModel;
  maxDate:Date = new Date();
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  ddlEntryTypeMaster: DdlItemModel[];
  ddlJankalyanCategory: DdlItemModel[];
  ddlParticipant: DdlItemModel[];
  ddlDistrict: UserDistrictViewModel[];
  fileValidationMsgImage: string;
  fileValidationMsgPdf: string;
  fileSizeValidationMsg: string;
  selectedDistrictAll = -1;
  selectedDepartmentAll = -1;
  ImagefileValidationMsg: string;
  myDate = new Date();
  isSubjectLock: boolean = true;

  configModel: JankalyanConfigurationMasterModel;
  //#endregion

  constructor(
    private _parentApi: AppComponent,
    private readonly _PressReleaseService: PressReleaseService,
    private readonly _jankalyanConfigurationService: JankalyanConfigurationService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    private readonly _dialog: MatDialog,
  ) {

    this.model = new PressReleaseModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Press Release/Social Media :",
        "keyboard_backspace",
        "Back To List",
        "/tender-press-release/press-release"
      );
      this.title = "Update";
      // let uTCDate = new Date(
      //   Date.UTC(
      //     new Date(this.model.CreatedDate).getFullYear(),
      //     new Date(this.model.CreatedDate).getMonth(),
      //     new Date(this.model.CreatedDate).getDate()
      //   )
      // ).toISOString();
      // this.model.CreatedDate = uTCDate;

    } else {
      this._parentApi.setpagelayout(
        "Add Press Release/Social Media :",
        "keyboard_backspace",
        "Back To List",
        "/tender-press-release/press-release"
      );
      this.title = "Add";
    }
    this.model.CreatedDate = this.myDate;
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    this.GetTopRecordForConfiguration();
    this.FormGroupInit();
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
    this.getDistrict();
    //this.formGroup.controls['PressreleaseDate'].disable();
    if (this.model.Id) {
      //  this.formGroup.controls['PressreleaseDate'].disable();
      this.formGroup.controls['Description'].disable();
      this.formGroup.controls['GeneralDescription'].disable();
      this.formGroup.controls['DisplayOrder'].disable();
      this.formGroup.controls['PressReleaseLevelCode'].disable();
      this.formGroup.controls['URL'].disable();
      //this.formGroup.controls['PDFUrl'].disable();
      this.formGroup.controls['HomePageImageUrl'].disable();
      //this.formGroup.controls['ImageUrl'].disable();
      this.formGroup.controls['DIPR_Id'].disable();
    }
    else {
      // this.formGroup.controls['PressreleaseDate'].enable();
      this.formGroup.controls['Description'].enable();
      this.formGroup.controls['GeneralDescription'].enable();
      this.formGroup.controls['DisplayOrder'].enable();
      this.formGroup.controls['PressReleaseLevelCode'].enable();
      this.formGroup.controls['URL'].enable();
      this.formGroup.controls['PDFUrl'].enable();
      this.formGroup.controls['HomePageImageUrl'].enable();
      this.formGroup.controls['ImageUrl'].enable();
      this.formGroup.controls['DIPR_Id'].enable();
    }
  }

  GetTopRecordForConfiguration() {
    this._jankalyanConfigurationService.GetTopRecordForConfiguration().subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.configModel = <JankalyanConfigurationMasterModel>data.Data;
          if (this.configModel.IsDIPR_IdMandatory) {
            this.formGroup.get("DIPR_Id").setValidators(Validators.required);
          } else {
            this.formGroup.get("DIPR_Id").setValidators(null);
          }
          this.formGroup.get("DIPR_Id").updateValueAndValidity();
        }
      },
      error => {
        this.configModel = new JankalyanConfigurationMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.PressReleaseDDLKey).subscribe(
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

  getParticipantList(code) {
    if (code) {
      this._commonService.GetVIPPersonListOfPressRelease(code).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.ddlParticipant = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlParticipant = [];
    }
  }

  UnloackSubject() {
    if (this.isSubjectLock) {
      const _dialogRef = this._dialog.open(PressReleaseSubjectPasswordDialogComponent, {
        width: "500px",
        disableClose: true
      });
      _dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.isSubjectLock = false;
          this.formGroup.controls['Description'].enable();
        }
      });
    }
    else {
      this.isSubjectLock = true;
      this.formGroup.controls['Description'].disable();
    }
  }

  selectDistrictAll() {
    if (this.selectedDistrictAll < 0) {
      this.model.DistrictList = this.dDLList.ddlDepartmentForDistrictKPIList.map(
        function (a) {
          return a.Value;
        }
      );
      this.selectedDistrictAll = 1;
    } else {
      this.selectedDistrictAll = -1;
      this.model.DistrictList = [];
    }
  }

  selectDepartmenttAll() {
    if (this.selectedDepartmentAll < 0) {
      this.model.PressReleaseDepartmentMappingList = this.ddlDepartment.map(
        function (a) {
          return String(a.DepartmentCode);
        }
      );
      this.selectedDepartmentAll = 1;
    } else {
      this.selectedDepartmentAll = -1;
      this.model.PressReleaseDepartmentMappingList = [];
    }
  }

  getDistrict() {
    this._userService.GetUserDistrict(this.loginData.UserId).subscribe((data) => {
      if (data.IsSuccess) {
        this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
      }
    },
      (error) => {
        this._alertService.error(error.message);
      }
    );
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
    this._PressReleaseService.GetById(this.model.Id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.model = <PressReleaseModel>data.Data;
          const temp = <PressReleaseResponseModel>data.Data;
          // if (this.model.PressReleaseDepartmentMappingList) {
          //   this.GetCategoryList(this.model.PressReleaseDepartmentMappingList);
          // }
          if (this.model.CategoryCode) {
            this.model.CategoryCode = String(this.model.CategoryCode);
            this.GetJankalyanEntryTypebyDepartmentCode('', this.model.CategoryCode);
          }
          if (this.model.SubCategoryCode) {
            this.model.SubCategoryCode = String(this.model.SubCategoryCode);
          }
          if (this.model.LookupCategoryCode) {
            this.model.LookupCategoryCode = String(this.model.LookupCategoryCode);
          }

          if (this.model.PressReleaseLevelCode) {
            this.model.PressReleaseLevelCode = String(this.model.PressReleaseLevelCode);
          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.model.Id) {
        let uTCDate = new Date(
          Date.UTC(
            new Date(this.model.PressreleaseDate).getFullYear(),
            new Date(this.model.PressreleaseDate).getMonth(),
            new Date(this.model.PressreleaseDate).getDate()
          )
        ).toISOString();
        this.model.PressreleaseDate = uTCDate;
        this._PressReleaseService.Edit(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["/tender-press-release/press-release"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      } else {
        let uTCDate = new Date(
          Date.UTC(
            new Date(this.model.PressreleaseDate).getFullYear(),
            new Date(this.model.PressreleaseDate).getMonth(),
            new Date(this.model.PressreleaseDate).getDate()
          )
        ).toISOString();
        this.model.PressreleaseDate = uTCDate;
        this._PressReleaseService.Add(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["/tender-press-release/press-release"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      }
    }
  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      DepartmentCode: [null, Validators.required],
      CategoryCode: [null, Validators.required],
      SubCategoryCode: [null, Validators.required],
      DistrictCode: [null],
      GeneralDescription: [null, Validators.required],
      Description: [null],
      URL: [null],
      DisplayOrder: [null],
      PDFUrl: [null],
      ImageUrl: [null],
      HomePageImageUrl: [null],
      KeyWords: [null],
      VIPCategoryList: [null],
      VIPPersionList: [null], //Validators.required],
      IsSpecialPressRelease: [null],
      PressReleaseLevelCode: [null],
      PressreleaseDate: [null],
      IsOldRecord: [null],
      LookupCategoryCode: [null],
      NameOfVIPPerson: [null],
      AmountinLakh: [null],
      NoOfInaugration: [null],
      NoOfLokarpan: [null],
      NoOfNewInitatives: [null],
      DIPR_Id: [null],
      Latitude: [null],
      Longitude: [null]
    });
  }

  // GetCategoryList(departmentcode) {
  //   this.GetJankalyanCategorybyDepartmentCode(departmentcode);
  //   this.GetJankalyanEntryTypebyDepartmentCode(departmentcode);
  // }

  GetJankalyanCategorybyDepartmentCode(DepartmentCode: string) {
    if (DepartmentCode) {
      this._commonService
        .GetJankalyanpressReleaseCategorybyDepartmentAndLoginUser(
          DepartmentCode
        )
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
              this.ddlJankalyanCategory = data.Data as DdlItemModel[];
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {
      // this.model.WebsiteName = null;
    }
  }

  GetJankalyanEntryTypebyDepartmentCode(DepartmentCode: string, category) {
    if (DepartmentCode || category) {
      this._commonService
        .GetJankalyanEntryTypebyDepartmentCode(String(DepartmentCode), Number(category))
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
              this.ddlEntryTypeMaster = data.Data as DdlItemModel[];
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {
      // this.model.WebsiteName = null;
    }
  }

  handlepdfFileInput(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      if (
        files.item(index).type.match("application/pdf") ||
        files.item(index).type.match("application/msword") ||
        files
          .item(index)
          .type.match(
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          )
      ) {
        if (
          files.item(index).size <
          this._commonService.ConvertMbintoByte(
            Number(localStorage.getItem("FileValidation"))
          )
        ) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.model.PDFUrlList.push(<string>reader.result);
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.fileValidationMsgPdf = this.fileSizeValidationMsg;
        }
      } else {
        this.fileValidationMsgPdf = "only *pdf and word file accepted";
        this.model.PDFUrlList = [];
        return;
      }
    }
  }

  handleFileInput(event: any, ispdf: boolean = false, isHomePageImage = false) {
    if (ispdf) {
      if (
        event.target.files.item(0).type.match("application/pdf") ||
        event.target.files.item(0).type.match("application/msword")
      ) {
        if (
          event.target.files.item(0).size <
          this._commonService.ConvertMbintoByte(
            Number(localStorage.getItem("FileValidation"))
          )
        ) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.model.PDFUrl = event.target.result;
          };
          reader.readAsDataURL(event.target.files.item(0));
          this.fileValidationMsgPdf = "";
          this.model.PDFUrl = event.target.files.item(0);
        } else {
          this.fileValidationMsgPdf = this.fileSizeValidationMsg;
        }
      } else {
        this.fileValidationMsgPdf = "only *pdf and word file accepted ";
      }
    } else {
      if (isHomePageImage) {
        if (event.target.files.item(0).type.match("image/*")) {
          if (
            event.target.files.item(0).size <
            this._commonService.ConvertMbintoByte(
              Number(localStorage.getItem("FileValidation"))
            )
          ) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.model.HomePageImageUrl = event.target.result;
            };
            reader.readAsDataURL(event.target.files.item(0));
            this.fileValidationMsgImage = "";

            this.model.HomePageImageUrl = event.target.files.item(0);
          } else {
            this.fileValidationMsgImage = this.fileSizeValidationMsg;
          }
        } else {
          this.fileValidationMsgImage = "only *images file accepted ";
        }
      } else {
        if (event.target.files.item(0).type.match("image/*")) {
          if (
            event.target.files.item(0).size <
            this._commonService.ConvertMbintoByte(
              Number(localStorage.getItem("FileValidation"))
            )
          ) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.model.ImageUrl = event.target.result;
            };
            reader.readAsDataURL(event.target.files.item(0));
            this.fileValidationMsgImage = "";

            this.model.ImageUrl = event.target.files.item(0);
          } else {
            this.fileValidationMsgImage = this.fileSizeValidationMsg;
          }
        } else {
          this.fileValidationMsgImage = "only *images file accepted ";
        }
      }
    }
  }

  handleImageFileInput(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      if (files.item(index).type.match("image/*")) {
        if (files.item(index).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.model.ImageUrlList.push(<string>reader.result);
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.ImagefileValidationMsg = this.fileSizeValidationMsg;
        }
      } else {
        this.ImagefileValidationMsg = "only image/*";
        this.model.ImageUrlList = [];
        return;
      }
    }
  }

  downloadMyFile(index) {
    const link = document.createElement("a");
    link.setAttribute("href", this.model.PDFUrlList[index]);
    link.setAttribute("download", `Documents`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  RemoveImage(IsHome = false) {
    if (IsHome) {
      this.model.HomePageImageUrl = null;
    } else {
      this.model.ImageUrl = null;
    }
  }

  RemovePdf(i) {
    this.model.PDFUrlList.splice(i, 1);
  }

  AssignValueintoKeyword() {
    this.model.KeyWords = this.model.GeneralDescription;
  }

  getEnglishName(name) {
    return name.replace("Collectorate,", "");
  }

  RemoveImageFile(i) {
    this.model.ImageUrlList.splice(i, 1);
  }

  //#endregion  << Method >>
}
