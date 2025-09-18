import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { ADVTJankalyanAdvertisementModel } from 'src/app/Shared/Model/advtjankalyan-advertisement-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { JankalyanAdvertisementService } from 'src/app/Shared/Service/jankalyan-advertisement.service';

@Component({
  selector: 'app-jankalyan-advertisement',
  templateUrl: './jankalyan-advertisement.component.html',
  styleUrls: ['./jankalyan-advertisement.component.css']
})
export class JankalyanAdvertisementComponent implements OnInit {
//#region << Variable >>
listModel: ADVTJankalyanAdvertisementModel[];
dataSource: MatTableDataSource<ADVTJankalyanAdvertisementModel>;
displayedColumns: string[] = [
  "index",
  // "ImageIcon",
  "ButtonName",
  "ImageUrl",
  "IsArrow",
  "DisplayOrder",
   "Status",
  "Action",
];

ViewdisplayedColumns: ColumnHeaderModel[] = [
  // { Value: "ImageIcon", Text: "ImageIcon" },
  { Value: "ButtonName", Text: "ButtonN ame" },
  { Value: "ImageUrl", Text: "Image Url" },
  { Value: "DisplayOrder", Text: "Display Order" },
  // { Value: "MonthName", Text: "Month" },
];

searchColumns: ColumnHeaderModel[] = [
  { Value: "ButtonName", Text: "Button Name" },
  { Value: "ImageUrl", Text: "Image Url" },
  { Value: "DisplayOrder", Text: "Display Order" },
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
Permission = this._commonService.GetPagePermission(
  "jankalyan-advertisement",
  "jankalyan-advertisement/add-jankalyan-advertisement",
  "",
  "jankalyan-advertisement/update-jankalyan-advertisement",
  );

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _JankalyanAdvertisementService: JankalyanAdvertisementService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.Permission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Jankalyan Advertisement List:",
        "add",
        "Add",
        "advertisement/jankalyan-advertisement/add-jankalyan-advertisement"
      )
    : this._parentComponent.setpagelayout("Jankalyan Advertisement List:");
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
  
  this._JankalyanAdvertisementService.GetList(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <ADVTJankalyanAdvertisementModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<ADVTJankalyanAdvertisementModel>(
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
  this._JankalyanAdvertisementService.ChangeActiveStatus(id).subscribe(
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
