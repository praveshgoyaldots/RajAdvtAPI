import { Component, OnInit, ViewChild } from '@angular/core';
import { MonitoringParameterWithCountModel } from 'src/app/Shared/Model/scheme-model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-m-p-count-with-scheme',
  templateUrl: './m-p-count-with-scheme.component.html',
  styleUrls: ['./m-p-count-with-scheme.component.css']
})
export class MPCountWithSchemeComponent implements OnInit {
//#region << Variable >>
listModel: MonitoringParameterWithCountModel[];
dataSource: MatTableDataSource<MonitoringParameterWithCountModel>;
displayedColumns: string[] = ["index", "NameEnglish", "MPCount","MPEntryCount", "Action"];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "NameEnglish", Text: "Scheme Name (Eng)" },
  { Value: "MPCount", Text: "Monitoring Parameter Count" },
  { Value: "MPEntryCount", Text: "MPR Count" }
];
columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
nodelNameItems: { [index: string]: string } = {};
schemeNameItems: { [index: string]: string } = {};
//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _schemeService: SchemeService,
  private readonly _alertService: AlertService) {
  this.indexModel = new IndexModel();
  this._parentComponent.setpagelayout("Scheme : Monitoring Parameter Count", "add", "", "");
}
//#endregion

//#region << Method >>
ngOnInit() {
  this.GetList();
}

SortData(event) {
  this.indexModel.OrderBy = event.active;
  this.indexModel.OrderByAsc = event.direction === AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
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
  this._schemeService.GetAllMPRCountWithScheme(this.indexModel).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <MonitoringParameterWithCountModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<MonitoringParameterWithCountModel>(this.listModel);
        if (this.indexModel.IsPostBack === false) {
          this.dataSource.paginator = this.paginator;
          this.totalRecords = data.Data.TotalRecords;
          this.dataSource.sort = this.sort;
        }
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

SearchByKeyword(searchValue) {
  this.indexModel.Search = searchValue;
  this.GetList();
}

//#endregion
}
