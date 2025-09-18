import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatSort, MatTableDataSource } from '@angular/material';
import { OrderSummaryReportWithLastTransactionModel, OrderSummaryReportFilterModel } from 'src/app/Shared/Model/generate-order.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { ColumnHeaderModel, DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { OrderEntryService } from 'src/app/Shared/Service/orderentry.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-order-summary-with-lasttransdate-report',
  templateUrl: './order-summary-with-lasttransdate-report.component.html',
  styleUrls: ['./order-summary-with-lasttransdate-report.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class OrderSummaryWithLasttransdateReportComponent implements OnInit {
//#region Variable
listModel: OrderSummaryReportWithLastTransactionModel[];
indexModel: IndexModel;
filterModel: OrderSummaryReportFilterModel;
dataSource: any;
totalOrderCount: number;
totalActiveOrderCount: number;
totalDeActiveOrderCount: number;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "Type",
  "SubType",
  "LastTransactionDate",
  "OrderCount",
  "ActiveOrderCount",
  "DeActiveOrderCount",
  "Action"
];

ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "SubType", Text: "Sub Type" },
   { Value: "Type", Text: "Type" }
];
columnsToDisplay: string[] = this.displayedColumns.slice();

@ViewChild(MatSort, { static: true }) sort: MatSort;
dDLList: DDLModel;
ddlDepartment: DdlItemModel[] = [];

//#endregion Variable

//#region constructor
constructor(
  private readonly _alertService: AlertService,
  private readonly _orderEntryService: OrderEntryService,
  private _parentComponent: AppComponent,
  public readonly _commonService: CommonService,
  private readonly _route: ActivatedRoute,
) {
  
  this._parentComponent.setpagelayout("Gov. Document Summary Report With Last Transaction Date List :", "", "", "");
  this.indexModel = new IndexModel();
  this.filterModel = new OrderSummaryReportFilterModel();

  if(this._route.snapshot.params.dpt){
    
    this.filterModel.DepartmentCode =String(this._route.snapshot.params.dpt);
    this.GetList();
  }
}

//#endregion constructor

//#region Methods

ngOnInit() {

  this.GetDDLList();
}

GetDepartmentByDepartmentCategory(code,admCode) {
  
   this.filterModel.DepartmentCode=0;
  this._commonService
  .GetDepartmentByDepartmentCategory(code,admCode)
  .subscribe(
    data => {
      
      if (data.IsSuccess) {
        this.ddlDepartment = <DdlItemModel[]>data.Data;
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );

}

/** Gets the total record of all Order */
getTotalRecord() {
  this.totalOrderCount = this.listModel
    .map((t) => t.OrderCount)
    .reduce((acc, value) => acc + value, 0);
    this.totalActiveOrderCount = this.listModel
    .map((t) => t.ActiveOrderCount)
    .reduce((acc, value) => acc + value, 0);
    this.totalDeActiveOrderCount = this.listModel
    .map((t) => t.DeActiveOrderCount)
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
  this._orderEntryService.GetOrderSummaryReportWithLastTransaction(this.filterModel).subscribe(
    (data) => {
      
      if (data.IsSuccess) {
        this.listModel = <OrderSummaryReportWithLastTransactionModel[]>data.Data;
        this.dataSource = new MatTableDataSource<OrderSummaryReportWithLastTransactionModel>(
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
  this.filterModel = new OrderSummaryReportFilterModel();
  this.listModel=[];
}

print() {
  let printContents , popupWin ;
  printContents = document.getElementById("orderprint").outerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
     popupWin.document.write(`
      <html>
        <head>
          <title>Order Summary Report With Last Transaction Date</title>
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

onRedirect(url){
  
   var temp = '/order/summaryreport/orderDetailReport/' + url;
  window.history.pushState('', '', '/order/summaryreport/orderDetailReport/' + url);
  // var temp = window.location.href;
}

//#endregion Methods
}
