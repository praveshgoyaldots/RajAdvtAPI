import { Component, OnInit, ViewChild } from "@angular/core";
import { ColumnHeaderModel, DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material";
import {
  PermissionModel,
  IndexModel,
} from "src/app/Shared/Model/general-model";
import { CommonService } from "src/app/Shared/Service/common.service";
import { VCCreationViewModel, VCSearchModel } from "src/app/Shared/Model/vccreationView.model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";
import { VcCreationService } from "src/app/Shared/Service/vc-creation.service";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { AddUpdateVCCreationComponent } from "./add-update-vccreation/add-update-vccreation.component";
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: "app-vc-creation",
  templateUrl: "./vc-creation.component.html",
  styleUrls: ["./vc-creation.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class VCCreationComponent implements OnInit {
  //#region Variable
  listModel: VCCreationViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = [
    "index",
    "VCCategoryName",
    "DepartmentTitle",
    "ShortDescription",
    "Date",
    "StartTime",
    "EndTime",
    "ChairPersonCategoryName",
    "ChairPersonName",
    "TypeName",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "VCCategoryName", Text: "VC Category" },
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "ShortDescription", Text: "Title" },
    { Value: "StartTime", Text: "Start Time" },
    { Value: "EndTime", Text: "End Time" },
    { Value: "ChairPersonCategoryName", Text: "Chairperson Category" },
    { Value: "ChairPersonName", Text: "Chairperson" },
    { Value: "TypeName", Text: "Type" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/vc/vccreation",
    "/vccreation/add",
    "",
    "/vc/vccreation/edit"
  );
  indexModel: VCSearchModel;
  totalRecords: number;
  prevToDate: Date;
  prevFromDate: Date;
  dDLList: DDLModel;
  ddlParticipant: DdlItemModel[];
  //#endregion
  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _vccreationService: VcCreationService,
    private _parentComponent: AppComponent,
  ) {
    this._parentComponent.setpagelayout("", "", "", "",true);
    this.indexModel = new VCSearchModel();

  }
  //#endregion

  ngOnInit() {
    
    this.GetList();
    this.GetDDLList();
  }
  GetList() {
    

    this._vccreationService.GetList(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.listModel = <VCCreationViewModel[]>data.Data.Data;
          this.indexModel.FromDate = this.prevFromDate;
          this.indexModel.ToDate = this.prevToDate;

          this.dataSource = new MatTableDataSource<VCCreationViewModel>(
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

  clearClick() {
    
    this.indexModel = new VCSearchModel();
    this.prevFromDate = null;
    this.prevToDate = null;
    this.indexModel.FromDate = null;
    this.indexModel.ToDate = null;
    this.GetList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ddlVCCreationKey).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getParticipantList(code) {
    
    if (code) {
      this._commonService.GetParticipantList(code).subscribe(
        data => {
          if (data.IsSuccess) {
            this.ddlParticipant = data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlParticipant = [];
    }
  }

  OpenDialog(Id) {
    const _dialogRef = this._dialog.open(AddUpdateVCCreationComponent, {
      width: "1000px",
      data: Id,
      disableClose: true,

    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
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

  searchClick() {
    
    if (this.indexModel.FromDate) {
      this.prevFromDate = new Date( this.indexModel.FromDate);
      this.indexModel.FromDate = this.indexModel.FromDate.toLocaleString();
    }
if (this.indexModel.ToDate) {
  this.prevToDate = new Date( this.indexModel.ToDate);
  this.indexModel.ToDate = this.indexModel.ToDate.toLocaleString();
}
    this.GetList();
  }

  onDelete(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._vccreationService.Delete(id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this._alertService.success(data.Message);
              this.GetList();
              this._commonService.ScrollingTop();
            }else{
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
            this._commonService.ScrollingTop();
          }
        );
      }
    });
  }
  //#endregion
}
