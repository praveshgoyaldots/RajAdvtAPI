import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppComponent } from 'src/app/app.component';
import { PreviousGovernmentEntryListModel } from 'src/app/Shared/Model/Camparetive/previous-government-entry-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { PreviousGovernmentEntryService } from 'src/app/Shared/Service/Comperative/previous-government-entry.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';

@Component({
  selector: 'app-previous-government-entry',
  templateUrl: './previous-government-entry.component.html',
  styleUrls: ['./previous-government-entry.component.css']
})
export class PreviousGovernmentEntryComponent implements OnInit {
//#region << Variable >>
listModel: PreviousGovernmentEntryListModel[];
dataSource: MatTableDataSource<PreviousGovernmentEntryListModel>;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "KPICategoryName",
  "ModifiedDate",
  "modifiedbyName",
  "PhysicalParameter",
  "Status",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "KPICategoryName", Text: "KPI Category Name" },
  { Value: "modifiedbyName", Text: "Created By" },
  { Value: "PhysicalParameter", Text: "PhysicalParameter" },
];

searchColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "KPICategoryName", Text: "KPI Category Name" },
  { Value: "PhysicalParameter", Text: "Physical Parameter" },

];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
SchemePermission: PermissionModel = this._commonService.GetPagePermission(
  "/camparative/previous-government-entry",
  "/camparative/previous-government-entry/add",
  "",
  "/camparative/previous-government-entry/update"
);

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _previousGovernmentEntryService: PreviousGovernmentEntryService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.SchemePermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Previous Government Entry List:",
        "add",
        "Add",
        "camparative/previous-government-entry/add"
      )
    : this._parentComponent.setpagelayout("previous Government Entry List:");
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
  
  this._previousGovernmentEntryService.GetList(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <PreviousGovernmentEntryListModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<PreviousGovernmentEntryListModel>(
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

statusClick(id) {
  this._previousGovernmentEntryService.ChangeActiveStatus(id).subscribe(
    (data) => {
      if (data.IsSuccess) {
        this.GetList();
        this._commonService.ScrollingTop();
        this._alertService.success(data.Message);
      } else {
        this._alertService.error(data.Message);
      }
    },
    (error) => {
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
//#endregion
}
