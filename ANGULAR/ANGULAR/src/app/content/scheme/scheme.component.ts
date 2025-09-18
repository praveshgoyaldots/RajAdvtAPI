import { stringify } from "querystring";
import { DataEntryComponent } from "./monitoring-parameters-scheme/data-entry/data-entry.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SchemeService } from "src/app/Shared/Service/scheme.service";
import {
  ListSchemeModel,
  CustomSearchModel
} from "src/app/Shared/Model/scheme-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import {
  ColumnHeaderModel,
  DDLModel
} from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import {
  PermissionModel,
  CommonDocModel
} from "src/app/Shared/Model/general-model";
import { SchemeTypeEnum } from "src/app/Shared/Enum/scheme.enum";
import { HelpDocumentEnum } from "src/app/Shared/Enum/helpdocument-module.enum";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { SendnotificationtoDeptComponent } from "./sendnotificationto-dept/sendnotificationto-dept.component";
import { DeptOfcContactDetailComponent } from './dept-ofc-contact-detail/dept-ofc-contact-detail.component';
import { UpdateSchemeBeneficiaryComponent } from "./update-scheme-beneficiary/update-scheme-beneficiary.component";

@Component({
  selector: "app-scheme",
  templateUrl: "./scheme.component.html",
  styleUrls: ["./scheme.component.css"],
  providers: [SchemeService]
})
export class SchemeComponent implements OnInit {
  //#region << Variable >>
  schemeList: ListSchemeModel[];
  dataSource: MatTableDataSource<ListSchemeModel>;
  displayedColumns: string[] = [
    "index",
    "NameEnglish",
    "NameHindi",
    "NodalDepartmentTitle",
    "ModifiedDate",
    "ModifiedName",
    "schemePageType",
    "Status",
    "Lock",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    // { Value: "NameEnglish", Text: "Scheme Name (Eng)" },
    // { Value: "NameHindi", Text: "Scheme Name(Hindi)" },
    // { Value: "ModifiedName", Text: "ModifiedName" },
    { Value: "schemePageType", Text: "Scheme Type" }
  ];

