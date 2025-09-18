import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { DashboardService } from 'src/app/Shared/Service/lms/dashboard.service';
import { DepartmentDashboardModel } from 'src/app/Shared/Model/LMS/dashboard.model';

@Component({
  selector: 'app-department-dashboard',
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.css']
})

export class DepartmentDashboardComponent implements OnInit {
  dashboardReport: DepartmentDashboardModel;

  constructor(private readonly _appComponet: AppComponent, public readonly _commonService: CommonService,
    private readonly _alertService: AlertService, private readonly _dashboardService: DashboardService, 
    ) {
    this._appComponet.setpagelayout("CMIS Dashboard", "", "", "");
  }

  ngOnInit() {
    this.bindDepartmentDashboard();
  }

  bindDepartmentDashboard() {
    var userId = "27";
   
    this._dashboardService.GetDepartmentDashboardReport(userId).subscribe(data => {
      if (data.IsSuccess) {
        this.dashboardReport = <DepartmentDashboardModel>data.Data;
        console.log('report');
        console.log(this.dashboardReport.NotificaionCountList);
      }
    },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

}
