import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ProjectDepartmentWiseSummaryReportModel,
  ProjectReportFilterModel
} from "src/app/Shared/Model/Master/project-master-model";
import { MatTableDataSource, MatSort, MatDialog, MAT_DATE_FORMATS, DateAdapter } from "@angular/material";
import {
  DDLModel,
  DdlItemModel,
  ColumnHeaderModel
} from "src/app/Shared/Model/commonddl.model";
import {
  UserDepartmentViewModel,
  UserDistrictViewModel,
  UserViewModel
} from "src/app/Shared/Model/user-model";
import { ProjectSchemeCategoryMasterViewModel } from "src/app/Shared/Model/Master/project-scheme-category-master-model";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { ProjectMasterService } from "src/app/Shared/Service/project-master.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { ExportToExcelModel } from "src/app/Shared/Model/general-model";
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-department-wise-project-summary-report",
  templateUrl: "./department-wise-project-summary-report.component.html",
  styleUrls: ["./department-wise-project-summary-report.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class DepartmentWiseProjectSummaryReportComponent implements OnInit {
  //#region Variable

  listModel: ProjectDepartmentWiseSummaryReportModel[];
  filterModel: ProjectReportFilterModel;
  dataSource: MatTableDataSource<ProjectDepartmentWiseSummaryReportModel>;
  dDLList: DDLModel;
  ddlDepartment: DdlItemModel[];
  ddlMLAConstituency: DdlItemModel[];
  loginData: UserViewModel;
  ddlProjectSchemeCategory: ProjectSchemeCategoryMasterViewModel[] = [];
  // ddlDistrict: UserDistrictViewModel[];
  ddlDistrict: DdlItemModel[];
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "ProjectStatusName",
    "ProjectCategory",
    "ProjectSubCategory",
    "ProjectSubSubCategory",
    "WithMLAConstituencyCount",
    "WithoutMLAConstituencyCount",
    "MLAConstituencyCount",
  ];
  
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "ProjectStatusName", Text: "Project Status" },
    { Value: "ProjectSubCategory", Text: "Sub Category" },
    { Value: "ProjectSubSubCategory", Text: "Work Type" },
    { Value: "ProjectCategory", Text: "Category" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: any;
  totalCount: number;
  totalWithMLAConstituencyCount: number;
  totalWithoutMLAConstituencyCount: number;
  total: number;

  //#endregion Variable

  //#region Constructor
  constructor(
    private _parentComponent: AppComponent,
    private readonly _alertService: AlertService,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _projectMasterService: ProjectMasterService,
    private sanitizer: DomSanitizer
  ) {
    this._parentComponent.setpagelayout(
      "Department Wise Works Entry's Summary Report:",
      "",
      "",
      ""
    );
    this.filterModel = new ProjectReportFilterModel();
  }

  //#endregion Constructor

  //#region Methods

  ngOnInit() {
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    //this.getDepartment(0);
    this.getDistrict();
  }

  // getDepartment() {
  //   this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
  //     data => {
  //       if (data.IsSuccess) {
  //         this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
  //       }
  //     },
  //     error => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

  // getDepartment(code) {
  //   this.ddlDepartment=[];
  //   this._commonService.GetDepartmentByCMOOfficerCode(code).subscribe(
  //     data => {
  //       
  //       if (data.IsSuccess) {
  //         this.ddlDepartment = <DdlItemModel[]>data.Data;
  //       }
  //     },
  //     error => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

  getDistrict() {
    
    // this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
    //   (data) => {
    //     if (data.IsSuccess) {
    //       this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
    //     }
    //   },
    //   (error) => {
    //     this._alertService.error(error.message);
    //   }
    // );

    this._commonService.GetLoginUserDistrictForProject().subscribe(
      (data) => {
        
        this.ddlDistrict = <DdlItemModel[]>data;
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
    
  }


  getDepartmentByadmDepartment(dptcode=0,officerCode=0) {
    // if (code) {
     this.filterModel.NodalDepartmentCode=0;
      this._commonService.GetLoginUserDepartmentListByAdminDepartment(String(dptcode),officerCode).subscribe(
        data => {
          
          if (data) {
            this.ddlDepartment = <DdlItemModel[]>data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    // }
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ProjectReportDDLKey).subscribe(
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

  GetProjectSchemeCategoryByDepartment(code) {
    if (code) {
      this.filterModel.ProjectSchemeCode = null;
      this._commonService.GetProjectSchemeCategoryByDepartment(code).subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.ddlProjectSchemeCategory = <
              ProjectSchemeCategoryMasterViewModel[]
            >data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  ExportToExcel() {
    
    if (this.listModel) {
      const exportModel = new ExportToExcelModel(
        this.listModel,
        "Department Wise Works Entries Summary Report",
        "Summary report"
      );
      this._commonService.ExportToExcel(exportModel).subscribe(
        data => {
          if (data.IsSuccess) {
            const linkSource = data.Data;
            const downloadLink = document.createElement("a");
            const fileName = "Works Entry Report";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.target = "blank";
            downloadLink.click();
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  getMLAByDisctrictCode(code) {
    if (code) {
      this.filterModel.MLACode = null;
      this._commonService.getMLAByDisctrictCode(code).subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.ddlMLAConstituency = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
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
    this.filterModel = new ProjectReportFilterModel();
    this.listModel = [];
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

  GetList() {
    
    if (this.filterModel.DistrictCode) {
      this.filterModel.DistrictCode = this.filterModel.DistrictCode.toString();
    }
    if (this.filterModel.MLACode) {
      this.filterModel.MLACode = this.filterModel.MLACode.toString();
    }
    if (this.filterModel.ProjectSchemeCode) {
      this.filterModel.ProjectSchemeCode = this.filterModel.ProjectSchemeCode.toString();
    }
    this._projectMasterService
      .GetDepartmentWiseSummaryReport(this.filterModel)
      .subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.listModel = <ProjectDepartmentWiseSummaryReportModel[]>(
              data.Data
            );
            this.dataSource = new MatTableDataSource<
              ProjectDepartmentWiseSummaryReportModel
            >(this.listModel);
            this.dataSource.sort = this.sort;
            this.getTotalRecord();
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  getTotalRecord() {
    this.totalWithMLAConstituencyCount = this.listModel
      .map(t => t.WithMLAConstituencyCount)
      .reduce((acc, value) => acc + value, 0);

    this.totalWithoutMLAConstituencyCount = this.listModel
      .map(t => t.WithoutMLAConstituencyCount)
      .reduce((acc, value) => acc + value, 0);

    this.totalCount = this.listModel
      .map(t => t.MLAConstituencyCount)
      .reduce((acc, value) => acc + value, 0);
  }

  getActiveDeActiveData(data) {
    this.filterModel.Status = data;
    //this.GetList();
  }

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
    this.GetList();
  }

  		  
 

  //#endregion Methods
}
