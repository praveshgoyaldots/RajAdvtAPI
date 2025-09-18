import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import {
  OrderEntryModel,
  OrderRelatedToModel,
  OrderRelatedToModelResult,
  OrderAttachmentModel,
  OrderTypeMasterModel
} from 'src/app/Shared/Model/orderlist.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { DDLModel, DdlItemModel, DocumentUrlModel } from 'src/app/Shared/Model/commonddl.model';
import { OrderEntryService } from 'src/app/Shared/Service/orderentry.service';
import { Router } from '@angular/router';
import { error } from 'util';
import {
  RequestServiceModel,
  ResponseServiceModel,
  ResponseListModel,
  RequestDialogModel,
  ResponseDialogModel
} from 'src/app/Shared/Model/service.model';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { RelatedtoDialogComponent } from '../relatedto-dialog/relatedto-dialog.component';

import { AppComponent } from 'src/app/app.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';
import { CommonDocModel, ConnectWithCMISFilterModel } from 'src/app/Shared/Model/general-model';
import { OrderEnum, OrderDocumentNoValidationEnum } from 'src/app/Shared/Enum/order.enum';
import { UserDepartmentViewModel, UserViewModel, UserDistrictViewModel } from 'src/app/Shared/Model/user-model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { StatusEnum } from 'src/app/Shared/Enum/scheme.enum';



