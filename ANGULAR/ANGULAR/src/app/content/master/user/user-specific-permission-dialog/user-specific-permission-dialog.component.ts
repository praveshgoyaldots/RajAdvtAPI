import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  MatPaginator,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialogRef,
} from "@angular/material";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { UserPagePermissionByUserModel } from "src/app/Shared/Model/user-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { UserService } from "src/app/Shared/Service/user.service";

@Component({
  selector: "app-user-specific-permission-dialog",
  templateUrl: "./user-specific-permission-dialog.component.html",
  styleUrls: ["./user-specific-permission-dialog.component.css"],
})
export class UserSpecificPermissionDialogComponent implements OnInit {
  //#region <Variables>

  listModel: UserPagePermissionByUserModel[] = [];
  isRecord: boolean;
  dataSource: any;

  displayedColumns: string[] = [
    "index",
    "ApplicationTitle",
    "PageTitle",
    "permission",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "ApplicationTitle", Text: "Application" },
    { Value: "PageTitle", Text: "Page" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  indexModel: IndexModel;
  userId: number = 0;
  //#endregion <Variables>

  //#region <Constructor>

  constructor(
    public _dialogRef: MatDialogRef<UserSpecificPermissionDialogComponent>,
    private readonly _alertService: AlertService,
    private readonly _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.indexModel = new IndexModel();
    
    if (data) {
      this.userId = data;
      this.GetUserPagePermissionByUser();
    }
  }

  //#endregion <Constructor>

  //#region <Methods>

  ngOnInit() {}

  GetUserPagePermissionByUser() {
    this._userService.GetUserPagePermissionByUser(this.userId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          if (data.Data.length > 0) {
            this.isRecord = false;
            this.listModel = <UserPagePermissionByUserModel[]>data.Data;
            this.dataSource = new MatTableDataSource<any>(this.listModel);
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

  //#endregion <Methods>
}
