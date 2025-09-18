import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ReportAdvanceSearchModel } from 'src/app/Shared/Model/LMS/report-advance-search.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ReportService } from 'src/app/Shared/Service/lms/report.service';
import { DetailReportModel } from 'src/app/Shared/Model/LMS/statistical-report.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserViewModel } from 'src/app/Shared/Model/user-model';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})

export class DetailReportComponent implements OnInit {
  displayedColumns: string[] = ["sNo", "refNo_entryDate", "subject", "referencee", "department", "senderDetail", "deptAction", "cmoAction", "cmntOfficer"];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  loginData: UserViewModel;
  advanceSearch: ReportAdvanceSearchModel;
  detailReport: DetailReportModel[] = [];
  dataSource: any;
  reportIndexModel: IndexModel;
  totalRecords: number;

  constructor(private readonly _appComponet: AppComponent, private readonly _commonService: CommonService,
    private readonly _alertService: AlertService, private readonly _reportService: ReportService,
    private readonly _authService: AuthenticationService) {
    this._appComponet.setpagelayout("Detail Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
    this.reportIndexModel = new IndexModel();
    this.advanceSearch = new ReportAdvanceSearchModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.reportIndexModel.OrderByAsc = 0;
    this.getReportData();
  }

  getAdvanceSearchReportData(event) {
    this.advanceSearch = event;
    this.detailReport = [];
    this.dataSource = [];
    this.totalRecords = 0;

    this.reportIndexModel.Page = 1;
    this.reportIndexModel.OrderByAsc = 0;
    this.reportIndexModel.IsPostBack = false;
    this.getReportData();
  }

  getReportData() {
    this.reportIndexModel.AdvanceSearchModel = this.advanceSearch;
    var userId = this.loginData.UserId.toString();

    if (!this._commonService.IsNullOrEmpty(userId)) {
      this._reportService.GetDetailReport(this.reportIndexModel, userId).subscribe(
        data => {
          if (data.IsSuccess) {
            if (data.Data.Data != null) {
              this.detailReport = <DetailReportModel[]>data.Data.Data;
              this.dataSource = new MatTableDataSource<DetailReportModel>(this.detailReport);
            }
            else {
              this.detailReport = [];
              this.dataSource = [];
            }

            if (this.reportIndexModel.IsPostBack == false) {
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
    else {
      this.detailReport = [];
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

}
