import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportantDecisionSummaryReportModel, ImpDescSummaryReportFilterModel } from 'src/app/Shared/Model/achievement-model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { importantdesicionservice } from 'src/app/Shared/Service/important-desicion-service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imp-dec-summary-report',
  templateUrl: './imp-dec-summary-report.component.html',
  styleUrls: ['./imp-dec-summary-report.component.css']
})
export class ImpDecSummaryReportComponent implements OnInit {
//#region Variable
listModel: ImportantDecisionSummaryReportModel[];
indexModel: IndexModel;
filterModel: ImpDescSummaryReportFilterModel;
dataSource: any;
totalCount: number;

displayedColumns: string[] = [
  "index",
  "DepartmentEng",
  "CategoryEng",
  "SubCategoryEng",
  "ActiveImpDecCount",
  "DeActiveImpDecCount",
  "ImpDecCount",

];

ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentEng", Text: "Department" },
  { Value: "SubCategoryEng", Text: "Sub Category" },
   { Value: "CategoryEng", Text: "Category" }
];
columnsToDisplay: string[] = this.displayedColumns.slice();

@ViewChild(MatSort, { static: true }) sort: MatSort;
dDLList: DDLModel;
totalActiveImpCount: number;
totalDeActiveImpCount: number;

//#endregion Variable

//#region constructor
constructor(
  private readonly _alertService: AlertService,
  private readonly _importantDecision: importantdesicionservice,
  private _parentComponent: AppComponent,
  public readonly _commonService: CommonService,
  private readonly _route: ActivatedRoute,
) {
  this._parentComponent.setpagelayout("Important Decision Summary Report List :", "", "", "");
  this.indexModel = new IndexModel();
  this.filterModel = new ImpDescSummaryReportFilterModel();

  if(this._route.snapshot.params.dept){
    this.filterModel.DepartmentCode =String(this._route.snapshot.params.dept);
    this.GetList();
  }
}

//#endregion constructor

//#region Methods

ngOnInit() {
  this.GetDDLList();
}

/** Gets the total record of all Order */
getTotalRecord() {
  this.totalCount = this.listModel
    .map((t) => t.ImpDecCount)
    .reduce((acc, value) => acc + value, 0);
    this.totalActiveImpCount = this.listModel
    .map((t) => t.ActiveImpDecCount)
    .reduce((acc, value) => acc + value, 0);
    this.totalDeActiveImpCount = this.listModel
    .map((t) => t.DeActiveImpDecCount)
    .reduce((acc, value) => acc + value, 0);
}

GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.DDLKeyForOrderSummary).subscribe(
    (data) => {
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}


GetList() {
  this._importantDecision.GetImportantDecisionSummaryReport(this.filterModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        this.listModel = <ImportantDecisionSummaryReportModel[]>data.Data;
        this.dataSource = new MatTableDataSource<ImportantDecisionSummaryReportModel>(
          this.listModel
        );
        this.dataSource.sort = this.sort;
        this.getTotalRecord();
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}

searchClick() {
  if (this.filterModel.CreatedFromDate) {
    const uTCFromDate = new Date(
      Date.UTC(
        new Date(this.filterModel.CreatedFromDate).getFullYear(),
        new Date(this.filterModel.CreatedFromDate).getMonth(),
        new Date(this.filterModel.CreatedFromDate).getDate()
      )
    ).toISOString();
    this.filterModel.CreatedFromDate = uTCFromDate;
  }

  if (this.filterModel.CreatedToDate) {
    const uTCToDate = new Date(
      Date.UTC(
        new Date(this.filterModel.CreatedToDate).getFullYear(),
        new Date(this.filterModel.CreatedToDate).getMonth(),
        new Date(this.filterModel.CreatedToDate).getDate()
      )
    ).toISOString();
    this.filterModel.CreatedToDate = uTCToDate;
  }

  this.GetList();
}

clearClick() {
  this.filterModel = new ImpDescSummaryReportFilterModel();
  this.listModel=[];
}

print() {
  let printContents , popupWin ;
  printContents = document.getElementById("impdecprint").outerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
     popupWin.document.write(`
      <html>
        <head>
          <title>Important Decision Summary Report</title>
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
