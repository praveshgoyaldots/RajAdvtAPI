import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { ComparativeParameterTargetViewModel } from 'src/app/Shared/Model/Camparetive/comparative-target-entry-model';
import { AppComponent } from 'src/app/app.component';
import { ComparativeTargetEntryService } from 'src/app/Shared/Service/Comperative/comparative-target-entry.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-camparative-target-entry',
  templateUrl: './camparative-target-entry.component.html',
  styleUrls: ['./camparative-target-entry.component.css']
})
export class CamparativeTargetEntryComponent implements OnInit {
//#region << Variable >>
listModel: ComparativeParameterTargetViewModel[];
dataSource: MatTableDataSource<ComparativeParameterTargetViewModel>;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  // "KPICategoryName",
  "YearName",
  "ModifiedDate",
  "modifiedbyName",
  "Status",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  // { Value: "KPICategoryName", Text: "KPI Category Name" },
  { Value: "YearName", Text: "Year Name" },
  { Value: "modifiedbyName", Text: "Created By" },
];

searchColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "KPICategoryName", Text: "KPI Category Name" },
  { Value: "YearName", Text: "Year Name" },
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
SchemePermission: PermissionModel = this._commonService.GetPagePermission(
  "/camparative/camparativetargetentry",
  "/camparative/camparativetargetentry/add",
  "",
  "/camparative/camparativetargetentry/update"
);

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _ComparativeTargetEntryService: ComparativeTargetEntryService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.SchemePermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Camparative Target Entry  List:",
        "add",
        "Add",
        "camparative/camparativtargetentry/add"
      )
    : this._parentComponent.setpagelayout("Camparative Target Entry  List:");
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
  
  this._ComparativeTargetEntryService.GetList(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <ComparativeParameterTargetViewModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<ComparativeParameterTargetViewModel>(
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
  this._ComparativeTargetEntryService.ChangeActiveStatus(id).subscribe(
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
