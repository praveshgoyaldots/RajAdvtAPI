import { Component, OnInit, ViewChild } from '@angular/core';
import { NewspaperViewModal } from 'src/app/Shared/Model/newspaper-modal';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { NewspaperService } from 'src/app/Shared/Service/newspaper.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { NewsProgressUpdateComponent } from './news-progress-update/news-progress-update.component';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.css']
})
export class NewspaperComponent implements OnInit {

//#region << Variable >>
listModel: NewspaperViewModal[];
dataSource: MatTableDataSource<NewspaperViewModal>;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "SubjectName",
  "Date",
  "IsVisibleToPublic",
  "ProgressCount",
  "ModifiedDate",
  "ModifiedName",
  "Status",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: "DepartmentTitle", Text: "Department" },
   { Value: "ProgressCount", Text: "Progress Count"},
   { Value: "ModifiedName", Text: "Created By"},
   { Value: "SubjectName", Text: "Subject"}
];

searchColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "SubjectName", Text: "Subject"}
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
SchemePermission: PermissionModel = this._commonService.GetPagePermission(
  "/newspaper/news",
  "/newspaper/news/add",
  "",
  "/newspaper/news/edit",
);

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _newspaperService: NewspaperService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.SchemePermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Success Story  List :",
        "add",
        "Add",
        "newspaper/add"
      )
    : this._parentComponent.setpagelayout("Newspaper List :");
  this.indexModel = new IndexModel();
}

//#endregion

//#region << Method >>

ngOnInit() {
  this.GetList();
}

SortData(event) {
  this.indexModel.OrderBy = event.active;
  this.indexModel.OrderByAsc =
    event.direction === AppSetting.orderByDscAsc
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

GetList() {
  
  this._newspaperService.GetList(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <NewspaperViewModal[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<NewspaperViewModal>(
          this.listModel
        );
          this.dataSource.paginator = this.paginator;
          this.totalRecords = data.Data.TotalRecords;
          this.dataSource.sort = this.sort;
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}


statusClick(id) {
  this._newspaperService.UpdateStatus(id).subscribe(
    data => {
      if (data.IsSuccess) {
        this.GetList();
        this._commonService.ScrollingTop();
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

SearchByKeyword(event) {
  
  this.indexModel.Search = event;
  this.GetList();
}

Reset() {

  this.indexModel = new IndexModel();
  this.GetList();
}

openDialog(Id) {
  const _dialogRef = this._dialog.open(NewsProgressUpdateComponent, {
    width: "1100px",
    data: {TransId: Id,ProgrssId:0},
    disableClose: true,
  });
  _dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.GetList();
    }
  });
}

//#endregion
}
