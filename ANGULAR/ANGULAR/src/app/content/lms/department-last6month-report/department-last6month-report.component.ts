import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ReportService } from 'src/app/Shared/Service/lms/report.service';
import { Last6MonthCountReportModel } from 'src/app/Shared/Model/LMS/statistical-report.model';
import { MatPaginator, MatSort } from '@angular/material';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ActivatedRoute } from '@angular/router';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: 'app-department-last6month-report',
  templateUrl: './department-last6month-report.component.html',
  styleUrls: ['./department-last6month-report.component.css']
})

export class DepartmentLast6monthReportComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  loginData: UserViewModel;
  last6MonthReport: Last6MonthCountReportModel[] = [];
  reportIndexModel: IndexModel;
  totalRecords: number;

  adminDepartmentCode: number = 0;

  constructor(private readonly _appComponet: AppComponent, public readonly _commonService: CommonService,
    private readonly _alertService: AlertService, private readonly _reportService: ReportService,
    private _route: ActivatedRoute, private readonly _authService: AuthenticationService) {
    this._appComponet.setpagelayout("Department - Last 6 Month Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
    this.reportIndexModel = new IndexModel();
  }

  ngOnInit() {
    var params = this._route.snapshot.params;
    this.adminDepartmentCode = params.id;

    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.bindLast6MonthCountReport();
  }

  bindLast6MonthCountReport() {
    var userId = this.loginData.UserId.toString();

    if (!this._commonService.IsNullOrEmpty(userId)) {
      this._reportService.GetDepartmentLast6MonthCountReport(this.reportIndexModel, userId, this.adminDepartmentCode).subscribe(
        data => {
          if (data.IsSuccess) {
            if (data.Data.Data != null) {
              this.last6MonthReport = <Last6MonthCountReportModel[]>data.Data.Data;
            }
            else {
              this.last6MonthReport = [];
            }

            if (this.reportIndexModel.IsPostBack == false) {
              this.totalRecords = data.Data.TotalRecords;
            }
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
    else {
      this.last6MonthReport = [];
    }
  }

  SortData(event) {
    this.reportIndexModel.OrderBy = event.active;
    this.reportIndexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.reportIndexModel.IsPostBack = true;
    this.bindLast6MonthCountReport();
  }

  onPaginateChange(event) {
    this.reportIndexModel.Page = event.pageIndex + 1;
    this.reportIndexModel.PageSize = event.pageSize;
    this.reportIndexModel.IsPostBack = true;
    this.bindLast6MonthCountReport();
  }

}


