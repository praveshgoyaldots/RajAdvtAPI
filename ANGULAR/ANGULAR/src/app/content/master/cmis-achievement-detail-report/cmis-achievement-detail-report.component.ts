import { Component, OnInit, ViewChild } from '@angular/core';
import { CMISAchievementDetailReportModel, CMISAchievementFilterModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { DdlItemModel, ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ActivatedRoute } from '@angular/router';
import { CmisComplianceComponent } from '../cmis-summary-report/cmis-compliance/cmis-compliance.component';

@Component({
  selector: 'app-cmis-achievement-detail-report',
  templateUrl: './cmis-achievement-detail-report.component.html',
  styleUrls: ['./cmis-achievement-detail-report.component.css']
})
export class CmisAchievementDetailReportComponent implements OnInit {
 //#region Variable
 listModel: CMISAchievementDetailReportModel[];
 indexModel: IndexModel;
 filterModel: CMISAchievementFilterModel;
 ddlCMISStatus: DdlItemModel[];
 dataSource: any;
 totalCount: number;
 displayedColumns: string[] = [
   "index",
   "DepartmentTitle",
   "updprogresse",
   "updprogressh",
   "ben_category",
   "Action"
 ];
 ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: "DepartmentTitle", Text: "Department" },
   { Value: "ben_category", Text: "Benificiary Category" },
   { Value: "updprogresse", Text: "Update Progress" },
   { Value: "updprogressh", Text: "Update Progress Hindi" }
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
   public readonly _commonService: CommonService,
   private readonly _route: ActivatedRoute,
   private _dialog: MatDialog,
 ) {
   
   this._parentComponent.setpagelayout(
     "CMIS Achievement Detail Report List :",
     "",
     "",
     ""
   );
   this.indexModel = new IndexModel();
   this.filterModel = new CMISAchievementFilterModel();
   if(this._route.snapshot.params.dptCode){
    this.filterModel.DepartmentCode =String(this._route.snapshot.params.dptCode);
    this.GetList();
  }
 }

 //#endregion constructor

 //#region Methods

 ngOnInit() {
   this.GetDDLList();
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
     .GetCMISAchievementDetailReport(this.filterModel)
     .subscribe(
       data => {
         if (data.IsSuccess) {
           this.listModel = <CMISAchievementDetailReportModel[]>data.Data;
           this.dataSource = new MatTableDataSource<CMISAchievementDetailReportModel>(
             this.listModel
           );
           this.dataSource.sort = this.sort;
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

 openDialog(id) {
  const _dialogRef = this._dialog.open(CmisComplianceComponent, {
    width: "500px",
    data: {TransId:0,ModuleName:'Achievement',CMIS_AchievementId:id},
    disableClose:true
  });
  _dialogRef.afterClosed().subscribe((result: boolean) => {

    if (result) {
      this.GetList();
    }
  });
}

 //#endregion Methods
}
