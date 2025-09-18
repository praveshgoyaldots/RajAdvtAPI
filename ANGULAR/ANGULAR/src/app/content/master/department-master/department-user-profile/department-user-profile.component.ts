import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from 'src/app/Shared/Service/department.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { PermissionModel } from 'src/app/Shared/Model/general-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { LoginUserDepartmentListModel } from 'src/app/Shared/Model/Master/department.model';

@Component({
  selector: 'app-department-user-profile',
  templateUrl: './department-user-profile.component.html',
  styleUrls: ['./department-user-profile.component.css']
})
export class DepartmentUserProfileComponent implements OnInit {

//#region Variable

listModel: LoginUserDepartmentListModel[];
dataSource: any;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "NodalOfficerName",
  "MobileNo",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "WebsiteName", Text: "Website Name" },
  { Value: "NodalOfficerName", Text: "Nodal Officer Name" },
  { Value: "NodalOfficerDesignation", Text: "Nodal Officer Designation" },
  { Value: "MobileNo", Text: "Mobile No." },
  { Value: "Email", Text: "Email" },
  { Value: "SSOID", Text: "SSOID" },
];
columnsToDisplay: string[] = this.displayedColumns.slice();
Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/departmentprofilelist",
  "/master/departmentprofilelist/edit"
);

//#endregion

//#region constructor

constructor(
  private readonly _alertService: AlertService,
  private readonly _parentApi: AppComponent,
  private readonly _commonService: CommonService,
  private readonly _departmentService: DepartmentService
) {
  this._parentApi.setpagelayout(
    "Department Website Details List:",
    "",
    "",
    ""
  );

}

//#endregion

//#region Methods

ngOnInit() {
  this.GetList();
}

GetList() {
  this._departmentService.GetLoginUserDepartmentList().subscribe(
    (data) => {
      if (data.IsSuccess) {
        this.listModel = <LoginUserDepartmentListModel[]>data.Data;
        this.dataSource = new MatTableDataSource<LoginUserDepartmentListModel>(
          this.listModel
        );
        this.dataSource.paginator = this.paginator;
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}

//#endregion

}
