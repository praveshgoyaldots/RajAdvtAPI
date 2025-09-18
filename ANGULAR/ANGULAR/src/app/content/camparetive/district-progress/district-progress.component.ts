import { Component, OnInit, ViewChild } from '@angular/core';
import { DistrictProgressListViewModel } from 'src/app/Shared/Model/Camparetive/district-progress-model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { environment } from 'src/environments/environment';
import { EbookletEnumProd, EbookletEnum } from 'src/app/Shared/Enum/ebooklet.enum';
import { AppComponent } from 'src/app/app.component';
import { DistrictProgressService } from 'src/app/Shared/Service/Comperative/district-progress.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-district-progress',
  templateUrl: './district-progress.component.html',
  styleUrls: ['./district-progress.component.css']
})
export class DistrictProgressComponent implements OnInit {
//#region << Variable >>
listModel: DistrictProgressListViewModel[];
dataSource: MatTableDataSource<DistrictProgressListViewModel>;
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
  { Value: "DepartmentTitle", Text: "District" },
  { Value: "YearName", Text: "Year Name" },
  { Value: "modifiedbyName", Text: "Created By" },
  { Value: "MonthName", Text: "Month" },
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
DepartmentProgressPermission: PermissionModel = this._commonService.GetPagePermission(
  "/camparative/district-progress",
  "/camparative/district-progress/add",
  "",
  "/camparative/district-progress/update"
);
ebookletEnumProd=environment.production?EbookletEnumProd:EbookletEnum;

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _districtProgressService: DistrictProgressService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.DepartmentProgressPermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "District Progress List:",
        "add",
        "Add",
        "camparative/district-progress/add"
      )
    : this._parentComponent.setpagelayout("District Progress List:");
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
  
  this._districtProgressService.GetList(this.indexModel,this.ebookletEnumProd.EbookletCategory).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <DistrictProgressListViewModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<DistrictProgressListViewModel>(
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
  this._districtProgressService.ChangeActiveStatus(id).subscribe(
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
