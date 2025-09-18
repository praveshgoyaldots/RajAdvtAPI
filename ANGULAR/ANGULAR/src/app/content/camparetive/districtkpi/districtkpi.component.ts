import { MatDialog } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DistrictKPIListViewModel } from 'src/app/Shared/Model/Camparetive/district-kpimodel';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppComponent } from 'src/app/app.component';
import { DistrictkpiService } from 'src/app/Shared/Service/Comperative/districtkpi.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { environment } from 'src/environments/environment';
import { EbookletEnumProd, EbookletEnum } from 'src/app/Shared/Enum/ebooklet.enum';

@Component({
  selector: 'app-districtkpi',
  templateUrl: './districtkpi.component.html',
  styleUrls: ['./districtkpi.component.css']
})
export class DistrictkpiComponent implements OnInit {
//#region << Variable >>
listModel: DistrictKPIListViewModel[];
dataSource: MatTableDataSource<DistrictKPIListViewModel>;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  // "KPICategoryName",
  "YearName",
  "MonthName",
  "ModifiedDate",
  "modifiedbyName",
  "Status",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "District" },
  // { Value: "KPICategoryName", Text: "KPI Category Name" },
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
SchemePermission: PermissionModel = this._commonService.GetPagePermission(
  "/camparative/district-kpi",
  "/camparative/district-kpi/add",
  "",
  "/camparative/district-kpi/update"
);
ebookletEnumProd=environment.production?EbookletEnumProd:EbookletEnum;

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _DistrictkpiService: DistrictkpiService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.SchemePermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "District-KPI List:",
        "add",
        "Add",
        "camparative/district-kpi/add"
      )
    : this._parentComponent.setpagelayout("District-KPI List:");
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
  
  this._DistrictkpiService.GetList(this.indexModel,this.ebookletEnumProd.EbookletCategory).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <DistrictKPIListViewModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<DistrictKPIListViewModel>(
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
  this._DistrictkpiService.ChangeActiveStatus(id).subscribe(
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
