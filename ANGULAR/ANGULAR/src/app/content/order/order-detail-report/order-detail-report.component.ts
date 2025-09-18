import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { OrderEntryService } from 'src/app/Shared/Service/orderentry.service';
import { ColumnHeaderModel, DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { OrderReportSearchModel, OrderGenerateOrderReportSearchResultModel } from 'src/app/Shared/Model/orderlist.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail-report',
  templateUrl: './order-detail-report.component.html',
  styleUrls: ['./order-detail-report.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class OrderDetailReportComponent implements OnInit {
  indexModel: OrderReportSearchModel;
  dDLList: DDLModel;
  ddlSubType : DdlItemModel[] = [];
  dataSource: any;
  listModel: OrderGenerateOrderReportSearchResultModel[];
  displayedColumns: string[] = [
    "index",
    "SectorName",
    "TypeName",
    "DocNumber",
    "Title",
    "RefNo",
    "LinkToScheme",
    "LinkWith",
    "Remark",
    "Attachment",
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private _parentComponent: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _orderEntryService: OrderEntryService,
    public readonly _commonService: CommonService,
    private readonly _route: ActivatedRoute,
  ) {
    this._parentComponent.setpagelayout("Gov. Document Detail Report :", "", "", "");
    this.indexModel = new OrderReportSearchModel();
if(this._route.snapshot.params.dept){
  this.indexModel.DepartmentCode =String(this._route.snapshot.params.dept);
  this.GetList();
}


  }

  ngOnInit() {
    this.GetDDLList();
  }

  GetList() {
    this._orderEntryService.OrderDetailReport(this.indexModel).subscribe(
      (data) => {
        
        if (data.IsSuccess) {
          this.listModel = <OrderGenerateOrderReportSearchResultModel[]>data.Data;
          this.dataSource = new MatTableDataSource<OrderGenerateOrderReportSearchResultModel>(this.listModel);
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
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


print() {
  let printContents , popupWin ;
  printContents = document.getElementById("orderdetailprint").outerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
     popupWin.document.write(`
      <html>
        <head>
          <title>Order Detail Report</title>
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

searchClick() {

  if (this.indexModel.FromDateOfEntry) {
    const uTCFromDate = new Date(
      Date.UTC(new Date( this.indexModel.FromDateOfEntry).getFullYear(), new Date( this.indexModel.FromDateOfEntry).getMonth(), new Date( this.indexModel.FromDateOfEntry).getDate())
      ).toISOString();
      this.indexModel.FromDateOfEntry = uTCFromDate;
  }

  if (this.indexModel.ToDateOfEntry) {
    const uTCToDate = new Date(
      Date.UTC(new Date( this.indexModel.ToDateOfEntry).getFullYear(), new Date( this.indexModel.ToDateOfEntry).getMonth(), new Date( this.indexModel.ToDateOfEntry).getDate())
      ).toISOString();
      this.indexModel.ToDateOfEntry = uTCToDate;
  }
  if (this.indexModel.DateOfIssue) {
    const uTCToDate = new Date(
      Date.UTC(new Date( this.indexModel.DateOfIssue).getFullYear(), new Date( this.indexModel.DateOfIssue).getMonth(), new Date( this.indexModel.DateOfIssue).getDate())
      ).toISOString();
      this.indexModel.DateOfIssue = uTCToDate;
  }
  this.GetList();
}


GetDDLList() {
  
    this._commonService.GetAllDDL(AppSetting.OrderDetailDDLKeys).subscribe(
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

  GetSubType(departmentCode, typecode) {
    
    if (departmentCode && typecode) {
      this._commonService.GetOrderSubTypeByTypeAndDepartment(departmentCode, typecode).subscribe(
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

  Reset(){
    this.indexModel = new OrderReportSearchModel();
    this.listModel=[];
    //this.GetList();
  }

}
