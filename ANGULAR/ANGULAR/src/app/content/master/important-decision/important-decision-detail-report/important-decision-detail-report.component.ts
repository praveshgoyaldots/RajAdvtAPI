import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { ImpDescSummaryReportFilterModel } from 'src/app/Shared/Model/achievement-model';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { importantdesicionservice } from 'src/app/Shared/Service/important-desicion-service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-important-decision-detail-report',
  templateUrl: './important-decision-detail-report.component.html',
  styleUrls: ['./important-decision-detail-report.component.css']
})
export class ImportantDecisionDetailReportComponent implements OnInit {

  //#region  Variable's

  indexModel: IndexModel;
  filterModel: ImpDescSummaryReportFilterModel;
  dataSource: any;

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

  //#endregion

  //#region  Constructor

  constructor(
    private readonly _alertService: AlertService,
    private readonly _importantDecision: importantdesicionservice,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService,
    private readonly _route: ActivatedRoute,
  ) {
    this._parentComponent.setpagelayout("Important Decision Detail Report List :", "", "", "");
    this.indexModel = new IndexModel();
    this.filterModel = new ImpDescSummaryReportFilterModel();

    if(this._route.snapshot.params.dept){
      this.filterModel.DepartmentCode =String(this._route.snapshot.params.dept);
    }
    // this.GetList();
  }

  //#endregion

  //#region  Method
  ngOnInit(){

  }

  // GetList() {
  //   this._importantDecision.GetImportantDecisionSummaryReport(this.filterModel).subscribe(
  //     (data) => {
  //       if (data.IsSuccess) {
  //         this.listModel = <ImportantDecisionSummaryReportModel[]>data.Data;
  //         this.dataSource = new MatTableDataSource<ImportantDecisionSummaryReportModel>(
  //           this.listModel
  //         );
  //         this.dataSource.sort = this.sort;

  //       }
  //     },
  //     (error) => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

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

    // this.GetList();
  }

  clearClick() {
    this.filterModel = new ImpDescSummaryReportFilterModel();
    // this.listModel=[];
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

  //#endregion
}
