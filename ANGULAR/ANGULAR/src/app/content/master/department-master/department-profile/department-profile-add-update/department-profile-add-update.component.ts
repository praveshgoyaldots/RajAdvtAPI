import { AngularEditorConfig } from "@kolkov/angular-editor";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { Component, OnInit } from "@angular/core";
import { DepartmentProfileModel, DepartmentProfileExistModel } from "src/app/Shared/Model/Master/department.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserViewModel, UserDepartmentViewModel } from "src/app/Shared/Model/user-model";
import { DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { DepartmentService } from "src/app/Shared/Service/department.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { UserTypeEnum } from "src/app/Shared/Enum/user-type.enum";

@Component({
  selector: "app-department-profile-add-update",
  templateUrl: "./department-profile-add-update.component.html",
  styleUrls: ["./department-profile-add-update.component.css"]
})

export class DepartmentProfileAddUpdateComponent implements OnInit {
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

  //#region <Variable>
  formGroup: FormGroup;
  title: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  fileSizeValidationMsg: string;
  imageFileValidationMsg: string;
  pDFFileValidationMsg: string;
  imageURL: SafeResourceUrl;
  isDublicateData: boolean;
  entryItems: { [index: string]: string } = {};
  ddlEntryTypeMaster: DdlItemModel[] = [];
  ddlJankalyanCategory: DdlItemModel[] = [];
  model: DepartmentProfileModel = new DepartmentProfileModel();
  checkDublicateModel: DepartmentProfileExistModel;
  //#endregion <Variable>

  //#region <constructor>

  constructor(
    private _parentApi: AppComponent,
    private readonly _departmentService: DepartmentService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    public sanitizer: DomSanitizer
  ) {
    this.model.Details = "";
    if (this._route.snapshot.params.id) {
      this.model.Id = this._route.snapshot.params.id;
      this.GetById();
      this._parentApi.setpagelayout("Update General-Single Entry :", "keyboard_backspace", "Back To List", "master/dptprofilelist");
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout("Add General-Single Entry :", "keyboard_backspace", "Back To List", "master/dptprofilelist");
      this.title = "Add";
    }
    this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
  }

  //#endregion <constructor>

  //#region <Methods>

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
  }

  GetById() {
    this._departmentService.GetDepartmentProfileById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <DepartmentProfileModel>data.Data;
          this.isDublicate();
          if (this.model.DepartmentCode) {
            this.model.DepartmentCode = String(this.model.DepartmentCode);
            this.GetJankalyanCategorybyDepartmentCode();
            //this.GetCategoryList(this.model.DepartmentCode, this.model.JankalyanCategoryCode);
          }
          if (this.model.JankalyanCategoryCode) {
            this.model.JankalyanCategoryCode = String(this.model.JankalyanCategoryCode);
            this.GetJankalyanEntryType();
          }
          if (this.model.EntryTypeCode) {
            this.model.EntryTypeCode = String(this.model.EntryTypeCode);
          }
          if (this.model.ImageURL) {
            this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.model.ImageURL
            );
          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid && !this.isDublicateData) {
      this._departmentService.DepartmentProfileAddUpdate(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["master/dptprofilelist"]);
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else if (this.isDublicateData) {
      this._alertService.error(
        GlobalMessagesModel.DptProfileExistPrefix +
        this.entryItems[this.model.EntryTypeCode] +
        GlobalMessagesModel.DptProfileExistSufix
      );
      this._commonService.ScrollingTop();
    }
  }

  handleFileInputImage(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(
            event.target.result
          );
          this.model.ImageURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files.item(0));
        this.imageFileValidationMsg = "";
      } else {
        this.imageFileValidationMsg = this.fileSizeValidationMsg;
      }
    } else {
      this.imageFileValidationMsg = "only *images file accepted ";
    }
  }

  handleFileInputPDF(event: any) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.PDFURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files.item(0));
        this.pDFFileValidationMsg = "";
      } else {
        this.pDFFileValidationMsg = this.fileSizeValidationMsg;
      }
    } else {
      this.pDFFileValidationMsg = "only *pdf file accepted ";
    }
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(data => {
      if (data.IsSuccess) {
        this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      DepartmentCode: [null, Validators.required],
      EntryTypeCode: [null, Validators.required],
      Details: [null, Validators.required],
      ImageURL: [null],
      PDFURL: [null],
      JankalyanCategoryCode: [null, Validators.required]
    });
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DepartmentProfileDDLKey).subscribe(
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

  getEntryType(code) {
    this._commonService.GetEntryTypeByCategory(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlEntryTypeMaster = <DdlItemModel[]>data.Data;

          this.ddlEntryTypeMaster.forEach(obj => {
            this.entryItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  removeImage() {
    this.model.ImageURL = null;
    this.imageURL = null;
  }

  removePdf() {
    this.model.PDFURL = null;
  }

  downloadPdf(Url) {
    if (Url) {
      const link = document.createElement("a");
      link.setAttribute("href", Url);
      link.setAttribute("download", name + ".pdf");
      document.body.appendChild(link);
      link.click();
      // link.remove();
    }
  }

  isDublicate() {
    if (!this._route.snapshot.params.id) {
      this.model.Details = "";
      this.model.PDFURL = null;
      this.model.ImageURL = null;
      this.model.Id = 0;
      this.imageURL = null;
    }
    if (this.model.DepartmentCode && this.model.EntryTypeCode) {
      this.checkDublicateModel = this.model as DepartmentProfileExistModel;
      this._alertService.blank();
      this._departmentService
        .IsDepartmentProfileExist(this.checkDublicateModel)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              if (data.Data) {
                this.model = <DepartmentProfileModel>data.Data;
                this._alertService.error(
                  GlobalMessagesModel.DptProfileExistPrefix +
                  this.entryItems[this.model.EntryTypeCode] +
                  GlobalMessagesModel.DptProfileExistSufix
                );
                this._commonService.ScrollingTop();
                if (this.model.DepartmentCode) {
                  this.model.DepartmentCode = String(this.model.DepartmentCode);
                }
                if (this.model.EntryTypeCode) {
                  this.model.EntryTypeCode = String(this.model.EntryTypeCode);
                }
                if (this.model.ImageURL) {
                  this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(
                    this.model.ImageURL
                  );
                }
              } else {
                this._alertService.error(
                  GlobalMessagesModel.DptProfileExistPrefix +
                  this.entryItems[this.model.EntryTypeCode] +
                  GlobalMessagesModel.DptProfileExistSufix
                );
                this._commonService.ScrollingTop();
              }
            }
          },
          error => {
            this._alertService.error(error.message);
            this._commonService.ScrollingTop();
          }
        );
    }
  }

  //#region  New Code
  GetJankalyanCategorybyDepartmentCode() {
    if (this.model.DepartmentCode) {
      let deptCode = (this.loginData.UserType == UserTypeEnum.ADM || this.loginData.UserType == UserTypeEnum.SADM) ? 0 : Number(this.model.DepartmentCode);
      this._commonService.GetJankalyanCategorybyDepartmentCode(deptCode).subscribe(data => {
        if (data.IsSuccess) {
          this.ddlJankalyanCategory = data.Data as DdlItemModel[];
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
    else {
      this.ddlJankalyanCategory = [];
      this.ddlEntryTypeMaster = [];
    }
  }

  GetJankalyanEntryType() {
    if (this.model.JankalyanCategoryCode) {
      this._commonService.GetEntryTypeByCategory(Number(this.model.JankalyanCategoryCode)).subscribe(data => {
        if (data.IsSuccess) {
          this.ddlEntryTypeMaster = data.Data as DdlItemModel[];
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
    else {
      this.ddlEntryTypeMaster = [];
    }
  }
  //#endregion



  //#region  Old Code 

  // GetCategoryList(departmentcode, JankalyanCategoryCode) {
  //   this.GetJankalyanCategorybyDepartmentCode(departmentcode);
  //   this.GetJankalyanEntryTypebyDepartmentCode(departmentcode, Number(JankalyanCategoryCode));
  // }

  // GetJankalyanCategorybyDepartmentCode(DepartmentCode: number) {
  //   if (DepartmentCode) {
  //     this._commonService.GetJankalyanCategorybyDepartmentAndLoginUser(Number(DepartmentCode)).subscribe(data => {
  //       if (data.IsSuccess) {
  //         this.ddlJankalyanCategory = data.Data as DdlItemModel[];
  //       }
  //     }, error => {
  //       this._alertService.error(error.message);
  //     });
  //   }
  // }

  // GetJankalyanEntryTypebyDepartmentCode(DepartmentCode: number, JankalyanCategoryCode: number) {
  //   if (DepartmentCode) {
  //     this._commonService.GetJankalyanEntryTypebyDepartmentCode(String(DepartmentCode), JankalyanCategoryCode).subscribe(data => {
  //       if (data.IsSuccess) {
  //         this.ddlEntryTypeMaster = data.Data as DdlItemModel[];
  //       }
  //     }, error => {
  //       this._alertService.error(error.message);
  //     });
  //   }
  // }

  //#endregion

  //#endregion <Methods>
}
