import { JankalyanEntryMasterService } from "./../../../Shared/Service/jankalyan-entry-master.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";

import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from "@angular/material";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  IndexModel,
  PermissionModel
} from "src/app/Shared/Model/general-model";
import { JankalyanEntryMasterViewModel } from "src/app/Shared/Model/Master/JankalyanEntryMaster.model";
import { AddUpdateJankalyanEntryMasterComponent } from "./add-update-jankalyan-entry-master/add-update-jankalyan-entry-master.component";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-jankalyan-entry-master",
  templateUrl: "./jankalyan-entry-master.component.html",
  styleUrls: ["./jankalyan-entry-master.component.css"]
})
export class JankalyanEntryMasterComponent implements OnInit {
  //#region  Variable's
  listModel: JankalyanEntryMasterViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = [
    "index",
    "Code",
    "CategoryName",
    "Name",
    "NameHindi",
    "ClassificationPageTypeName",
    "MenuClassificationName",
    "CreatedBy",
    "IsActive",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Code", Text: "Code" },
    { Value: "MenuClassificationName", Text: "Menu Classification" },
    { Value: "ClassificationPageTypeName", Text: "Classification Page Type" },
    // { Value: "Name", Text: "Name" },
    // { Value: "NameHindi", Text: "Name In Hindi" },
    //{ Value: "DisplayOrder", Text: "Display Order" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/JankalyanEntryType",
    "/JankalyanEntryType/add",
    "",
    "/JankalyanEntryType/update"
  );
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion

  //#region Constructor
  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _jankalyanEntryMasterService: JankalyanEntryMasterService
  ) {
    this._parentApi.setpagelayout("", "", "", "", true);

    this.Permission.AddPageAccess
      ? this._parentApi.setpagelayout(
        "Jankalyan Entry Type:",
        "add",
        "Create",
        "/master/JankalyanEntryType/add"
      )
      : this._parentApi.setpagelayout("Jankalyan Entry Type :");

    this.indexModel = new IndexModel();
  }
  //#endregion

  //#region  Method's

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    this._jankalyanEntryMasterService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <JankalyanEntryMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<
            JankalyanEntryMasterViewModel
          >(this.listModel);
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  OnStatusClick(id) {
    // this._commonService.GenerateOTP().subscribe(data => {
    //   if (data.IsSuccess) {
    //     const _dialogRef = this._dialog.open(OTPDialogComponent, { width: "500px", disableClose: true });
    //     _dialogRef.afterClosed().subscribe((result: boolean) => {
    //       if (result) {

    this._jankalyanEntryMasterService.ChangeActiveStatus(id).subscribe(data => {
      if (data.IsSuccess) {
        this.GetList();
        this._alertService.success(data.Message);
      } else {
        this._alertService.error(data.Message);
      }
    }, error => {
      this._alertService.error(error.message);
    });

    //       }
    //     });
    //   } else {
    //     this._alertService.error(data.Message);
    //   }
    // }, error => {
    //   this._alertService.error(error.message);
    // });
  }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
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
  //#endregion
}
