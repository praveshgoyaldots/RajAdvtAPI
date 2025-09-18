import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { UserPermissionService } from "src/app/Shared/Service/user-permission.service";
import { DefaultPagePermissionListModel } from "src/app/Shared/Model/user-permission.model";
import { stringify } from "querystring";
import { MatDialog,MatTableDataSource } from "@angular/material";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { DefaultPermissionDialogComponent } from "../default-permission-dialog/default-permission-dialog.component";
import { MenuWiseDefaultPermissionDialogComponent } from "../menu-wise-default-permission-dialog/menu-wise-default-permission-dialog.component";
import { PageManualComponent } from "src/app/header/page-manual/page-manual.component";

@Component({
  selector: "app-user-default-permission",
  templateUrl: "./user-default-permission.component.html",
  styleUrls: ["./user-default-permission.component.css"],
  providers: [UserPermissionService],
})
export class UserDefaultPermissionComponent implements OnInit {
  defaultPagePermissionList: DefaultPagePermissionListModel[] = [];
  dataSource: any;
  dropdownList: DDLModel;
  Application: any;
  UserType: any;

  IsHeaderAddSelected: boolean = false;
  IsHeaderEditSelected: boolean = false;
  IsHeaderDeleteSelected: boolean = false;
  IsHeaderViewSelected: boolean = false;

  displayedColumns: string[] = [
    "s_no",
    "ApplicationCode",
    "PageTypeName",
    "permission_name",
    "add_permission",
    "edit_permission",
    "delete_permission",
    "view_permission",
    "Action"
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _userPermissionService: UserPermissionService,
    private readonly _dialog: MatDialog
  ) {
    this.appComponnet.setpagelayout(
      "User Default Permission :",
      "keyboard_backspace",
      "Back To User List",
      "master/user"
    );
    this.GetDropdownList();
  }

  ngOnInit() {}

  GetDropdownList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForDefaultPagePermission)
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

  BindDefaultPagePermissionList() {
    
    if (
      this._commonService.IsNullOrEmpty(this.Application) &&
      !this._commonService.IsNullOrEmpty(this.UserType)
    ) {
      this._userPermissionService
        .GetDefaultPagePermissons(this.Application, this.UserType)
        .subscribe(
          (data) => {
            
            if (data.IsSuccess) {
              this.defaultPagePermissionList = <
                DefaultPagePermissionListModel[]
              >data.Data;
              this.dataSource =
                new MatTableDataSource<DefaultPagePermissionListModel>(
                  this.defaultPagePermissionList
                );
              this.checkAllSelected();
              //console.log(this.defaultPagePermissionList);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {
      this.defaultPagePermissionList = [];
      this.dataSource = [];
    }
  }

  viewPermissions() {
    const data = this.defaultPagePermissionList.filter(
      (f) =>
        f.ViewPermission == true ||
        f.EditPermission == true ||
        f.AddPermission == true ||
        f.DeletePermission == true
    );
    this._dialog.open(DefaultPermissionDialogComponent, {
      width: "850px",
      data: data,
    });
  }

  viewPermission(pageCode,pageTitle) {
      this._dialog.open(MenuWiseDefaultPermissionDialogComponent, {
      width: "850px",
      data: {'PageCode':pageCode,'PageTitle': pageTitle},
    });
  }

  checkAllSelected() {
    this.IsAllSelected("Add");
    this.IsAllSelected("Edit");
    this.IsAllSelected("Delete");
    this.IsAllSelected("View");
  }

  CheckUncheckAll(perType: string) {
    for (var i = 0; i < this.defaultPagePermissionList.length; i++) {
      if (perType == "Add") {
        this.defaultPagePermissionList[i].AddPermission =
          this.IsHeaderAddSelected;
      } else if (perType == "Edit") {
        this.defaultPagePermissionList[i].EditPermission =
          this.IsHeaderEditSelected;
      } else if (perType == "Delete") {
        this.defaultPagePermissionList[i].DeletePermission =
          this.IsHeaderDeleteSelected;
      } else if (perType == "View") {
        this.defaultPagePermissionList[i].ViewPermission =
          this.IsHeaderViewSelected;
      }
    }
  }

  IsAllSelected(perType: string) {
    if (perType == "Add") {
      this.IsHeaderAddSelected = this.defaultPagePermissionList.every(function (
        item: any
      ) {
        return item.AddPermission == true;
      });
    } else if (perType == "Edit") {
      this.IsHeaderEditSelected = this.defaultPagePermissionList.every(
        function (item: any) {
          return item.EditPermission == true;
        }
      );
    } else if (perType == "Delete") {
      this.IsHeaderDeleteSelected = this.defaultPagePermissionList.every(
        function (item: any) {
          return item.DeletePermission == true;
        }
      );
    } else if (perType == "View") {
      this.IsHeaderViewSelected = this.defaultPagePermissionList.every(
        function (item: any) {
          return item.ViewPermission == true;
        }
      );
    }
  }

  SavePermissions() {
    
    this._userPermissionService
      .SaveDefaultPagePermissions(this.defaultPagePermissionList)
      .subscribe(
        (data) => {
          this._commonService.ScrollingTop();
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
            } else {
              this._alertService.error(data.Message);
            }
          } else {
            this._alertService.error(
              GlobalMessagesModel.updateDefaultPagePermissionFailed
            );
          }
        },
        (error) => {
          this._commonService.ScrollingTop();
          this._alertService.error(
            GlobalMessagesModel.updateDefaultPagePermissionError
          );
        }
      );
  }

  openPageManual(data){
    
    this._dialog.open(PageManualComponent, {
       width: "800px",
       disableClose: true,
       data: {PagePermission:data}
     });
   }
   
}
