import { Component, OnInit, ViewChild } from "@angular/core";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  PermissionModel,
  IndexModel,
} from "src/app/Shared/Model/general-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import { AchievementSubCategoryMasterService } from "src/app/Shared/Service/achievement-sub-category-master.service";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
} from "@angular/material";
import { AddUpdateAchievementSubCategoryMasterComponent } from "./add-update-achievement-sub-category-master/add-update-achievement-sub-category-master.component";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { AchievementSubCategoryMasterModel } from "src/app/Shared/Model/Master/achievement-sub-category-master-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
@Component({
  selector: "app-achievement-sub-category-master",
  templateUrl: "./achievement-sub-category-master.component.html",
  styleUrls: ["./achievement-sub-category-master.component.css"],
})
export class AchievementSubCategoryMasterComponent implements OnInit {
  //#region Variable
  model: AchievementSubCategoryMasterModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = [
    "index",
    "SubCategoryCode",
    "Title",
    "TitleHindi",
    "CategoryTitle",
    // "CategoryTitleHindi",
    "DepartmentTitle",
    "IsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [

    { Value: "SubCategoryCode", Text: "Code" },
    { Value: "Title", Text: "Sub Category(EN)" },
    { Value: "TitleHindi", Text: "Sub Category(HI)" },
    { Value: "CategoryTitle", Text: "Category" },
    // { Value: "CategoryTitleHindi", Text: "Category Hindi" },
    { Value: "DepartmentTitle", Text: "Department" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/achievement-sub-category",
    "/achievement-sub-category/add",
    "/achievement-sub-category/detail",
    "/achievement-sub-category/update",
    "/achievement-sub-category/delete"
  );
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion

  //#region  constructor

  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _achievementSubCategoryService: AchievementSubCategoryMasterService
  ) {
    this._parentApi.setpagelayout(
      "General Entry Sub-Category:",
      "add",
      "Create",
      "master/achievement-sub-category",
      true
    );
    this.indexModel = new IndexModel();
  }
  //#endregion

  //#region Method

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    this._achievementSubCategoryService.GetList(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.model = <AchievementSubCategoryMasterModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<
            AchievementSubCategoryMasterModel
          >(this.model);
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  OpenDialog(Id) {
    const _dialogRef = this._dialog.open(
      AddUpdateAchievementSubCategoryMasterComponent,
      {
        width: "500px",
        data: Id,
        disableClose: true,
      }
    );
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
  }

  OnDelete(Id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Do you sure! want to delete this record?",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._achievementSubCategoryService.ChangeDeleteStatus(Id).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this.GetList();
              this._alertService.success(data.Message);
            }
          },
          (error) => {
            this._commonService.ScrollingTop();
            this._alertService.error(error.message);
          }
        );
      }
    });
  }

  OnActiveStatus(id) {
    
    this._commonService.GenerateOTP().subscribe(
      (data) => {
        if (data.IsSuccess) {
          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose: true,
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this._achievementSubCategoryService
                .ChangeActiveStatus(id)
                .subscribe(
                  (data) => {
                    if (data.IsSuccess) {
                      this.GetList();
                      this._alertService.success(data.Message);
                    } else {
                      this._alertService.error(data.Message);
                    }
                  },
                  (error) => {
                    this._alertService.error(error.message);
                  }
                );
            }
          });
        } else {
          this._alertService.error(data.Message);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  // OnActiveStatus(Id) {

  //   const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  //     width: '350px',
  //     data: "Do you sure! want to Update this record?",
  //     disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result) {
  //       this._achievementSubCategoryService.ChangeActiveStatus(Id).subscribe(
  //         data => {

  //           if (
  //             (data.IsSuccess)
  //           ) {
  //             this.GetList();
  //             this._alertService.success(data.Message);

  //           }
  //         },
  //         error => {
  //           this._commonService.ScrollingTop();
  //           this._alertService.error(error.message);
  //         }
  //       );
  //     }
  //   });

  // }
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
