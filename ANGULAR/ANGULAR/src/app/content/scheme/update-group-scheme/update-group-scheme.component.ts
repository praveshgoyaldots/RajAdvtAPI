import { DateAdapter, MAT_DATE_FORMATS, MatStepper } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import {
  SchemeGroupModel,
  SchemResponseModel,
  EntryLookUpModel,
  ContentGroupModel,

} from "src/app/Shared/Model/scheme-model";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { SchemeService } from "src/app/Shared/Service/scheme.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { Validators, FormBuilder, FormGroup, } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { AppDateAdapter, APP_DATE_FORMATS } from "src/app/Shared/Model/format-datepicker";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import {
  UserViewModel,
  UserDepartmentViewModel
} from "src/app/Shared/Model/user-model";
import { UserService } from "src/app/Shared/Service/user.service";
import { HelpDocumentEnum } from "src/app/Shared/Enum/helpdocument-module.enum";


@Component({
  selector: 'app-update-group-scheme',
  templateUrl: './update-group-scheme.component.html',
  styleUrls: ['./update-group-scheme.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class UpdateGroupSchemeComponent implements OnInit {
  dDLList: DDLModel;
  helpDocumentEnum = HelpDocumentEnum;
  helpDocument: string;
  model: SchemeGroupModel;
  EntryLookUpModel: EntryLookUpModel;
  contentGroupModel: ContentGroupModel;
  fileValidationMsg: string;
  AdminItems: { [index: string]: string } = {};
  NodelItems: { [index: string]: string } = {};
  contentGroupItems: { [index: string]: string } = {};
  SchemeForm: FormGroup;
  iCustomValidation = false;
  minDate: Date = new Date();
  id: number;
  tomorrow = new Date();
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  temp: string;
  index = -1;
  selectedAll = -1;
  selectedAllHowToPay = -1;
  loginData: UserViewModel;
  ddlAdminDepartment: UserDepartmentViewModel[];

  phoneNumberString: string;
  isEditPhone: boolean;
  constructor(
    private _parentApi: AppComponent,
    private _route: ActivatedRoute,
    private readonly _schemeService: SchemeService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly formBuilder: FormBuilder,
    private _router: Router,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,

  ) {
    this._parentApi.setpagelayout("Update Group Scheme :", "keyboard_backspace", "Back To List", "scheme/assignscheme", false, false, true);
    
    this.model = new SchemeGroupModel();
    this.EntryLookUpModel = new EntryLookUpModel();

    this.contentGroupModel = new ContentGroupModel();
    this.minDate.setDate(this.minDate.getDate() + 1 - 1);
    //const ids = String(this._route.snapshot.params.id).split(",");
    // if (ids) {
    //   // 
    //   this.id = Number(ids[0]);
    // } else {
    //   this.id = this._route.snapshot.params.id;
    // }

    this.id = this._route.snapshot.params.id;

    // if (Number(ids[1])) {
    //   // 
    //   this._parentApi.setpagelayout(
    //     "Update Group Scheme :",
    //     "keyboard_backspace",
    //     "Back To List",
    //     "scheme/assignscheme",

    //   );
    // }



    this.model.Description = "";

    // this.RequiredDocumentModel.IsMandatory = String(42);
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetDDLList();
    this.getDepartment();
    this.formGroupInit();
    this.GetById();
    this.GetHelpDocument();
  }

  //#region  <First TAB>
  touchFirst(stepper: MatStepper) {

    if (this.model.EntryLookUp.length > 0) {
      this.RemoveFirstTabValidation();
     this.addSecondTabValidation();

    } else {
      this._alertService.error("Add at least one Contact Person Details ");
      this._commonService.ScrollingTop();
      stepper.previous();

      this.firstFormGroup.markAllAsTouched();
      this.removeSecondTabValidation();
    }
  }


  AddPhoneNumber(isEdit: boolean = false) {
    if (isEdit) {
      this.isEditPhone = isEdit;
      this.EntryLookUpModel.MobileNo = this.phoneNumberString;
    } else {
      if (this.EntryLookUpModel.MobileNo) {
        if (this.isEditPhone) {
          this.isEditPhone = isEdit;
          this.phoneNumberString = String(this.EntryLookUpModel.MobileNo);
        } else {
          this.phoneNumberString = String(
            this.phoneNumberString
              ? this.phoneNumberString + ", " + this.EntryLookUpModel.MobileNo
              : this.EntryLookUpModel.MobileNo
          );
        }
        this.EntryLookUpModel.MobileNo = "";
      }
    }
  }

  AddMoreEntry() {
    //  

    this.firstFormGroup.get("NodelDepartmentCode").markAsTouched();
    this.firstFormGroup.get("Designation").markAsTouched();
    this.addFirstTabValidation();
    if (
      this.firstFormGroup.get("NodelDepartmentCode").valid &&
      this.firstFormGroup.get("Designation").valid
    ) {
      if (this.index >= 0) {
        this.model.EntryLookUp[this.index] = this.EntryLookUpModel;
        if (this.phoneNumberString) {
          this.model.EntryLookUp[this.index].MobileNo = this.phoneNumberString;
        }
        this.index = -1;
      } else {
        if (this.phoneNumberString) {
          this.EntryLookUpModel.MobileNo = this.phoneNumberString;
        }

        this.model.EntryLookUp.push(this.EntryLookUpModel);
      }
      this.EntryLookUpModel = new EntryLookUpModel();
      this.phoneNumberString = "";
      this.RemoveFirstTabValidation();
    }
  }

  RemoveEntryClick(index) {
    this.model.EntryLookUp.splice(index, 1);
  }

  handleFileLogo(event: any, isLogo: boolean = false) {
    if (event.target.files.item(0).type.match("image/*")) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (isLogo) {
          this.model.Logo = event.target.result;
        } else {
          this.model.BannerImage = event.target.result;
        }
      };
      reader.readAsDataURL(event.target.files.item(0));
    } else {
      this.fileValidationMsg = "only *images file accepted ";
    }
  }

  myValidator(firstFormGroup: FormGroup) {
    let sum = 0;
    sum +=
      Number(firstFormGroup.get(["OwnedBySate"]).value) +
      Number(firstFormGroup.get(["OwnedByCenter"]).value);
    return sum === 100 || sum === 0 ? null : { notValid: true };
  }

  resetModel() {
    this.model.OwnedByCenter = null;
    this.model.OwnedBySate = null;
    this.myValidator(this.firstFormGroup);
  }




  editEntryClick(index, data) {
    if (data.NodelDepartmentCode) {
      this.EntryLookUpModel.NodelDepartmentCode = String(
        data.NodelDepartmentCode
      );
    }
    this.EntryLookUpModel.NodelOfficerName = data.NodelOfficerName;
    // this.EntryLookUpModel.MobileNo = data.MobileNo;
    this.phoneNumberString = data.MobileNo;
    this.EntryLookUpModel.EmailId = data.EmailId;
    this.EntryLookUpModel.Designation = data.Designation;
    this.index = index;
  }

  getSchemeDepartmentList(id) {
    if (id) {
      this._commonService.GetSchemeDepartment(id).subscribe(
        data => {
          if (data.IsSuccess) {
            this.dDLList.ddlDepartment = data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }


  addFirstTabValidation() {
    this.firstFormGroup;
    this.firstFormGroup.get("NodelDepartmentCode").setValidators([Validators.required]);
    this.firstFormGroup.get("NodelDepartmentCode").updateValueAndValidity();
    this.firstFormGroup.get("Designation").setValidators([Validators.required]);
    this.firstFormGroup.get("Designation").updateValueAndValidity();
  }

  RemoveFirstTabValidation() {
    this.firstFormGroup.get("NodelDepartmentCode").setValidators(null);
    this.firstFormGroup.get("NodelDepartmentCode").updateValueAndValidity();
    this.firstFormGroup.get("Designation").setValidators(null);
    this.firstFormGroup.get("Designation").updateValueAndValidity();
  }


  //#endregion

  //#region <Second TAB>

  AddMoreGroupItems() {

    this.secondFormGroup.markAllAsTouched();
    this.addSecondTabValidation();
    if (this.secondFormGroup.valid) {
      if (this.index >= 0) {
        this.model.ContentGroup[this.index] = this.contentGroupModel;
        this.index = -1;
      } else {
        this.model.ContentGroup.push(this.contentGroupModel);
      }
      this.contentGroupModel = new ContentGroupModel();
      this.removeSecondTabValidation();
    }
    else {
      this._alertService.error("Should filled All Fields");
      this._commonService.ScrollingTop();
    }
  }


  RemoveContentGroupItem(index) {
    this.model.ContentGroup.splice(index, 1);
  }


  editContentGroupItem(index, data) {
    if (data.Id) {
      this.contentGroupModel.Id = String(
        data.Id
      );
    }
    this.contentGroupModel.Heading1 = data.Heading1;
    this.contentGroupModel.Heading2 = data.Heading2;
    this.contentGroupModel.Description = data.Description;
    this.index = index;
    this._commonService.ScrollingTop();
  }


  addSecondTabValidation() {
    this.secondFormGroup;
    this.secondFormGroup.get("Heading1").setValidators([Validators.required]);
    this.secondFormGroup.get("Heading1").updateValueAndValidity();
    this.secondFormGroup.get("Heading2").setValidators(null);
    this.secondFormGroup.get("Heading2").updateValueAndValidity();
    this.secondFormGroup.get("grpDescription").setValidators([Validators.required]);
    this.secondFormGroup.get("grpDescription").updateValueAndValidity();
  }

  removeSecondTabValidation() {
    this.secondFormGroup.get("Heading1").setValidators(null);
    this.secondFormGroup.get("Heading1").updateValueAndValidity();
    this.secondFormGroup.get("Heading2").setValidators(null);
    this.secondFormGroup.get("Heading2").updateValueAndValidity();
    this.secondFormGroup.get("grpDescription").setValidators(null);
    this.secondFormGroup.get("grpDescription").updateValueAndValidity();

  }

  //#endregion

  //#region <Common>
  GetHelpDocument() {
    this._commonService.GetHelpDocument(this.helpDocumentEnum.Scheme).subscribe(
      data => {
        //  
        if (data.IsSuccess) {
          this.helpDocument = data.Data;
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  saveAsDrafts() {
    this.model.IsSaveAsDraft = true;
    const prevExpDate = this.model.ExpriedOnDate;
    if (this.model.ExpriedOnDate) {
      this.model.ExpriedOnDate = this.model.ExpriedOnDate.toLocaleString();
    }
    this._schemeService
      .PostSchemeGroupData(this.model, AppSetting.SchemeUpdateUrl)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
             //this._router.navigate(["scheme/assignscheme"]);
          } else {
            this.model.ExpriedOnDate = prevExpDate;
            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
          }
        },
        error => {
          console.log(error);
          this.model.ExpriedOnDate = prevExpDate;
          this._alertService.error(error.message);
        }
      );
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          let temp = <UserDepartmentViewModel[]>data.Data;
          this.ddlAdminDepartment = <UserDepartmentViewModel[]>(
            temp.filter(
              (UserDepartmentViewModel, i, arr) =>
                arr.findIndex(
                  t =>
                    t.AdmDepartmentCode ===
                    UserDepartmentViewModel.AdmDepartmentCode
                ) === i
            )
          );
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  downloadPdf(Url) {
    const linkSource = Url;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = "Help Document";
    downloadLink.click();
  }

  GetById() {
    
    this._schemeService.GetSchemeGroupById(this.id).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.model = <SchemeGroupModel>data.Data;
          const temp = <SchemResponseModel>data.Data;
          if (this.model.TypeCode != null) {
            this.model.TypeCode = String(this.model.TypeCode);
          }
          if (this.model.OwnedBy != null) {
            this.model.OwnedBy = String(this.model.OwnedBy);
          }
          if (this.model.SchemeType != null) {
            this.model.SchemeType = String(this.model.SchemeType);
          }

          if (this.model.AdminDepartmentCode) {
            this.model.AdminDepartmentCode = String(
              this.model.AdminDepartmentCode
            );
          }
          if (this.model.NodelDepartmentCode) {
            this.model.NodelDepartmentCode = String(
              this.model.NodelDepartmentCode
            );
          }

        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForScheme).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;

          this.dDLList.ddlAdminDepartment.forEach(obj => {
            this.AdminItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlDepartment.forEach(obj => {
            this.NodelItems[obj.Value] = obj.Text;
          });

        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    const prevExpDate = this.model.ExpriedOnDate;
    if (this.model.ExpriedOnDate) {
      this.model.ExpriedOnDate = this.model.ExpriedOnDate.toLocaleString();
    }
    this.secondFormGroup.markAllAsTouched();
    this.iCustomValidation = true;
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
          this.model.EntryLookUp.length > 0
    ) {
      this.model.IsSaveAsDraft = false;
      this._schemeService.PostSchemeGroupData(this.model, AppSetting.UpdateGroupSchemeUrl)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["scheme/assignscheme"]);
            } else {
              this.model.ExpriedOnDate = prevExpDate;
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          error => {
            console.log(error);
            this.model.ExpriedOnDate = prevExpDate;
            this._alertService.error(error.message);
          }
        );
    } else {
      this.model.ExpriedOnDate = prevExpDate;
    }
  }


  StringWithoutSpace(name): any {
    
    if (name.pristine) {
      return null;
    }
    const URL_REGEXP = /^[a-zA-Z0-9]*$/;
    name.markAsTouched();
    if (URL_REGEXP.test(name.value)) {
      return null;
    }
    return {
      invalidName: true
    };
  }

  formGroupInit() {
    this.firstFormGroup = this.formBuilder.group(
      {
        ShortNameEnglish: [null, [Validators.required, this.StringWithoutSpace]],
        NameHindi: [null],
        SearchKeyWordOfDetails: [null],
        ShortNameHindi: [null],
        NameEnglish: ["", Validators.required],
        AdminDepartmentCode: [null, Validators.required],
        NodelDepartmentCode: [null, Validators.required],
        ParentNodelDepartmentCode: [null, Validators.required],
        NodelOfficerName: [null],
        MobileNo: [null],
        MobileNoString: [null],
        EmailId: [
          null,
          Validators.compose([
            Validators.email,
            Validators.pattern(
              "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
            )
          ])
        ],
        Description: [null, Validators.required],
        Type: [null],
        OwnedBy: [null],
        OwnedBySate: [null],
        OwnedByCenter: [null],
        StartDate: [null],
        Logo: [null],
        Banner: [null],
        DepartmentWebsiteUrl: [null],
        Designation: [null, Validators.required]
      },
      { validator: this.myValidator }
    );
    this.secondFormGroup = this.formBuilder.group({
      Heading1: [null, [Validators.required, this.StringWithoutSpace]],
      Heading2: [null],
      grpDescription: [null, [Validators.required, this.StringWithoutSpace]],
      id: [null],
      // Scheme_URL: [null],
     // SearchKeyWordOfGroupContent: [null]
    });

  }

  numberonly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //#endregion

}
