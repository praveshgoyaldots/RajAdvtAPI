import { Component, OnInit, ViewChild } from '@angular/core';
import { MonitoringParameterMonthlyModel } from 'src/app/Shared/Model/scheme-model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Shared/Service/common.service';

@Component({
  selector: 'app-m-p-monthly-count-by-scheme',
  templateUrl: './m-p-monthly-count-by-scheme.component.html',
  styleUrls: ['./m-p-monthly-count-by-scheme.component.css']
})
export class MPMonthlyCountBySchemeComponent implements OnInit {
//#region << Variable >>
listModel: MonitoringParameterMonthlyModel[];
dataSource: MatTableDataSource<MonitoringParameterMonthlyModel>;
displayedColumns: string[] = ["index", "MonthName", "MPRCount", "Action"];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "MonthName", Text: "Month Name" },
  { Value: "MPRCount", Text: "Monitoring Parameter Entry Count" }
];
columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
nodelNameItems: { [index: string]: string } = {};
schemeNameItems: { [index: string]: string } = {};
schemeId: number;
dDLList: DDLModel;
//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _schemeService: SchemeService,
  private readonly _commonService: CommonService,
  private _route: ActivatedRoute,
  private readonly _alertService: AlertService) {
  this.indexModel = new IndexModel();
  this._parentComponent.setpagelayout("Scheme : Monitoring Parameter Monthly Count", "keyboard_backspace", "Back To MP", "scheme/monitoringparametercountwithscheme");
  this.schemeId = this._route.snapshot.params.id;
}
//#endregion

//#region << Method >>
ngOnInit() {
  this.GetList();
  this.GetDDLList();
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

GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.DDLKeySchemeOnlyForFAQ).subscribe(
    data => {
      ;
      if (data.IsSuccess) this.dDLList = <DDLModel>data.Data;
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

GetList() {
  
  this._schemeService.GetAllMPMonthlyBySchemeId(this.indexModel,Number(this.schemeId)).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.listModel = <MonitoringParameterMonthlyModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<MonitoringParameterMonthlyModel>(this.listModel);
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

onChange(data) {
  
this.schemeId=data.value;
this.GetList();
}

//#endregion
}
