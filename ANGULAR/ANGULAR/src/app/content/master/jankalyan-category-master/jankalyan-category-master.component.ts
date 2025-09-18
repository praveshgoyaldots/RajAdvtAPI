import { Component, OnInit, ViewChild } from "@angular/core";
import { JANCategoryMasterModel } from "src/app/Shared/Model/Master/jan-category-master.model";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource
} from "@angular/material";
import {
  PermissionModel,
  IndexModel
} from "src/app/Shared/Model/general-model";
import { JankalyanCategoryService } from "src/app/Shared/Service/jankalyan-category.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { JanCategoryAddUpdateDialogComponent } from "./jan-category-add-update-dialog/jan-category-add-update-dialog.component";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";

@Component({
  selector: "app-jankalyan-category-master",
  templateUrl: "./jankalyan-category-master.component.html",
  styleUrls: ["./jankalyan-category-master.component.css"]
})
export class JankalyanCategoryMasterComponent implements OnInit {

  //#region <Variable>

  listModel: JANCategoryMasterModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "Code",
    "Name",
    "NameHindi",
    "CreatedBy",
    "IsActive",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Code", Text: "Code" },
    // { Value: "Name", Text: "Category Name" },
    // { Value: "NameHindi", Text: "Category Name in Hindi" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/jancategorylist",
    "/master/jancategorylist/add",
    "",
    "/master/jancategorylist/edit"
  );
  indexModel: IndexModel;
  totalRecords: number;

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    private readonly _jankalyanCategoryService: JankalyanCategoryService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _parentComponent: AppComponent,
    private _dialog: MatDialog
  ) {
    this.Permission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Jankalyan Category List:",
        "add",
        "Add",
        "/master/jancategorylist/add"
      )
    : this._parentComponent.setpagelayout("Order Type Master List:");
    this.indexModel = new IndexModel();
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    this._jankalyanCategoryService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <JANCategoryMasterModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<JANCategoryMasterModel>(
            this.listModel
          );
          this.dataSource.paginator = this.paginator;
          this.totalRecords = data.Data.TotalRecords;
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.GetList();
  }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.GetList();
  }

  openDialog(Id) {
    const _dialogRef = this._dialog.open(JanCategoryAddUpdateDialogComponent, {
      width: "500px",
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
  }

  onActiveStatus(id) {
    
    // this._commonService.GenerateOTP().subscribe(
    //   data => {
    //     if (data.IsSuccess) {
    //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
    //         width: "500px",
    //         disableClose: true
    //       });
    //       _dialogRef.afterClosed().subscribe((result: boolean) => {
    //         if (result) {
              this._jankalyanCategoryService.UpdateStatus(id).subscribe(
                data => {
                  if (data.IsSuccess) {
                    this.GetList();
                    this._alertService.success(data.Message);
                  } else {
                    this._alertService.error(data.Message);
                  }
                },
                error => {
                  this._alertService.error(error.message);
                }
              );
    //         }
    //       });
    //     } else {
    //       this._alertService.error(data.Message);
    //     }
    //   },
    //   error => {
    //     this._alertService.error(error.message);
    //   }
    // );
  }

  //#endregion <Method>
}
