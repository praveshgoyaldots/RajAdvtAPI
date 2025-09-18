import { formatDate } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  CMISNewSummaryModel,
  CMISReportFilterModel
} from "src/app/Shared/Model/Master/jankalyanLogMaster.model";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { MatSort, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import {
  DDLModel,
  ColumnHeaderModel,
  DdlItemModel
} from "src/app/Shared/Model/commonddl.model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { JankalyanlogService } from "src/app/Shared/Service/jankalyanlog.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { ActivatedRoute } from "@angular/router";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/Shared/Model/format-datepicker';

@Component({
  selector: "app-cmis-summary-report",
  templateUrl: "./cmis-summary-report.component.html",
  styleUrls: ["./cmis-summary-report.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CMISSummaryReportComponent implements OnInit {
  //#region Variable
  listModel: CMISNewSummaryModel[];
  indexModel: IndexModel;
  filterModel: CMISReportFilterModel;
  ddlCMISStatus: DdlItemModel[];
  dataSource: any;
  totalCount: number;
  totalActiveCount: number;
  totalDeActiveCount: number;
  displayedColumns: string[] = [
    "index",
    "modulename",
    "ActiveTotal",
    "InActiveTotal",
    "total",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "modulename", Text: "Module Name" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dDLList: DDLModel;

  //#endregion Variable

  //#region constructor
  constructor(
    private readonly _alertService: AlertService,
    private readonly _jankalyanlogService: JankalyanlogService,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService
  ) {
    
    this._parentComponent.setpagelayout(
      "CMIS Summary Report List :",
      "",
      "",
      ""
    );
    this.indexModel = new IndexModel();
    this.filterModel = new CMISReportFilterModel();
  }

  //#endregion constructor

  //#region Methods

  ngOnInit() {
   // this.GetList();
    this.GetDDLList();
  }

  GetStatusByModule(code) {
    this.ddlCMISStatus=[];
    this._commonService.GetCMISStatusByModuleId(code).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlCMISStatus = <DdlItemModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  /** Gets the total record of all module */
  getTotalRecord() {
    this.totalCount =
      this.listModel
        .map(t => t.ActiveTotal)
        .reduce((acc, value) => acc + value, 0) +
      this.listModel
        .map(t => t.InActiveTotal)
        .reduce((acc, value) => acc + value, 0);

    this.totalActiveCount = this.listModel
      .map(t => t.ActiveTotal)
      .reduce((acc, value) => acc + value, 0);

    this.totalDeActiveCount = this.listModel
      .map(t => t.InActiveTotal)
      .reduce((acc, value) => acc + value, 0);
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyFoCMISReport).subscribe(
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

  GetList() {
    
    this._jankalyanlogService
      .GetCMISNewSummaryReport(this.filterModel)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            this.listModel = <CMISNewSummaryModel[]>data.Data;
            this.dataSource = new MatTableDataSource<CMISNewSummaryModel>(
              this.listModel
            );
            this.dataSource.sort = this.sort;
            this.getTotalRecord();
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  searchClick() {
    if (this.filterModel.FromDate) {
      const uTCFromDate = new Date(
        Date.UTC(
          new Date(this.filterModel.FromDate).getFullYear(),
          new Date(this.filterModel.FromDate).getMonth(),
          new Date(this.filterModel.FromDate).getDate()
        )
      ).toISOString();
      this.filterModel.FromDate = uTCFromDate;
    }

    if (this.filterModel.ToDate) {
      const uTCToDate = new Date(
        Date.UTC(
          new Date(this.filterModel.ToDate).getFullYear(),
          new Date(this.filterModel.ToDate).getMonth(),
          new Date(this.filterModel.ToDate).getDate()
        )
      ).toISOString();
      this.filterModel.ToDate = uTCToDate;
    }

    this.GetList();
  }

  clearClick() {
    this.filterModel = new CMISReportFilterModel();
    this.listModel = [];
    this.ddlCMISStatus=[];
    //this.GetList();
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById("cmisprint").outerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>CMIS Summary Report</title>
            <style>
            table th,table td{
              border: 1px solid black;
            }
            table{
              border-collapse: collapse;
            }
            span{
              font-weight: bold;
              margin-bottom: 10px;
            }
            </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }

  //#endregion Methods
}
