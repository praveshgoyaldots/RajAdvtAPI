import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplianceModuleAndDeptWiseSummaryReportModel, CMISReportFilterModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { DdlItemModel, ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cmis-compliance-dpt-module-summary-report',
  templateUrl: './cmis-compliance-dpt-module-summary-report.component.html',
  styleUrls: ['./cmis-compliance-dpt-module-summary-report.component.css']
})
export class CmisComplianceDptModuleSummaryReportComponent implements OnInit {
//#region Variable
listModel: ComplianceModuleAndDeptWiseSummaryReportModel[];
indexModel: IndexModel;
filterModel: CMISReportFilterModel;
ddlCMISStatus: DdlItemModel[];
dataSource: any;
totalNumberOfComplianceCount: number;
totalNumberOfEntriesInJankalyanCount: number;
totalNoOfEntyInCMISCount:number;
totalNumberofEntries:number;
displayedColumns: string[] = [
  "index",
  "DepartmentName",
  "modulename",
  "NoOfEntyInCMIS",
  "NumberOfCompliance",
  "NumberOfEntriesInJankalyan",
  "NumberofEntries"
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentName", Text: "Department" },
  { Value: "modulename", Text: "Module" }
];
columnsToDisplay: string[] = this.displayedColumns.slice();

@ViewChild(MatSort, { static: true }) sort: MatSort;
dDLList: DDLModel;
ddlDepartmentForCMISReport: DdlItemModel[];
//#endregion Variable

//#region constructor
constructor(
  private readonly _alertService: AlertService,
  private readonly _jankalyanlogService: JankalyanlogService,
  private _parentComponent: AppComponent,
  public readonly _commonService: CommonService,
  private readonly _router: Router,
) {
  
  this._parentComponent.setpagelayout(
    "CMIS Compliance Department And Module Wise Summary Report List :",
    "",
    "",
    ""
  );
  this.indexModel = new IndexModel();
  this.filterModel = new CMISReportFilterModel();
}

//#endregion constructor

//#region Methods

ngOnInit() {
  this.GetDDLList();
  this.getDepartment(0);
  
  const filter=localStorage.getItem("compliancefilterModel");
  if(filter){
    this.filterModel=JSON.parse(filter);
    this.GetList();
  }
}


/** Gets the total record of all module */
getTotalRecord() {
  this.totalNumberOfComplianceCount = this.listModel
    .map(t => t.NumberOfCompliance)
    .reduce((acc, value) => acc + value, 0);

    this.totalNumberOfEntriesInJankalyanCount = this.listModel
    .map(t => t.NumberOfEntriesInJankalyan)
    .reduce((acc, value) => acc + value, 0);

    this.totalNoOfEntyInCMISCount = this.listModel
    .map(t => t.NoOfEntyInCMIS)
    .reduce((acc, value) => acc + value, 0);

    this.totalNumberofEntries = this.listModel
    .map(t => t.NumberOfEntry)
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

GetList() {
  
  this._jankalyanlogService
    .GetComplianceModuleAndDeptWiseSummaryReport(this.filterModel)
    .subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <ComplianceModuleAndDeptWiseSummaryReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<ComplianceModuleAndDeptWiseSummaryReportModel>(
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

doubleClick(module,dept){
  
  var dd=module;
  localStorage.setItem("compliancefilterModel" , JSON.stringify(this.filterModel) );
  this._router.navigate(['master/cmis-detail-report/'+module+'/'+dept]);
}

numberOfComplianceClick(module,dept,modulename,departmentName){
  
  var dd=module;
  localStorage.setItem("compliancefilterModel" , JSON.stringify(this.filterModel) );
  this._router.navigate(['master/no-of-ompliance/'+departmentName+'/'+modulename+'/'+dept+'/'+module]);
}

numberOfEntriesInJankalyanClick(module,dept,modulename,departmentName,numberOfEntry){
  
  var dd=module;
  localStorage.setItem("compliancefilterModel" , JSON.stringify(this.filterModel) );
  this._router.navigate(['master/no-of-entry-in-jankalyan/'+departmentName+'/'+modulename+'/'+dept+'/'+module + '/'+'report'+'/'+numberOfEntry]);
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
  this.filterModel = new CMISReportFilterModel();
  this.listModel = [];
}

//#endregion Methods
}
