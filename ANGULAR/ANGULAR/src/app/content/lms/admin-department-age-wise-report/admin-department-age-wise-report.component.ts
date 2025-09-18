import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ReportService } from 'src/app/Shared/Service/lms/report.service';
import { AgeWiseCountReportModel } from 'src/app/Shared/Model/LMS/statistical-report.model';
import { MatPaginator, MatSort } from '@angular/material';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ActivatedRoute } from '@angular/router';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: 'app-admin-department-age-wise-report',
  templateUrl: './admin-department-age-wise-report.component.html',
  styleUrls: ['./admin-department-age-wise-report.component.css']
})

export class AdminDepartmentAgeWiseReportComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  loginData: UserViewModel;
  ageWiseReport: AgeWiseCountReportModel[] = [];
  reportIndexModel: IndexModel;
  totalRecords: number;

  constructor(private readonly _appComponet: AppComponent, public readonly _commonService: CommonService,
    private readonly _alertService: AlertService, private readonly _reportService: ReportService,
    private route: ActivatedRoute, private readonly _authService: AuthenticationService) {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this._appComponet.setpagelayout("Admin Department - Age Wise Report", "keyboard_backspace", "Back to Reports", "/lms/reports");
    this.reportIndexModel = new IndexModel();
  }

  ngOnInit() {
    this.bindAgeWiseCountReport();
  }

  bindAgeWiseCountReport() {
    var userId = this.loginData.UserId.toString();

    if (!this._commonService.IsNullOrEmpty(userId)) {
      this._reportService.GetAdminDepartmentAgeWiseCountReport(this.reportIndexModel, userId).subscribe(
        data => {
          if (data.IsSuccess) {
            if (data.Data.Data != null) {
              this.ageWiseReport = <AgeWiseCountReportModel[]>data.Data.Data;
            }
            else {
              this.ageWiseReport = [];
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
      this.ageWiseReport = [];
    }
  }

  SortData(event) {
    this.reportIndexModel.OrderBy = event.active;
    this.reportIndexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.reportIndexModel.IsPostBack = true;
    this.bindAgeWiseCountReport();
  }

  onPaginateChange(event) {
    this.reportIndexModel.Page = event.pageIndex + 1;
    this.reportIndexModel.PageSize = event.pageSize;
    this.reportIndexModel.IsPostBack = true;
    this.bindAgeWiseCountReport();
  }

}
