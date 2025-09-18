import { TenderProgressDialogComponent } from './tender-progress-dialog/tender-progress-dialog.component';
import { Component, OnInit, ViewChild } from "@angular/core";
import { TenderMasterListModel } from "src/app/Shared/Model/TenderPressRelease/tender-master-model";
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
import { TenderMasterService } from "src/app/Shared/Service/TenderPressRelease/tender-master.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";

@Component({
  selector: "app-tendor",
  templateUrl: "./tendor.component.html",
  styleUrls: ["./tendor.component.css"]
})
export class TendorComponent implements OnInit {
  //#region <Variable>

  listModel: TenderMasterListModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "RONo",
    "NITPurpose",
    "IsActive",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "RONo", Text: "RO No." },
    { Value: "NITPurpose", Text: "Subject" }
  ];

  searchColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "RONo", Text: "RO No." },
    { Value: "NITPurpose", Text: "Subject" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/tender-press-release/tendor",
    "/tender-press-release/tendor/add",
    "",
    "/tender-press-release/tendor/update"
  );
  indexModel: IndexModel;
  totalRecords: number;

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    private readonly _tenderMasterService: TenderMasterService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog
  ) {
    this.Permission.AddPageAccess
    ? this._parentApi.setpagelayout(
        "Tender Master List:",
        "add",
        "Add",
        "tender-press-release/tendor/add"
      )
    : this._parentApi.setpagelayout("Tender Master List:");
    this.indexModel = new IndexModel();
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    
    this._tenderMasterService.GetList(this.indexModel).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.listModel = <TenderMasterListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<TenderMasterListModel>(
            this.listModel
          );
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

  SearchByKeyword(event) {
    
    this.indexModel.Search = event;
    this.GetList();
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
    this._tenderMasterService.ChangeActiveStatus(id).subscribe(
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

  openUpdateProgressDialog(id) {
    
    const _dialogRef = this._dialog.open(TenderProgressDialogComponent, {
      width: "700px",
      data: id,
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
  }

  //#endregion <Method>
}
