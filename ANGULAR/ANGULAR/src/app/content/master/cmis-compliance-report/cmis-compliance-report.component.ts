import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplianceReportModel, CMISReportFilterModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';
import { ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CmisComplianceComponent } from '../cmis-summary-report/cmis-compliance/cmis-compliance.component';

@Component({
  selector: 'app-cmis-compliance-report',
  templateUrl: './cmis-compliance-report.component.html',
  styleUrls: ['./cmis-compliance-report.component.css']
})
export class CmisComplianceReportComponent implements OnInit {
//#region   Variables

listModel: ComplianceReportModel[];
filterModel: CMISReportFilterModel;
dataSource: MatTableDataSource<ComplianceReportModel>;
dDLList: DDLModel;
totalCount: number;
expactedNoOfEntries: number;
ddlCMISStatus: DdlItemModel[];
ddlDepartmentForCMISReport: DdlItemModel[];
displayedColumns: string[] = [
  "index",
  "modulename",
  "Announcement_Description",
  "ModifiedDate",
  "Dept_Comments",
  "CMO_Comments",
  "TotalEntries",
  "ExpectedNumberOfEntry"

];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: any;

 //#endregion

//#region   constructor
constructor(
  private _parentComponent: AppComponent,
  private readonly _alertService: AlertService,
  private _dialog: MatDialog,
  private readonly _commonService: CommonService,
  private readonly _jankalyanlogService: JankalyanlogService,
  private readonly _route: ActivatedRoute
) {
  this._parentComponent.setpagelayout(
    "CMIS Compliance Report:",
    "",
    "",
    ""
  );
  this.filterModel = new CMISReportFilterModel();
  if(this._route.snapshot.params.id){
    this.filterModel.ModuleId =String(this._route.snapshot.params.id);
    this.GetList();
  }
}

//#endregion

//#region << Method >>
ngOnInit() {
  this.GetDDLList();
  this.getDepartment(0);
 // this.GetList();
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

GetStatusByModule(code) {
  this.ddlCMISStatus=[];
  this._commonService.GetCMISStatusByModuleId(code).subscribe(
    data => {
      
      if (data.IsSuccess) {
        this.ddlCMISStatus = <DdlItemModel[]>data.Data;
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

getDepartment(code) {
  this.ddlDepartmentForCMISReport=[];
  this._commonService.GetCMISDepartmentByCMOOfficerCode(code).subscribe(
    data => {
      
      if (data.IsSuccess) {
        this.ddlDepartmentForCMISReport = <DdlItemModel[]>data.Data;
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

searchClick() {
  if (this.filterModel.ToDate) {
    let uTCDate = new Date(
      Date.UTC(
        new Date(this.filterModel.ToDate).getFullYear(),
        new Date(this.filterModel.ToDate).getMonth(),
        new Date(this.filterModel.ToDate).getDate()
      )
    ).toISOString();
    this.filterModel.ToDate = uTCDate;
  }
  if (this.filterModel.FromDate) {
    let uTCDate = new Date(
      Date.UTC(
        new Date(this.filterModel.FromDate).getFullYear(),
        new Date(this.filterModel.FromDate).getMonth(),
        new Date(this.filterModel.FromDate).getDate()
      )
    ).toISOString();
    this.filterModel.FromDate = uTCDate;
  }

  this.GetList();
}

clearClick() {
  this.filterModel = new CMISReportFilterModel();
  this.listModel = [];
  this.ddlCMISStatus=[];
 // this.GetList();
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

getTotalRecord() {
  this.totalCount = this.listModel
    .map(t => t.TotalEntries)
    .reduce((acc, value) => acc + value, 0);
  this.expactedNoOfEntries = this.listModel
  .map(t => t.ExpectedNumberOfEntry)
  .reduce((acc, value) => acc + value, 0);
}

GetList() {
  
  this._jankalyanlogService.GetCMISComplianceReport(this.filterModel).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <ComplianceReportModel[]>data.Data;
        this.dataSource = new MatTableDataSource<ComplianceReportModel>(
          this.listModel
        );
        this.getTotalRecord();
        if (this.indexModel.IsPostBack === false) {
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

downloadAttachment(Url) {
  
  const linkSource = Url;
  const downloadLink = document.createElement("a");
  const fileName = 'Docs';

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.target = "blank";
  downloadLink.click();

}

openDialog(id,modulename) {
  const _dialogRef = this._dialog.open(CmisComplianceComponent, {
    width: "500px",
    data: {TransId:id,ModuleName:modulename,CMIS_AchievementId:0},
    disableClose:true
  });
  _dialogRef.afterClosed().subscribe((result: boolean) => {

    if (result) {
      this.GetList();
    }
  });
}

//#endregion <Update Progress>
}
