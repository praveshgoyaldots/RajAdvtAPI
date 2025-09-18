import { Component, OnInit, ViewChild } from "@angular/core";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  PermissionModel,
  IndexModel,
} from "src/app/Shared/Model/general-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
} from "@angular/material";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import { ImportantDecisionSubCategoryMasterService } from "src/app/Shared/Service/important-decision-sub-category-master";
import { ImportantDicisionSubCategoryMasterModel } from "src/app/Shared/Model/Master/important-decision-subcategory-master-model";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { AddUpdateImportantDicisionSubCategoryMasterComponent } from "./add-update-important-dicision-sub-category-master/add-update-important-dicision-sub-category-master.component";

@Component({
  selector: "app-importantdecisionsubcategorymaster",
  templateUrl: "./importantdecisionsubcategorymaster.component.html",
  styleUrls: ["./importantdecisionsubcategorymaster.component.css"],
})
export class ImportantdecisionsubcategorymasterComponent implements OnInit {
  //#region Variable
  model: ImportantDicisionSubCategoryMasterModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = [
    "index",
    "Title",
    "TitleHindi",
    "CategoryName",
    // "SectorName",
    // "CategoryTitleHindi",
    "DepartmentTitle",
    "IsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Title", Text: "Sub Category(EN)" },
    { Value: "TitleHindi", Text: "Sub Category(HI)" },
    { Value: "CategoryName", Text: "Category" },
    // { Value: "SectorName", Text: "Sector" },
    // { Value: "CategoryTitleHindi", Text: "Category Hindi" },
    { Value: "DepartmentTitle", Text: "Department" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/Importantdecision-sub-category",
    "/Importantdecision-sub-category/add",
    "/Importantdecision-sub-category/detail",
    "/Importantdecision-sub-category/update",
    "/Importantdecision-sub-category/delete"
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
    private readonly _importantdecisionSubCategoryService: ImportantDecisionSubCategoryMasterService
  ) {
    this._parentApi.setpagelayout(
      "Important Decisions Sub Category :",
      "add",
      "Create",
      "/master/Impdecsubcat/",
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
    
    this._importantdecisionSubCategoryService
      .GetList(this.indexModel)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.model = <ImportantDicisionSubCategoryMasterModel[]>(
              data.Data.Data
            );
            this.dataSource = new MatTableDataSource<
              ImportantDicisionSubCategoryMasterModel
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
      AddUpdateImportantDicisionSubCategoryMasterComponent,
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
        this._importantdecisionSubCategoryService
          .ChangeDeleteStatus(Id)
          .subscribe(
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
              this._importantdecisionSubCategoryService
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
