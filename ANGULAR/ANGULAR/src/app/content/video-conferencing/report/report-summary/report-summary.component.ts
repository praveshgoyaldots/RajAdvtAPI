import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ReportSummeryViewModel,
  VCSummeryReportSearchModel,

} from "src/app/Shared/Model/vccreationView.model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import {
  ColumnHeaderModel,
  DDLModel,
  DdlItemModel,
} from "src/app/Shared/Model/commonddl.model";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { VcCreationService } from "src/app/Shared/Service/vc-creation.service";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { MatTableDataSource, MatSort } from "@angular/material";
import { CommonService } from "src/app/Shared/Service/common.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-report-summary",
  templateUrl: "./report-summary.component.html",
  styleUrls: ["./report-summary.component.css"],
})
export class ReportSummaryComponent implements OnInit {
  //#region Variable
  listModel: ReportSummeryViewModel[];
  dataSource: any;
  totalVCCount: number;
  totalParticipantCount: number;

  displayedColumns: string[] = [
    "index",
    "ChairPersonName",
    "ChairPersonCategoryName",
    "VCCount",
    "Participant_Count",
    "TotalTimeInHours",
    "Action",
    // ""
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "ChairPersonName", Text: "Chair Person" },
    { Value: "ChairPersonCategoryName", Text: "Chair Person Category" },
    //  { Value: "total", Text: "Total" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  indexModel: VCSummeryReportSearchModel;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dDLList: DDLModel;
  ddlParticipant: DdlItemModel[];

  //#endregion Variable

  //#region constructor
  constructor(
    private readonly _alertService: AlertService,
    private readonly _vccreationService: VcCreationService,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService,
    private _route: ActivatedRoute,
  ) {
    this._parentComponent.setpagelayout("Summary Report List :", "", "", "");
    this.indexModel = new VCSummeryReportSearchModel();
    this.indexModel.ChairPersonCategoryCode = String(this._route.snapshot.params.ChairpersonCat);
    if (this.indexModel.ChairPersonCategoryCode) {
       this.GetList();
    }
  }

  //#endregion constructor

  //#region Methods
  ngOnInit() {
   // this.GetList();
    this.GetDDLList();
  }

  /** Gets the total cost of all transactions. */
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

  getParticipantList(code) {
    
    if (code) {
      this._commonService.GetParticipantList(code).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.ddlParticipant = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlParticipant = [];
    }
  }

  GetList() {
    this._vccreationService.VCSummaryReport(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.listModel = <ReportSummeryViewModel[]>data.Data;
          this.dataSource = new MatTableDataSource<ReportSummeryViewModel>(
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
    
    this.indexModel = new VCSummeryReportSearchModel();
    // this.prevFromDate = null;
    // this.prevToDate = null;
    this.indexModel.FromDate = null;
    this.indexModel.ToDate = null;
    this.listModel=[];
  }

  //#endregion Methods

}
