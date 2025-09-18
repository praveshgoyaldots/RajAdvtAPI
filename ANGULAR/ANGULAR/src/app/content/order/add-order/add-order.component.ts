
import { Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import {  OrderEntryModel,  OrderRelatedToModel,  OrderRelatedToModelResult,  OrderAttachmentModel} from 'src/app/Shared/Model/orderlist.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { DDLModel, DdlItemModel, DocumentUrlModel } from 'src/app/Shared/Model/commonddl.model';
import { OrderEntryService } from 'src/app/Shared/Service/orderentry.service';
import { Router } from '@angular/router';
import {  RequestServiceModel,  ResponseServiceModel,  ResponseListModel,  RequestDialogModel,  ResponseDialogModel} from 'src/app/Shared/Model/service.model';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { RelatedtoDialogComponent } from '../relatedto-dialog/relatedto-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { Component, OnInit } from '@angular/core';
import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AddOrderComponent implements OnInit {
  dDLList: DDLModel;
  model: OrderEntryModel;
  relatedToOrderList: DdlItemModel[] = [];
  ServiceModel: RequestServiceModel;
  helpDocumentEnum=HelpDocumentEnum;
  helpDocument: string;
  responseReqModel: RequestDialogModel;
  tomorrow = new Date();
  department = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  documentUrlList: DocumentUrlModel[] = [];
  tempDocumentUrlList: DocumentUrlModel[] = [];
  fileValidationMsg: string;
  orderRelatedTo: OrderRelatedToModel;
  moduleNameItems: { [index: string]: any } = {};
  yearItems: { [index: string]: any } = {};
  departmentItems: { [index: string]: any } = {};
  constructor(
    private readonly _orderEntryService: OrderEntryService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this._parentApi.setpagelayout('Add Offline Documents :', 'keyboard_backspace', 'Back To List', 'order');
    this.model = new OrderEntryModel();
    this.ServiceModel = new RequestServiceModel();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1 - 1);
    this.orderRelatedTo = new OrderRelatedToModel();
    this.model.IssueBy = AppSetting.OrderIssueByDefault;
    this.model.LinkToScheme=AppSetting.LinkedToScheme;
  }

  ngOnInit() {
    this.GetDDLList();
    this.GetHelpDocument();
  }

  GetDDLList() {
    
    this._commonService.GetAllDDL(AppSetting.DDLKeyForOrderEntry).subscribe(
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
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetHelpDocument() {

    this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(
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

  Saveclick() {

    this.date.markAsTouched();
    this.type.markAsTouched();
    this.title.markAsTouched();
    this.description.markAsTouched();
    this.department.markAsTouched();
    // // stop here if form is invalid
    if (this.date.valid && this.department.valid && this.type.valid && this.title.valid && this.description.valid && !this.fileValidationMsg) {

      const prevDate = this.model.Date;
      const prevEffDate = this.model.EffectForm;
      if (this.model.Date) {
        this.model.Date = this.model.Date.toLocaleString();
      }
      if (this.model.EffectForm) {
        this.model.EffectForm = this.model.EffectForm.toLocaleString();
      }
      this._orderEntryService.AddOrderEntry(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(['order']);
          } else {
            this.model.Date = prevDate;
            this.model.EffectForm = prevEffDate;
            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
          }
        },
        // tslint:disable-next-line: no-shadowed-variable
        error => {
          this.model.Date = prevDate;
          this.model.EffectForm = prevEffDate;
          this._commonService.ScrollingTop();
          console.log(error);
          this._alertService.error(error.message);
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

  GetRelatedToResult(ModuleName, DepartmentName, YearText, index) {
    // tslint:disable-next-line: no-
    ;
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

  handleFileInput(files: FileList) {
    
    this.documentUrlList = [];
    this.model.AttachmentList = [];
    for (let index = 0; index < files.length; index++) {

      if (files.item(index).type.match('application/pdf')) {
        if (files.item(index).size < 5000000) {
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
          this.fileValidationMsg = 'File size must be less than 5MB...!';
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
  }
}
