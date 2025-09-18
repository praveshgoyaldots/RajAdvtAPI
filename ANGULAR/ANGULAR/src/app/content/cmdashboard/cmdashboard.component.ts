import { MatDialog, MatSort, MatTableDataSource } from "@angular/material";
import { GoogleChartService } from "./../../Shared/Service/google-chart.service";
import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
} from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { DashboardHelpDocumentComponent } from "../master/dashboard-help-document/dashboard-help-document.component";
import {
  ComplianceModuleAndDeptWiseSummaryReportModel,
  CMISReportFilterModel,
  JankalyanDashBoardProjectReportModel,
} from "src/app/Shared/Model/Master/jankalyanLogMaster.model";
import { IndexModel } from "src/app/Shared/Model/general-model";
import {
  DdlItemModel,
  ColumnHeaderModel,
  DDLModel,
} from "src/app/Shared/Model/commonddl.model";
import { JankalyanlogService } from "src/app/Shared/Service/jankalyanlog.service";
import { UserViewModel } from "src/app/Shared/Model/user-model";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { OnDestroy } from "@angular/core";
import { ElementRef } from "@angular/core";




@Component({
  selector: "app-cmdashboard",
  templateUrl: "./cmdashboard.component.html",
  styleUrls: ["./cmdashboard.component.css"],
  providers: [],
})
export class CmdashboardComponent implements OnInit, AfterViewInit {

  type: string;
  IsSchemeVisible = false;
  IsProjectMoniteringVisible = false;
  IsRecruitmentVisible = false;
  IsGovtorderVisible = false;
  IsCMISTaskVisible = false;
  IsCMOLatterVisible = false;
  CMISDetailbtn = true;

