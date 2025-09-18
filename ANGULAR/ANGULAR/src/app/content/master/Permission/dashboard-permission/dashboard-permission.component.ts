import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { dashboardPermissionService } from 'src/app/Shared/Service/dashboardpermission.service';
import { IndexModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-dashboard-permission',
  templateUrl: './dashboard-permission.component.html',
  styleUrls: ['./dashboard-permission.component.css']
})
export class DashboardPermissionComponent implements OnInit {
  indexModel: any;

  constructor(private readonly appComponnet: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _dashboardpermissionservice: dashboardPermissionService, ) {
   // this.appComponnet.setpagelayout("Dashboard Permission :", "add", "Create", "master/dashboardpermission/");
    this.indexModel = new IndexModel();
  }




  ngOnInit() {
  }




}
