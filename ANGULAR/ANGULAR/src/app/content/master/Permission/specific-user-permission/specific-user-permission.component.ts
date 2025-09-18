import { Component, OnInit } from "@angular/core";
import {
  UserPagePermissionListModel,
  DefaultPagePermissionListModel,
} from "src/app/Shared/Model/user-permission.model";
import { DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { UserPermissionService } from "src/app/Shared/Service/user-permission.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { MatTableDataSource } from "@angular/material";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { CustomSearchModel } from "src/app/Shared/Model/user-model";
import { JsonPipe } from "@angular/common";
@Component({
  selector: "app-specific-user-permission",
  templateUrl: "./specific-user-permission.component.html",
  styleUrls: ["./specific-user-permission.component.css"],
})
export class SpecificUserPermissionComponent implements OnInit {
  userPagePermissionList: UserPagePermissionListModel[] = [];
  userPageDefaultPermissionList: DefaultPagePermissionListModel[] = [];
  dataSource: any;
  dataSource1: any;
  dropdownList: DDLModel;
  Application: any;
  UserId: any;
  UserType: string = "";
  DepartmentCode: string = "";
  office: string = "";
  dDLList: DDLModel;
  selectedAll = -1;
  selectedAlloffice = -1;
  searchModel: CustomSearchModel;

  IsHeaderAddSelected = false;
  IsHeaderEditSelected = false;
  IsHeaderDeleteSelected = false;
  IsHeaderViewSelected = false;
  isShow = false;
  displayedColumns: string[] = [
    "s_no",
    "permission_name",
    "PageTypeName",
    "add_permission",
    "edit_permission",
    "delete_permission",
    "view_permission",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _userPermissionService: UserPermissionService,

    private _auth: AuthenticationService
  ) {
    this.appComponnet.setpagelayout("User Specific Permission :");
    this.searchModel = new CustomSearchModel();
  }

  ngOnInit() {
    this.GetDropdownList();
    this.getOfficeList(0);
    this.getDDLList();
  }

  GetDropdownList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForUserPagePermission)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.dropdownList = <DDLModel>data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  getOfficeList(code) {
    if (code) {
      this._commonService.GetOfficeList(code).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.dDLList.ddlOffice = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  BindUserList() {
    this._userPermissionService
      .GetUserListByApplicationUrl(
        this.UserType,
        this.DepartmentCode,
        this.office
      )
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            data.Data.Value = Number(data.Data.Value);
            this.dropdownList.ddlUser = data.Data as DdlItemModel[];
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  selectAll() {
    if (this.selectedAll < 0) {
      this.searchModel.DepartmentCode = this.dDLList.ddlOffice.map(function (
        a
      ) {
        return a.Value;
      });
      this.selectedAll = 1;
    } else {
      this.selectedAll = -1;
      this.searchModel.DepartmentCode = [];
    }
  }

  selectAlloffice() {
    if (this.selectedAlloffice < 0) {
      this.searchModel.OfficeCode = this.dDLList.ddlOffice.map(function (a) {
        return a.Value;
      });
      this.selectedAlloffice = 1;
    } else {
      this.selectedAlloffice = -1;
      this.searchModel.OfficeCode = [];
    }
  }

  getDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForUser, this.UserType)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.dDLList = <DDLModel>data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  BindUserPagePermissionList() {
    console.log("BindUserPagePermissionList");
    console.log(this.Application);
    console.log(this.UserId);
    console.log("-----------");
    if (
      !this._commonService.IsNullOrEmpty(this.Application) &&
      !this._commonService.IsNullOrEmpty(this.UserId)
    ) {
      this._userPermissionService
        .GetUserPagePermissons(this.Application, this.UserId)
        .subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            if (data.IsSuccess) {
              console.log(data.Data.length + "_1");
              this.userPagePermissionList = <UserPagePermissionListModel[]>(
                data.Data
              );
              this.dataSource = new MatTableDataSource<
                UserPagePermissionListModel
              >(this.userPagePermissionList);
              this.checkAllSelected();
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {
      this.userPagePermissionList = [];
      this.dataSource = [];
    }
  }

  BindUserDefaultPagePermissionList() {
    console.log("BindUserDefaultPagePermissionList");
    console.log(this.Application);
    console.log(this.UserId);

    console.log("-----------");
    if (
      !this._commonService.IsNullOrEmpty(this.Application) &&
      !this._commonService.IsNullOrEmpty(this.UserId)
    ) {
      this._userPermissionService
        .GetUserDefaultPagePermissons(this.Application, this.UserId)
        .subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            if (data.IsSuccess) {
              console.log(data.Data.length + "_2");
              this.userPageDefaultPermissionList = <
                DefaultPagePermissionListModel[]
              >data.Data;
              this.isShow = true;
              this.dataSource1 = new MatTableDataSource<
                DefaultPagePermissionListModel
              >(this.userPageDefaultPermissionList);
              this.checkAllSelected();
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {
      this.userPageDefaultPermissionList = [];
      this.dataSource1 = [];
    }
  }

  checkAllSelected() {
    this.IsAllSelected("Add");
    this.IsAllSelected("Edit");
    this.IsAllSelected("Delete");
    this.IsAllSelected("View");
  }

  CheckUncheckAll(perType: string) {
    for (let i = 0; i < this.userPagePermissionList.length; i++) {
      if (perType === "Add") {
        this.userPagePermissionList[i].AddPermission = this.IsHeaderAddSelected;
      } else if (perType === "Edit") {
        this.userPagePermissionList[
          i
        ].EditPermission = this.IsHeaderEditSelected;
      } else if (perType === "Delete") {
        this.userPagePermissionList[
          i
        ].DeletePermission = this.IsHeaderDeleteSelected;
      } else if (perType === "View") {
        this.userPagePermissionList[
          i
        ].ViewPermission = this.IsHeaderViewSelected;
      }
    }
  }

  IsAllSelected(perType: string) {
    if (perType === "Add") {
      this.IsHeaderAddSelected = this.userPagePermissionList.every(function (
        item: any
      ) {
        return item.AddPermission === true;
      });
    } else if (perType === "Edit") {
      this.IsHeaderEditSelected = this.userPagePermissionList.every(function (
        item: any
      ) {
        return item.EditPermission === true;
      });
    } else if (perType === "Delete") {
      this.IsHeaderDeleteSelected = this.userPagePermissionList.every(function (
        item: any
      ) {
        return item.DeletePermission === true;
      });
    } else if (perType === "View") {
      this.IsHeaderViewSelected = this.userPagePermissionList.every(function (
        item: any
      ) {
        return item.ViewPermission === true;
      });
    }
  }

  SavePermissions() {
    this._userPermissionService
      .SaveUserPagePermissions(this.userPagePermissionList)
      .subscribe(
        (data) => {
          this._commonService.ScrollingTop();
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              if (
                this._auth.GetCurrentUserDetail().UserViewModel.UserId ==
                this.UserId
              ) {
                this._auth.UpdateLoginUserMenu();
                this._auth.UpdateLoginUserPermission();
                setTimeout(() => {
                  this.appComponnet.UpdateMenu();
                }, 100);
              }
            } else {
              this._alertService.error(data.Message);
            }
          } else {
            this._alertService.error(
              GlobalMessagesModel.updateUserPagePermissionFailed
            );
          }
        },
        (error) => {
          this._commonService.ScrollingTop();
          this._alertService.error(
            GlobalMessagesModel.updateUserPagePermissionError
          );
        }
      );
  }

  UserPermissionList() {
    this.BindUserPagePermissionList();
    this.BindUserDefaultPagePermissionList();
  }

    GetList(){
    this.UserPermissionList();
  }

  ClearList(){
    
    this.userPagePermissionList = [];
    this.userPageDefaultPermissionList =[];
    // this.searchModel = new CustomSearchModel();
    this.Application = '';
    this.UserType = '';
    this.DepartmentCode = '';
    this.UserId = '';
    this.office = '';
  }

}