  //#region Variable
  listModel: ComplianceModuleAndDeptWiseSummaryReportModel[];
  indexModel = new IndexModel();
  filterModel = new CMISReportFilterModel();
  ddlCMISStatus: DdlItemModel[];
  dataSource: any;
  totalNumberOfComplianceCount: number;
  totalNumberOfEntriesInJankalyanCount: number;
  totalNoOfEntyInCMISCount: number;
  totalNumberofEntries: number;
  displayedColumns: string[] = [
    "index",
    "DepartmentName",
    "modulename",
    "NoOfEntyInCMIS",
    "NumberOfCompliance",
    "NumberOfEntriesInJankalyan",
    "NumberofEntries",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentName", Text: "Department" },
    { Value: "modulename", Text: "Module" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dDLList: DDLModel;

  //#endregion Variable

  //#region <Task Completed>
  listTaskCompletedModel: ComplianceModuleAndDeptWiseSummaryReportModel[];
  filterTaskCompletedModel = new CMISReportFilterModel();
  dataTaskCompletedSource: any;
  totalTaskCompletedNumberOfComplianceCount: number;
  totalTaskCompletedNumberOfEntriesInJankalyanCount: number;
  totalTaskCompletedNoOfEntyInCMISCount: number;
  totalTaskCompletedNumberofEntries: number;
  displayedTaskCompletedColumns: string[] = [
    "index",
    "DepartmentName",
    "modulename",
    "NoOfEntyInCMIS",
    "NumberOfCompliance",
    "NumberOfEntriesInJankalyan",
    "NumberofEntries",
  ];
  ViewdisplayedTaskCompletedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentName", Text: "Department" },
    { Value: "modulename", Text: "Module" },
  ];
  columnsToTaskCompletedDisplay: string[] = this.displayedColumns.slice();

  //#endregion Variable

  //#region <Project Status Count>
  datataskProjectSource: any;
  displayedProjectColumns: string[] = [
    "index",
    "ProjectStatus",
    "ProjectCount",
  ];
  ViewdisplayedProjectColumns: ColumnHeaderModel[] = [
    { Value: "ProjectStatus", Text: "Project Status" },
    // { Value: "ProjectCount", Text: "Count" }
  ];
  columnsToProjectDisplay: string[] = this.displayedProjectColumns.slice();

  ProjectlistModel: JankalyanDashBoardProjectReportModel[];
  totalstatusCount: number;
  modIsShowReport: boolean = false;
  loginData: UserViewModel;
  //#endregion


  isAllModuleAreaIdFirst: boolean = false;
  isTaskCompletedAreaId: boolean = false;
  dataItem: ComplianceModuleAndDeptWiseSummaryReportModel;


  constructor(
    private readonly _appComponet: AppComponent,
    private _route: ActivatedRoute,
    private gChartService: GoogleChartService,
    public readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _dialog: MatDialog,
    private readonly _jankalyanlogService: JankalyanlogService,
    private readonly _router: Router,
    private readonly _authService: AuthenticationService
  ) {
    this._appComponet.setpagelayout("", "", "", "", false, true);
    this.type = this._route.snapshot.params.type ? this._route.snapshot.params.type : this.type;


  }

  ngOnInit() {
    this.dataItem = <ComplianceModuleAndDeptWiseSummaryReportModel>JSON.parse(sessionStorage.getItem("Transaction"));
    this.loginData = this._authService.GetCurrentUserDetail()!.UserViewModel;

    //this.CheckVisibility();
    const isAuthenticated = JSON.parse(localStorage.getItem("IsLogin"));
    if (isAuthenticated) {
      localStorage.setItem("IsLogin", "false");
      this.openHelpDoc();
    }

    // const modIsShowReport = localStorage.getItem("modIsShowReport");
    // if (modIsShowReport) {
    //   this.modIsShowReport = JSON.parse(modIsShowReport);
    // } else {
    //   if (this.loginData.UserType == "SADM") {
    //     this.modIsShowReport = false;
    //   }
    // }

    // if (this.modIsShowReport) {
    //   if (!sessionStorage.getItem("AllStatusData") && !sessionStorage.getItem("TaskCompletedData")) {
    //     this.GetTaskCompletedList();
    //     this.GetList();
    //   } else {

    //     this.listModel = <ComplianceModuleAndDeptWiseSummaryReportModel[]>(
    //       JSON.parse(sessionStorage.getItem("AllStatusData"))
    //     );
    //     this.dataSource =
    //       new MatTableDataSource<ComplianceModuleAndDeptWiseSummaryReportModel>(
    //         this.listModel
    //       );
    //     this.dataSource.sort = this.sort;
    //     this.getTotalRecord();




    //     this.listTaskCompletedModel = <
    //       ComplianceModuleAndDeptWiseSummaryReportModel[]
    //       >(
    //         JSON.parse(sessionStorage.getItem("TaskCompletedData")))
    //     this.dataTaskCompletedSource =
    //       new MatTableDataSource<ComplianceModuleAndDeptWiseSummaryReportModel>(
    //         this.listTaskCompletedModel
    //       );
    //     this.dataTaskCompletedSource.sort = this.sort;
    //     this.getTotalTaskCompletedRecord();


    //   }
    //   this.GetProjectList();
    // }

  }

  numberOfComplianceClick(transaction,
    module, dept, modulename, departmentName, isStatus = false
  ) {
    this.dataItem = transaction;
    sessionStorage.setItem("Transaction", JSON.stringify(transaction));


    let top = window.pageYOffset || document.documentElement.scrollTop
    sessionStorage.setItem("DashboardYOffset", String(top));

    if (isStatus) {
      this._router.navigate([
        "master/no-of-ompliance-dsb/" + departmentName + "/" + modulename + "/" + dept + "/" + module + "/Task Completed" + "/dash-board",
      ]);
    } else {
      this._router.navigate(["master/no-of-ompliance-dsb/" + departmentName + "/" + modulename + "/" + dept + "/" + module + "/dash-board",
      ]);
    }
  }

  numberOfEntriesInJankalyanClick(transaction,
    module,
    dept,
    modulename,
    departmentName,
    numberOfEntry,
    isStatus = false
  ) {
    this.dataItem = transaction;
    sessionStorage.setItem("Transaction", JSON.stringify(transaction));

    let top = window.pageYOffset || document.documentElement.scrollTop
    sessionStorage.setItem("DashboardYOffset", String(top));
    if (isStatus) {
      this._router.navigate([
        "master/no-of-entry-in-jankalyan-dsb/" + departmentName + "/" + modulename + "/" + dept + "/" + module + "/Task Completed" + "/dash-board" + "/" + numberOfEntry,
      ]);
    } else {
      this._router.navigate([
        "master/no-of-entry-in-jankalyan-dsb/" + departmentName + "/" + modulename + "/" + dept + "/" + module + "/dash-board" + "/" + numberOfEntry,
      ]);
    }
  }

  getData(event) {
    this.modIsShowReport = event;
    if (event) {
      this.GetTaskCompletedList();
      this.GetList();
      this.GetProjectList();
    }

    localStorage.setItem("modIsShowReport", String(this.modIsShowReport));
  }

  print() {
    let printContents1, printContents2, printContents3, printContents4, printContents5, printContents6, popupWin;
    printContents1 = document.getElementById("cmoletterdiv").innerHTML;
    printContents2 = document.getElementById("cmistaskchartdiv").innerHTML;
    printContents3 = document.getElementById("recruitmentstatusdiv").innerHTML;
    printContents4 = document.getElementById("projectmonitoringdiv").innerHTML;
    printContents5 = document.getElementById("schemedashboarddiv").innerHTML;
    printContents6 = document.getElementById("govtorderdiv").innerHTML;
    popupWin = window.open(
      "",
      "_blank",
      "width=auto,height=auto,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
    );
    popupWin.document.open();
    popupWin.document
      .write(`<html><head></head>    <body onload="window.print();window.close()">
     <div style="text-align:center;"> <u><b>CMOLetter</b></u><br/></div><div style=padding-top: 20px;style=padding-bottom: 10px;"> ${printContents1} </div><br/>
     <div style="text-align:center;"> <u><b>CMIS Task</b></u><br/></div><div style=padding-top: 20px;">${printContents2}</div><br/>
     <div style="text-align:center;"><u><b>Recruitment Status </b></u><br/> </div> <div style=padding-top:50px;">${printContents3}</div><br/>
 <div style="text-align:center;"><u><b>Project Monitoring </b></u><br/> </div><div style=padding-top:50px;"> ${printContents4}</div><br/>
       <div style="text-align:center;"><u><b>Scheme</b></u><br/> </div><div style=padding-top:50px;"> ${printContents5}</div><br/>
       <div style="text-align:center;"><u><b>Government Order</b></u><br/> </div><div style=padding-top:50px;"> ${printContents6}</div><br/>
       </body>
      </html>`);
    popupWin.document.close();
  }

  CheckVisibility() {
    this.IsSchemeVisible =
      this._commonService.IsAccessibleUrl("cmdashboard/scheme");
    this.IsProjectMoniteringVisible = this._commonService.IsAccessibleUrl(
      "cmdashboard/projectmonitering"
    );
    this.IsRecruitmentVisible = this._commonService.IsAccessibleUrl(
      "cmdashboard/recruitmentstatus"
    );
    this.IsGovtorderVisible = this._commonService.IsAccessibleUrl(
      "cmdashboard/Govtorder"
    );
    this.IsCMISTaskVisible = this._commonService.IsAccessibleUrl(
      "cmdashboard/cmistask"
    );
    this.IsCMOLatterVisible = this._commonService.IsAccessibleUrl(
      "cmdashboard/cmolatter"
    );
  }

  schemeClick() {
    sessionStorage.setItem("IsAuthenticate", "true");
    this._commonService.SaveLoginUserLog().subscribe(
      (data) => { },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  openHelpDoc() {
    this._dialog.open(DashboardHelpDocumentComponent, {
      width: "1000px",
      disableClose: true,
    });
  }

  //#region <Report>

  /** Gets the total record of all module */
  getTotalRecord() {
    this.totalNumberOfComplianceCount = this.listModel
      .map((t) => t.NumberOfCompliance)
      .reduce((acc, value) => acc + value, 0);

    this.totalNumberOfEntriesInJankalyanCount = this.listModel
      .map((t) => t.NumberOfEntriesInJankalyan)
      .reduce((acc, value) => acc + value, 0);

    this.totalNoOfEntyInCMISCount = this.listModel
      .map((t) => t.NoOfEntyInCMIS)
      .reduce((acc, value) => acc + value, 0);

    this.totalNumberofEntries = this.listModel
      .map((t) => t.NumberOfEntry)
      .reduce((acc, value) => acc + value, 0);
  }

  GetList() {
    this._jankalyanlogService
      .GetComplianceModuleAndDeptWiseSummaryReport(this.filterModel)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.listModel = <ComplianceModuleAndDeptWiseSummaryReportModel[]>(
              data.Data
            );
            this.dataSource =
              new MatTableDataSource<ComplianceModuleAndDeptWiseSummaryReportModel>(
                this.listModel
              );
            this.dataSource.sort = this.sort;
            this.getTotalRecord();
            sessionStorage.setItem("AllStatusData", JSON.stringify(this.listModel));
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  doubleClick(transaction, module, dept) {
    this.dataItem = transaction;
    sessionStorage.setItem("Transaction", JSON.stringify(transaction));
    let top = window.pageYOffset || document.documentElement.scrollTop
    sessionStorage.setItem("DashboardYOffset", String(top));
    var dd = module;
    this.CMISDetailbtn = true;
    localStorage.setItem("CMISDetailbtn", JSON.stringify(this.CMISDetailbtn));
    this._router.navigate([
      "detail-report/" + module + "/" + dept + "/dashboard",
    ]);
  }

  //#endregion Methods

  //#region <Task Completed Report>

  /** Gets the total record of all module */
  getTotalTaskCompletedRecord() {
    this.totalTaskCompletedNumberOfComplianceCount = this.listTaskCompletedModel
      .map((t) => t.NumberOfCompliance)
      .reduce((acc, value) => acc + value, 0);

    this.totalTaskCompletedNumberOfEntriesInJankalyanCount =
      this.listTaskCompletedModel
        .map((t) => t.NumberOfEntriesInJankalyan)
        .reduce((acc, value) => acc + value, 0);

    this.totalTaskCompletedNoOfEntyInCMISCount = this.listTaskCompletedModel
      .map((t) => t.NoOfEntyInCMIS)
      .reduce((acc, value) => acc + value, 0);

    this.totalTaskCompletedNumberofEntries = this.listTaskCompletedModel
      .map((t) => t.NumberOfEntry)
      .reduce((acc, value) => acc + value, 0);
  }

  GetTaskCompletedList() {
    this.filterTaskCompletedModel.DepartmentStatus = "Task Completed";
    this._jankalyanlogService
      .GetComplianceModuleAndDeptWiseSummaryReport(
        this.filterTaskCompletedModel
      )
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.listTaskCompletedModel = <
              ComplianceModuleAndDeptWiseSummaryReportModel[]
              >data.Data;
            this.dataTaskCompletedSource =
              new MatTableDataSource<ComplianceModuleAndDeptWiseSummaryReportModel>(
                this.listTaskCompletedModel
              );
            this.dataTaskCompletedSource.sort = this.sort;
            this.getTotalTaskCompletedRecord();
            sessionStorage.setItem("TaskCompletedData", JSON.stringify(this.listTaskCompletedModel));
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  doubleTaskCompletedClick(transaction, module, dept) {
    this.dataItem = transaction;
    sessionStorage.setItem("Transaction", JSON.stringify(transaction));
    let top = window.pageYOffset || document.documentElement.scrollTop
    sessionStorage.setItem("DashboardYOffset", String(top));
    var dd = module;

    this.CMISDetailbtn = true;
    localStorage.setItem("CMISDetailbtn", JSON.stringify(this.CMISDetailbtn));
    this._router.navigate([
      "detail-report/" + module + "/" + dept + "/Task Completed" + "/dashboard",
    ]);
  }

  GetProjectList() {
    this._jankalyanlogService.GetJankalyanProjectReport().subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ProjectlistModel = <JankalyanDashBoardProjectReportModel[]>(
            data.Data
          );
          this.datataskProjectSource =
            new MatTableDataSource<JankalyanDashBoardProjectReportModel>(
              this.ProjectlistModel
            );
          this.datataskProjectSource.sort = this.sort;
          this.getTotalCost();
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getTotalCost() {
    this.totalstatusCount = this.ProjectlistModel.map(
      (t) => t.ProjectCount
    ).reduce((acc, value) => acc + value, 0);
  }

  ngAfterViewInit() {

    if (Number(JSON.parse(sessionStorage.getItem("DashboardYOffsetInner"))) && !this.isAllModuleAreaIdFirst) {
      document.getElementById('allModuleAreaId')!.scrollTop = Number(JSON.parse(sessionStorage.getItem("DashboardYOffsetInner")));
      sessionStorage.removeItem("DashboardYOffsetInner");
      this.isAllModuleAreaIdFirst = true;
    }
    if (Number(JSON.parse(sessionStorage.getItem("DashboardYOffsetInnerTaskCompleted"))) && !this.isTaskCompletedAreaId) {
      document.getElementById('taskCompletedAreaId')!.scrollTop = Number(JSON.parse(sessionStorage.getItem("DashboardYOffsetInnerTaskCompleted")));
      sessionStorage.removeItem("DashboardYOffsetInnerTaskCompleted");
      this.isTaskCompletedAreaId = true;
    }

    document.getElementById('allModuleAreaId')!.addEventListener('scroll', function () {
      sessionStorage.setItem("DashboardYOffsetInner", String(this.scrollTop));
    });

    document.getElementById('taskCompletedAreaId')!.addEventListener('scroll', function () {
      sessionStorage.setItem("DashboardYOffsetInnerTaskCompleted", String(this.scrollTop));
    });

  }

  isdataMatch(rowData) {
    if (this.dataItem.Nodal_Department == rowData.Nodal_Department && this.dataItem.ModuleID == rowData.ModuleID) {
      return true;
    }
    return false;
  }

  //#endregion Methods
}
