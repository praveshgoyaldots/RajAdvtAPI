import {
  ColumnHeaderModel,
  DDLModel
} from "./../../../../Shared/Model/commonddl.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  UserForNotificationListModel,
  UserNotificationFilterModel,
  UserNotificationModel
} from "src/app/Shared/Model/user-model";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { AppComponent } from "src/app/app.component";
import { UserService } from "src/app/Shared/Service/user.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import {
  IndexModel,
  PermissionModel
} from "src/app/Shared/Model/general-model";
import { Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-user-notification",
  templateUrl: "./user-notification.component.html",
  styleUrls: ["./user-notification.component.css"]
})
export class UserNotificationComponent implements OnInit {
  listModel: UserForNotificationListModel[];
  dataSource: MatTableDataSource<UserForNotificationListModel>;
  displayedColumns: string[] = [
    "index",
    "UserName",
    "UserEmail",
    "Mobile",
    "DepartmentTitle",
    "OfficeName",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "UserName", Text: "User Name" },
    { Value: "UserEmail", Text: "User Email" },
    { Value: "Mobile", Text: "Mobile No." },
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "OfficeName", Text: "Office" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/usernotification",
    "/master/usernotification/add"
  );
  indexModel: UserNotificationFilterModel;
  dDLList: DDLModel;
  totalRecords: number;
  notificationModel: UserNotificationModel;
  content = new FormControl("", [Validators.required]);
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentComponent: AppComponent,
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService
  ) {
    this.notificationModel = new UserNotificationModel();
    this._parentComponent.setpagelayout("User Notification List:", "", "", "");
    this.indexModel = new UserNotificationFilterModel();
  }
  //#endregion

  //#region << Method >>
  ngOnInit() {
    this.GetList();
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyUserNotification).subscribe(
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

  GetList() {
    this._userService.GetUseForNotification(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.listModel = <UserForNotificationListModel[]>data.Data.Data;
          if (this.notificationModel.IsSelectAll) {
            this.notificationModel.MobileNo = this.listModel.map(
                function(a) {
                  return a.Mobile;
                }
              );
            this.notificationModel.MobileNo = this.notificationModel.MobileNo.filter(c => !this.notificationModel.UnSelectedList.includes(c));
          }
          this.dataSource = new MatTableDataSource<
            UserForNotificationListModel
          >(this.listModel);
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

  onSearchclick() {
    this.indexModel.Page = 1;
    this.indexModel.IsPostBack = false;
    this.GetList();
  }

  onClearclick() {
    this.indexModel.Page = 1;
    this.indexModel.OfficeCode = undefined;
    this.indexModel.DepartmentCode = undefined;
    this.indexModel.IsPostBack = false;
    this.GetList();
  }

  selectAll(event) {
    if (event.checked) {
      this.notificationModel.IsSelectAll = true;
      this.notificationModel.MobileNo = this.listModel.map(
        function(a) {
          return a.Mobile;
        }
      );
    }
    else {
      this.notificationModel.MobileNo = [];
      this.notificationModel.IsSelectAll = false;
    }
  }

  selectItem(event, data: string) {
    
    if (event.checked) {
      this.notificationModel.MobileNo.push(data);
      this.notificationModel.UnSelectedList = this.notificationModel.UnSelectedList.filter(c => c !== data);
    } else {
      this.notificationModel.UnSelectedList.push(data);
      this.notificationModel.MobileNo = this.notificationModel.MobileNo.filter(c => c !== data);
    }
  }

  SaveClick() {
    
    this.content.markAsTouched();
    if (this.content.valid) {
      this.notificationModel.FilterModel = this.indexModel;
      this._userService
        .SendNotificationToUser(this.notificationModel)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
            } else {
              this._alertService.error(data.Message);
            }
            this._commonService.ScrollingTop();
          },
          error => {
            console.log(error);
            this._alertService.error(error.message);
            this._commonService.ScrollingTop();
          }
        );
    }else{
      this._commonService.ScrollingTop();
    }
  }

  //#endregion
}
