import { CommonService } from 'src/app/Shared/Service/common.service';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { YearMasterModel } from 'src/app/Shared/Model/Camparetive/comparative-year-master-model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ComparativeYearMasterService } from 'src/app/Shared/Service/Comperative/comparative-year-master.service';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AddupdatecomparativeYearMasterComponent } from './addupdatecomparative-year-master/addupdatecomparative-year-master.component';

@Component({
  selector: 'app-camparative-year-master',
  templateUrl: './camparative-year-master.component.html',
  styleUrls: ['./camparative-year-master.component.css']
})
export class CamparativeYearMasterComponent implements OnInit {
//#region <Variable>

listModel: YearMasterModel[];
dataSource: any;
displayedColumns: string[] = [
  "index",
  "YearName",
  "Remarks",
  "IsCurrentGovernment",
  "OrderBy",
  "IsActive",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "YearName", Text: "Year" },
  { Value: "Remarks", Text: "Remarks" },
  { Value: "OrderBy", Text: "OrderBy" },
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

Permission: PermissionModel = this._commonService.GetPagePermission(
  "/camparative/yearmaster",
  "/camparative/yearmaster/add",
  "",
  "/camparative/yearmaster/edit",
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _ComparativeYearMasterService: ComparativeYearMasterService,
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
  
  this._ComparativeYearMasterService.GetList(this.indexModel).subscribe(
    (data) => {
      
      if (data.IsSuccess) {
        this.listModel = <YearMasterModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<YearMasterModel>(
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
  
  const _dialogRef = this._dialog.open(AddupdatecomparativeYearMasterComponent, {
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
  this._ComparativeYearMasterService.ChangeActiveStatus(id).subscribe(
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
