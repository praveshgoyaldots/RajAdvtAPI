import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AdminDptCatWiseSummaryReportModel,
  CategoryAndDptWiseSummaryVCReportFilterModel
} from "src/app/Shared/Model/vccreationView.model";
import {
  ColumnHeaderModel,
  DDLModel,
  DdlItemModel
} from "src/app/Shared/Model/commonddl.model";
import { MatSort, MatTableDataSource } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { VcCreationService } from "src/app/Shared/Service/vc-creation.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";

@Component({
  selector: "app-adm-dpt-cat-summary-report",
  templateUrl: "./adm-dpt-cat-summary-report.component.html",
  styleUrls: ["./adm-dpt-cat-summary-report.component.css"]
})
export class AdmDptCatSummaryReportComponent implements OnInit {
  //#region Variable
  listModel: AdminDptCatWiseSummaryReportModel[];
  filterModel: CategoryAndDptWiseSummaryVCReportFilterModel;
  dataSource: any;
  totalVCCount: number;

  displayedColumns: string[] = [
    "index",
    "AdmDepartmentTitle",
    "DepartmentTitle",
    "VCCategoryName",
    "VCCount"
  ];

  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "VCCategoryName", Text: "VC Category" },
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "AdmDepartmentTitle", Text: "Admin Department" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dDLList: DDLModel;
  ddlParticipant: DdlItemModel[];

  //#endregion Variable

  //#region constructor
  constructor(
    private readonly _alertService: AlertService,
    private readonly _vccreationService: VcCreationService,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService
  ) {
    this._parentComponent.setpagelayout(
      "VC Admin Department, Department and Category wise Summary Report :",
      "",
      "",
      ""
    );
    this.filterModel = new CategoryAndDptWiseSummaryVCReportFilterModel();
  }

  //#endregion constructor

  //#region Methods

  ngOnInit() {
    this.GetDDLList();
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    
    this.totalVCCount = this.listModel
      .map(t => t.VCCount)
      .reduce((acc, value) => acc + value, 0);
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ddlVCCreationKey).subscribe(
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

  getParticipantList(code) {
    
    if (code) {
      this._commonService.GetParticipantList(code).subscribe(
        data => {
          if (data.IsSuccess) {
            this.ddlParticipant = data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlParticipant = [];
    }
  }

  GetList() {
    if (this.filterModel.VCCategoryCode) {
      this.filterModel.VCCategoryCodes = this.filterModel.VCCategoryCode.toString();
    }
    this._vccreationService
      .GetAdmDptCatWiseSummaryVCReport(this.filterModel)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            this.listModel = <AdminDptCatWiseSummaryReportModel[]>data.Data;
            this.dataSource = new MatTableDataSource<
              AdminDptCatWiseSummaryReportModel
            >(this.listModel);
            this.dataSource.sort = this.sort;
            this.getTotalCost();
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
    
    this.filterModel = new CategoryAndDptWiseSummaryVCReportFilterModel();
    this.listModel = [];
  }

  //#endregion Methods
}
