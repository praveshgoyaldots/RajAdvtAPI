import { debug } from "util";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatStepper,
  throwToolbarMixedModesError
} from "@angular/material";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  SchemeModel,
  filecollection,
  EntryLookUpModel,
  EligibilityCriteriaModel,
  RequiredDocumentModel,
  OtherDocumentModel,
  GetBeneficiaryLookupModel,
  MobileAppLookupModel
} from "src/app/Shared/Model/scheme-model";
import {
  DDLModel,
  DocumentUrlModel,
  DdlItemModel
} from "src/app/Shared/Model/commonddl.model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { CommonService } from "src/app/Shared/Service/common.service";
import { SchemeService } from "src/app/Shared/Service/scheme.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router } from "@angular/router";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";

import { AppComponent } from "src/app/app.component";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "src/app/Shared/Model/format-datepicker";
import { SchemeTypeEnum, ContactPersionTypeEnum } from "src/app/Shared/Enum/scheme.enum";
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: "app-add-scheme",
  templateUrl: "./add-scheme.component.html",
  styleUrls: ["./add-scheme.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AddSchemeComponent implements OnInit {
  dDLList: DDLModel;
  helpDocumentEnum=HelpDocumentEnum;
  helpDocument: string;
  model: SchemeModel;
  getBeneficiaryLookupModel: GetBeneficiaryLookupModel;
  EntryLookUpModel: EntryLookUpModel;
  EligibilityCriteriaModel: EligibilityCriteriaModel;
  RequiredDocumentModel: RequiredDocumentModel;
  OtherDocumentModel: OtherDocumentModel;
  mobileAppLookupModel: MobileAppLookupModel;
  ddlBlockByDistrict: DdlItemModel[]=[];
  ddlTahsilByBlock: DdlItemModel[]=[];
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
  tomorrow = new Date();
  SchemeTypeEnum = SchemeTypeEnum;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  fifthformGroup: FormGroup;
  SixthformGroup: FormGroup;
  index = -1;
  temp: string;

  selectedAll: number = -1;
  selectedAllHowToPay = -1;
  loginData: UserViewModel;
  ddlAdminDepartment: UserDepartmentViewModel[];
  phoneNumberString: string;
  isEditPhone: boolean;
  contactTypeEnum=ContactPersionTypeEnum;
  // commonmsg:string;
  constructor(
    private _parentApi: AppComponent,
    private readonly _schemeService: SchemeService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService
  ) {
    this.model = new SchemeModel();
    this.EntryLookUpModel = new EntryLookUpModel();
    this.EligibilityCriteriaModel = new EligibilityCriteriaModel();
    this.RequiredDocumentModel = new RequiredDocumentModel();
    this.OtherDocumentModel = new OtherDocumentModel();
    this.getBeneficiaryLookupModel=new GetBeneficiaryLookupModel();
    this.mobileAppLookupModel = new MobileAppLookupModel();
    this._parentApi.setpagelayout(
      "Add Scheme :",
      "keyboard_backspace",
      "Back To List",
      "scheme"
    );
    this.minDate.setDate(this.minDate.getDate() + 1 - 1);
    this.RequiredDocumentModel.IsMandatory = String(42);
    this.model.Description = '';
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetDDLList();
    this.formGroupInit();
    this.getDepartment();
    this.GetHelpDocument();
    this.getTahsilByBlock(0);
    this.getBlockByDistrict(0);
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      data => {
        
        if (data.IsSuccess) {
          var temp = <UserDepartmentViewModel[]>data.Data;
          this.ddlAdminDepartment = <UserDepartmentViewModel[]>temp.filter((UserDepartmentViewModel, i, arr) => arr.findIndex(t => t.AdmDepartmentCode === UserDepartmentViewModel.AdmDepartmentCode) === i);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
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

  EditGetBeneficiary(index, data) {
    this.getBeneficiaryLookupModel.PaymentFrequency =data.PaymentFrequency;
    this.getBeneficiaryLookupModel.Category =data.Category;
    this.getBeneficiaryLookupModel.PhysicalItem =data.PhysicalItem;
    this.getBeneficiaryLookupModel.Remark =data.Remark;
    if (this.model.DelivarebleCode) {
      this.getBeneficiaryLookupModel.DelivarebleCode=Number(this.model.DelivarebleCode);
    }
    this.index = index;
  }


  AddMoreMobilePlatform() {
    
    const data = this.model.MobileAppLookupList.findIndex(
         item =>
           item.PlatformName ===
           this.mobileAppLookupModel.PlatformName && item.AppUrl === this.mobileAppLookupModel.AppUrl
       );
       if (data === -1) {
         if (this.index >= 0) {
           this.model.MobileAppLookupList[
             this.index
           ] = this.mobileAppLookupModel;
           this.index = -1;
         }
     else {
           this.model.MobileAppLookupList.push(this.mobileAppLookupModel);
         }
         this.mobileAppLookupModel = new MobileAppLookupModel();
       }
     else if (this.index >= 0 && this.index === data) {
         this.model.MobileAppLookupList[
           this.index
         ] = this.mobileAppLookupModel;
         this.index = -1;
         this.mobileAppLookupModel = new MobileAppLookupModel();
       }
     else {
         this._alertService.error("Can Not Insert Same Value");
         this._commonService.ScrollingTop();
       }
   }

   RemoveMobilePlatform(index) {
    this.model.MobileAppLookupList.splice(index, 1);
  }


  EditMobilePlatform(index, data) {
    this.mobileAppLookupModel.PlatformName = data.PlatformName;
	  this.mobileAppLookupModel.AppUrl = data.AppUrl;
    this.index = index;
  }


  madeOfApplingCondition(data) {
    if (this.model && this.model.ModeofApplicationList && this.model.ModeofApplicationList.length > 0) {
      let temp = this.model.ModeofApplicationList.findIndex(
        x => x === String(data)
      );
      if (temp >= 0 && this.model.MadeOfAppling != '38') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  AddGetBeneficiary() {
    this.fifthformGroup.get("Category").markAsTouched();
    this.AddGetBeneficiaryValidation();

    if (this.fifthformGroup.get("Category").valid) {
      if (this.index >= 0) {
        this.model.GetBeneficiaryLookup[this.index] = this.getBeneficiaryLookupModel;
        this.index = -1;
      } else {
        if (this.model.DelivarebleCode) {
          this.getBeneficiaryLookupModel.DelivarebleCode=Number(this.model.DelivarebleCode);
        }

        this.model.GetBeneficiaryLookup.push(this.getBeneficiaryLookupModel);
      }
      this.getBeneficiaryLookupModel = new GetBeneficiaryLookupModel();
      this.RemoveGetBeneficiaryValidation();
    }

  }

  RemoveGetBeneficiary(index){
    this.model.GetBeneficiaryLookup.splice(index, 1);
  }
  AddMoreOtherDocument() {
    
    if (this.OtherDocumentModel.ListOfOtherDocumentCode.length > 0) {
      // const data = this.model.OtherDocument.findIndex(
      //   item =>
      //     String(item.ListOfOtherDocumentCode) ===
      //     String(this.OtherDocumentModel.ListOfOtherDocumentCode)
      // );
      // if (data === -1) {
        if (this.index >= 0) {
          if (
            !this.model.OtherDocument[this.index].URL &&
            this.OtherDocumentModel.URL
          ) {
            this.OtherDocumentModel.ImageCode =
              "IMG" + (Math.floor(Math.random() * 900000) + 100000);
          }
          this.model.OtherDocument[this.index] = this.OtherDocumentModel;
          this.index = -1;
        } else {
          if (this.OtherDocumentModel.URL) {
            this.OtherDocumentModel.ImageCode =
              "IMG" + (Math.floor(Math.random() * 900000) + 100000);
          }
          this.model.OtherDocument.push(this.OtherDocumentModel);
        }
        this.OtherDocumentModel = new OtherDocumentModel();
     // } 
      // else if (this.index >= 0 && this.index === data) {
      //   if (
      //     !this.model.OtherDocument[this.index].URL &&
      //     this.OtherDocumentModel.URL
      //   ) {
      //     this.OtherDocumentModel.ImageCode =
      //       "IMG" + (Math.floor(Math.random() * 900000) + 100000);
      //   }
      //   this.model.OtherDocument[this.index] = this.OtherDocumentModel;
      //   this.index = -1;
      //   this.OtherDocumentModel = new OtherDocumentModel();
      // } else {
      //   this._alertService.error("Can Not Insert Same Value");
      //   this._commonService.ScrollingTop();
      // }
    } else {
      this._alertService.error("Should filled All Fields");
      this._commonService.ScrollingTop();
    }
  }

  RemoveOtherDocument(index) {
    this.model.OtherDocument.splice(index, 1);
  }
  downloadOtherDocPdf(Url) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = 'Docs';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

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
    this.index = index;
  }

  AddMoreEligibility() {
    if (
      this.EligibilityCriteriaModel.EligibilityDropDownCode.length > 0 &&
      this.EligibilityCriteriaModel.Remarks.length > 0
    ) {
      const data = this.model.EligibilityCriteria.findIndex(
        item =>
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

  RemoveEligibility(index) {
    this.model.EligibilityCriteria.splice(index, 1);
  }

  EditEligibility(index, data) {
    this.EligibilityCriteriaModel.EligibilityDropDownCode =
      data.EligibilityDropDownCode;
    this.EligibilityCriteriaModel.Remarks = data.Remarks;
    this.index = index;
  }

  AddMoreRequiredDocument() {
    
    this.fourFormGroup.get("NameOfDocumentCode").markAsTouched();
    this.fourFormGroup.get("Remarkslist").markAsTouched();
    this.fourFormGroup.get("IsMandatory").markAsTouched();
    this.addListOfDocValidation();

    if (this.fourFormGroup.get("NameOfDocumentCode").valid && this.fourFormGroup.get("Remarkslist").valid && this.fourFormGroup.get("IsMandatory").valid) {
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

  RemoveRequiredDocument(index) {
    this.model.RequiredDocument.splice(index, 1);
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
  }

  touchSecond(stepper: MatStepper) {
    this.secondFormGroup.markAllAsTouched();
    //stepper.next();
  }

  touchThird() {
    this.ThirdFormGroup.markAllAsTouched();
  }

  // touchFour(stepper: MatStepper) {
  //   
  //   if (this.model.RequiredDocument.length > 0) {
  //     this.RemoveListOfDocValidation();
  //     stepper.next();
  //   } else {
  //     if (this.fourFormGroup.valid) {
  //       this._alertService.error("Add at least one List Of Required Document");
  //       this._commonService.ScrollingTop();
  //       stepper.previous();
  //     }
  //     this.fourFormGroup.markAllAsTouched();
  //   }
  // }
  touchFour(stepper: MatStepper) {
    
      this.RemoveListOfDocValidation();
      this.fourFormGroup.markAllAsTouched();
      if(this.fourFormGroup.valid) 
      {
        stepper.next();
      } 
    
  }

  touchFifth() {
    this.fifthformGroup.markAllAsTouched();
  }

  AddPhoneNumber(isEdit: boolean= false){
      if (isEdit) {
        this.isEditPhone = isEdit;
        this.EntryLookUpModel.MobileNo = this.phoneNumberString;
      }else {
        if (this.EntryLookUpModel.MobileNo) {

        if (this.isEditPhone) {
          this.isEditPhone = isEdit;
          this.phoneNumberString = String(this.EntryLookUpModel.MobileNo);
        } else {
          this.phoneNumberString = String(this.phoneNumberString ? (this.phoneNumberString + ', ' + this.EntryLookUpModel.MobileNo) : this.EntryLookUpModel.MobileNo);
        }
        this.EntryLookUpModel.MobileNo = '';
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

  editEntryClick(index, data) {
    
    if(this.EntryLookUpModel.Type==this.contactTypeEnum.DistrictLabel|| this.EntryLookUpModel.Type==this.contactTypeEnum.BlockLabel){
     this.getTahsilByBlock(data.BlockCode)
    }
    if(this.EntryLookUpModel.Type==this.contactTypeEnum.BlockLabel){
      this.getBlockByDistrict(data.DistrictCode)
     }
    if (data.NodelDepartmentCode) {
      this.EntryLookUpModel.NodelDepartmentCode = String(
        data.NodelDepartmentCode
      );
    }
    if (data.Type) {
      this.EntryLookUpModel.Type = String(
        data.Type
      );
    }
    if (data.DistrictCode) {
      this.EntryLookUpModel.DistrictCode = String(
        data.DistrictCode
      );
    }
    if (data.BlockCode) {
      this.EntryLookUpModel.BlockCode = String(
        data.BlockCode
      );
    }
    if (data.TahsilCode) {
      this.EntryLookUpModel.TahsilCode = String(
        data.TahsilCode
      );
    }
    this.EntryLookUpModel.NodelOfficerName = data.NodelOfficerName;
    // this.EntryLookUpModel.MobileNo = data.MobileNo;
    this.phoneNumberString = data.MobileNo;
    this.EntryLookUpModel.EmailId = data.EmailId;
    this.EntryLookUpModel.Designation = data.Designation;
    this.index = index;
  }
  getBlockByDistrict(code) {
    
    this._commonService.GetBlockByDistrict(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlBlockByDistrict = <DdlItemModel[]>data.Data;
          this.ddlBlockByDistrict.forEach(obj => {
            this.BlockItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getTahsilByBlock(code) {
    
    this._commonService.GetTahsilByBlock(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlTahsilByBlock = <DdlItemModel[]>data.Data;
          this.ddlTahsilByBlock.forEach(obj => {
            this.TahsilItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this.getSchemeDepartmentList(0);

    this._commonService.GetAllDDL(AppSetting.DDLKeyForScheme).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;

          this.dDLList.ddlContactPersonType.forEach(obj => {
            this.ContactPersonTypeItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlAdminDepartment.forEach(obj => {
            this.AdminItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlDepartment.forEach(obj => {
            this.NodelItems[obj.Value] = obj.Text;
          });

          this.dDLList.ddlSchemeEligibility.forEach(obj => {
            this.EligibilityItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeNameOfDocument.forEach(obj => {
            this.RequiredDocItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeListOfOtherDoc.forEach(obj => {
            this.OtherDocItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeListOfRequiredDoc.forEach(obj => {
            this.RequiredDoctypeItems[obj.Value] = obj.Text;
          });
          this.dDLList.RadioListOfRequiredDoc.forEach(obj => {
            this.RequiredDocmandatoryItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlDistrict.forEach(obj => {
            this.DistrictItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetHelpDocument() {

    this._commonService.GetHelpDocument(this.helpDocumentEnum.Scheme).subscribe(
      data => {
        if (data.IsSuccess) {
          this.helpDocument=data.Data;
        }else{
          this._alertService.error(data.Message);
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

  SaveClick() {
    
    const prevExpDate = this.model.ExpriedOnDate;
    if (this.model.ExpriedOnDate) {
      this.model.ExpriedOnDate = this.model.ExpriedOnDate.toLocaleString();
    }
    this.SixthformGroup.markAllAsTouched();
    this.iCustomValidation = true;
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.ThirdFormGroup.valid &&
      this.fourFormGroup.valid &&
      this.fifthformGroup.valid &&
      this.SixthformGroup.valid &&
      !this.secondFormGroup.hasError("notValid")
    ) {
      this.model.IsSaveAsDraft=false;
      this._schemeService
        .PostData(this.model, AppSetting.SchemeAddUrl)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["scheme"]);
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
    }else {
      this.model.ExpriedOnDate= prevExpDate ;
    }
  }

  saveAsDrafts(){
    this.model.IsSaveAsDraft=true;
    const prevExpDate = this.model.ExpriedOnDate;
    if (this.model.ExpriedOnDate) {
      this.model.ExpriedOnDate = this.model.ExpriedOnDate.toLocaleString();
    }
    this._schemeService.PostData(this.model, AppSetting.SchemeAddUrl)
    .subscribe(
      data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._router.navigate(["scheme"]);
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

  // removeValid(event : any){
    
  //   if (event.value === '45' || event.value === '48') {
  //     this.fourFormGroup.get("DepartmentWebsiteUrl").setValidators([Validators.required]);
  //     this.fourFormGroup.get("DepartmentWebsiteUrl").updateValueAndValidity();
  //   }
  //   else if( event.value === '44' || event.value === '49'){
  //     this.fourFormGroup.get("DepartmentWebsiteUrl").setValidators(null);
  //     this.fourFormGroup.get("DepartmentWebsiteUrl").updateValueAndValidity();
  //   }
  // }

  handleFileInput(event: any) {
    
    if (event.target.files.item(0).type.match("image/*") || event.target.files.item(0).type.match('application/pdf')) {
      if(event.target.files.item(0).type.match('application/pdf')){
        this.OtherDocumentModel.IsPdf=true;
      }
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.OtherDocumentModel.URL = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
    } else {
      this.fileValidationMsg = "only *images and pdf file accepted ";
    }
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

  handleFileForMoreDetail(event: any,isService: boolean=false) {
    
    if (event.target.files.item(0).type.match('application/pdf')) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if(isService){
          this.model.ServiceFeePdf = event.target.result;
        }else{
          this.model.BeneficiaryPdf = event.target.result;
        }
      };
      reader.readAsDataURL(event.target.files.item(0));
    } else {
      this.fileValidationMsg = "only *images and pdf file accepted ";
    }
  }

  //#region "MobileIcon"

  handleFileMobileIcon(event: any) {
    
    if (event.target.files.item(0).type.match("image/*")) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        
          this.model.MobileAppIcon = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
    } else {
      this.fileValidationMsg = "only *images icon file accepted ";
    }
  }

  //#endregion "MobileIcon"


  // handleFileInputforscheme(event: any) {
  //   if (event.target.files.item(0).type.match("image/*")) {
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.model.Scheme_URL = event.target.result;
  //     };
  //     reader.readAsDataURL(event.target.files.item(0));
  //   } else {
  //     this.fileValidationMsg = "only *images file accepted ";
  //   }
  // }

  myValidator(firstFormGroup: FormGroup) {
    let sum = 0;
    if(firstFormGroup.get(["OwnedBySate"])){
    sum +=
      Number(firstFormGroup.get(["OwnedBySate"]).value) +
      Number(firstFormGroup.get(["OwnedByCenter"]).value);
    return sum === 100 || sum === 0 ? null : { notValid: true };
  }else{
    return  null;
  }
  }
  resetModel() {
    this.model.OwnedByCenter = null;
    this.model.OwnedBySate = null;
    this.myValidator(this.firstFormGroup);
  }

  CompareFields(fg: FormGroup) {
    if(fg.get("FirstAppeallateCode")&& fg.get("SecondAppeallateCode") && fg.get("DesignatedOfficerReceivingDetailCode")){
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
    }else{
      return null;
    }
  }

  selectAll() {
    if (this.selectedAll < 0) {

      this.model.District = this.dDLList.ddlDistrict.map(function (a) {
        return a.Value;
      });
      this.selectedAll = 0;
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
      this.selectedAllHowToPay = 0;
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
      invalidUrl: true
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
      invalidName: true
    };
  }
  formGroupInit() {
    this.firstFormGroup = this.formBuilder.group(
      {
        ShortNameEnglish: [null, [ Validators.required , this.StringWithoutSpace]],
        SearchKeyWordOfDetails: [null],
        NameHindi: [null],
        ShortNameHindi: [null],
        NameEnglish: ["", Validators.required],
        AdminDepartmentCode: [null, Validators.required],
        NodelDepartmentCode: [null, Validators.required],
        ParentNodelDepartmentCode: [null, Validators.required],
        NodelOfficerName: [null],
        MobileNo: [null],
        MobileNoString: [null],
        EmailId: [null, Validators.compose([Validators.email])],
        Description: [null, Validators.required],
        Type: [null],
        OwnedBy: [null],
        OwnedBySate: [null],
        OwnedByCenter: [null],
        StartDate: [null],
        Logo: [null],
        Banner: [null],
        Designation: [null, Validators.required],
        DepartmentWebsiteUrl: [null],
        DistrictCode: [null],
        BlockCode: [null],
        TahsilCode: [null],
        ContactPersonType: [null],
      },
      { validator: this.myValidator }
    );

    this.secondFormGroup = this.formBuilder.group({
      FirstAppeallateCode: [null],
      SearchKeyWordOfExecution: [null],
      SecondAppeallateCode: [null],
      district: [null, Validators.required],
      programAreas: [null],
      ApplyForScheme: [null],
      TimeOfValidationInMonth: [null],
      ExpiredOn: [null],
      ExpriedOnDate: [null],
      ExpriedDurationInMonth: [null],
      IsListedRGDPSAct: [null],
      DeliveryTimeInDays: [null],
      DesignatedOfficerReceivingDetailCode: [null],
      SchemeType: [null],
    },
      { validator: this.CompareFields });

    this.ThirdFormGroup = this.formBuilder.group({
      CasteCategory: [null, Validators.required],
      Benificiarytext: [null],
      EligiblityText: [null],
      SearchKeyWordOfEligible: [null],
      IsbeneficiaryText: [null],
      IsEligibityText: [null],
      BeneficiaryCategory: [null, Validators.required],
      EligibilityDropDownCode: [null],
      Remarks: [null]
    });

    this.fourFormGroup = this.formBuilder.group({
      MadeOfAppling: [null, Validators.required],
      ModeofApplicationList: [null],
      // MadeOfApplingOnlineBoth: [null],
      // DepartmentWebsiteUrl: [null, this.UrlValidator],
      NameOfDocumentCode: [null, Validators.required],
      Remarkslist: [null, Validators.required],
      PlatformName: [null],
      AppURl: [null],
      //TypeOfDocumentCode: [null, Validators.required],
      IsMandatory: [null, Validators.required],
      IsServiceFees: [null, Validators.required],
     ServiceFeeAmount: [null,[Validators.min(1)]],
      HowToPayFeeCode: [null],
      ServiceFeePdf: [null],
      HelplineNo: [null],
      HowToApplyText: [null],
      IsHowToApply: [null],
      WebsiteUrl: [null, this.UrlValidator],
      MobileAppIcon: [null],
      MobileAppUrl: [null],
      SearchKeyWordOfHowToApply: [null]
    });

    this.fifthformGroup = this.formBuilder.group({
      DelivarebleCode: [null, Validators.required],
      deliveryPaymentDetail: [null, Validators.required],
      ModeOfDisbursmentCode: [null, Validators.required],
      ModeOfDisbursment: [null, Validators.required],
      PaymentDisbursmentFrequency: [null, Validators.required],
      PaymentDisbursmentFrequencyInstallments: [null],
      PaymentDisbursmentFrequencyTillAPeriod: [null],
      ModeOfDelivery: [null],
      BeneficiaryPdf: [null],
      ItemDetails: [null],
      WhatWillBeneficiaryGet: [null],
      IsWhatWillBeneficiaryGet: [null],
      SearchKeyWordOfBeneficiaryGet: [null],
      Category: [null],
      PaymentFrequency: [null],
      Remark: [null],
      PhysicalItem: [null]
    });

    this.SixthformGroup = this.formBuilder.group({
      ListOfOtherDocumentCode: [null],
      URL: [null],
      Remarksother: [null],
      OtherDocumentModelCode: [null],
      //Scheme_URL: [null, Validators.required],
      SearchKeyWordOfOtherDocument: [null]
    });
  }

  numberonly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  addDeliveryTimeInDaysValidation() {
    this.secondFormGroup
      .get("DeliveryTimeInDays")
      .setValidators([Validators.required]);
    this.secondFormGroup.get("DeliveryTimeInDays").updateValueAndValidity();
  }

  addDeliveryServiceValidation() {
    if (this.model.DelivarebleCode == 5 || this.model.DelivarebleCode == 6) {
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
    this.firstFormGroup

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
  AddGetBeneficiaryValidation() {
    this.fifthformGroup.get("Category").setValidators([Validators.required]);
    this.fifthformGroup.get("Category").updateValueAndValidity();
  }
  RemoveGetBeneficiaryValidation() {
    this.fifthformGroup.get("Category").setValidators(null);
    this.fifthformGroup.get("Category").updateValueAndValidity();
  }
  addListOfDocValidation() {
    this.fourFormGroup
      .get("NameOfDocumentCode")
      .setValidators([Validators.required]);
    this.fourFormGroup.get("NameOfDocumentCode").updateValueAndValidity();
    this.fourFormGroup.get("Remarkslist").setValidators([Validators.required]);
    this.fourFormGroup.get("Remarkslist").updateValueAndValidity();
    this.fourFormGroup.get("IsMandatory").setValidators([Validators.required]);
    this.fourFormGroup.get("IsMandatory").updateValueAndValidity();
  }
  RemoveListOfDocValidation() {
    this.fourFormGroup
      .get("NameOfDocumentCode")
      .setValidators(null);
    this.fourFormGroup.get("NameOfDocumentCode").updateValueAndValidity();
    this.fourFormGroup.get("Remarkslist").setValidators(null);
    this.fourFormGroup.get("Remarkslist").updateValueAndValidity();
    this.fourFormGroup.get("IsMandatory").setValidators(null);
    this.fourFormGroup.get("IsMandatory").updateValueAndValidity();
  }
}
