import {
  MatTableDataSource,
  MatDialog,
  MatSort,
  MatPaginator,
} from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { BeneficiaryCategoryMasterModel } from "src/app/Shared/Model/Master/beneficiary-category-master-model";
import { AddupdateBeneficiaryCategoryMasterComponent } from "./addupdate-beneficiary-category-master/addupdate-beneficiary-category-master.component";
import {
  IndexModel,
  PermissionModel,
} from "src/app/Shared/Model/general-model";
import { Router } from "@angular/router";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { BeneficiaryCategoryMasterService } from "src/app/Shared/Service/beneficiary-category-master.service";

@Component({
  selector: "app-beneficiary-category-master",
  templateUrl: "./beneficiary-category-master.component.html",
  styleUrls: ["./beneficiary-category-master.component.css"],
})
export class BeneficiaryCategoryMasterComponent implements OnInit {
  //#region  Variable's
  listModel: BeneficiaryCategoryMasterModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = [
    "index",
    "ansmtcategory",
    "ansmtcategoryinHindi",
    "IsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "ansmtcategory", Text: "Beneficiary Category Name" },
    { Value: "ansmtcategoryinHindi", Text: "Beneficiary Category Name In Hindi" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/beneficiary-category-master",
    "/beneficiary-category-master/add",
    "",
    "/beneficiary-category-master/update"
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
    private readonly _beneficiaryCategoryMasterService: BeneficiaryCategoryMasterService
  ) {
    this._parentApi.setpagelayout("", "", "", "", true);
    this.indexModel = new IndexModel();
  }
  //#endregion

  //#region  Method's

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    
    this._beneficiaryCategoryMasterService.GetList(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.listModel = <BeneficiaryCategoryMasterModel[]>data.Data.Data;
          this.dataSource =
            new MatTableDataSource<BeneficiaryCategoryMasterModel>(
              this.listModel
            );
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

  OpenDialog(DesignationId) {
    const _dialogRef = this._dialog.open(
      AddupdateBeneficiaryCategoryMasterComponent,
      {
        width: "600px",
        data: DesignationId,
        disableClose: true,
      }
    );
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
  }

  OnStatusClick(id) {
    
    // this._commonService.GenerateOTP().subscribe(
    //   data => {
    //     if (data.IsSuccess) {

    //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
    //         width: "500px",
    //         disableClose:true
    //       });
    //       _dialogRef.afterClosed().subscribe((result: boolean) => {
    // if (result) {
    this._beneficiaryCategoryMasterService.ChangeActiveStatus(id).subscribe(
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

    //         }
    //       });
    //     }else{
    //       this._alertService.error(data.Message);
    //     }
    //   },
    //   error => {
    //     this._alertService.error(error.message);
    //   }
    // );
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
