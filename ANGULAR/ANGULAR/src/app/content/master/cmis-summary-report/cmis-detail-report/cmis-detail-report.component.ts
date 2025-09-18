import { CMISReportFilterModel } from './../../../../Shared/Model/Master/jankalyanLogMaster.model';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MatDialog, MatTableDataSource, MatSort, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { CMISNewDetailModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { DDLModel, ColumnHeaderModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ActivatedRoute } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { CmisComplianceComponent } from '../cmis-compliance/cmis-compliance.component';

@Component({
  selector: 'app-cmis-detail-report',
  templateUrl: './cmis-detail-report.component.html',
  styleUrls: ['./cmis-detail-report.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CmisDetailReportComponent implements OnInit,OnDestroy  {

    //#region   Variables

  listModel: CMISNewDetailModel[];
  filterModel: CMISReportFilterModel;
  dataSource: MatTableDataSource<CMISNewDetailModel>;
  dDLList: DDLModel;
  ddlCMISStatus: DdlItemModel[];
  ddlDepartmentForCMISReport: DdlItemModel[];
  displayedColumns: string[] = [
    "index",
    "modulename",
    "Announcement_Description",
    "ModifiedDate",
    "Dept_Comments",
    "CMO_Comments",
    "Action"
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: any;
  showbtn:boolean;
  isData=false;
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


    if(this._route.snapshot.params.dsb  && this._route.snapshot.params.dsb!=undefined){
      this._parentComponent.setpagelayout(
       "CMIS Detail Report",
       "keyboard_backspace",
       "Back To Dashboard",
       "cmdashboard"
     );
     }else{
       this._parentComponent.setpagelayout(
         "CMIS Detail Report:",
         "keyboard_backspace",
         "Back To CMIS Compliance Summary Report List",
         "/master/cmis-dpt-module-summary-report"
       );
     }

    this.filterModel = new CMISReportFilterModel();

    if(sessionStorage.getItem("CMISDetailfilterModel")){
      const filter=sessionStorage.getItem("CMISDetailfilterModel");
      this.filterModel=JSON.parse(filter);
    }
    if(this._route.snapshot.params.transCoreId){
      this.filterModel = new CMISReportFilterModel();
      this.filterModel.TransCoreId =Number(this._route.snapshot.params.transCoreId);
      this.isData=true;
    }
    if(this._route.snapshot.params.id){
      this.filterModel.ModuleId =String(this._route.snapshot.params.id);
      this.isData=true;
      // this.GetList();
    }

    if(this._route.snapshot.params.module||this._route.snapshot.params.dept){
      this.filterModel.ModuleId =String(this._route.snapshot.params.module);
      this.filterModel.DepartmentCode =String(this._route.snapshot.params.dept);

      if (this._route.snapshot.params.status) {
        this.filterModel.DepartmentStatus =String(this._route.snapshot.params.status);
      }
      this.isData=true;
      // this.GetList();
    }
if(this.filterModel.CMOOfficerCode){
  this.getDepartment(this.filterModel.CMOOfficerCode);
}
if (this.filterModel.ModuleId) {
this.GetStatusByModule(this.filterModel.ModuleId);
}
if ((this.filterModel && this.isData ) || sessionStorage.getItem("CMISDetailfilterModel")) {
  sessionStorage.removeItem("CMISDetailbtn")
  this.GetList();
}

  }

  //#endregion

  //#region << Method >>
  ngOnInit() {
    this.GetDDLList();
    this.getDepartment(0);
   // this.GetList();

   this.showbtn = JSON.parse(sessionStorage.getItem("CMISDetailbtn"));

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
    this.isData=false;
    this.GetList();
  }

  clearClick() {
    this.filterModel = new CMISReportFilterModel();
    this.listModel = [];
    this.ddlCMISStatus=[];
    sessionStorage.removeItem("CMISDetailfilterModel");
    this.isData=true;
   // this.GetList();
  }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction === AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.isData=false;
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.isData=false;
    this.GetList();
  }

  GetList() {
    
    if (!this.isData) {
      sessionStorage.setItem("CMISDetailfilterModel" , JSON.stringify(this.filterModel) );
    }
    this._jankalyanlogService.GetCMISNewDetailReport(this.filterModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <CMISNewDetailModel[]>data.Data;
          this.dataSource = new MatTableDataSource<CMISNewDetailModel>(
            this.listModel
          );
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

  ngOnDestroy() {
    sessionStorage.removeItem("CMISDetailbtn");
  }

  //#endregion <Update Progress>
}
