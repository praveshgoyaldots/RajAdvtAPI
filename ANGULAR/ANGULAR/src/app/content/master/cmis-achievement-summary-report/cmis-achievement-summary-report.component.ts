import { Component, OnInit, ViewChild } from '@angular/core';
import { CMISAchievementSummayReportModel, CMISAchievementFilterModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { DdlItemModel, ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-cmis-achievement-summary-report',
  templateUrl: './cmis-achievement-summary-report.component.html',
  styleUrls: ['./cmis-achievement-summary-report.component.css']
})
export class CmisAchievementSummaryReportComponent implements OnInit {
//#region Variable
listModel: CMISAchievementSummayReportModel[];
indexModel: IndexModel;
filterModel: CMISAchievementFilterModel;
ddlCMISStatus: DdlItemModel[];
dataSource: any;
totalCount: number;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "TotalCount",
  "Action"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" }
];
columnsToDisplay: string[] = this.displayedColumns.slice();

@ViewChild(MatSort, { static: true }) sort: MatSort;
dDLList: DDLModel;

//#endregion Variable

//#region constructor
constructor(
  private readonly _alertService: AlertService,
  private readonly _jankalyanlogService: JankalyanlogService,
  private _parentComponent: AppComponent,
  public readonly _commonService: CommonService
) {
  
  this._parentComponent.setpagelayout(
    "CMIS Achievement Summary Report List :",
    "",
    "",
    ""
  );
  this.indexModel = new IndexModel();
  this.filterModel = new CMISAchievementFilterModel();
}

//#endregion constructor

//#region Methods

ngOnInit() {
  this.GetDDLList();
}


/** Gets the total record of all module */
getTotalRecord() {
  this.totalCount = this.listModel
    .map(t => t.TotalCount)
    .reduce((acc, value) => acc + value, 0);
}

GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.DDlKeyFoCMISReport).subscribe(
    data => {
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

GetList() {
  
  this._jankalyanlogService
    .GetCMISAchievementSummaryReport(this.filterModel)
    .subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <CMISAchievementSummayReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<CMISAchievementSummayReportModel>(
            this.listModel
          );
          this.dataSource.sort = this.sort;
          this.getTotalRecord();
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
}

searchClick() {
  if (this.filterModel.FromDate) {
    const uTCFromDate = new Date(
      Date.UTC(
        new Date(this.filterModel.FromDate).getFullYear(),
        new Date(this.filterModel.FromDate).getMonth(),
        new Date(this.filterModel.FromDate).getDate()
      )
    ).toISOString();
    this.filterModel.FromDate = uTCFromDate;
  }

  if (this.filterModel.ToDate) {
    const uTCToDate = new Date(
      Date.UTC(
        new Date(this.filterModel.ToDate).getFullYear(),
        new Date(this.filterModel.ToDate).getMonth(),
        new Date(this.filterModel.ToDate).getDate()
      )
    ).toISOString();
    this.filterModel.ToDate = uTCToDate;
  }

  this.GetList();
}

clearClick() {
  this.filterModel = new CMISAchievementFilterModel();
  this.listModel = [];
}

//#endregion Methods
}
