import { MatSort, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitorCountReportViewModel, AdvertisementReportSearchModel } from 'src/app/Shared/Model/advertisement.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { DatePipe } from '@angular/common';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/Shared/Model/format-datepicker';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-visitor-counter-report',
  templateUrl: './visitor-counter-report.component.html',
  styleUrls: ['./visitor-counter-report.component.css'],
  providers: [DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})
export class VisitorCounterReportComponent implements OnInit {

  listModel: VisitorCountReportViewModel[];
  dataSource: any;
  totalVCCount: number;
  displayedColumns: string[] = ["index", "WebSitUrl", "VisitorCount"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "WebSitUrl", Text: "WebSite Url" },
    { Value: "VisitorCount", Text: "Website Popup Counter" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  indexModel: AdvertisementReportSearchModel = new AdvertisementReportSearchModel();

  constructor(
    private readonly _alertService: AlertService,
    private readonly _advertisementService: AdvertisementService,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService,
  ) {
    this._parentComponent.setpagelayout("Frequency Of Popup Display On Various Websites :", "", "", "");
  }

  ngOnInit() {
    // this.GetList();
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  GetList() {
    this.indexModel.OrderBy = 'VisitorCount';
    this.indexModel.OrderByAsc = 0;

    this._advertisementService.GetVisitorCountReportList(this.indexModel).subscribe(data => {
      if (data.IsSuccess) {
        this.listModel = <VisitorCountReportViewModel[]>data.Data;
        this.dataSource = new MatTableDataSource<VisitorCountReportViewModel>(this.listModel);
        this.dataSource.sort = this.sort;
        this.getTotalCost();
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  /** Gets the total Count of visitor. */
  getTotalCost() {
    this.totalVCCount = this.listModel.map(t => t.VisitorCount).reduce((acc, value) => acc + value, 0);
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
  }

  SearchByKeyword(event) {
    this.GetList();
  }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction === AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }


}
