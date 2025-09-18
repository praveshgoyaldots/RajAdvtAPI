import { Component, OnInit } from "@angular/core";
import { DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import {
  OrderGenerateMasterModel,
  OrderRelatedToParameterModelLookup,
  AttachmentsLookupModel,
  OrderGenerateMasterViewModel
} from "src/app/Shared/Model/generate-order.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { GenerateOrderService } from "src/app/Shared/Service/generate-order.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import {
  RequestServiceModel,
  ResponseDialogModel,
  RequestDialogModel,
  ResponseServiceModel
} from "src/app/Shared/Model/service.model";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatStepper,
  MatDialog
} from "@angular/material";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "src/app/Shared/Model/format-datepicker";
import { GenerateOrderEnum } from "src/app/Shared/Enum/generate-order.enum";
import {
  UserViewModel,
  UserDepartmentViewModel,
  UserDistrictViewModel
} from "src/app/Shared/Model/user-model";
import { UserService } from "src/app/Shared/Service/user.service";
import { RelatedtoDialogComponent } from "../../relatedto-dialog/relatedto-dialog.component";
import { OrderRelatedToModelResult } from "src/app/Shared/Model/orderlist.model";
import { DepartmentReferenceModel } from "src/app/Shared/Model/Master/department-reference.model";
import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';
import { CommonDocModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: "app-generate-order-add-update",
  templateUrl: "./generate-order-add-update.component.html",
  styleUrls: ["./generate-order-add-update.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class GenerateOrderAddUpdateComponent implements OnInit {
  dDLList: DDLModel;
  model: OrderGenerateMasterModel;
  fileValidationMsg: string;
  iCustomValidation = false;
  minDate: Date = new Date();
  tomorrow = new Date();
  isLinear = true;
  isCCreferenceTextAutofill: boolean = false;
  ServiceModel: RequestServiceModel;
  orderRelatedTo: OrderRelatedToParameterModelLookup;
  attachmentsLookup: AttachmentsLookupModel;
  responseReqModel: RequestDialogModel;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  fifthformGroup: FormGroup;
  sixthformGroup: FormGroup;
  sevenformGroup: FormGroup;
  index = -1;
  temp: string;
  generateOrderEnum = GenerateOrderEnum;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  moduleNameItems: { [index: string]: any } = {};
  yearItems: { [index: string]: any } = {};
  departmentItems: { [index: string]: any } = {};
  CCReferenceListItems: { [index: string]: any } = {};
  CCReferenceListHindiItems: { [index: string]: any } = {};
  fileSizeValidationMsg: string;
  fileIsNull: boolean = false;
  selectedAll = -1;
  ddlCCcategory: DdlItemModel[] = [];
  ddlSubType: DdlItemModel[] = [];
  ddlCCReferencs: DepartmentReferenceModel[] = [];
  helpDocumentEnum = HelpDocumentEnum;
  helpDocument: CommonDocModel;
  ddlDistrict: UserDistrictViewModel[];
  
  constructor(
    private _parentApi: AppComponent,
    private readonly _generateOrderService: GenerateOrderService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute
  ) {
    this.model = new OrderGenerateMasterModel();
    this._parentApi.setpagelayout(
      "Generate New Document (Online) :",
      "keyboard_backspace",
      "Back To List",
      "order/generateorder"
    );
    this.ServiceModel = new RequestServiceModel();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1 - 1);
    this.orderRelatedTo = new OrderRelatedToParameterModelLookup();
    this.attachmentsLookup = new AttachmentsLookupModel();
    this.model.IssueBy = AppSetting.OrderIssueByDefault;
    this.model.LinkToScheme = AppSetting.LinkedToScheme;
    this.model.Content = "";
    this.model.Date = new Date();
    this.model.EffectForm = new Date();
    this.model.IsHindi = Boolean(this.generateOrderEnum.DefaultEnglish);
    this.model.Id = this._route.snapshot.params.id;
    this.model.IsByOrderOfGovernor = false;
    this.model.IsWithinSecretariat = false;
    if (this.model.Id) {
      this.GetById();
    }
    this.fileSizeValidationMsg =
      "Attachment must be less than " +
      localStorage.getItem("FileValidation") +
      " MB.";
  }

  ngOnInit() {

    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.model.OfficeCode= Number(this.loginData.OfficeCode);
    this.GetDDLList();
    this.formGroupInit();
    this.getDepartment();
    this.GetHelpDocument();
    this.getDistrict();
  }

  getDistrict() {
    this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  onSelection() {
    if (this.isCCreferenceTextAutofill) {
      this.model.CCReferenceListText = "";
      for (let index = 0; index < this.model.CCReferenceList.length; index++) {
        if (this.model.IsHindi) {
          if (!this.model.CCReferenceListText) {
            this.model.CCReferenceListText =
              index +
              1 +
              ". " +
              this.CCReferenceListHindiItems[this.model.CCReferenceList[index]];
          } else {
            this.model.CCReferenceListText =
              this.model.CCReferenceListText +
              "\n" +
              (index + 1) +
              ". " +
              this.CCReferenceListHindiItems[this.model.CCReferenceList[index]];
          }
        } else {
          if (!this.model.CCReferenceListText) {
            this.model.CCReferenceListText =
              index +
              1 +
              ". " +
              this.CCReferenceListItems[this.model.CCReferenceList[index]];
          } else {
            this.model.CCReferenceListText =
              this.model.CCReferenceListText +
              "\n" +
              (index + 1) +
              ". " +
              this.CCReferenceListItems[this.model.CCReferenceList[index]];
          }
        }
      }
    }
  }

  AddMoreRelatedTo() {
    if (this.orderRelatedTo.ModuleId) {
      this.orderRelatedTo.ModuleName = this.moduleNameItems[
        this.orderRelatedTo.ModuleId
      ];
    }
    if (this.orderRelatedTo.YearValue) {
      this.orderRelatedTo.YearText = this.yearItems[
        this.orderRelatedTo.YearValue
      ];
    }
    if (this.orderRelatedTo.DepartmentId) {
      this.orderRelatedTo.DepartmentName = this.departmentItems[
        this.orderRelatedTo.DepartmentId
      ];
    }
    this.model.RelatedToOrderParameterList.push(this.orderRelatedTo);
    this.orderRelatedTo = new OrderRelatedToParameterModelLookup();
  }

  selectAll() {
    
    if (this.selectedAll < 0) {
      this.model.DepartmentEffectedCodes = this.dDLList.ddlDepartment.map(
        function(a) {
          return a.Value;
        }
      );
      this.selectedAll = 1;
    } else {
      this.selectedAll = -1;
      this.model.DepartmentEffectedCodes = [];
    }
  }

  RemoveClick(index) {
    this.model.RelatedToOrderParameterList.splice(index, 1);
  }

  AddMoreAttachment() {

    this.AddAttachmentValidation();
    this.sixthformGroup.markAllAsTouched();
    if (
      this.sixthformGroup.valid &&
      this.fileValidationMsg.length == 0 &&
      this.fileIsNull
    ) {
      this.model.AttachmentList.push(this.attachmentsLookup);
      this.RemoveAttachmentValidation();
      this.attachmentsLookup = new AttachmentsLookupModel();
      this.fileIsNull = false;
    }
  }

  RemoveAttachmentClick(index) {
    this.model.AttachmentList.splice(index, 1);
  }

  DateOfIssueClick() {
    this.model.EffectForm = this.model.Date;
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.GenerateOrderDDLKey).subscribe(
      data => {
      
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;

          this.dDLList.ddlOrderModuleName.forEach(obj => {
            this.moduleNameItems[obj.Value] = obj.Text;
          });

          if (this.dDLList.ddlOrderRelatedToYear) {
            this.dDLList.ddlOrderRelatedToYear.forEach(obj => {
              this.yearItems[obj.rowno] = obj.particulars;
            });
          }

          this.dDLList.ddlOrderRelatedToDepartment.forEach(obj => {
            this.departmentItems[obj.prj_dept] = obj.particulars;
          });

          this.dDLList.ddlCCReference.forEach(obj => {
            this.CCReferenceListItems[obj.Code] = obj.Reference;
          });
          this.dDLList.ddlCCReference.forEach(obj => {
            this.CCReferenceListHindiItems[obj.Code] = obj.ReferenceHindi;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
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

  GetCCcategoryByDepartment(code) {
    if (code) {
      this._commonService.GetCCcategoryByDepartment(code).subscribe(
        data => {
          if (data.IsSuccess) {
            this.ddlCCcategory = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlCCcategory = null;
    }
  }

  GetSubType(data) {
    
    if (data == this.generateOrderEnum.TypeCircularCode) {
      this.RemoveValidationOnSubjectn();
    } else {
      this.AddValidationOnSubject();
    }
    if (data) {
      this._commonService.GetOrderSubTypeByType(data).subscribe(
        data => {
          if (data.IsSuccess) {
            this.ddlSubType = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlSubType = null;
    }
  }

  GetAllreferenceByDepartment(){
 
    if (this.model.DepartmentCode) {
      this._commonService.GetReferenceByDepartment(Number(this.model.DepartmentCode)).subscribe(
        data => {
      
          if (data.IsSuccess) {
            this.ddlCCReferencs = <DepartmentReferenceModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlCCReferencs = null;
    }
  }

  cCCategoryClick(data){
 
if (Number(data)>0) {
this.GetReferenceListByCCCategory(data);
}else{
  this.GetAllreferenceByDepartment();
}

  }

  GetReferenceListByCCCategory(data) {
 
    if (data) {
      this._commonService.GetCCReferenceByCCCategory(data).subscribe(
        data => {
       
          if (data.IsSuccess) {
            this.ddlCCReferencs = <DepartmentReferenceModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlCCReferencs = null;
    }
  }

  handleFileLogo(event: any) {
    if (event.target.files.item(0).type.match("image/*") || event.target.files.item(0).type.match("application/pdf")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        if (event.target.files.item(0).type.match('application/pdf')){
          this.attachmentsLookup.IsPdf = true;
        }
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.attachmentsLookup.AttachmentUrl = event.target.result;
        };
        reader.readAsDataURL(event.target.files.item(0));
        this.fileValidationMsg = "";
        this.fileIsNull = true;
      } else {
        this.fileValidationMsg = this.fileSizeValidationMsg;
      }
    } else {
      this.fileValidationMsg = "only *images and pdf file accepted ";
    }
  }

  downloadFaqDocPdf(Url) {
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = 'Docs';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

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

  touchThird(stepper: MatStepper) {
    if (!this.thirdFormGroup.valid) {
      this.thirdFormGroup.markAllAsTouched();
    }
  }

  touchFourth(stepper: MatStepper) {
    if (!this.fourFormGroup.valid) {
      this.fourFormGroup.markAllAsTouched();
    }
  }

  touchFifth(stepper: MatStepper) {
    if (!this.fifthformGroup.valid) {
      this.fifthformGroup.markAllAsTouched();
    }
  }

  touchSixth(stepper: MatStepper) {
    this.RemoveAttachmentValidation();
    if (!this.sixthformGroup.valid) {
      this.sixthformGroup.markAllAsTouched();
    }
  }

  touchSeventh(stepper: MatStepper) {
    if (!this.sevenformGroup.valid) {
      this.sevenformGroup.markAllAsTouched();
    }
  }

  AddAttachmentValidation() {
    this.sixthformGroup
      .get("AttachmentUrl")
      .setValidators([Validators.required]);
    this.sixthformGroup.get("AttachmentUrl").updateValueAndValidity();
  }
  RemoveAttachmentValidation() {
    this.sixthformGroup.get("AttachmentUrl").setValidators(null);
    this.sixthformGroup.get("AttachmentUrl").updateValueAndValidity();
  }

  formGroupInit() {
    this.firstFormGroup = this.formBuilder.group({
      Type: [null, Validators.required],
      Date: [null],
      OrderNo: [null],
      Title: [null, Validators.required],
      Description: [null, Validators.required],
      EffectForm: [null],
      ReferenceLink: [null],
      IssueBy: [null],
      IndividualBeneficiaryScheme: [null],
      SubTypeCode: [null],
      ReferenceNumber: [null],
      DepartmentCode: [null, Validators.required],
      FileNumber: [null],
      LinkToScheme: [null],
      SectorCodes: [null],
      DepartmentEffectedCodes: [null],
      ModuleId: [null],
      YearValue: [null],
      DepartmentId: [null],
      DistrictCode: [null, Validators.required],
      OfficeCode: [null]
    });

    this.secondFormGroup = this.formBuilder.group({
      Subject: [null], //[null, Validators.required],
      Reference: [null],
      Context: [null]
    });

    this.thirdFormGroup = this.formBuilder.group({
      Content: [null, Validators.required],
      IsByOrderOfGovernor: [null],
      IsByOrderOfGovernortext: [null],
      AuthoritySignatureCode: [null, Validators.required]
    });

    this.fourFormGroup = this.formBuilder.group({
      CCCategoryCode: [null],
      CCReferenceList: [null],
      CCSignatureCode: [null],
      CCReferenceListText: [null],
      CCreferenceTextAutofill: [null]
    });

    this.fifthformGroup = this.formBuilder.group({
      OrdGenrateRemarks: [null],
      SearchCriteria: [null]
    });

    this.sixthformGroup = this.formBuilder.group({
      AttachmentUrl: [null],
      Description: [null],
      IsAnnexure: [null]
    });

    this.sevenformGroup = this.formBuilder.group({
      AddressTo: [null],
      IsWithinSecretariat: [null]
    });
  }

  saveClick() {
    this.model.IsSaveAsDraft = false;
    this.firstFormGroup.markAllAsTouched();
    this.sevenformGroup.markAllAsTouched();
    this.thirdFormGroup.markAllAsTouched();
    this.fourFormGroup.markAllAsTouched();
    this.fifthformGroup.markAllAsTouched();
    this.sixthformGroup.markAllAsTouched();
    this.sevenformGroup.markAllAsTouched();
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.fourFormGroup.valid &&
      this.fifthformGroup.valid &&
      this.sixthformGroup.valid &&
      this.sevenformGroup
    ) {
      this.Save();
    }
  }

  saveAsDrafts() {

    this.model.IsSaveAsDraft = true;
    this.firstFormGroup.controls.Type.markAsTouched();
    this.firstFormGroup.controls.DepartmentCode.markAsTouched();
    if (
      this.firstFormGroup.controls.Type.valid &&
      this.firstFormGroup.controls.DepartmentCode.valid
    ) {
      this.Save();
    }
  }

  Save() {

    const prevDate = this.model.Date;
    const prevEffDate = this.model.EffectForm;
    if (this.model.Id) {
      this._generateOrderService.Edit(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            if (!this.model.IsSaveAsDraft) {
              this._router.navigate(["order/generateorder"]);
            }
          } else {
            this.model.Date = prevDate;
            this.model.EffectForm = prevEffDate;
            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
          }
        },
        error => {
          this.model.Date = prevDate;
          this.model.EffectForm = prevEffDate;
          this._commonService.ScrollingTop();
          this._alertService.error(error.message);
        }
      );
    } else {
      this._generateOrderService.Add(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["order/generateorder"]);
          } else {
            this.model.Date = prevDate;
            this.model.EffectForm = prevEffDate;
            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
          }
        },
        error => {
          this.model.Date = prevDate;
          this.model.EffectForm = prevEffDate;
          this._commonService.ScrollingTop();
          this._alertService.error(error.message);
        }
      );
    }
  }

  GetRelatedToResult(ModuleName, DepartmentName, YearText, index) {
    this.responseReqModel = new RequestDialogModel();
    this.responseReqModel.ResponseServiceModel = new ResponseServiceModel();
    if (YearText) {
      this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_year = YearText;
    } else {
      this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_year =
        AppSetting.OrderRelatedToResultKey;
    }
    if (DepartmentName) {
      this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_ndept = DepartmentName;
    } else {
      this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_ndept =
        AppSetting.OrderRelatedToResultKey;
    }
    if (ModuleName) {
      this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pmodulename = ModuleName;
    } else {
      this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pmodulename =
        AppSetting.OrderRelatedToResultKey;
    }

    this.responseReqModel.index = index;

    const _dialogRef = this._dialog.open(RelatedtoDialogComponent, {
      width: "1000px",
      data: this.responseReqModel
    });
    _dialogRef.afterClosed().subscribe((result: ResponseDialogModel) => {
      if (result) {
        this.model.RelatedToOrderParameterList[result.index].RelatedToResult = <
          OrderRelatedToModelResult
        >result.resultModel;
      }
    });
  }

  GetById() {
    this._generateOrderService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          let temp = <OrderGenerateMasterViewModel>data.Data;
          this.model = <OrderGenerateMasterModel>data.Data;

          if (this.model.LinkToScheme) {
            this.model.LinkToScheme = String(this.model.LinkToScheme);
          }
          if (this.model.SubTypeCode) {
            this.model.SubTypeCode = String(this.model.SubTypeCode);
          }
          if (this.model.CCCategoryCode) {
            this.model.CCCategoryCode = String(this.model.CCCategoryCode);
          }
          this.cCCategoryClick(this.model.CCCategoryCode);
          if (temp.DepartmentEffectedIds) {
            this.model.DepartmentEffectedCodes = temp.DepartmentEffectedIds.split(
              ","
            );
          }
          if (temp.SectorIds) {
            this.model.SectorCodes = temp.SectorIds.split(",");
          }
          if (this.model.DepartmentCode) {
            this.GetCCcategoryByDepartment(this.model.DepartmentCode);
            this.model.DepartmentCode = String(this.model.DepartmentCode);
          }
          if (this.model.Type) {
            this.GetSubType(this.model.Type);
            this.model.Type = String(this.model.Type);
          }
          if (this.model.IssueBy) {
            this.model.IssueBy = String(this.model.IssueBy);
          }
          if (this.model.Date) {
            this.model.Date = new Date(this.model.Date);
          }
          if (this.model.AuthoritySignatureCode) {
            this.model.AuthoritySignatureCode = String(
              this.model.AuthoritySignatureCode
            );
          }
          if (temp.CCReferenceListIds) {
            this.model.CCReferenceList = temp.CCReferenceListIds;
          }
          if (this.model.CCSignatureCode) {
            this.model.CCSignatureCode = String(this.model.CCSignatureCode);
          }
          if (this.model.DistrictCode) {
            this.model.DistrictCode = String(this.model.DistrictCode);
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  AddValidationOnSubject() {
    this.secondFormGroup.get("Subject").setValidators([Validators.required]);
    this.secondFormGroup.get("Subject").updateValueAndValidity();
  }

  RemoveValidationOnSubjectn() {
    this.secondFormGroup.get("Subject").setValidators(null);
    this.secondFormGroup.get("Subject").updateValueAndValidity();
  }


GetHelpDocument() {
  this._commonService.GetHelpDocument(this.helpDocumentEnum.GenerateOrder).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.helpDocument = <CommonDocModel>data.Data;
      }else{
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

downloadDoc(Url, isHelpDoc : Boolean= false) {

  const linkSource = Url;
  const downloadLink = document.createElement("a");
    if (isHelpDoc) {
      downloadLink.href = linkSource;
      downloadLink.download = "Help Document";
      downloadLink.click();
    }else{
      downloadLink.href = linkSource;
      downloadLink.download = "Blank Document";
      downloadLink.click();
    }

}
}
