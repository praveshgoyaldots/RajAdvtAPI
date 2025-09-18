import { MpconstituencyAddUpdateComponent } from './mpconstituency-add-update/mpconstituency-add-update.component';
import { MPContituencyMasterService } from './../../../Shared/Service/MPContituencyMaster.service';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MPConstituencyMasterModel } from 'src/app/Shared/Model/Master/mp-constituency-master-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-mpconstituency-master',
  templateUrl: './mpconstituency-master.component.html',
  styleUrls: ['./mpconstituency-master.component.css']
})
export class MpconstituencyMasterComponent implements OnInit {
//#region <Variable>

listModel: MPConstituencyMasterModel[];
dataSource: any;
displayedColumns: string[] = [
  "index",
 // "DistrictCode",
  "Name",
  "NameHindi",
  "ShortName",
  "MPNameEng",
  "MPNameHindi",
  "MAPImagePath",
  "Latitude",
  "Longitude",
  "IsActive",
  "Action"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "Name", Text: "Name" },
  { Value: "NameHindi", Text: "Name in Hindi" },
  { Value: "Latitude", Text: "Latitude" },
 // { Value: "DistrictCode", Text: "District" },
  { Value: "ShortName", Text: "Short Name" },
  { Value: "MPNameEng", Text: "MP Name Eng" },
  { Value: "MPNameHindi", Text: "MP Name Hindi" },
  { Value: "Longitude", Text: "Longitude" },
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/mp-constituency",
  "/master/mp-constituency/add",
  "",
  "/master/mp-constituency/edit"
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _mPContituencyMasterService: MPContituencyMasterService,
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
  
  this._mPContituencyMasterService.GetList(this.indexModel).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <MPConstituencyMasterModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<MPConstituencyMasterModel>(
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
  const _dialogRef = this._dialog.open(MpconstituencyAddUpdateComponent, {
    width: "700px",
    data: Id
  });
  _dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.GetList();
    }
  });
}

onActiveStatus(id) {
  
  this._commonService.GenerateOTP().subscribe(
    data => {
      if (data.IsSuccess) {
        const _dialogRef = this._dialog.open(OTPDialogComponent, {
          width: "500px",
          disableClose: true
        });
        _dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this._mPContituencyMasterService
              .ChangeActiveStatus(id)
              .subscribe(
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
          }
        });
      } else {
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

downloadPdf(Url) {
  var w = window.open("about:blank");
  setTimeout(function() {
    //FireFox seems to require a setTimeout for this to work.
    w.document.body.appendChild(w.document.createElement("iframe")).src = Url;
    w.document.getElementsByTagName("iframe")[0].style.width = "100%";
    w.document.getElementsByTagName("iframe")[0].style.height = "100%";
  }, 0);
}

//#endregion <Method>
}
