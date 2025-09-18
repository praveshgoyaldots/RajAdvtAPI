import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ReportAdvanceSearchModel } from 'src/app/Shared/Model/LMS/report-advance-search.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ReportService } from 'src/app/Shared/Service/lms/report.service';
import { StatisticalReportModel } from 'src/app/Shared/Model/LMS/statistical-report.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { StatisticalReportGroupbyComponent } from '../shared/statistical-report-groupby/statistical-report-groupby.component';

@Component({
  selector: "app-statistical-report",
  templateUrl: "./statistical-report.component.html",
  styleUrls: ["./statistical-report.component.css"]
})
export class StatisticalReportComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  loginData: UserViewModel;
  advanceSearch: ReportAdvanceSearchModel;
  statisticalReport: StatisticalReportModel[] = [];
  dataSource: any;
  reportIndexModel: IndexModel;
  totalRecords: number;

  groupBy1_Txt: string = "Letter Type";
  groupBy1_Val: string = "LetterType";
  groupBy2_Txt: string = "";
  groupBy2_Val: string = "";

  constructor(private readonly _appComponet: AppComponent, private readonly _commonService: CommonService,
    private readonly _alertService: AlertService, private readonly _reportService: ReportService,
    private readonly _authService: AuthenticationService, public _dialog: MatDialog) {
    this._appComponet.setpagelayout("Statistical Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
    this.reportIndexModel = new IndexModel();
    this.advanceSearch = new ReportAdvanceSearchModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.reportIndexModel.OrderByAsc = 1;
    this.getReportData();
  }

  getAdvanceSearchReportData(event) {
    this.advanceSearch = event;
    this.statisticalReport = [];
    this.dataSource = [];
    this.totalRecords = 0;

    this.reportIndexModel.Page = 1;
    this.reportIndexModel.OrderByAsc = 1;
    this.reportIndexModel.IsPostBack = false;
    this.getReportData();
  }

  getReportData() {
    this.reportIndexModel.AdvanceSearchModel = this.advanceSearch;
    var userId = this.loginData.UserId.toString();

    if (!this._commonService.IsNullOrEmpty(userId)) {
      this._reportService.GetStatisticalReport(this.reportIndexModel, userId, this.groupBy1_Val, this.groupBy2_Val).subscribe(
        data => {
          if (data.IsSuccess) {
            if (data.Data.Data != null) {
              this.statisticalReport = <StatisticalReportModel[]>data.Data.Data;
              this.dataSource = new MatTableDataSource<StatisticalReportModel>(this.statisticalReport);
            }
            else {
              this.statisticalReport = [];
              this.dataSource = [];
            }

            if (this.reportIndexModel.IsPostBack == false) {
              this.dataSource.paginator = this.paginator;
              this.totalRecords = data.Data.TotalRecords;
              this.dataSource.sort = this.sort;
            }
          }}
        );
    } else {
      this.statisticalReport = [];
      this.dataSource = [];
    }
  }

  SortData(event) {
    this.reportIndexModel.OrderBy = event.active;
    this.reportIndexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.reportIndexModel.IsPostBack = true;
    this.getReportData();
  }

  onPaginateChange(event) {
    this.reportIndexModel.Page = event.pageIndex + 1;
    this.reportIndexModel.PageSize = event.pageSize;
    this.reportIndexModel.IsPostBack = true;
    this.getReportData();
  }

  openDialog() {
    const dialogRef = this._dialog.open(StatisticalReportGroupbyComponent, {
      width: "500px",
      data: { groupBy1_Val: this.groupBy1_Val, groupBy2_Val: this.groupBy2_Val }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.groupBy1_Txt = this._reportService.GetGroupByText(result.groupBy1_Val);
      this.groupBy1_Val = result.groupBy1_Val;
      this.groupBy2_Txt = this._reportService.GetGroupByText(result.groupBy2_Val);
      this.groupBy2_Val = result.groupBy2_Val;
      this.getReportData();
    });
  }

}

export interface GroupByData {
  groupBy1_Val: string;
  groupBy2_Val: string;
}
