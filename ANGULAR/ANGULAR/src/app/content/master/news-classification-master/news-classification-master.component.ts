import { NewsClassificationMasterModel } from './../../../Shared/Model/Master/news-classification-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { NewsClassificationService } from 'src/app/Shared/Service/news-classification.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { NewsClassificationAddupdateComponent } from './news-classification-addupdate/news-classification-addupdate.component';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-news-classification-master',
  templateUrl: './news-classification-master.component.html',
  styleUrls: ['./news-classification-master.component.css']
})
export class NewsClassificationMasterComponent implements OnInit {
//#region <Variable>

listModel: NewsClassificationMasterModel[];
dataSource: any;
displayedColumns: string[] = [
  "index",
  "Name",
  "NameHindi",
  "IsActive",
  "Action"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "Name", Text: "Name" },
  { Value: "NameHindi", Text: "Name in Hindi" }
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/news-classification",
  "/master/news-classification/add",
  "",
  "/master/news-classification/edit"
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _newsClassificationService: NewsClassificationService,
  private readonly _commonService: CommonService,
  private readonly _alertService: AlertService,
  private _parentApi: AppComponent,
  private _dialog: MatDialog
) {
  this._parentApi.setpagelayout(
    "",
    "",
    "",
    "",
    true
  );
  this.indexModel = new IndexModel();
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
  this.GetList();
}

GetList() {
  
  this._newsClassificationService.GetList(this.indexModel).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <NewsClassificationMasterModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<NewsClassificationMasterModel>(
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
  const _dialogRef = this._dialog.open(NewsClassificationAddupdateComponent, {
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
  
  this._commonService.GenerateOTP().subscribe(
    data => {
      if (data.IsSuccess) {
        const _dialogRef = this._dialog.open(OTPDialogComponent, {
          width: "500px",
          disableClose: true
        });
        _dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this._newsClassificationService.UpdateStatus(id).subscribe(
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

//#endregion <Method>
}
