import { CommonService } from 'src/app/Shared/Service/common.service';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassificationPageTypeModel } from 'src/app/Shared/Model/Master/classification-pagetype-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ClassificationPagetypeService } from 'src/app/Shared/Service/classification-pagetype.service';

@Component({
  selector: 'app-classification-pagetype',
  templateUrl: './classification-pagetype.component.html',
  styleUrls: ['./classification-pagetype.component.css']
})
export class ClassificationPagetypeComponent implements OnInit {
//#region << Variable >>
listModel: ClassificationPageTypeModel[];
dataSource: MatTableDataSource<ClassificationPageTypeModel>;
displayedColumns: string[] = [
  "index",
  "NameHindi",
  "NameEnglish",
  "SampleURl",
  "DisplayOrder",
  "Remarks",
  "AttachmentURl",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "NameHindi", Text: "Name Hindi" },
  { Value: "NameEnglish", Text: "NameEnglish" },
  { Value: "DisplayOrder", Text: "Display Order" },
  { Value: "Remarks", Text: "Remarks" },
  { Value: "SampleURl", Text: "Sample URl" },
];

searchColumns: ColumnHeaderModel[] = [
  { Value: "NameHindi", Text: "Name Hindi" },
  { Value: "NameEnglish", Text: "Name English" },

];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
MenuClassificationPermission: PermissionModel = this._commonService.GetPagePermission(
  "/department-website/classification-Pagetype",
  "/department-website/classification-Pagetype/add",
  "",
  "/department-website/classification-Pagetype/update"
);

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _classificationPagetypeService: ClassificationPagetypeService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.MenuClassificationPermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Menu Classification Page Type List:",
        "add",
        "Add",
        "/department-website/classification-Pagetype/add"
      )
    : this._parentComponent.setpagelayout("Menu Classification Page Type List:");
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
  
  this.indexModel.PageSize=101;
  this._classificationPagetypeService.GetList(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <ClassificationPageTypeModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<ClassificationPageTypeModel>(
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
  this._classificationPagetypeService.ChangeActiveStatus(id).subscribe(
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

downloadPdf(Url) {
  if (Url) {
    const link = document.createElement("a");
    link.setAttribute("href", Url);
    link.setAttribute("download", 'Document');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
//#endregion
}
