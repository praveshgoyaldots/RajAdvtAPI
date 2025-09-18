import { AngularEditorConfig } from '@kolkov/angular-editor';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatStepper,
  MatDialog,
} from "@angular/material";
import { Component, OnInit } from "@angular/core";
import {
  SchemeModel,
  filecollection,
  SchemResponseModel,
  EntryLookUpModel,
  EligibilityCriteriaModel,
  RequiredDocumentModel,
  OtherDocumentModel,
  GetBeneficiaryLookupModel,
  MobileAppLookupModel,
  ContentGroupModel,
  ContactResponseModel,
  SchemeConnectWithCMISParameterModel,
  SchemeConnectWithCMISParameterResultModel,
} from "src/app/Shared/Model/scheme-model";
import {
  DDLModel,
  DocumentUrlModel,
  DdlItemModel,
} from "src/app/Shared/Model/commonddl.model";
import { SchemeService } from "src/app/Shared/Service/scheme.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute, Scroll } from "@angular/router";
import { AppSetting } from "src/app/Shared/Model/appsetting";

import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from "@angular/forms";
import { empty } from "rxjs";
import { AppComponent } from "src/app/app.component";
import { stringify, parse } from "querystring";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/Shared/Model/format-datepicker";
import { isNullOrUndefined } from "util";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import {
  UserViewModel,
  UserDepartmentViewModel,
} from "src/app/Shared/Model/user-model";
import { UserService } from "src/app/Shared/Service/user.service";
import { HelpDocumentEnum } from "src/app/Shared/Enum/helpdocument-module.enum";
import {
  ContactPersionTypeEnum,
  SchemeTypeEnum,
} from "src/app/Shared/Enum/scheme.enum";
import { Location } from "@angular/common";
import { ContactPersonDialogComponent } from "../contact-person-dialog/contact-person-dialog.component";
import { HereMapAdressSearchComponent } from "src/app/content/scheme/here-map-adress-search/here-map-adress-search.component";
import { HereMapAdressViewModel } from "src/app/Shared/Model/here-map-adress-view.model";
import { HereMapService } from "src/app/Shared/Service/here-map.service";
import { CommonDocModel, ConnectWithCMISFilterModel } from "src/app/Shared/Model/general-model";
import { ProjectBudgetDialogComponent } from '../../master/project-master/project-budget-dialog/project-budget-dialog.component';
import { ResponseDialogModel } from 'src/app/Shared/Model/service.model';
import { ConnectWithCmisDialogComponent } from 'src/app/connect-with-cmis-dialog/connect-with-cmis-dialog.component';
@Component({
  selector: "app-update-scheme",
  templateUrl: "./update-scheme.component.html",
  styleUrls: ["./update-scheme.component.css"],
  providers: [
    HereMapService,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class UpdateSchemeComponent implements OnInit {

//#region angular editor
editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: '1000px !important',
    minHeight: '300px',
    maxHeight: '0',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
};
//#endregion

  dDLList: DDLModel;
  helpDocumentEnum = HelpDocumentEnum;
  // helpDocument: string;
  helpDocument: CommonDocModel;
  model: SchemeModel;
  EntryLookUpModel: EntryLookUpModel;
  getBeneficiaryLookupModel: GetBeneficiaryLookupModel;
  EligibilityCriteriaModel: EligibilityCriteriaModel;
  RequiredDocumentModel: RequiredDocumentModel;
  OtherDocumentModel: OtherDocumentModel;
  mobileAppLookupModel: MobileAppLookupModel;
  ddlBlockByDistrict: DdlItemModel[] = [];
  ddlTahsilByBlock: DdlItemModel[] = [];
  fileValidationMsg: string;
  AdminItems: { [index: string]: string } = {};
  NodelItems: { [index: string]: string } = {};
  EligibilityItems: { [index: string]: string } = {};
  RequiredDocItems: { [index: string]: string } = {};
  OtherDocItems: { [index: string]: string } = {};
  RequiredDoctypeItems: { [index: string]: string } = {};
  RequiredDocmandatoryItems: { [index: string]: string } = {};
  ContactPersonTypeItems: { [index: string]: string } = {};
  BlockItems: { [index: string]: string } = {};
  TahsilItems: { [index: string]: string } = {};
  DistrictItems: { [index: string]: string } = {};
  SchemeForm: FormGroup;
  iCustomValidation = false;
  minDate: Date = new Date();
  id: number;
  tomorrow = new Date();

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  fifthformGroup: FormGroup;
  SixthformGroup: FormGroup;
  sevenFormGroup: FormGroup;
  isEditable = false;
  temp: string;
  index = -1;
  schemeTypeEnum = SchemeTypeEnum;
  selectedAll = -1;
  selectedAllHowToPay = -1;
  loginData: UserViewModel;
  ddlAdminDepartment: UserDepartmentViewModel[];
  contentGroupModel: ContentGroupModel;
  phoneNumberString: string;
  isEditPhone: boolean;
  contactTypeEnum = ContactPersionTypeEnum;
  ContactResponseModel: ContactResponseModel;
  fileSizeValidationMsg: string;
  filelogoSizeValidationMsg: string;
  fileValidationMsgLogo: string;
  fileValidationMsgBanner: string;
  fileValidationMsgServicefee: string;
  fileValidationMsgHowtoPay: string;
  fileValidationMsgDocs: string;
  fileValidationMsgIcon: string;

  connectWithCMISModel: SchemeConnectWithCMISParameterModel;
  responseReqModel: ConnectWithCMISFilterModel;
  moduleNameItems: { [index: string]: any } = {};
  yearItems: { [index: string]: any } = {};
  departmentItems: { [index: string]: any } = {};
  callBackUrl:string;

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
    private readonly _location: Location,
    private readonly _hereMapService: HereMapService,
    private _dialog: MatDialog
  ) {

    this.callBackUrl=this._route.snapshot.params.report;
    if (this.callBackUrl) {
    var datas=JSON.parse(sessionStorage.getItem("EntryInJankalyan")) ;
      this._parentApi.setpagelayout(
        "Update Scheme :",
        "keyboard_backspace",
        "Back To Entry In Jankalyan Report",
        "/master/"+ this.callBackUrl + '/' + datas.DepartmentName +'/'+ datas.ModuleName + '/'+ datas.DepartmentCode + '/' + datas.ModuleId  + (datas.IsDashBoard? "/dsb/":'/report/') + datas.NumberOfEntry
      );
    } else {
    this._parentApi.setpagelayout(
      "Update Scheme :",
      "keyboard_backspace",
      "Back To List",
      "scheme",
      false,
      false,
      true
    );
    }

    this.model = new SchemeModel();
    this.connectWithCMISModel=new SchemeConnectWithCMISParameterModel();
    this.EntryLookUpModel = new EntryLookUpModel();
    this.EligibilityCriteriaModel = new EligibilityCriteriaModel();
    this.RequiredDocumentModel = new RequiredDocumentModel();
    this.OtherDocumentModel = new OtherDocumentModel();
    this.mobileAppLookupModel = new MobileAppLookupModel();
    this.minDate.setDate(this.minDate.getDate() + 1 - 1);
    this.getBeneficiaryLookupModel = new GetBeneficiaryLookupModel();
    this.contentGroupModel = new ContentGroupModel();
    this.model.PageType = String(this.schemeTypeEnum.Individual);

    if (this._route.snapshot.params.id) {
      this.id = this._route.snapshot.params.id;
    }

    this.model.Description = "";
    this.model.EligiblityText = "";
    this.model.Benificiarytext = "";
    this.model.HowToApplyText = "";
    this.model.WhatWillBeneficiaryGet = "";

    this.RequiredDocumentModel.IsMandatory = String(42);
    this.fileSizeValidationMsg =
      "Attachment must be less than " +
      localStorage.getItem("FileValidation") +
      " MB" + "and banner size in 1920 * 490";
      this.filelogoSizeValidationMsg =
      "Logo must be less than in 220px * 220 px";
  }

  goBack() {
    this._location.back();
  }

  Scrolltop() {
    const element = document.querySelector("#destination");
    element.scrollIntoView();
  }

  GetContactData() {
    this.ContactResponseModel = new ContactResponseModel();
    this.ContactResponseModel.NodelDepartmentCode = this.model.NodelDepartmentCode;
    this.ContactResponseModel.schemeId = this.model.Id;

    const _dialogRef = this._dialog.open(ContactPersonDialogComponent, {
      width: "1000px",
      data: this.ContactResponseModel,
    });
    _dialogRef.afterClosed().subscribe((result: EntryLookUpModel[] = []) => {
      if (result) {
        this.model.EntryLookUp = this.model.EntryLookUp.concat(result);
      }
    });
  }

  GetLatLongByAddress() {
    const _dialogRef = this._dialog.open(HereMapAdressSearchComponent, {
      width: "1000px",
      data: this.EntryLookUpModel.Address,
    });
    _dialogRef.afterClosed().subscribe((result: HereMapAdressViewModel) => {
      if (result) {
        this.EntryLookUpModel.Lat = result.Latitude;
        this.EntryLookUpModel.Long = result.Longitude;
        this.EntryLookUpModel.Address = result.Address;
      }
    });
  }

  ngOnInit() {
    this.GetById();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetDDLList();
    this.getDepartment();
    this.formGroupInit();
    this.GetHelpDocument();
    this.getTahsilByDistrict(0);
    this.getBlockByDistrict(0);
    this.AddAndRemoveValidationGroup(event);
  }

  // GetHelpDocument() {
  //   this._commonService.GetHelpDocument(this.helpDocumentEnum.Scheme).subscribe(
  //     data => {
  //       if (data.IsSuccess) {
  //         this.helpDocument = data.Data;
  //       } else {
  //         this._alertService.error(data.Message);
  //       }
  //     },
  //     error => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

  GetHelpDocument() {
    this._commonService.GetHelpDocument(this.helpDocumentEnum.Scheme).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.helpDocument = <CommonDocModel>data.Data;
        } else {
          this._alertService.error(data.Message);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  saveAsDrafts() {
    
    this.firstFormGroup.get("ParentNodelDepartmentCode").markAsTouched();
    this.firstFormGroup.get("ShortNameEnglish").markAsTouched();
    if (
      this.firstFormGroup.get("ParentNodelDepartmentCode").valid &&
      this.firstFormGroup.get("ShortNameEnglish").valid
    ) {
      this.model.IsSaveAsDraft = true;
      const prevExpDate = this.model.ExpriedOnDate;
      if (this.model.ExpriedOnDate) {
        this.model.ExpriedOnDate = this.model.ExpriedOnDate.toLocaleString();
      }
      this._schemeService
        .PostData(this.model, AppSetting.SchemeUpdateUrl)
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              // this._router.navigate(["scheme"]);
            } else {
              this.model.ExpriedOnDate = prevExpDate;
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            console.log(error);
            this.model.ExpriedOnDate = prevExpDate;
            this._alertService.error(error.message);
          }
        );
    }
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          let temp = <UserDepartmentViewModel[]>data.Data;
          this.ddlAdminDepartment = <UserDepartmentViewModel[]>(
            temp.filter(
              (UserDepartmentViewModel, i, arr) =>
                arr.findIndex(
                  (t) =>
                    t.AdmDepartmentCode ===
                    UserDepartmentViewModel.AdmDepartmentCode
                ) === i
            )
          );
          if (this.ddlAdminDepartment) {
            this.ddlAdminDepartment = this.ddlAdminDepartment.sort((a, b) => {
              return this._commonService.compare(
                a.AdmDepartmentTitle,
                b.AdmDepartmentTitle,
                true
              );
            });
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  // downloadPdf(Url) {
  //   const linkSource = Url;
  //   const downloadLink = document.createElement("a");

  //   downloadLink.href = linkSource;
  //   downloadLink.download = "Help Document";
  //   downloadLink.click();
  // }

  downloadPdf(Url, isHelpDoc: Boolean = false) {
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    if (isHelpDoc) {
      downloadLink.href = linkSource;
      downloadLink.download = "Help Document";
      downloadLink.click();
    } else {
      downloadLink.href = linkSource;
      downloadLink.download = "Blank Document";
      downloadLink.click();
    }
  }

  GetById() {
    this._schemeService.GetById(this.id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.model = <SchemeModel>data.Data;
          const temp = <SchemResponseModel>data.Data;
          if (this.model.SchemeOrServiceCode) {
            this.model.SchemeOrServiceCode = String(
              this.model.SchemeOrServiceCode
            );
          } else {
            this.model.SchemeOrServiceCode = this.schemeTypeEnum.Scheme;
          }
          if (this.model.TypeCode != null) {
            this.model.TypeCode = String(this.model.TypeCode);
          }
          if (this.model.OwnedBy != null) {
            this.model.OwnedBy = String(this.model.OwnedBy);
            this.addCenterStateValidation(this.model.OwnedBy);
          }
          if (this.model.SchemeType != null) {
            this.model.SchemeType = String(this.model.SchemeType);
          }
          if (this.model.IsListedRGDPSAct != null) {
            this.model.IsListedRGDPSAct = String(this.model.IsListedRGDPSAct);
          }
          if (temp.ProgramAreaIds != null) {
            this.model.programAreas = temp.ProgramAreaIds.split(",");
          }
          if (temp.TypeIds) {
            this.model.Type = temp.TypeIds.split(",");
          }
          if (temp.DistrictIds) {
            this.model.District = temp.DistrictIds.split(",");
          }
          if (this.model.ApplyForScheme != null) {
            this.model.ApplyForScheme = String(this.model.ApplyForScheme);
          }
          if (this.model.ExpiredOn != null) {
            this.model.ExpiredOn = String(this.model.ExpiredOn);
          }
          if (temp.CasteCategoryIds != null) {
            this.model.CasteCategory = temp.CasteCategoryIds.split(",");
          }
          if (temp.BeneficiaryCategoryIds != null) {
            this.model.BeneficiaryCategory = temp.BeneficiaryCategoryIds.split(
              ","
            );
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
          if (this.model.MadeOfAppling != null) {
            this.model.MadeOfAppling = String(this.model.MadeOfAppling);
          }
          if (temp.ModeofApplicationIds) {
            
            this.model.ModeofApplicationList = temp.ModeofApplicationIds.split(
              ","
            );
            this.setValidationOnWebsiteUrl(this.model.ModeofApplicationList);
          }
          if (this.model.IsServiceFees != null) {
            this.model.IsServiceFees = String(this.model.IsServiceFees);
            this.IsServiceApplyRemoveValidation(this.model.IsServiceFees);
          }
          if (this.model.HowtoPayIds) {
            this.model.HowToPay = temp.HowtoPayIds.split(",");
          }
          if (this.model.DelivarebleCode != null) {
            this.model.DelivarebleCode = String(this.model.DelivarebleCode);
          }
          if (this.model.DesignatedOfficerReceivingDetailCode != null) {
            this.model.DesignatedOfficerReceivingDetailCode = String(
              this.model.DesignatedOfficerReceivingDetailCode
            );
          }
          if (this.model.FirstAppeallateCode != null) {
            this.model.FirstAppeallateCode = String(
              this.model.FirstAppeallateCode
            );
          }
          if (this.model.SecondAppeallateCode != null) {
            this.model.SecondAppeallateCode = String(
              this.model.SecondAppeallateCode
            );
          }
          if (this.model.ModeOfDisburstmentIds) {
            this.model.ModeOfDisbursmentList = temp.ModeOfDisburstmentIds.split(
              ","
            );
          }
          if (this.model.PaymentDisbursmentFrequency != null) {
            this.model.PaymentDisbursmentFrequency = String(
              this.model.PaymentDisbursmentFrequency
            );
            this.addPaymentDisbFrequencyValidation(this.model.PaymentDisbursmentFrequency);
          }
          if (this.model.PageType) {
            this.model.PageType = String(this.model.PageType);
            this.AddAndRemoveValidationGroup(this.model.PageType);
          }
          if (this.model.PaymentDisbursmentFrequencyTillAPeriod != null) {
            this.model.PaymentDisbursmentFrequencyTillAPeriod = String(
              this.model.PaymentDisbursmentFrequencyTillAPeriod
            );

          }
          if (this.model.PaymentDisbursmentFrequencyInstallments != null) {
            this.model.PaymentDisbursmentFrequencyInstallments = String(
              this.model.PaymentDisbursmentFrequencyInstallments
            );
          }
          if (
            JSON.stringify(this.dDLList.ddlSchemePayFees.map((x) => x.Value)) ==
            JSON.stringify(this.model.HowToPay)
          ) {
            this.selectedAllHowToPay = 1;
          }

          if (
            JSON.stringify(this.dDLList.ddlDistrict.map((x) => x.Value)) ==
            JSON.stringify(this.model.District)
          ) {
            this.selectedAll = 1;
          }
          if (String(this.schemeTypeEnum.Individual) === this.model.PageType) {
            this.addDeliveryServiceValidation();
          }
          
          if (!this.model.IsListedRGDPSAct) {
            this.model.IsListedRGDPSAct = "30";
          }
          this.addDeliveryTimeInDaysValidation(this.model.IsListedRGDPSAct);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  AddMoreOtherDocument() {
    
    this.SixthformGroup.get("Remarksother").markAsTouched();

    this.SixthformGroup.get("Remarksother").setValidators([Validators.required]);
    this.SixthformGroup.get("Remarksother").updateValueAndValidity();





    if (this.OtherDocumentModel.ListOfOtherDocumentCode.length > 0) {
      if (this.index >= 0) {
        if (
          !this.model.OtherDocument[this.index].URL &&
          this.OtherDocumentModel.URL
        ) {
          this.OtherDocumentModel.ImageCode =
            "IMG" + (Math.floor(Math.random() * 900000) + 100000);
        }
        // add other doc date start

        if (this.OtherDocumentModel.DocDate) {
          this.OtherDocumentModel.DocDate = this.OtherDocumentModel.DocDate.toLocaleString();
        }
        // if (this.OtherDocumentModel.DocDate) {
        //   this.OtherDocumentModel.DocDate = this.OtherDocumentModel.DocDate;
        // }
        //end
        this.model.OtherDocument[this.index] = this.OtherDocumentModel;
        this.index = -1;
      } else {
        if (this.OtherDocumentModel.URL) {
          this.OtherDocumentModel.ImageCode =
            "IMG" + (Math.floor(Math.random() * 900000) + 100000);
        }
        // add other doc date start
        // if (this.OtherDocumentModel.DocDate) {
        //   this.OtherDocumentModel.DocDate = this.OtherDocumentModel.DocDate.toLocaleString();
        // }
        if (this.OtherDocumentModel.DocDate) {
          this.OtherDocumentModel.DocDate = this.OtherDocumentModel.DocDate.toLocaleString();
        }
        //end
        this.model.OtherDocument.push(this.OtherDocumentModel);
      }
      this.OtherDocumentModel = new OtherDocumentModel();
      this.SixthformGroup.get("Remarksother").setValidators(null);
      this.SixthformGroup.get("Remarksother").updateValueAndValidity();
    } else {
      this._alertService.error("Should filled All Fields");
      this._commonService.ScrollingTop();
    }
  }

  RemoveOtherDocument(index) {
    this.model.OtherDocument.splice(index, 1);
  }

  AddMoreEligibility() {
    if (
      this.EligibilityCriteriaModel.EligibilityDropDownCode.length > 0 &&
      this.EligibilityCriteriaModel.Remarks.length > 0
    ) {
      const data = this.model.EligibilityCriteria.findIndex(
        (item) =>
          item.EligibilityDropDownCode ===
          this.EligibilityCriteriaModel.EligibilityDropDownCode
      );
      if (data === -1) {
        if (this.index >= 0) {
          this.model.EligibilityCriteria[
            this.index
          ] = this.EligibilityCriteriaModel;
          this.index = -1;
        } else {
          this.model.EligibilityCriteria.push(this.EligibilityCriteriaModel);
        }
        this.EligibilityCriteriaModel = new EligibilityCriteriaModel();
      } else if (this.index >= 0 && this.index === data) {
        this.model.EligibilityCriteria[
          this.index
        ] = this.EligibilityCriteriaModel;
        this.index = -1;
        this.EligibilityCriteriaModel = new EligibilityCriteriaModel();
      } else {
        this._alertService.error("Can Not Insert Same Value");
        this._commonService.ScrollingTop();
      }
    } else {
      this._alertService.error(
        "Should filled Both Value Eligibility and Remarks"
      );
      this._commonService.ScrollingTop();
    }
  }

  AddMoreMobilePlatform() {
    const data = this.model.MobileAppLookupList.findIndex(
      (item) =>
        item.PlatformName === this.mobileAppLookupModel.PlatformName &&
        item.AppUrl === this.mobileAppLookupModel.AppUrl
    );
    if (data === -1) {
      if (this.index >= 0) {
        this.model.MobileAppLookupList[this.index] = this.mobileAppLookupModel;
        this.index = -1;
      } else {
        this.model.MobileAppLookupList.push(this.mobileAppLookupModel);
      }
      this.mobileAppLookupModel = new MobileAppLookupModel();
    } else if (this.index >= 0 && this.index === data) {
      this.model.MobileAppLookupList[this.index] = this.mobileAppLookupModel;
      this.index = -1;
      this.mobileAppLookupModel = new MobileAppLookupModel();
    } else {
      this._alertService.error("Can Not Insert Same Value");
      this._commonService.ScrollingTop();
    }
  }

  RemoveEligibility(index) {
    this.model.EligibilityCriteria.splice(index, 1);
  }

  AddMoreRequiredDocument() {
    this.fourFormGroup.get("NameOfDocumentCode").markAsTouched();
    //this.fourFormGroup.get("Remarkslist").markAsTouched();
    this.fourFormGroup.get("IsMandatory").markAsTouched();
    this.addListOfDocValidation();

    if (
      this.fourFormGroup.get("NameOfDocumentCode").valid &&
      this.fourFormGroup.get("Remarkslist").valid &&
      this.fourFormGroup.get("IsMandatory").valid
    ) {
      if (this.index >= 0) {
        this.model.RequiredDocument[this.index] = this.RequiredDocumentModel;
        this.index = -1;
      } else {
        this.model.RequiredDocument.push(this.RequiredDocumentModel);
      }
      this.RequiredDocumentModel = new RequiredDocumentModel();
      this.RequiredDocumentModel.IsMandatory = String(42);
      this.RemoveListOfDocValidation();
    }
  }

  EditGetBeneficiary(index, data) {
    this.getBeneficiaryLookupModel.PaymentFrequency = data.PaymentFrequency;
    this.getBeneficiaryLookupModel.Category = data.Category;
    this.getBeneficiaryLookupModel.PhysicalItem = data.PhysicalItem;
    this.getBeneficiaryLookupModel.Remark = data.Remark;
    if (this.model.DelivarebleCode) {
      this.getBeneficiaryLookupModel.DelivarebleCode = Number(
        this.model.DelivarebleCode
      );
    }
    this.index = index;
  }

  AddGetBeneficiary() {
    this.fifthformGroup.get("Category").markAsTouched();
    this.AddGetBeneficiaryValidation();

    if (this.fifthformGroup.get("Category").valid) {
      if (this.index >= 0) {
        this.model.GetBeneficiaryLookup[
          this.index
        ] = this.getBeneficiaryLookupModel;
        this.index = -1;
      } else {
        if (this.model.DelivarebleCode) {
          this.getBeneficiaryLookupModel.DelivarebleCode = Number(
            this.model.DelivarebleCode
          );
        }

        this.model.GetBeneficiaryLookup.push(this.getBeneficiaryLookupModel);
      }
      this.getBeneficiaryLookupModel = new GetBeneficiaryLookupModel();
      this.RemoveGetBeneficiaryValidation();
    }
  }

  RemoveGetBeneficiary(index) {
    this.model.GetBeneficiaryLookup.splice(index, 1);
  }

  RemoveRequiredDocument(index) {
    this.model.RequiredDocument.splice(index, 1);
  }

  RemoveMobilePlatform(index) {
    this.model.MobileAppLookupList.splice(index, 1);
  }

  EditMobilePlatform(index, data) {
    this.mobileAppLookupModel.PlatformName = data.PlatformName;
    this.mobileAppLookupModel.AppUrl = data.AppUrl;
    this.index = index;
  }

  touchFirst(stepper: MatStepper) {
    
    if (this.model.EntryLookUp.length > 0) {
      this.RemoveContactValidation();
      // stepper.next();
    } else {
      this._alertService.error("Add at least one Contact Person Details ");
      this._commonService.ScrollingTop();
      stepper.previous();
      this.firstFormGroup.markAllAsTouched();

    }
    this.firstFormGroup.get("OwnedBySate").markAllAsTouched();
    this.firstFormGroup.get("OwnedByCenter").markAllAsTouched();
  }

  touchSecond(stepper: MatStepper) {
    this.secondFormGroup.markAllAsTouched();
    this.secondFormGroup.get("DeliveryTimeInDays").clearValidators();
    this.secondFormGroup.get("DeliveryTimeInDays").updateValueAndValidity();
    //stepper.next();
  }

  touchThird() {
    this.temp = undefined;
    this.ThirdFormGroup.markAllAsTouched();
  }

  touchFour(stepper: MatStepper) {
    this.RemoveListOfDocValidation();
    this.fourFormGroup.markAllAsTouched();
    if (this.fourFormGroup.valid) {
      stepper.next();
    }
  }

  setValidationOnWebsiteUrl(data){
    
    if(data.findIndex(items =>items == "45") >= 0)
    {
      this.fourFormGroup.get("WebsiteUrl").setValidators([Validators.required,this.UrlValidator]);
      this.fourFormGroup.get("WebsiteUrl").updateValueAndValidity();
    }
    else{
      this.fourFormGroup.get("WebsiteUrl").setValidators(null);
      this.fourFormGroup.get("WebsiteUrl").updateValueAndValidity();
    }
  }


  madeOfApplingCondition(data) {
    if (
      this.model &&
      this.model.ModeofApplicationList &&
      this.model.ModeofApplicationList.length > 0
    ) {
      let temp = this.model.ModeofApplicationList.findIndex(
        (x) => x === String(data)
      );
      if (temp >= 0 && this.model.MadeOfAppling != "38") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // removeValid(event: any) {
  //   
  //   if (event.value === "45" || event.value === "48") {
  //     this.fourFormGroup
  //       .get("DepartmentWebsiteUrl")
  //       .setValidators([Validators.required]);
  //     this.fourFormGroup.get("DepartmentWebsiteUrl").updateValueAndValidity();
  //   } else if (event.value === "44" || event.value === "49") {
  //     this.fourFormGroup.get("DepartmentWebsiteUrl").setValidators(null);
  //     this.fourFormGroup.get("DepartmentWebsiteUrl").updateValueAndValidity();
  //   }
  // }

  touchFifth() {
    this.fifthformGroup.markAllAsTouched();
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
    this.firstFormGroup.get("NodelDepartmentCode").markAsTouched();
    this.firstFormGroup.get("Designation").markAsTouched();
    this.addValidation();
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
      this.RemoveContactValidation();
    }
  }

  RemoveEntryClick(index) {
    this.model.EntryLookUp.splice(index, 1);
  }

  getBlockByDistrict(code) {
    this.getTahsilByDistrict(code);
    this._commonService.GetBlockByDistrict(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlBlockByDistrict = <DdlItemModel[]>data.Data;
          this.ddlBlockByDistrict.forEach((obj) => {
            this.BlockItems[obj.Value] = obj.Text;
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getTahsilByDistrict(code) {
    this._commonService.GetTahsilByBlock(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlTahsilByBlock = <DdlItemModel[]>data.Data;
          this.ddlTahsilByBlock.forEach((obj) => {
            this.TahsilItems[obj.Value] = obj.Text;
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForScheme).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
          this.dDLList.ddlContactPersonType.forEach((obj) => {
            this.ContactPersonTypeItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlAdminDepartment.forEach((obj) => {
            this.AdminItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlDepartment.forEach((obj) => {
            this.NodelItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeEligibility.forEach((obj) => {
            this.EligibilityItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeNameOfDocument.forEach((obj) => {
            this.RequiredDocItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeListOfOtherDoc.forEach((obj) => {
            this.OtherDocItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeListOfRequiredDoc.forEach((obj) => {
            this.RequiredDoctypeItems[obj.Value] = obj.Text;
          });
          this.dDLList.RadioListOfRequiredDoc.forEach((obj) => {
            this.RequiredDocmandatoryItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlDistrict.forEach((obj) => {
            this.DistrictItems[obj.Value] = obj.Text;
          });
          // this.dDLList.ddlSchemePageType.forEach(obj => {
          //   this.DistrictItems[obj.Value] = obj.Text;
          // });


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
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  //#region <Seven TAB>

  AddMoreGroupItems() {
    this.sevenFormGroup.markAllAsTouched();
    this.addSevenTabValidation();
    if (this.sevenFormGroup.valid) {
      if (this.index >= 0) {
        this.model.ContentGroup[this.index] = this.contentGroupModel;
        this.index = -1;
      } else {
        this.model.ContentGroup.push(this.contentGroupModel);
      }
      this.contentGroupModel = new ContentGroupModel();
      this.removeSevenTabValidation();
    } else {
      this._alertService.error("Should filled All Fields");
      this._commonService.ScrollingTop();
    }
  }

  RemoveContentGroupItem(index) {
    this.model.ContentGroup.splice(index, 1);
  }

  editContentGroupItem(index, data) {
    if (data.Id) {
      this.contentGroupModel.Id = String(data.Id);
    }
    this.contentGroupModel.Heading1 = data.Heading1;
    this.contentGroupModel.Heading2 = data.Heading2;
    this.contentGroupModel.Description = data.Description;
    this.index = index;
    this._commonService.ScrollingTop();
  }

  addSevenTabValidation() {
    this.sevenFormGroup;
    this.sevenFormGroup.get("Heading1").setValidators([Validators.required]);
    this.sevenFormGroup.get("Heading1").updateValueAndValidity();
    this.sevenFormGroup.get("Heading2").setValidators(null);
    this.sevenFormGroup.get("Heading2").updateValueAndValidity();
    this.sevenFormGroup
      .get("grpDescription")
      .setValidators([Validators.required]);
    this.sevenFormGroup.get("grpDescription").updateValueAndValidity();
  }

  removeSevenTabValidation() {
    this.sevenFormGroup.get("Heading1").setValidators(null);
    this.sevenFormGroup.get("Heading1").updateValueAndValidity();
    this.sevenFormGroup.get("Heading2").setValidators(null);
    this.sevenFormGroup.get("Heading2").updateValueAndValidity();
    this.sevenFormGroup.get("grpDescription").setValidators(null);
    this.sevenFormGroup.get("grpDescription").updateValueAndValidity();
  }

  //#endregion

  AddAndRemoveValidationGroup(event) {
    if (String(this.schemeTypeEnum.Individual) === event) {
      this.removeSevenTabValidation();
      this.secondFormGroup.get("district").setValidators([Validators.required]);
      this.secondFormGroup.get("district").updateValueAndValidity();
      this.ThirdFormGroup.get("CasteCategory").setValidators([
        Validators.required,
      ]);
      this.ThirdFormGroup.get("CasteCategory").updateValueAndValidity();
      this.ThirdFormGroup.get("BeneficiaryCategory").setValidators([
        Validators.required,
      ]);
      this.ThirdFormGroup.get("BeneficiaryCategory").updateValueAndValidity();

      this.fourFormGroup
        .get("MadeOfAppling")
        .setValidators([Validators.required]);
      this.fourFormGroup.get("MadeOfAppling").updateValueAndValidity();
      // this.fourFormGroup.get("NameOfDocumentCode").clearValidators();
      // this.fourFormGroup.get("NameOfDocumentCode").updateValueAndValidity();
      // this.fourFormGroup.get("Remarkslist").clearValidators();
      // this.fourFormGroup.get("Remarkslist").updateValueAndValidity();
      // this.fourFormGroup.get("IsMandatory").clearValidators();
      // this.fourFormGroup.get("IsMandatory").updateValueAndValidity();
      this.fourFormGroup
        .get("IsServiceFees")
        .setValidators([Validators.required]);
      this.fourFormGroup.get("IsServiceFees").updateValueAndValidity();
      // this.fourFormGroup
      //   .get("ServiceFeeAmount")
      //   .setValidators([Validators.min(1)]);
      // this.fourFormGroup.get("ServiceFeeAmount").updateValueAndValidity();
      // this.fourFormGroup.get("WebsiteUrl").setValidators([Validators.required]);
      // this.fourFormGroup.get("WebsiteUrl").clearValidators();
      // this.fourFormGroup.get("WebsiteUrl").updateValueAndValidity();

      this.fifthformGroup
        .get("DelivarebleCode")
        .setValidators([Validators.required]);
      this.fifthformGroup.get("DelivarebleCode").updateValueAndValidity();
      this.fifthformGroup
        .get("deliveryPaymentDetail")
        .setValidators([Validators.required]);
      this.fifthformGroup.get("deliveryPaymentDetail").updateValueAndValidity();
      this.fifthformGroup
        .get("ModeOfDisbursmentCode")
        .setValidators([Validators.required]);
      this.fifthformGroup.get("ModeOfDisbursmentCode").updateValueAndValidity();
      this.fifthformGroup
        .get("ModeOfDisbursment")
        .setValidators([Validators.required]);
      this.fifthformGroup.get("ModeOfDisbursment").updateValueAndValidity();
      this.fifthformGroup
        .get("PaymentDisbursmentFrequency")
        .setValidators([Validators.required]);
      this.fifthformGroup
        .get("PaymentDisbursmentFrequency")
        .updateValueAndValidity();
    } else if (String(this.schemeTypeEnum.Group) === event) {
      this.secondFormGroup.get("district").clearValidators();
      this.secondFormGroup.get("district").updateValueAndValidity();
      this.ThirdFormGroup.get("CasteCategory").clearValidators();
      this.ThirdFormGroup.get("CasteCategory").updateValueAndValidity();
      this.ThirdFormGroup.get("BeneficiaryCategory").clearValidators();
      this.ThirdFormGroup.get("BeneficiaryCategory").updateValueAndValidity();

      this.fourFormGroup.get("MadeOfAppling").clearValidators();
      this.fourFormGroup.get("MadeOfAppling").updateValueAndValidity();
      this.fourFormGroup.get("NameOfDocumentCode").clearValidators();
      this.fourFormGroup.get("NameOfDocumentCode").updateValueAndValidity();
      //this.fourFormGroup.get("Remarkslist").clearValidators();
      //this.fourFormGroup.get("Remarkslist").updateValueAndValidity();
      this.fourFormGroup.get("IsMandatory").clearValidators();
      this.fourFormGroup.get("IsMandatory").updateValueAndValidity();
      this.fourFormGroup.get("IsServiceFees").clearValidators();
      this.fourFormGroup.get("IsServiceFees").updateValueAndValidity();
      this.fourFormGroup.get("ServiceFeeAmount").clearValidators();
      this.fourFormGroup.get("ServiceFeeAmount").updateValueAndValidity();
      this.fourFormGroup.get("WebsiteUrl").clearValidators();
      this.fourFormGroup.get("WebsiteUrl").updateValueAndValidity();

      this.fifthformGroup.get("DelivarebleCode").clearValidators();
      this.fifthformGroup.get("DelivarebleCode").updateValueAndValidity();
      this.fifthformGroup.get("deliveryPaymentDetail").clearValidators();
      this.fifthformGroup.get("deliveryPaymentDetail").updateValueAndValidity();
      this.fifthformGroup.get("ModeOfDisbursmentCode").clearValidators();
      this.fifthformGroup.get("ModeOfDisbursmentCode").updateValueAndValidity();
      this.fifthformGroup.get("ModeOfDisbursment").clearValidators();
      this.fifthformGroup.get("ModeOfDisbursment").updateValueAndValidity();
      this.fifthformGroup.get("PaymentDisbursmentFrequency").clearValidators();
      this.fifthformGroup
        .get("PaymentDisbursmentFrequency")
        .updateValueAndValidity();
    } else {
      this.addSevenTabValidation();
      // this.ThirdFormGroup.get("CasteCategory").setValidators([Validators.required]);
      // this.ThirdFormGroup.get("CasteCategory").updateValueAndValidity();
      // this.ThirdFormGroup.get("BeneficiaryCategory").setValidators([Validators.required]);
      // this.ThirdFormGroup.get("BeneficiaryCategory").updateValueAndValidity();

      // this.fourFormGroup.get("MadeOfAppling").setValidators([Validators.required]);
      // this.fourFormGroup.get("MadeOfAppling").updateValueAndValidity();
      // // this.fourFormGroup.get("NameOfDocumentCode").clearValidators();
      // // this.fourFormGroup.get("NameOfDocumentCode").updateValueAndValidity();
      // // this.fourFormGroup.get("Remarkslist").clearValidators();
      // // this.fourFormGroup.get("Remarkslist").updateValueAndValidity();
      // // this.fourFormGroup.get("IsMandatory").clearValidators();
      // // this.fourFormGroup.get("IsMandatory").updateValueAndValidity();
      // this.fourFormGroup.get("IsServiceFees").setValidators([Validators.required]);
      // this.fourFormGroup.get("IsServiceFees").updateValueAndValidity();
      // this.fourFormGroup.get("ServiceFeeAmount").setValidators([Validators.min(1)]);
      // this.fourFormGroup.get("ServiceFeeAmount").updateValueAndValidity();
      // this.fourFormGroup.get("WebsiteUrl").setValidators([Validators.required]);
      // this.fourFormGroup.get("WebsiteUrl").updateValueAndValidity();

      // this.fourFormGroup.get("DelivarebleCode").setValidators([Validators.required]);
      // this.fourFormGroup.get("DelivarebleCode").updateValueAndValidity();
      // this.fourFormGroup.get("deliveryPaymentDetail").setValidators([Validators.required]);
      // this.fourFormGroup.get("deliveryPaymentDetail").updateValueAndValidity();
      // this.fourFormGroup.get("ModeOfDisbursmentCode").setValidators([Validators.required]);
      // this.fourFormGroup.get("ModeOfDisbursmentCode").updateValueAndValidity();
      // this.fourFormGroup.get("ModeOfDisbursment").setValidators([Validators.required]);
      // this.fourFormGroup.get("ModeOfDisbursment").updateValueAndValidity();
      // this.fourFormGroup.get("PaymentDisbursmentFrequency").setValidators([Validators.required]);
      // this.fourFormGroup.get("PaymentDisbursmentFrequency").updateValueAndValidity();
    }
  }

  addCenterStateValidation(data){
    
    if (data == 28) {
    this.firstFormGroup.get("OwnedBySate").setValidators([Validators.required,Validators.pattern("[0-9.0-9]*$")]);
    this.firstFormGroup.get("OwnedByCenter").setValidators([Validators.required,Validators.pattern("[0-9.0-9]*$")]);
    this.firstFormGroup.get("OwnedBySate").updateValueAndValidity();
    this.firstFormGroup.get("OwnedByCenter").updateValueAndValidity();
  } else {
    this.firstFormGroup.get("OwnedBySate").setValidators(null);
    this.firstFormGroup.get("OwnedByCenter").setValidators(null);
    this.firstFormGroup.get("OwnedBySate").updateValueAndValidity();
    this.firstFormGroup.get("OwnedByCenter").updateValueAndValidity();
  }
  }

  SaveClick() {
    
    this.SixthformGroup.get("Remarksother").setValidators(null);
    this.SixthformGroup.get("Remarksother").updateValueAndValidity();
    if (this.model.ExpriedOnDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.model.ExpriedOnDate).getFullYear(),
          new Date(this.model.ExpriedOnDate).getMonth(),
          new Date(this.model.ExpriedOnDate).getDate()
        )
      ).toISOString();
      this.model.ExpriedOnDate = uTCDate;
    }

    this.SixthformGroup.markAllAsTouched();
    this.iCustomValidation = true;
    this.removeSevenTabValidation();
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.ThirdFormGroup.valid &&
      this.fourFormGroup.valid &&
      this.fifthformGroup.valid &&
      this.SixthformGroup.valid &&
      this.sevenFormGroup.valid &&
      !this.secondFormGroup.hasError("notValid") &&
      this.model.EntryLookUp.length > 0
    ) {
      this.model.IsSaveAsDraft = false;
      this._schemeService
        .PostData(this.model, AppSetting.SchemeUpdateUrl)
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["scheme"]);
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            console.log(error);
            this._alertService.error(error.message);
          }
        );
    } else {
    }
  }

  downloadOtherDocPdf(Url) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = "Docs";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();
  }

  handleFileForMoreDetail(event: any, isService: boolean = false) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          if (isService) {
            this.model.ServiceFeePdf = event.target.result;
            this.fileValidationMsgServicefee = "";
          } else {
            this.model.BeneficiaryPdf = event.target.result;
            this.fileValidationMsgHowtoPay = "";
          }
        };
        reader.readAsDataURL(event.target.files.item(0));
      } else {
        if (isService) {
          this.fileValidationMsgServicefee = this.fileSizeValidationMsg;
        } else {
          this.fileValidationMsgHowtoPay = this.fileSizeValidationMsg;
        }
      }
    } else {
      if (isService) {
        this.fileValidationMsgServicefee = "only pdf file accepted ";
      } else {
        this.fileValidationMsgHowtoPay = "only pdf file accepted  ";
      }
    }
  }

  handleFileInput(event: any) {
    if (
      event.target.files.item(0).type.match("image/*") ||
      event.target.files.item(0).type.match("application/pdf")
    ) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        if (event.target.files.item(0).type.match("application/pdf")) {
          this.OtherDocumentModel.IsPdf = true;
        }
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.OtherDocumentModel.URL = event.target.result;
        };
        this.fileValidationMsgDocs = "";
        reader.readAsDataURL(event.target.files.item(0));
      } else {
        this.fileValidationMsgDocs = this.fileSizeValidationMsg;
      }
    } else {
      this.fileValidationMsgDocs = "only *images and pdf file accepted ";
    }
  }

  handleFileLogo(event: any, isLogo: boolean = false) {
    
    // tslint:disable-next-line: prefer-const
    let valid_Height = 0,
      valid_Width = 0;

    if (isLogo) {
      valid_Width = parseInt(this.schemeTypeEnum.Logo_width);
    } else {
      valid_Height = parseInt(this.schemeTypeEnum.Banner_height);
      valid_Width = parseInt(this.schemeTypeEnum.Banner_width);
    }

    if (event.target.files.item(0).type.match("image/*")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          let img = new Image();
          let imgHeight = 0,
            imgWidth = 0;
          img.src = <string>reader.result;
          img.onload = () => {
            imgWidth = img.width;
            imgHeight = img.height;
            if (isLogo) {
              if (imgWidth <= valid_Width) {
                this.model.Logo = event.target.result;
                this.fileValidationMsgLogo = "";
              } else {
                this.fileValidationMsgLogo =
                  "Width of logo not more then." + valid_Width + "px";
              }
            } else {
              if (imgHeight <= valid_Height && imgWidth <= valid_Width) {
                this.model.BannerImage = event.target.result;
                this.fileValidationMsgBanner = "";
              } else {
                this.fileValidationMsgBanner =
                  " Banner image not more then " +
                  valid_Height +
                  "*" +
                  valid_Width +
                  " (H*W) height/width.";
              }
            }
          };
        };
        reader.readAsDataURL(event.target.files.item(0));
      } else {
        if (!isLogo) {
          this.fileValidationMsgBanner = this.fileSizeValidationMsg;
        } else {
          this.fileValidationMsgLogo = this.fileSizeValidationMsg;
        }
      }
    } else {
      if (!isLogo) {
        this.fileValidationMsgBanner = "only *images file accepted ";
      } else {
        this.fileValidationMsgLogo = "only *images file accepted ";
      }
    }
  }

  //#region "MobileIcon"

  handleFileMobileIcon(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.MobileAppIcon = event.target.result;
        };
        reader.readAsDataURL(event.target.files.item(0));
        this.fileValidationMsgIcon = "";
      } else {
        this.fileValidationMsgIcon = this.fileSizeValidationMsg;
      }
    } else {
      this.fileValidationMsgIcon = "only *images icon file accepted ";
    }
  }

  //#endregion "MobileIcon"

  myValidator(firstFormGroup: FormGroup) {
    let sum = 0;
    if (firstFormGroup.get(["OwnedBySate"])) {
      sum +=
        Number(firstFormGroup.get(["OwnedBySate"]).value) +
        Number(firstFormGroup.get(["OwnedByCenter"]).value);
      return sum === 100 || sum === 0 ? null : { notValid: true };
    } else {
      return null;
    }
  }

  resetModel() {
    this.model.OwnedByCenter = null;
    this.model.OwnedBySate = null;
    this.myValidator(this.firstFormGroup);
  }

  editOtherDocument(index, data) {
    if (data.ListOfOtherDocumentCode) {
      this.OtherDocumentModel.ListOfOtherDocumentCode = String(
        data.ListOfOtherDocumentCode
      );
    }
    this.OtherDocumentModel.URL = data.URL;
    this.OtherDocumentModel.IsPdf = data.IsPdf;
    this.OtherDocumentModel.Remarks = data.Remarks;
    this.OtherDocumentModel.ImageCode = data.ImageCode;
    this.OtherDocumentModel.DocDate = new Date(data.DocDate);
    this.index = index;
  }

  EditEligibility(index, data) {
    if (data.EligibilityDropDownCode) {
      this.EligibilityCriteriaModel.EligibilityDropDownCode = String(
        data.EligibilityDropDownCode
      );
    }
    this.EligibilityCriteriaModel.Remarks = data.Remarks;
    this.index = index;
  }

  editRequiredDocument(index, data) {
    if (data.NameOfDocumentCode) {
      this.RequiredDocumentModel.NameOfDocumentCode = String(
        data.NameOfDocumentCode
      );
    }
    this.RequiredDocumentModel.Remarks = data.Remarks;
    if (data.IsMandatory) {
      this.RequiredDocumentModel.IsMandatory = String(data.IsMandatory);
    }

    this.index = index;
  }

  editEntryClick(index, data) {
    if (
      this.EntryLookUpModel.Type == this.contactTypeEnum.DistrictLabel ||
      this.EntryLookUpModel.Type == this.contactTypeEnum.BlockLabel
    ) {
      this.getTahsilByDistrict(data.DistrictCode);
    }
    if (this.EntryLookUpModel.Type == this.contactTypeEnum.BlockLabel) {
      this.getBlockByDistrict(data.DistrictCode);
    }
    if (data.NodelDepartmentCode) {
      this.EntryLookUpModel.NodelDepartmentCode = String(
        data.NodelDepartmentCode
      );
    }
    if (data.Type) {
      this.EntryLookUpModel.Type = String(data.Type);
    }
    if (data.DistrictCode) {
      this.EntryLookUpModel.DistrictCode = String(data.DistrictCode);
    }
    if (data.BlockCode) {
      this.EntryLookUpModel.BlockCode = String(data.BlockCode);
    }
    if (data.TahsilCode) {
      this.EntryLookUpModel.TahsilCode = String(data.TahsilCode);
    }
    this.EntryLookUpModel.NodelOfficerName = data.NodelOfficerName;
    // this.EntryLookUpModel.MobileNo = data.MobileNo;
    this.phoneNumberString = data.MobileNo;
    this.EntryLookUpModel.EmailId = data.EmailId;
    this.EntryLookUpModel.Designation = data.Designation;
    this.EntryLookUpModel.Lat = data.Lat;
    this.EntryLookUpModel.Long = data.Long;
    this.EntryLookUpModel.Address = data.Address;
    this.index = index;
  }

  getSchemeDepartmentList(id) {
    if (id) {
      this._commonService.GetSchemeDepartment(id).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.dDLList.ddlDepartment = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  CompareFields(fg: FormGroup) {
    if (
      fg.get("FirstAppeallateCode") &&
      fg.get("SecondAppeallateCode") &&
      fg.get("DesignatedOfficerReceivingDetailCode")
    ) {
      const first = fg.get("FirstAppeallateCode").value;
      const second = fg.get("SecondAppeallateCode").value;
      const ofcDetails = fg.get("DesignatedOfficerReceivingDetailCode").value;
      return first != null &&
        second != null &&
        ofcDetails != null &&
        (first === second ||
          first === ofcDetails ||
          (second === first && second === ofcDetails) ||
          (ofcDetails === first && ofcDetails === second))
        ? { fieldValid: true }
        : null;
    } else {
      return null;
    }
  }

  selectAll() {
    if (this.selectedAll < 0) {
      this.model.District = this.dDLList.ddlDistrict.map(function (a) {
        return a.Value;
      });
      this.selectedAll = 1;
    } else {
      this.selectedAll = -1;
      this.model.District = [];
    }
  }

  selectAllHowToPay() {
    if (this.selectedAllHowToPay < 0) {
      this.model.HowToPay = this.dDLList.ddlSchemePayFees.map(function (a) {
        return a.Value;
      });
      this.selectedAllHowToPay = 1;
    } else {
      this.selectedAllHowToPay = -1;
      this.model.HowToPay = [];
    }
  }

  // Validates Url
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
      invalidUrl: true,
    };
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
      invalidName: true,
    };
  }

  formGroupInit() {
    const reg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
    this.firstFormGroup = this.formBuilder.group(
      {
        ShortNameEnglish: [
          null,
          [Validators.required, this.StringWithoutSpace],
        ],
        NameHindi: [null],
        SearchKeyWordOfDetails: [null],
        ShortNameHindi: [null],
        NameEnglish: ["", Validators.required],
        AdminDepartmentCode: [null, Validators.required],
        NodelDepartmentCode: [null],
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
            ),
          ]),
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
        Designation: [null, Validators.required],
        DistrictCode: [null],
        BlockCode: [null],
        TahsilCode: [null],
        Latitude: [null],
        Address: [null],
        Longitude: [null],
        ContactPersonType: [null],
        URLofDataofBeneficiaryonJansoochnaPortal: [
          null,
          Validators.pattern(reg),
        ],
      },
      { validator: this.myValidator }
    );

    this.secondFormGroup = this.formBuilder.group(
      {
        FirstAppeallateCode: [null],
        SecondAppeallateCode: [null],
        programAreas: [null],
        ApplyForScheme: [null],
        // ApplyForScheme: [null,Validators.required,Validators.pattern("[0-9]+.[0-9]*$")],
        TimeOfValidationInMonth: [null],
        ExpiredOn: [null],
        ExpriedOnDate: [null],
        ExpriedDurationInMonth: [null],
        IsListedRGDPSAct: [null],
        DeliveryTimeInDays: [null],
        district: [null, Validators.required],
        SearchKeyWordOfExecution: [null],
        DesignatedOfficerReceivingDetailCode: [null],
        SchemeType: [null],
      },
      { validator: this.CompareFields }
    );

    this.ThirdFormGroup = this.formBuilder.group({
      CasteCategory: [null, Validators.required],
      BeneficiaryCategory: [null, Validators.required],
      EligibilityDropDownCode: [null],
      Remarks: [null],
      Benificiarytext: [null],
      IsbeneficiaryText: [null],
      IsEligibityText: [null],
      EligiblityText: [null],
      SearchKeyWordOfEligible: [null],
    });

    this.fourFormGroup = this.formBuilder.group({
      MadeOfAppling: [null, Validators.required],
      ModeofApplicationList: [null],
      // MadeOfApplingOnlineBoth: [null],
      // DepartmentWebsiteUrl: [null, this.UrlValidator],
      NameOfDocumentCode: [null, Validators.required],
      Remarkslist: [null], //Validators.required],
      PlatformName: [null],
      AppURl: [null],
      //TypeOfDocumentCode: [null, Validators.required],
      IsMandatory: [null, Validators.required],
      IsServiceFees: [null, Validators.required],
      ServiceFeeAmount: [null, [Validators.min(1)]],
      HowToPayFeeCode: [null],
      ServiceFeePdf: [null],
      HelplineNo: [null],
      HowToApplyText: [null],
      IsHowToApply: [null],
      WebsiteUrl: [null, this.UrlValidator],
      MobileAppIcon: [null],
      MobileAppUrl: [null],
      SearchKeyWordOfHowToApply: [null],
      HowtoPayFeeRemarks: [null],
      ModeofApplicationText: [null],
    });

    this.fifthformGroup = this.formBuilder.group({
      DelivarebleCode: [null],
      deliveryPaymentDetail: [null, Validators.required],
      ModeOfDisbursmentCode: [null, Validators.required],
      ModeOfDisbursment: [null, Validators.required],
      PaymentDisbursmentFrequency: [null, Validators.required],
      PaymentDisbursmentFrequencyInstallments: [null],
      PaymentDisbursmentFrequencyTillAPeriod: [null,Validators.pattern("[0-9.0-9]*$")],
      ModeOfDelivery: [null],
      ItemDetails: [null],
      BeneficiaryPdf: [null],
      IsWhatWillBeneficiaryGet: [null],
      WhatWillBeneficiaryGet: [null],
      SearchKeyWordOfBeneficiaryGet: [null],
      Category: [null],
      PaymentFrequency: [null],
      Remark: [null],
      PhysicalItem: [null],
      NumberOfInstallments: [null],
      DocumentCertificateLicenseDocument: [null],
    });

    this.SixthformGroup = this.formBuilder.group({
      ListOfOtherDocumentCode: [null],
      URL: [null],
      Remarksother: [null],
      OtherDocumentModelCode: [null],
      DocDate: [null],
      // Scheme_URL: [null],
      SearchKeyWordOfOtherDocument: [null],
      YearValueConnectWithCMIS:[null],
      DepartmentIdConnectWithCMIS:[null],
      ModuleIdConnectWithCMIS:[null],
    });

    this.sevenFormGroup = this.formBuilder.group({
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

  addPaymentDisbFrequencyValidation(data){
    
    if (data == 41) {
      this.fifthformGroup.get("PaymentDisbursmentFrequencyTillAPeriod").setValidators([Validators.required,Validators.pattern("[0-9.0-9]*$")]);
      this.fifthformGroup.get("PaymentDisbursmentFrequencyTillAPeriod").updateValueAndValidity();
      this.fifthformGroup.get("NumberOfInstallments").setValidators([Validators.required,Validators.pattern("[0-9.0-9]*$")]);
      this.fifthformGroup.get("NumberOfInstallments").updateValueAndValidity();
    } else {
      this.fifthformGroup.get("PaymentDisbursmentFrequencyTillAPeriod").setValidators(null);
      this.fifthformGroup.get("PaymentDisbursmentFrequencyTillAPeriod").updateValueAndValidity();
      this.fifthformGroup.get("NumberOfInstallments").setValidators(null);
      this.fifthformGroup.get("NumberOfInstallments").updateValueAndValidity();
    }
  }

  addDeliveryTimeInDaysValidation(data) {
    if (data == 29) {
      this.secondFormGroup
        .get("DeliveryTimeInDays")
        .setValidators([Validators.required]);
      this.secondFormGroup.get("DeliveryTimeInDays").updateValueAndValidity();
    } else {
      this.secondFormGroup.get("DeliveryTimeInDays").setValidators(null);
      this.secondFormGroup.get("DeliveryTimeInDays").updateValueAndValidity();
    }
  }

  IsDurationApplyRemoveValidation(data){
    
    if (data == 34) {
      this.secondFormGroup.get("ExpriedDurationInMonth").setValidators([Validators.required,Validators.pattern("[0-9.0-9]*$")]);
      this.secondFormGroup.get("ExpriedOnDate").setValidators(null);
    } else {
      this.secondFormGroup.get("ExpriedDurationInMonth").setValidators(null);
      this.secondFormGroup.get("ExpriedOnDate").setValidators([Validators.required]);
    }
    this.secondFormGroup.get("ExpriedDurationInMonth").updateValueAndValidity();
    this.secondFormGroup.get("ExpriedOnDate").updateValueAndValidity();
  }

  IsRenewalApplyRemoveValidation(data) {
       if (data == 32) {
      this.secondFormGroup
        .get("TimeOfValidationInMonth")
        .setValidators([Validators.required,Validators.pattern("[0-9.0-9]*$")]);
    } else {
      this.secondFormGroup.get("TimeOfValidationInMonth").setValidators(null);
    }
    this.secondFormGroup
      .get("TimeOfValidationInMonth")
      .updateValueAndValidity();
  }

  IsServiceApplyRemoveValidation(data){
    
    if (data == 35) {
      this.fourFormGroup
        .get("ServiceFeeAmount")
        .setValidators([Validators.required,Validators.pattern("[0-9.0-9]*$")]);
    } else {
      this.fourFormGroup.get("ServiceFeeAmount").setValidators(null);
    }
    this.fourFormGroup
      .get("ServiceFeeAmount")
      .updateValueAndValidity();
  }

  addDeliveryServiceValidation() {
    
    if (this.model.DelivarebleCode == 5 || this.model.DelivarebleCode == 6 || this.model.DelivarebleCode == 7|| this.model.DelivarebleCode == 8) {
      this.fifthformGroup.get("DelivarebleCode").clearValidators();
      this.fifthformGroup.get("DelivarebleCode").updateValueAndValidity();
      this.fifthformGroup.get("deliveryPaymentDetail").clearValidators();
      this.fifthformGroup.get("deliveryPaymentDetail").updateValueAndValidity();
      this.fifthformGroup.get("ModeOfDisbursmentCode").clearValidators();
      this.fifthformGroup.get("ModeOfDisbursmentCode").updateValueAndValidity();
      this.fifthformGroup.get("ModeOfDisbursment").clearValidators();
      this.fifthformGroup.get("ModeOfDisbursment").updateValueAndValidity();
      this.fifthformGroup.get("PaymentDisbursmentFrequency").clearValidators();
      this.fifthformGroup
        .get("PaymentDisbursmentFrequency")
        .updateValueAndValidity();
    } else {
      this.fifthformGroup
        .get("DelivarebleCode")
        .setValidators([Validators.required]);
      this.fifthformGroup.get("DelivarebleCode").updateValueAndValidity();
      this.fifthformGroup
        .get("deliveryPaymentDetail")
        .setValidators([Validators.required]);
      this.fifthformGroup.get("deliveryPaymentDetail").updateValueAndValidity();
      this.fifthformGroup
        .get("ModeOfDisbursmentCode")
        .setValidators([Validators.required]);
      this.fifthformGroup.get("ModeOfDisbursmentCode").updateValueAndValidity();
      this.fifthformGroup
        .get("ModeOfDisbursment")
        .setValidators([Validators.required]);
      this.fifthformGroup.get("ModeOfDisbursment").updateValueAndValidity();
      this.fifthformGroup
        .get("PaymentDisbursmentFrequency")
        .setValidators([Validators.required]);
      this.fifthformGroup
        .get("PaymentDisbursmentFrequency")
        .updateValueAndValidity();
    }
  }

  addValidation() {
    this.firstFormGroup;

    this.firstFormGroup
      .get("NodelDepartmentCode")
      .setValidators([Validators.required]);
    this.firstFormGroup.get("NodelDepartmentCode").updateValueAndValidity();

    this.firstFormGroup.get("Designation").setValidators([Validators.required]);
    this.firstFormGroup.get("Designation").updateValueAndValidity();
  }

  RemoveContactValidation() {
    this.firstFormGroup.get("NodelDepartmentCode").setValidators(null);
    this.firstFormGroup.get("NodelDepartmentCode").updateValueAndValidity();
    this.firstFormGroup.get("Designation").setValidators(null);
    this.firstFormGroup.get("Designation").updateValueAndValidity();
  }

  addListOfDocValidation() {
    this.fourFormGroup
      .get("NameOfDocumentCode")
      .setValidators([Validators.required]);
    this.fourFormGroup.get("NameOfDocumentCode").updateValueAndValidity();
    //this.fourFormGroup.get("Remarkslist").setValidators([Validators.required]);
    //this.fourFormGroup.get("Remarkslist").updateValueAndValidity();
    this.fourFormGroup.get("IsMandatory").setValidators([Validators.required]);
    this.fourFormGroup.get("IsMandatory").updateValueAndValidity();
  }
  AddGetBeneficiaryValidation() {
    this.fifthformGroup.get("Category").setValidators([Validators.required]);
    this.fifthformGroup.get("Category").updateValueAndValidity();
  }
  RemoveGetBeneficiaryValidation() {
    this.fifthformGroup.get("Category").setValidators(null);
    this.fifthformGroup.get("Category").updateValueAndValidity();
  }
  RemoveListOfDocValidation() {
    this.fourFormGroup.get("NameOfDocumentCode").setValidators(null);
    this.fourFormGroup.get("NameOfDocumentCode").updateValueAndValidity();
    //this.fourFormGroup.get("Remarkslist").setValidators(null);
    //this.fourFormGroup.get("Remarkslist").updateValueAndValidity();
    this.fourFormGroup.get("IsMandatory").setValidators(null);
    this.fourFormGroup.get("IsMandatory").updateValueAndValidity();
  }

  RemoveLogo(isLogo: boolean = true) {
    if (isLogo) {
      this.model.Logo = null;
    } else {
      this.model.BannerImage = null;
    }
  }

  RemoveMobileAppIcon() {
    this.model.MobileAppIcon = null;
  }

  RemoveServiceFee() {
    this.model.ServiceFeePdf = null;
  }

  RemoveBeneficiaryPdf() {
    this.model.BeneficiaryPdf = null;
  }

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
  this.connectWithCMISModel = new SchemeConnectWithCMISParameterModel();
}

GetConnectWithCMISResult(ModuleName,DepartmentId, DepartmentName, YearText, index) {
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
      SchemeConnectWithCMISParameterResultModel
      >result.resultModel;
    }
  });
}

RemoveConnectWithCMISClick(index) {
  this.model.ConnectWithCMIS.splice(index, 1);
}

//#endregion <Connect With CMIS>

}