@Component({
  selector: 'app-add-old-order',
  templateUrl: './add-old-order.component.html',
  styleUrls: ['./add-old-order.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AddOldOrderComponent implements OnInit {
  dDLList: DDLModel;
  model: OrderEntryModel;
  relatedToOrderList: DdlItemModel[] = [];
  ServiceModel: RequestServiceModel;
  helpDocumentEnum = HelpDocumentEnum;
  orderEnum = OrderEnum;
  ddlSubType: DdlItemModel[] = [];
  //helpDocument: string;
  responseReqModel: ConnectWithCMISFilterModel;
  tomorrow = new Date();

  department = new FormControl('', [Validators.required]);
  file = new FormControl('', [Validators.required]);
  orderNo = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  Sector = new FormControl("", [Validators.required]);
  SubType = new FormControl("", [Validators.required]);
  description = new FormControl('', null);
  searchCriteria = new FormControl('', [Validators.required, Validators.minLength(50)]);
  district = new FormControl(null);
  documentUrlList: DocumentUrlModel[] = [];
  tempDocumentUrlList: DocumentUrlModel[] = [];
  fileValidationMsg: string;
  orderRelatedTo: OrderRelatedToModel;
  moduleNameItems: { [index: string]: any } = {};
  yearItems: { [index: string]: any } = {};
  departmentItems: { [index: string]: any } = {};
  schemeItems: { [index: string]: any } = {};
  fileSizeValidationMsg: string;
  helpDocument: CommonDocModel;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  ddlDistrict: UserDistrictViewModel[];
  orderTypeData: OrderTypeMasterModel;
  orderDocumentNoValidationEnum = OrderDocumentNoValidationEnum;
  selectedAll = -1;
  selectedBenAll = -1;
  isShowAll: boolean;
  constructor(
    private readonly _orderEntryService: OrderEntryService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent,
    private _router: Router,
    private _dialog: MatDialog,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,

  ) {
    this._parentApi.setpagelayout('Add Government Document  :', 'keyboard_backspace', "Back To List", "order");
    this.model = new OrderEntryModel();
    this.model.LinkToScheme = String(AppSetting.LinkedToScheme);
    this.model.IsOldOrder = true;
    this.ServiceModel = new RequestServiceModel();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1 - 1);
    this.orderRelatedTo = new OrderRelatedToModel();
    this.model.IssueBy = AppSetting.OrderIssueByDefault;
    this.fileSizeValidationMsg = " (Max " +   localStorage.getItem("FileValidation") + " MB.)";
  }

  ngOnInit() {
    
    this.GetDDLList();
    this.GetHelpDocument();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.model.OfficeCode = Number(this.loginData.OfficeCode);
    this.getDepartment();
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

  selectAll() {
    
    if (this.selectedAll < 0) {
      this.model.DepartmentEffected = this.dDLList.ddlDepartment.map(
        function(a) {
          return a.Value;
        }
      );
      this.selectedAll = 1;
    } else {
      this.selectedAll = -1;
      this.model.DepartmentEffected = [];
    }
  }

  modelChanged() {
    
    if (!this.model.EffectForm) {
      this.model.EffectForm = this.model.Date;
    }
}

  selectBenificiaryAll() {
    
    if (this.selectedBenAll < 0) {
      this.model.BeneficiaryCategory = this.dDLList.ddlBeneficiaryCategory.map(
        function(a) {
          return a.Value;
        }
      );
      this.selectedBenAll = 1;
    } else {
      this.selectedBenAll = -1;
      this.model.BeneficiaryCategory = [];
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

  GetSubType(departmentCode: number|string= 0, typecode, isDeptClick= false) {
    
    if (typecode) {
      this._commonService.GetOrderSubTypeByTypeAndDepartment(Number(departmentCode), typecode).subscribe(
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
    if (isDeptClick) {
      this.getSchemeList(this.isShowAll ? 0 : departmentCode);
    }
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForOrderEntry).subscribe(
      data => {
        // tslint:disable-next-line: no-
        ;
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;


          this.dDLList.ddlOrderModuleName.forEach(obj => {
            this.moduleNameItems[obj.Value] = obj.Text;
          });

          if (this.dDLList.ddlCMISBudgetYear) {
            this.dDLList.ddlCMISBudgetYear.forEach(obj => {
              this.yearItems[obj.Value] = obj.Text;
            });
          }

          this.dDLList.ddlDepartmentForCMISReport.forEach(obj => {
            this.departmentItems[obj.Value] = obj.Text;
          });

          this.dDLList.ddlSchemeMaster.forEach(obj => {
            this.schemeItems[obj.Value] = obj.Text;
          });
        }
      },
      // tslint:disable-next-line: no-shadowed-variable
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  showAllScheme(event) {
    if (event.checked) {
      this.isShowAll=true;
      this.getSchemeList(0);
    } else {
      this.isShowAll=false;
      this.getSchemeList(this.model.DepartmentCode);
    }
  }


  getSchemeList(code) {
      this._commonService.GetSchemeList(Number(code), StatusEnum.Active).subscribe(
        (data) => {
          if (data.IsSuccess) {
            
            this.dDLList.ddlSchemeName = data.Data;
            if ( this.dDLList.ddlSchemeName) {
              this.dDLList.ddlSchemeName.forEach(obj => {
                this.schemeItems[obj.Value] = obj.Text;
              });
            }
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  onSelection() {
      this.model.IndividualBeneficiaryScheme = "";
      for (let index = 0; index < this.model.BenificiarySchemeIds.length; index++) {

          if (!this.model.IndividualBeneficiaryScheme) {
            this.model.IndividualBeneficiaryScheme =
              index +
              1 +
              ". " +
              this.schemeItems[this.model.BenificiarySchemeIds[index]];
          } else {
            this.model.IndividualBeneficiaryScheme =
              this.model.IndividualBeneficiaryScheme +
              "\n" +
              (index + 1) +
              ". " +
              this.schemeItems[this.model.BenificiarySchemeIds[index]];
          }
      }
  }

  Saveclick() {
    // tslint:disable-next-line: no-

    this.file.markAsTouched();
    this.orderNo.markAsTouched();
    this.date.markAsTouched();
    this.type.markAsTouched();
    this.title.markAsTouched();
     this.description.markAsTouched();
    this.department.markAsTouched();
    this.SubType.markAsTouched();
    this.Sector.markAsTouched();
    this.district.markAsTouched();
    this.searchCriteria.markAsTouched();
    // // stop here if form is invalid
    // tslint:disable-next-line: max-line-length
    if (this.orderNo.valid && this.district.valid && this.department.valid && this.file.valid && this.date.valid && this.type.valid && this.title.valid && this.description.valid && !this.fileValidationMsg &&  this.searchCriteria.valid && this.Sector.valid && this.SubType.valid) {


      if (this.model.Date) {
        let uTCDate = new Date(
          Date.UTC(new Date( this.model.Date).getFullYear(), new Date( this.model.Date).getMonth(), new Date( this.model.Date).getDate())
          ).toISOString();
          this.model.Date = uTCDate;
      }
      if (this.model.EffectForm) {
        let uTCDate = new Date(
          Date.UTC(new Date( this.model.EffectForm).getFullYear(), new Date( this.model.EffectForm).getMonth(), new Date( this.model.EffectForm).getDate())
          ).toISOString();
          this.model.EffectForm = uTCDate;
      }
      //  this.modelChanged();
      this._orderEntryService.AddOrderEntry(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(['order']);
          } else {
            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
          }
        },
        // tslint:disable-next-line: no-shadowed-variable
        error => {
          this._commonService.ScrollingTop();
          console.log(error);
          this._alertService.error(error.error.ExceptionMessage);
        }
      );
    }
  }

  AddMoreItems() {
    if (this.orderRelatedTo.ModuleId) {
      this.orderRelatedTo.ModuleName = this.moduleNameItems[this.orderRelatedTo.ModuleId];
    }
    if (this.orderRelatedTo.YearValue) {
      this.orderRelatedTo.YearText = this.yearItems[this.orderRelatedTo.YearValue];
    }
    if (this.orderRelatedTo.DepartmentId) {
      this.orderRelatedTo.DepartmentName = this.departmentItems[this.orderRelatedTo.DepartmentId];
    }
    this.model.RelatedToOrderParameterList.push(this.orderRelatedTo);
    this.orderRelatedTo = new OrderRelatedToModel();
  }

  RemoveClick(index) {
    this.model.RelatedToOrderParameterList.splice(index, 1);
  }

  GetRelatedToResult(ModuleName,DepartmentId, DepartmentName, YearText, index) {
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

    const _dialogRef = this._dialog.open(RelatedtoDialogComponent, {
      width: '1000px',
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

  GetHelpDocument() {
    this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.helpDocument = <CommonDocModel>data.Data;
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  downloadPdf(Url, isHelpDoc : Boolean= false) {
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

  handleFileInput(files: FileList) {
    this.documentUrlList = [];
    this.model.AttachmentList = [];
    for (let index = 0; index < files.length; index++) {

      if (files.item(index).type.match('application/pdf')) {
        if (files.item(index).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.documentUrlList.push(new DocumentUrlModel());

            this.documentUrlList[index].Url = <string>reader.result;
            this.documentUrlList[index].Extension = (files[index].name.split('.'))[1];
            if (this.documentUrlList[index].Extension === 'pdf') {
              this.documentUrlList[index].DisplayName = files[index].name;
            }

            this.model.AttachmentList.push(new OrderAttachmentModel());
            this.model.AttachmentList[index].AttachmentsName = files[index].name;
            this.model.AttachmentList[index].Path = <string>reader.result;
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.documentUrlList = [];
          this.model.AttachmentList = [];
          this.fileValidationMsg = this.fileSizeValidationMsg;
          return;
        }

      } else {
        this.fileValidationMsg = 'only *pdf';
        this.documentUrlList = [];
        this.model.AttachmentList = [];
        return;
      }

    }

    this.fileValidationMsg = '';
    this.model.File = files;

  }

  RemoveImageFile(i) {

    this.documentUrlList.splice(i, 1);
   // this.Imeges.slice(i, 1);
  }

  checkValid(data) {
    
this.orderTypeData = this.dDLList.OrderWithRequiredType.find(x => x.Code === Number(data));
if (this.orderTypeData.IsDateMandatory) {
this.date.setValidators([Validators.required]);
this.date.updateValueAndValidity();
} else {
  this.date.setValidators(null);
this.date.updateValueAndValidity();
}
if (this.orderTypeData.IsDocumentNoMandatory === this.orderDocumentNoValidationEnum.Yes) {
  this.orderNo.setValidators([Validators.required]);
  this.orderNo.updateValueAndValidity();
} else {
  this.orderNo.setValidators(null);
this.orderNo.updateValueAndValidity();
}
  }


}
