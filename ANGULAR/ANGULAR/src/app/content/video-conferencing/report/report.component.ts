import { IndexModel, PermissionModel } from "src/app/Shared/Model/general-model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { MatTableDataSource, MatSort } from "@angular/material";
import {
  ColumnHeaderModel,
  DdlItemModel,
  DDLModel,
} from "src/app/Shared/Model/commonddl.model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import {
  VCReportModel,
  VCSearchModel,
  VCReportSearchModel,
} from "src/app/Shared/Model/vccreationView.model";
import { VcCreationService } from "src/app/Shared/Service/vc-creation.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {
  //#region << Variable >>
  listModel: VCReportModel[];
  code: number;
  isShowAll=false;
  dataSource: MatTableDataSource<VCReportModel>;
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "VCCategoryName",
    "Date",
    "ShortDescription",
    "Title",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "ShortDescription", Text: "Title" },
     { Value: "DepartmentTitle", Text: "Department" },
    { Value: "VCCategoryName", Text: "VC Category" },
    { Value: "Title", Text: "Agenda" },
  ];

  // Permission: PermissionModel = this._commonService.GetPagePermission(
  //   "/vc/report",
  //   "",
  //   "",
  //   "/vc/vccreation/edit"
  // );

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //  indexModel: IndexModel;
  //#endregion
  indexModel: VCReportSearchModel;
  //#region << constructor >>
  dDLList: DDLModel;
  ddlParticipant: DdlItemModel[];
  constructor(
    private _parentComponent: AppComponent,
    private readonly _vcCreationService: VcCreationService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private _route: ActivatedRoute,
  ) {
    this._parentComponent.setpagelayout("VC Report List :", "", "", "");
    this.indexModel = new VCReportSearchModel();
    if (this._route.snapshot.params.id) {
      
     this.code = this._route.snapshot.params.id;
     this.indexModel.ChairPersonCode = String(this.code);
     this.getParticipantList(0);
   }

  }
  //#endregion

  //#region << Method >>
  ngOnInit() {
   // this.GetList();
    this.GetDDLList();
  }

  getParticipantList(code) {
    
    if (code >=0) {
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
    
    this._vcCreationService.GetAllVcReport(this.indexModel).subscribe(
      (data) => {
        
        if (data.IsSuccess) {
          this.listModel = <VCReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<VCReportModel>(
            this.listModel
          );
          this.dataSource.sort = this.sort;
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
    
    this.indexModel = new VCReportSearchModel();
    // this.prevFromDate = null;
    // this.prevToDate = null;
    this.indexModel.FromDate = null;
    this.indexModel.ToDate = null;
    // this.GetList();
    this.listModel = null;
   this.dataSource = null;
  }

  showData(event){

this.isShowAll=event.checked;
if (this.isShowAll) {
  this.displayedColumns = [
    "index",
    "DepartmentTitle",
    "VCCategoryName",
    "Date",
    "ShortDescription",
    "ChairPersonCategoryName",
    "Title",
    "StartEndTime",
    "TimeInHrs",
    "Action",
  ];
  this.ViewdisplayedColumns = [
    { Value: "ShortDescription", Text: "Title" },
     { Value: "DepartmentTitle", Text: "Department" },
    { Value: "VCCategoryName", Text: "VC Category" },
    { Value: "Title", Text: "Agenda" },
  ];
  this.columnsToDisplay= this.displayedColumns.slice();
}else{
  this.displayedColumns = [
    "index",
    "DepartmentTitle",
    "VCCategoryName",
    "Date",
    "ShortDescription",
    "Title",
    "Action",
  ];
  this.ViewdisplayedColumns = [
    { Value: "ShortDescription", Text: "Title" },
     { Value: "DepartmentTitle", Text: "Department" },
    { Value: "VCCategoryName", Text: "VC Category" },
    { Value: "Title", Text: "Agenda" },
  ];
  this.columnsToDisplay= this.displayedColumns.slice();
}
  }

  //#endregion
}
