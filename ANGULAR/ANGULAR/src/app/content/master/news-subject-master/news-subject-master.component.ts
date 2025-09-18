import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsSubjectMasterViewModel } from 'src/app/Shared/Model/Master/news-subject-master-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { NewsSubjectMasterService } from 'src/app/Shared/Service/news-subject-master.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { NewsSubjectAddupdateComponent } from './news-subject-addupdate/news-subject-addupdate.component';

@Component({
  selector: 'app-news-subject-master',
  templateUrl: './news-subject-master.component.html',
  styleUrls: ['./news-subject-master.component.css']
})
export class NewsSubjectMasterComponent implements OnInit {
//#region <Variable>

listModel: NewsSubjectMasterViewModel[];
dataSource: any;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "Name",
  "NameHindi",
  "IsSubjectVisibleToAllDepartment",
  "IsActive",
  "Action"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "Name", Text: "Subject Name" },
  { Value: "NameHindi", Text: "Subject Name in Hindi" },
  { Value: "DepartmentTitle", Text: "Department" }
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/news-subject",
  "/master/news-subject/add",
  "",
  "/master/news-subject/edit"
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _newsSubjectMasterService: NewsSubjectMasterService,
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
  
  this._newsSubjectMasterService.GetList(this.indexModel).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <NewsSubjectMasterViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<NewsSubjectMasterViewModel>(
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
  const _dialogRef = this._dialog.open(NewsSubjectAddupdateComponent, {
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
            this._newsSubjectMasterService.UpdateStatus(id).subscribe(
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
