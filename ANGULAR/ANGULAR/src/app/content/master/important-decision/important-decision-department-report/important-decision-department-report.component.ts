import { Component, OnInit, ViewChild } from '@angular/core';
import { DateWiseSearchModel } from 'src/app/Shared/Model/general-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrderEntryService } from 'src/app/Shared/Service/orderentry.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { importantdesicionservice } from 'src/app/Shared/Service/important-desicion-service';
import { ImportantDeciosonDepartmentCountReportModel } from 'src/app/Shared/Model/achievement-model';

@Component({
  selector: 'app-important-decision-department-report',
  templateUrl: './important-decision-department-report.component.html',
  styleUrls: ['./important-decision-department-report.component.css']
})
export class ImportantDecisionDepartmentReportComponent implements OnInit {


  //#region  Variable

  listModel: ImportantDeciosonDepartmentCountReportModel[];
  model: DateWiseSearchModel;
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "DeActiveOrderCount",
    "ActiveOrderCount",
    "Action"
  ];

  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },

  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  totalActiveDepartmentOrderCount: number;
  totalDeActiveDepartmentOrderCount: number;

  //#endregion

 //#region Constructor
 constructor(
  private readonly _importantdesicionservice: importantdesicionservice,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private _parentComponent: AppComponent,) {
    this._parentComponent.setpagelayout("Important Decision Department Count Report :", "", "", "");
    this.model = new DateWiseSearchModel();
  }


//#endregion

  //#region Method

  ngOnInit() {
  }

  getTotalRecord() {
    
    this.totalActiveDepartmentOrderCount = this.listModel
      .map((t) => t.ActiveOrderCount)
      .reduce((acc, value) => acc + value, 0);

      this.totalDeActiveDepartmentOrderCount = this.listModel
      .map((t) => t.DeActiveOrderCount)
      .reduce((acc, value) => acc + value, 0);

  }

  GetList() {
    
    this._importantdesicionservice.GetImportantDecisionDepartmentCountReport(this.model).subscribe(
      data => {
        
        if (data.IsSuccess)
         {
          this.listModel = <ImportantDeciosonDepartmentCountReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<ImportantDeciosonDepartmentCountReportModel>(this.listModel);
          if (this.model.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            // this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
            this.getTotalRecord();
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  searchClick() {
    
    if (this.model.EntryFromDate) {
      const uTCFromDate = new Date(
        Date.UTC(
          new Date(this.model.EntryFromDate).getFullYear(),
          new Date(this.model.EntryFromDate).getMonth(),
          new Date(this.model.EntryFromDate).getDate()
        )
      ).toISOString();
      this.model.EntryFromDate = uTCFromDate;
    }

    if (this.model.EntryToDate) {
      const uTCToDate = new Date(
        Date.UTC(
          new Date(this.model.EntryToDate).getFullYear(),
          new Date(this.model.EntryToDate).getMonth(),
          new Date(this.model.EntryToDate).getDate()
        )
      ).toISOString();
      this.model.EntryToDate = uTCToDate;
    }

    this.GetList();
  }

  clearClick() {
    
    this.model = new DateWiseSearchModel();
    this.model.EntryFromDate = null;
    this.model.EntryToDate = null;
  }

  SearchByKeyword(event) {
    
    this.GetList();
  }


print() {
  
  let printContents , popupWin ;
  printContents = document.getElementById("orderprint").outerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
     popupWin.document.write(`
      <html>
        <head>
          <title>Summary Report</title>
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

SortData(event) {
  
  this.model.OrderBy = event.active;
  this.model.OrderByAsc =
    event.direction === AppSetting.orderByDscAsc
      ? AppSetting.orderByAsc
      : AppSetting.orderByDsc;
  this.model.IsPostBack = true;
  this.GetList();
}

onPaginateChange(event) {
  this.model.Page = event.pageIndex + 1;
  this.model.PageSize = event.pageSize;
  this.model.IsPostBack = true;
  this.GetList();
}


  //#endregion


}