  searchColumns: ColumnHeaderModel[] = [
    { Value: "NameEnglish", Text: "Scheme Name (Eng)" },
    { Value: "NameHindi", Text: "Scheme Name(Hindi)" },
    { Value: "ModifiedDate", Text: "Last Updated Date" },
    { Value: "schemePageType", Text: "Scheme Type" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: CustomSearchModel;
  totalRecords: number;
  SchemePermission: PermissionModel = this._commonService.GetPagePermission(
    "/scheme",
    "/scheme/add",
    "/scheme/detail",
    "/scheme/update",
    "/scheme/delete",
    "/scheme/faq/Update",
    "/scheme/monitoringparameter",
    "/scheme/lock"
  );
  isActive: number = 1;
  dDLList: DDLModel;
  //helpDocUrl: string;
  nodelNameItems: { [index: string]: string } = {};
  schemeNameItems: { [index: string]: string } = {};
  // searchModel: CustomSearchModel;
  SchemeTypeEnum = SchemeTypeEnum;
  helpDocumentEnum = HelpDocumentEnum;
  helpDocument: CommonDocModel;
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentComponent: AppComponent,
    private readonly _schemeService: SchemeService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private readonly _dialog: MatDialog
  ) {
    this.SchemePermission.AddPageAccess
      ? this._parentComponent.setpagelayout("Scheme :", "", "", "")
      : this._parentComponent.setpagelayout("Scheme :");
    this.indexModel = new CustomSearchModel();
    // this.searchModel = new CustomSearchModel();
  }
  //#endregion

  //#region << Method >>
  ngOnInit() {
    this.GetList();
    this.GetDDLList();
    this.GetHelpDocument();
  }

  SortData(event) {
    
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction === AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  GetList() {
    
    this._schemeService.Get(this.indexModel, this.isActive).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.schemeList = <ListSchemeModel[]>data.Data.Data;
          //this.helpDocUrl = data.Data.HelpDocUrl;
          this.dataSource = new MatTableDataSource<ListSchemeModel>(
            this.schemeList
          );
          this.dataSource.paginator = this.paginator;
          this.totalRecords = data.Data.TotalRecords;
          this.dataSource.sort = this.sort;
          if (this.indexModel.DepartmentCode) {
            this.indexModel.DepartmentCode = String(
              this.indexModel.DepartmentCode
            );
          }
          if (this.indexModel.SchemeCode) {
            this.indexModel.SchemeCode = String(this.indexModel.SchemeCode);
          }
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

  // downloadPdf(Url) {
  //   const linkSource = Url;
  //   const downloadLink = document.createElement("a");

  //   downloadLink.href = linkSource;
  //   downloadLink.download = "Help Document";
  //   downloadLink.click();
  // }

  // statusClick(id) {
  //   
  //   this._commonService.GenerateOTP().subscribe(
  //     (data) => {
  //       if (data.IsSuccess) {
  //         const _dialogRef = this._dialog.open(OTPDialogComponent, {
  //           width: "500px",
  //           disableClose: true,
  //         });
  //         _dialogRef.afterClosed().subscribe((result: boolean) => {
  //           if (result) {
  //             this._schemeService.SetStatus(id).subscribe(
  //               (data) => {
  //                 if (data.IsSuccess) {
  //                   this.GetList();
  //                   this._alertService.success(data.Message);
  //                 } else {
  //                   this._alertService.error(data.Message);
  //                 }
  //               },
  //               (error) => {
  //                 this._alertService.error(error.message);
  //               }
  //             );
  //           }
  //         });
  //       } else {
  //         this._alertService.error(data.Message);
  //       }
  //     },
  //     (error) => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

  statusClick(id) {
    this._schemeService.SetStatus(id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.GetList();
          this._commonService.ScrollingTop();
          this._alertService.success(data.Message);
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  lockClick(id) {
    this._schemeService.LockToggle(id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.GetList();
          this._alertService.success(data.Message);
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getSchemeList(code) {
    
    var Active = this.isActive;
    this.dDLList.ddlSchemeName = [];
    this.indexModel.SchemeCode = 0;
    if (code) {
      this._commonService.GetSchemeList(code, this.isActive).subscribe(
        data => {
          if (data.IsSuccess) {
            this.dDLList.ddlSchemeName = data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  SearchByKeyword(event) {
    
    // if (event.target.value !=null) {
    this.indexModel.SearchField = event.target.value;
    //  this.searchModel.DepartmentName = '';
    //  this.searchModel.SchemeName = '';
    // }
    // else {
    //   this.indexModel.Search = searchValue;
    //   if (searchValue !=null) {
    //     this.searchModel.SchemeName='';
    //     this.searchModel.DepartmentName='';
    //     this.indexModel.DepartmentName='';
    //     this.indexModel.SchemeName='';
    //   }else{
    if (this.indexModel.DepartmentCode) {
      this.indexModel.DepartmentCode = Number(this.indexModel.DepartmentCode);
    } else {
      this.indexModel.DepartmentCode = 0;
    }
    if (this.indexModel.SchemeCode) {
      this.indexModel.SchemeCode = Number(this.indexModel.SchemeCode);
    } else {
      this.indexModel.SchemeCode = 0;
    }

    if (this.indexModel.FromDate) {
      const uTCFromDate = new Date(
        Date.UTC(
          new Date(this.indexModel.FromDate).getFullYear(),
          new Date(this.indexModel.FromDate).getMonth(),
          new Date(this.indexModel.FromDate).getDate()
        )
      );
      this.indexModel.FromDate = uTCFromDate;
    }

    if (this.indexModel.ToDate) {
      const uTCToDate = new Date(
        Date.UTC(
          new Date(this.indexModel.ToDate).getFullYear(),
          new Date(this.indexModel.ToDate).getMonth(),
          new Date(this.indexModel.ToDate).getDate()
        )
      );
      this.indexModel.ToDate = uTCToDate;
    }

    //   }
    // }
    this.GetList();
  }

  Reset() {
    this.indexModel = new CustomSearchModel();
    this.GetList();
  }

  getActiveDeActiveData(data) {
    
    this.isActive = data;
    // this.indexModel = new CustomSearchModel();
    this.getSchemeList(this.indexModel.DepartmentCode);
    this.GetList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForCustomSearch).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;

          this.dDLList.ddlDepartment.forEach(obj => {
            this.nodelNameItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeName.forEach(obj => {
            this.schemeNameItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  openSendNotificationDialog(dptCode) {
    if (dptCode) {
      this._dialog.open(SendnotificationtoDeptComponent, {
        width: "500px",
        data: dptCode
      });
    }
  }

  openOfficersDetailsDialog(dptCode) {
    if (dptCode) {
      this._dialog.open(DeptOfcContactDetailComponent, {
        width: "800px",
        data: dptCode
      });
    }
  }

  openUpdateBeneficiaryDialog(id) {
    
    if (id) {
      this._dialog.open(UpdateSchemeBeneficiaryComponent, {
        width: "500px",
        data: id
      });
    }
  }

  //#endregion
}
