import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DepartmentalProgressListViewModel } from 'src/app/Shared/Model/Camparetive/departmental-progress-model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { CurrentGovernmentEntryService } from 'src/app/Shared/Service/Comperative/current-government-entry.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DepartmentalProgressService } from 'src/app/Shared/Service/Comperative/departmental-progress.service';
import { environment } from 'src/environments/environment';
import { EbookletEnumProd, EbookletEnum } from 'src/app/Shared/Enum/ebooklet.enum';

@Component({
  selector: 'app-departmental-progress',
  templateUrl: './departmental-progress.component.html',
  styleUrls: ['./departmental-progress.component.css']
})
export class DepartmentalProgressComponent implements OnInit {
//#region << Variable >>
listModel: DepartmentalProgressListViewModel[];
dataSource: MatTableDataSource<DepartmentalProgressListViewModel>;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "YearName",
  "MonthName",
  "ModifiedDate",
  "modifiedbyName",

  "Status",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "YearName", Text: "Year Name" },
  { Value: "modifiedbyName", Text: "Created By" },
  { Value: "MonthName", Text: "Month" },
];

searchColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "YearName", Text: "Year Name" },
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
SchemePermission: PermissionModel = this._commonService.GetPagePermission(
  "/camparative/departmental-progress",
  "/camparative/departmental-progress/add",
  "",
  "/camparative/departmental-progress/update"
);
ebookletEnumProd=environment.production?EbookletEnumProd:EbookletEnum;

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _departmentalProgressService: DepartmentalProgressService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.SchemePermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Departmental Progress Entry List:",
        "add",
        "Add",
        "camparative/departmental-progress/add"
      )
    : this._parentComponent.setpagelayout("Departmental Progress Entry List:");
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
  
  this._departmentalProgressService.GetList(this.indexModel,this.ebookletEnumProd.EbookletCategory).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <DepartmentalProgressListViewModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<DepartmentalProgressListViewModel>(
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
  this._departmentalProgressService.ChangeActiveStatus(id).subscribe(
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
