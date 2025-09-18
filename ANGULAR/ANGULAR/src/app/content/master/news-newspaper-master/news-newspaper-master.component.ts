import { Component, OnInit, ViewChild } from '@angular/core';
import { NewspaperMasterViewModel } from 'src/app/Shared/Model/Master/news-newspaper-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { NewsNewspaperMasterService } from 'src/app/Shared/Service/news-newspaper-master.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { NewsNewspaperMasterAddupdateComponent } from './news-newspaper-master-addupdate/news-newspaper-master-addupdate.component';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-news-newspaper-master',
  templateUrl: './news-newspaper-master.component.html',
  styleUrls: ['./news-newspaper-master.component.css']
})
export class NewsNewspaperMasterComponent implements OnInit {
//#region <Variable>

listModel: NewspaperMasterViewModel[];
dataSource: any;
displayedColumns: string[] = [
  "index",
  "Name",
  "NameHindi",
  "NewsTypeName",
  "ModeName",
  "IsActive",
  "Action"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "Name", Text: "Name" },
  { Value: "NewsTypeName", Text: "News Type" },
  { Value: "ModeName", Text: "Mode" },
  { Value: "NameHindi", Text: "Name in Hindi" }
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/news-newspaper",
  "/master/news-newspaper/add",
  "",
  "/master/news-newspaper/edit"
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _newsNewspaperMasterService: NewsNewspaperMasterService,
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
  
  this._newsNewspaperMasterService.GetList(this.indexModel).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <NewspaperMasterViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<NewspaperMasterViewModel>(
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
  const _dialogRef = this._dialog.open(NewsNewspaperMasterAddupdateComponent, {
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
  
  // this._commonService.GenerateOTP().subscribe(
  //   data => {
  //     if (data.IsSuccess) {
  //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
  //         width: "500px",
  //         disableClose: true
  //       });
  //       _dialogRef.afterClosed().subscribe((result: boolean) => {
  //         if (result) {
            this._newsNewspaperMasterService.UpdateStatus(id).subscribe(
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

//#endregion <Method>

}
