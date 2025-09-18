import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MatPaginator } from '@angular/material';
import { AdvertisementReportSearchModel, VisitorCountDetailReportViewModel } from 'src/app/Shared/Model/advertisement.model';
import { DatePipe } from '@angular/common';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/Shared/Model/format-datepicker';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-visitor-counter-detail-report',
  templateUrl: './visitor-counter-detail-report.component.html',
  styleUrls: ['./visitor-counter-detail-report.component.css'],
  providers: [DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})
export class VisitorCounterDetailReportComponent implements OnInit {

  listModel: VisitorCountDetailReportViewModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "WebSitUrl",
    "IPAddress",
    "CreatedDate",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "WebSitUrl", Text: "WebSite Url" },
    { Value: "IPAddress", Text: "IP Address" },
    { Value: "CreatedDate", Text: "Created Date" },
  ];
  totalRecords: number;
  indexModel: AdvertisementReportSearchModel;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private readonly _alertService: AlertService,
    private readonly _advertisementService: AdvertisementService,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService,
  ) {
    this._parentComponent.setpagelayout("Details Of Popup Display On Various Websites :", "", "", "");
    this.indexModel = new AdvertisementReportSearchModel();
    this.indexModel.OrderBy = "TotalCount";
  }

  ngOnInit() {
    //this.GetList();
  }

  GetList() {

    this._advertisementService.GetVisitorCountDetailReportList(this.indexModel).subscribe(
      data => {

        if (data.IsSuccess) {
          this.listModel = <VisitorCountDetailReportViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<VisitorCountDetailReportViewModel>(this.listModel);
          if (this.indexModel.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  searchClick() {

    if (this.indexModel.FromDate) {
      const uTCFromDate = new Date(
        Date.UTC(
          new Date(this.indexModel.FromDate).getFullYear(),
          new Date(this.indexModel.FromDate).getMonth(),
          new Date(this.indexModel.FromDate).getDate()
        )
      ).toISOString();
      this.indexModel.FromDate = uTCFromDate;
    }

    if (this.indexModel.ToDate) {
      const uTCToDate = new Date(
        Date.UTC(
          new Date(this.indexModel.ToDate).getFullYear(),
          new Date(this.indexModel.ToDate).getMonth(),
          new Date(this.indexModel.ToDate).getDate()
        )
      ).toISOString();
      this.indexModel.ToDate = uTCToDate;
    }

    this.GetList();
  }

  clearClick() {

    this.indexModel = new AdvertisementReportSearchModel();
    this.indexModel.FromDate = null;
    this.indexModel.ToDate = null;
    this.dataSource = null;
    this.listModel = null;
    this.GetList();
  }

  SearchByKeyword(event) {
    
    if (event.target.value.length > 2) {
      this.GetList();
    }

  }


  print() {
    let printContents, popupWin;
    printContents = document.getElementById("test").outerHTML;
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

}
