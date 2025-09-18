import { Component, OnInit, ViewChild } from '@angular/core';
import { ChairPersonCategorySummaryReportModel, ChairpersonSummeryReportSearchModel } from 'src/app/Shared/Model/vccreationView.model';
import { ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { VcCreationService } from 'src/app/Shared/Service/vc-creation.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-chairperson-cat-summary-report',
  templateUrl: './chairperson-cat-summary-report.component.html',
  styleUrls: ['./chairperson-cat-summary-report.component.css']
})
export class ChairpersonCatSummaryReportComponent implements OnInit {

 //#region Variable

 listModel: ChairPersonCategorySummaryReportModel[];
 dataSource: any;
 totalVCCount: number;
 totalParticipantCount: number;

 displayedColumns: string[] = [
   "index",
   "ChairPersonCategoryName",
   "VCCount",
   "Participant_Count",
   "TotalTimeInHours",
   "Action",
 ];
 ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: "ChairPersonCategoryName", Text: "Chair Person Category" }
 ];
 columnsToDisplay: string[] = this.displayedColumns.slice();
 indexModel: ChairpersonSummeryReportSearchModel;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
 dDLList: DDLModel;

 //#endregion Variable

 //#region constructor

 constructor(
   private readonly _alertService: AlertService,
   private readonly _vccreationService: VcCreationService,
   private _parentComponent: AppComponent,
   public readonly _commonService: CommonService
 ) {
   this._parentComponent.setpagelayout("Chairperson Category Summary Report List :", "", "", "");
   this.indexModel = new ChairpersonSummeryReportSearchModel();
 }

 //#endregion constructor

 //#region Methods

 ngOnInit() {
   this.GetDDLList();
 }

 /** Gets the total count. */
 getTotalCost() {
   
   this.totalVCCount = this.listModel
     .map((t) => t.VCCount)
     .reduce((acc, value) => acc + value, 0);
   this.totalParticipantCount = this.listModel
     .map((t) => t.Participant_Count)
     .reduce((acc, value) => acc + value, 0);
 }

 GetDDLList() {
   this._commonService.GetAllDDL(AppSetting.ddlVCCreationKey).subscribe(
     (data) => {
       if (data.IsSuccess) {
         this.dDLList = <DDLModel>data.Data;
       }
     },
     (error) => {
       this._alertService.error(error.message);
     }
   );
 }

 GetList() {
   this._vccreationService.VCChairpersonCategorySummaryReport(this.indexModel).subscribe(
     (data) => {
       if (data.IsSuccess) {
         this.listModel = <ChairPersonCategorySummaryReportModel[]>data.Data;
         this.dataSource = new MatTableDataSource<ChairPersonCategorySummaryReportModel>(
           this.listModel
         );
         this.dataSource.sort = this.sort;
         this.getTotalCost();
       }
     },
     (error) => {
       this._alertService.error(error.message);
     }
   );
 }

 searchClick() {
   
   if (this.indexModel.FromDate) {
     const uTCFromDate = new Date(
       Date.UTC(
         new Date(this.indexModel.FromDate).getFullYear(),
         new Date(this.indexModel.FromDate).getMonth(),
         new Date(this.indexModel.FromDate).getDate()
       )
     ).toISOString();
     this.indexModel.FromDate = uTCFromDate;
   }

   if (this.indexModel.ToDate) {
     const uTCToDate = new Date(
       Date.UTC(
         new Date(this.indexModel.ToDate).getFullYear(),
         new Date(this.indexModel.ToDate).getMonth(),
         new Date(this.indexModel.ToDate).getDate()
       )
     ).toISOString();
     this.indexModel.ToDate = uTCToDate;
   }

   this.GetList();
 }

 clearClick() {
   
   this.indexModel = new ChairpersonSummeryReportSearchModel();
   this.listModel = [];
 }

 //#endregion Methods

}
