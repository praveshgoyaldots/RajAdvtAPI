import {
  MatSort,
  MatPaginator,
  MatDialog,
  MatTableDataSource,
} from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import {
  PermissionModel,
  IndexModel,
} from "src/app/Shared/Model/general-model";
import { KPICategoryMasterViewModel } from "src/app/Shared/Model/Camparetive/kpicategory-model";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { KpiCategoryService } from "src/app/Shared/Service/Comperative/kpi-category.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { AddupdatekpiCategoryComponent } from "./addupdatekpi-category/addupdatekpi-category.component";

@Component({
  selector: "app-kpi-category",
  templateUrl: "./kpi-category.component.html",
  styleUrls: ["./kpi-category.component.css"],
})
export class KpiCategoryComponent implements OnInit {
  //#region <Variable>

  listModel: KPICategoryMasterViewModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "Name",
    "NameHindi",
    "IsAplicableToAllDpt",
    "IsDepartment",
    "IsDistrict",
    "IsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "Name", Text: "Name" },
    { Value: "NameHindi", Text: "Name Hindi" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/camparative/kpicategory",
    "/camparative/kpicategory/add",
    "",
    "/camparative/kpicategory/edit"
  );
  indexModel: IndexModel;
  totalRecords: number;

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    private readonly _KpiCategoryService: KpiCategoryService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog
  ) {
    this._parentApi.setpagelayout("", "", "", "", true);
    this.indexModel = new IndexModel();
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    
    this._KpiCategoryService.GetList(this.indexModel).subscribe(
      (data) => {
        
        if (data.IsSuccess) {
          this.listModel = <KPICategoryMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<KPICategoryMasterViewModel>(
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

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
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

  openDialog(Id) {
    
    const _dialogRef = this._dialog.open(AddupdatekpiCategoryComponent, {
      width: "500px",
      data: Id,
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
    this._KpiCategoryService.ChangeActiveStatus(id).subscribe(
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
