import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  MatPaginator,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialogRef,
} from "@angular/material";
import { IndexModel } from "src/app/Shared/Model/general-model";
import {
  UserWhichHasApefificPermissionModel,
  UserWhichHasDefaultPermissionModel,
} from "src/app/Shared/Model/user-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { UserService } from "src/app/Shared/Service/user.service";

@Component({
  selector: "app-menu-wise-default-permission-dialog",
  templateUrl: "./menu-wise-default-permission-dialog.component.html",
  styleUrls: ["./menu-wise-default-permission-dialog.component.css"],
})
export class MenuWiseDefaultPermissionDialogComponent implements OnInit {
  //#region <Variables>
  userModel: UserWhichHasApefificPermissionModel[] = [];
  userTypeModel: UserWhichHasDefaultPermissionModel[] = [];
  isRecord: boolean;
  dataSource: any;

  displayedColumns: string[] = [
    "index",
    "UserTypeTitle",
    "UserName",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "UserTypeTitle", Text: "User Type" },
    { Value: "UserName", Text: "User" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  indexModel: IndexModel;
  pageCode: number = 0;
  pageTitle: number = 0;
  //#endregion <Variables>

  //#region <Constructor>

  constructor(
    public _dialogRef: MatDialogRef<MenuWiseDefaultPermissionDialogComponent>,
    private readonly _alertService: AlertService,
    private readonly _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.indexModel = new IndexModel();
    
    if (data) {
      this.pageCode = data.PageCode;
      this.pageTitle= data.PageTitle;
      this.GetUserDefaultPermissionByUser();
      this.GetUserPermissionByUser();
    }
  }

  //#endregion <Constructor>

  //#region <Methods>

  ngOnInit() {}

  GetUserDefaultPermissionByUser() {
    this._userService.GetUserWhichHasDefaultPermission(this.pageCode).subscribe(
      (data) => {
        if (data.IsSuccess) {
          if (data.Data.length > 0) {
            this.userTypeModel = <UserWhichHasDefaultPermissionModel[]>(
              data.Data
            );
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  GetUserPermissionByUser() {
    this._userService
      .GetUserWhichHasApefificPermission(this.pageCode)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            if (data.Data.length > 0) {
              this.isRecord = false;
              this.userModel = <UserWhichHasApefificPermissionModel[]>data.Data;
              this.dataSource = new MatTableDataSource<any>(this.userModel);
              this.dataSource.paginator = this.paginator;
            } else {
              this.isRecord = true;
            }
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
  }

  
  resetUserSpecificPermission(userId) {
    
    this._userService.ResetUserSpecificPermission(userId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.GetUserPermissionByUser();
          alert(data.Message);
          this._alertService.success(data.Message);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  //#endregion <Methods>
}
