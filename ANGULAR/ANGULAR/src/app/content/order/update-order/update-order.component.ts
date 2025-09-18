import { CommonDocModel, ConnectWithCMISFilterModel } from './../../../Shared/Model/general-model';
import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import {
  DDLModel,
  DdlItemModel,
  DocumentUrlModel
} from "src/app/Shared/Model/commonddl.model";
import {
  OrderEntryModel,
  OrderRelatedToModel,
  OrderRelatedToModelResult,
  OrderWithRelatedToViewModel,
  OrderAttachmentModel,
  OrderTypeMasterModel
} from "src/app/Shared/Model/orderlist.model";
import {
  RequestServiceModel,
  RequestDialogModel,
  ResponseServiceModel,
  ResponseDialogModel
} from "src/app/Shared/Model/service.model";
import { Validators, FormControl } from "@angular/forms";
import { OrderEntryService } from "src/app/Shared/Service/orderentry.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { RelatedtoDialogComponent } from "../relatedto-dialog/relatedto-dialog.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { strictEqual } from "assert";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "src/app/Shared/Model/format-datepicker";
import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';
import { OrderEnum, OrderDocumentNoValidationEnum } from 'src/app/Shared/Enum/order.enum';
import { UserDistrictViewModel, UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { StatusEnum } from 'src/app/Shared/Enum/scheme.enum';

@Component({
  selector: "app-update-order",
  templateUrl: "./update-order.component.html",
  styleUrls: ["./update-order.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class UpdateOrderComponent implements OnInit {
  dDLList: DDLModel;
  model: OrderEntryModel;
  relatedToOrderList: DdlItemModel[] = [];
  ServiceModel: RequestServiceModel;

  responseReqModel: ConnectWithCMISFilterModel;
  tomorrow = new Date();
  helpDocumentEnum = HelpDocumentEnum;
  orderEnum = OrderEnum;
  ddlSubType: DdlItemModel[] = [];
  //helpDocument: string;
  department = new FormControl("", [Validators.required]);
  date = new FormControl("", [Validators.required]);
  type = new FormControl("", [Validators.required]);
  title = new FormControl("", [Validators.required]);
  Sector = new FormControl("", [Validators.required]);
  SubType = new FormControl("", [Validators.required]);
  description = new FormControl("", null);
  district = new FormControl(null);
  searchCriteria = new FormControl('', [Validators.required, Validators.minLength(50)]);
  id: number;
  relatedToOrderParameterList: OrderRelatedToModel[] = [];
  documentUrlList: DocumentUrlModel[] = [];
  tempDocumentUrlList: DocumentUrlModel[] = [];
  fileValidationMsg: string;
  orderRelatedTo: OrderRelatedToModel;
  ddlDepartment: UserDepartmentViewModel[];

  moduleNameItems: { [index: string]: any } = {};
  yearItems: { [index: string]: any } = {};
  departmentItems: { [index: string]: any } = {};
  schemeItems: { [index: string]: any } = {};
  fileSizeValidationMsg: string;
  helpDocument: CommonDocModel;
  ddlDistrict: UserDistrictViewModel[];
  loginData: UserViewModel;
  orderTypeData: OrderTypeMasterModel;
  orderDocumentNoValidationEnum = OrderDocumentNoValidationEnum;
  selectedAll = -1;
  selectedBenAll = -1;
  isShowAll: boolean;
  callBackUrl:string;

  constructor(
    private _parentApi: AppComponent,
    private readonly _orderEntryService: OrderEntryService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private _router: Router,
    private _dialog: MatDialog,
    private readonly _route: ActivatedRoute,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
  ) {

    this.callBackUrl=this._route.snapshot.params.report;
    if (this.callBackUrl) {
    var datas=JSON.parse(sessionStorage.getItem("EntryInJankalyan")) ;
      this._parentApi.setpagelayout(
        "Update Government Document :",
        "keyboard_backspace",
        "Back To Entry In Jankalyan Report",
        "/master/"+ this.callBackUrl + '/' + datas.DepartmentName +'/'+ datas.ModuleName + '/'+ datas.DepartmentCode + '/' + datas.ModuleId  + (datas.IsDashBoard? "/dsb/":'/report/') + datas.NumberOfEntry
      );
    } else {

    this._parentApi.setpagelayout(
      "Update Government Document :",
      "keyboard_backspace",
      "Back To List",
      "order"
    );
  }
    
    this.model = new OrderEntryModel();
    this.ServiceModel = new RequestServiceModel();
    this.dDLList =new DDLModel();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.model.RelatedToOrderParameterList.push(new OrderRelatedToModel());
    this.orderRelatedTo = new OrderRelatedToModel();
    this.id = this._route.snapshot.params.id;
    this.model.LinkToScheme = AppSetting.LinkedToScheme;
    this.fileSizeValidationMsg = "( Max " +   localStorage.getItem("FileValidation") + " MB.)";
  }

  ngOnInit() {
    
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetDDLList();
    //this.GetById();
    this.GetHelpDocument();
    this.getDistrict();
    this.getDepartment();
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

  GetSubType(departmentCode: number|string = 0, typecode, isDeptClick= false) {
    
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

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForOrderEntry).subscribe(
      data => {
        
        this.GetById();
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
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  modelChanged() {
    
    if(!this.model.EffectForm)
    {
      this.model.EffectForm = this.model.Date;
    }
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

  GetById() {
    
    this._orderEntryService.GetByID(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          let temp = data.Data;
          temp = <OrderWithRelatedToViewModel>data.Data;
          this.model = <OrderEntryModel>temp.OrderMasterData;
          this.checkValid(this.model.Type);
          this.model.OfficeCode = Number(this.loginData.OfficeCode);
          if (this.model.LinkToScheme) {
            this.model.LinkToScheme = String(this.model.LinkToScheme);
          }
          if (this.model.DistrictCode) {
            this.model.DistrictCode = String(this.model.DistrictCode);
          }
          if (temp.OrderMasterData.BeneficiaryCategoryIds) {
            this.model.BeneficiaryCategory = temp.OrderMasterData.BeneficiaryCategoryIds.split(
              ","
            );
          }
          if (temp.OrderMasterData.DepartmentEffectedIds) {
            this.model.DepartmentEffected = temp.OrderMasterData.DepartmentEffectedIds.split(
              ","
            );
          }
          if (temp.OrderMasterData.SectorIds) {
            this.model.Sector = temp.OrderMasterData.SectorIds.split(",");
          }
          if (this.model.DepartmentCode) {
            this.model.DepartmentCode = String(this.model.DepartmentCode);
          }
          if (this.model.BenificiarySchemeIds) {
            this.model.BenificiarySchemeIds = temp.OrderMasterData.BenificiarySchemeIds.split(
              ","
            );
          }
          if (this.model.Type) {
            this.GetSubType(Number(this.model.DepartmentCode), this.model.Type);
            this.model.Type = String(this.model.Type);
          }
          if (this.model.SubTypeCode) {
            this.model.SubTypeCode = String(this.model.SubTypeCode);
          }
          if (this.model.IssueBy) {
            this.model.IssueBy = String(this.model.IssueBy);
          }
          if (this.model.Date) {
            this.model.Date = new Date(this.model.Date);
          }
          if (this.model.MediaUrlList) {
            this.documentUrlList = this.model.MediaUrlList;
          }

          this.model.RelatedToOrderParameterList = this.relatedToOrderParameterList;
          if (temp.RelatedToData.length > 0) {
            temp.RelatedToData.forEach(element => {
              const tempR = new OrderRelatedToModel();

              tempR.DepartmentId = element.DepartmentId;
              tempR.ModuleName = element.ModuleName;
              tempR.DepartmentName = element.DepartmentName;
              tempR.ModuleId = element.ModuleId;
              tempR.YearText = element.YearText;
              tempR.YearValue = element.YearValue;
              tempR.Id = element.Id;
              tempR.RelatedToResult.filenumber = element.filenumber;
              tempR.RelatedToResult.modulename = element.modulename;
              tempR.RelatedToResult.parano = element.parano;
              tempR.RelatedToResult.pm_projecthdrid = element.pm_projecthdrid;
              tempR.RelatedToResult.prj_dept = element.prj_dept;
              tempR.RelatedToResult.prj_description = element.prj_description;
              tempR.RelatedToResult.prj_ndept = element.prj_ndept;
              tempR.RelatedToResult.prj_year = element.pprj_year;
              tempR.RelatedToResult.rowno = element.rowno;

              this.model.RelatedToOrderParameterList.push(tempR);
            });
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  downloadPdf(Url, name) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

  }
  // GetHelpDocument() {

  //   this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(
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

  // downloadHelpPdf(Url) {
  //   const linkSource = Url;
  //   const downloadLink = document.createElement("a");

  //   downloadLink.href = linkSource;
  //   downloadLink.download = "Help Document";
  //   downloadLink.click();
  // }


  GetHelpDocument() {

    this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(
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

  downloadHelpPdf(Url, isHelpDoc : Boolean= false) {
    
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

  Saveclick() {
    
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
    if (
      this.date.valid &&
      this.district.valid &&
      this.department.valid &&
      this.type.valid &&
      this.title.valid &&
      this.description.valid &&
      !this.fileValidationMsg &&
      this.searchCriteria.valid
      && this.Sector.valid && this.SubType.valid
    ) {
      if (this.model.Date) {
        const uTCDate = new Date(
          Date.UTC(new Date( this.model.Date).getFullYear(), new Date( this.model.Date).getMonth(), new Date( this.model.Date).getDate())
          ).toISOString();
          this.model.Date = uTCDate;
      }
      if (this.model.EffectForm) {
        const uTCDate = new Date(
          Date.UTC(new Date( this.model.EffectForm).getFullYear(), new Date( this.model.EffectForm).getMonth(), new Date( this.model.EffectForm).getDate())
          ).toISOString();
          this.model.EffectForm = uTCDate;
      }
      this._orderEntryService.AddOrderEntry(this.model).subscribe(
        data => {
          
          if (data.IsSuccess) {
            this._parentApi.SuccessMessage(data.Message);

            this._router.navigate(["/order"]);
          } else {
            this._commonService.ScrollingTop();
            this._alertService.error(data.Message);
          }
        },
        error => {
          
          this._commonService.ScrollingTop();
          console.log(error);
          this._alertService.error(error.message);
        }
      );
    }
  }

  AddMoreItems() {
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

  handleFileInput(files: FileList) {
    this.tempDocumentUrlList = [];
    this.model.AttachmentList = [];
    for (let index = 0; index < files.length; index++) {
      if (files.item(index).type.match("application/pdf")) {
        if (files.item(index).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.tempDocumentUrlList.push(new DocumentUrlModel());
            this.tempDocumentUrlList[index].Url = <string>reader.result;
            this.tempDocumentUrlList[index].Extension = files[index].name.split(
              "."
            )[1];
            if (this.tempDocumentUrlList[index].Extension === "pdf") {
              this.tempDocumentUrlList[index].DisplayName = files[index].name;
            }
            this.model.AttachmentList.push(new OrderAttachmentModel());
            this.model.AttachmentList[index].AttachmentsName =
              files[index].name;
            this.model.AttachmentList[index].Path = <string>reader.result;
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.model.AttachmentList = [];
          this.fileValidationMsg = this.fileSizeValidationMsg;
          return;
        }
      } else {
        this.model.AttachmentList = [];
        this.fileValidationMsg = "only *pdf";
        return;
      }
    }
    this.documentUrlList = [];
    this.model.AttachmentList = [];
    this.documentUrlList = this.tempDocumentUrlList;
    this.fileValidationMsg = "";
    // this.model.File = files;
  }

  ClearFileList() {
    this.fileValidationMsg = "";
    this.model.File = null;
    this.documentUrlList = [];
  }

  RemoveImageFile(i) {
    
        this.documentUrlList.splice(i, 1);
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
      }

}


