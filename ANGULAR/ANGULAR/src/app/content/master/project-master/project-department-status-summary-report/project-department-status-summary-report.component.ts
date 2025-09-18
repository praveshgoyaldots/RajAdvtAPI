import { MatDialog, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel, DdlItemModel, ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { ExportToExcelModel } from 'src/app/Shared/Model/general-model';
import { ProjectDepartmentStatusSummaryReportModel, ProjectReportFilterModel } from 'src/app/Shared/Model/Master/project-master-model';
import { ProjectSchemeCategoryMasterViewModel } from 'src/app/Shared/Model/Master/project-scheme-category-master-model';
import { UserViewModel, UserDistrictViewModel } from 'src/app/Shared/Model/user-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { ProjectMasterService } from 'src/app/Shared/Service/project-master.service';
import { UserService } from 'src/app/Shared/Service/user.service';

@Component({
  selector: 'app-project-department-status-summary-report',
  templateUrl: './project-department-status-summary-report.component.html',
  styleUrls: ['./project-department-status-summary-report.component.css']
})
export class ProjectDepartmentStatusSummaryReportComponent implements OnInit {

  //#region Variable
  listModel: ProjectDepartmentStatusSummaryReportModel[];
  filterModel: ProjectReportFilterModel;
  dataSource: MatTableDataSource<ProjectDepartmentStatusSummaryReportModel>;
  dDLList: DDLModel;
  ddlDepartment: DdlItemModel[];
  ddlProjectSubCategory: DdlItemModel[];
  ddlProjectSubSubCategory: DdlItemModel[];
  ddlMLAConstituency: DdlItemModel[];
  loginData: UserViewModel;
  ddlProjectSchemeCategory: ProjectSchemeCategoryMasterViewModel[] = [];
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "Completed",
    "OnGoing",
    "YetToBeStarted",
    "MLARequestReceived",
    "TechnicallyNotFeasible",
    "PendingforInauguration",
    "Shilanyas",
    "Lokarpan",
    "TaskInProgress",
    "Total",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  indexModel: any;
  totalCount: number;
  totalCompleted: number;
  totalOnGoing: number;
  totalYetToBeStarted: number;
  totalMLARequestReceived: number;
  totalTechnicallyNotFeasible: number;
  totalPendingforInauguration: number;
  totalTaskInProgress: number;
  totalLokarpan: number;
  totalShilanyas: number;
  total: number;
  // ddlDistrict: UserDistrictViewModel[];
  
  ddlDistrict: DdlItemModel[];
  //#endregion

  constructor( private _parentComponent: AppComponent,
    private readonly _alertService: AlertService,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _projectMasterService: ProjectMasterService) {
    this._parentComponent.setpagelayout(
      "Works Entry Status wise Departemnt Summary Report:",
      "",
      "",
      "master/projectmaster"
    );
    this.filterModel = new ProjectReportFilterModel();
   }

  ngOnInit() {
    this.GetDDLList();
    //this.GetList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDistrict();
    //this.getDepartment(0);
    // this.getSubCategoryByCategoryCode(0);
    // this.getSubSubCategoryByCategoryCode(0);
  }

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

  getDepartment(code) {
    this.ddlDepartment=[];
    this._commonService.GetDepartmentByCMOOfficerCode(code).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlDepartment = <DdlItemModel[]>data.Data;
        }
      },
      error => {
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
      this.filterModel.ProjectSchemeCode=null;
      this._commonService.GetProjectSchemeCategoryByDepartment(code).subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.ddlProjectSchemeCategory = <ProjectSchemeCategoryMasterViewModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  getSubCategoryByCategoryCode(code) {
    this.getSubSubCategoryByCategoryCode(code);
    this.filterModel.SubCategoryCode=0;
    this._commonService.GetSubCategoryByCategoryCode(Number(code)).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlProjectSubCategory = <DdlItemModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getSubSubCategoryByCategoryCode(code) {
    if (code>=0) {
      this.filterModel.SubSubCategoryCode=0;
      this._commonService
        .GetSubSubCategoryBySubCategoryCode(Number(code))
        .subscribe(
          data => {
            
            if (data.IsSuccess) {
              this.ddlProjectSubSubCategory = <DdlItemModel[]>data.Data;
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
    }
  }

  getMLAByDisctrictCode(code){
    if (code) {
      this.filterModel.MLACode=null;
      this._commonService
        .getMLAByDisctrictCode((code))
        .subscribe(
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
    this.listModel= [];
    //this.GetList();
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

  ExportToExcel(){
    
    if (this.listModel) {
      const exportModel = new ExportToExcelModel(this.listModel, 'Works Entry summary Report', 'Summary report');
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
    this._projectMasterService.GetProjectDepartmentStatusSummaryReport(this.filterModel).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.listModel = <ProjectDepartmentStatusSummaryReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<ProjectDepartmentStatusSummaryReportModel>(
            this.listModel
          );
            this.getTotalRecord();
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getTotalRecord() {
    this.totalCompleted = this.listModel
    .map((t) => t.Completed)
    .reduce((acc, value) => acc + value, 0);

    this.totalShilanyas = this.listModel
    .map((t) => t.Shilanyas)
    .reduce((acc, value) => acc + value, 0);

    this.totalLokarpan = this.listModel
    .map((t) => t.Lokarpan)
    .reduce((acc, value) => acc + value, 0);

    this.totalTaskInProgress = this.listModel
    .map((t) => t.TaskInProgress)
    .reduce((acc, value) => acc + value, 0);

    this.totalMLARequestReceived = this.listModel
    .map((t) => t.MLARequestReceived)
    .reduce((acc, value) => acc + value, 0);

    this.totalOnGoing = this.listModel
    .map((t) => t.OnGoing)
    .reduce((acc, value) => acc + value, 0);

    this.totalPendingforInauguration = this.listModel
    .map((t) => t.PendingforInauguration)
    .reduce((acc, value) => acc + value, 0);

    this.totalYetToBeStarted = this.listModel
    .map((t) => t.YetToBeStarted)
    .reduce((acc, value) => acc + value, 0);

    this.totalTechnicallyNotFeasible = this.listModel
    .map((t) => t.TechnicallyNotFeasible)
    .reduce((acc, value) => acc + value, 0);

    this.total = this.listModel
    .map((t) => t.TechnicallyNotFeasible + t.YetToBeStarted + t.PendingforInauguration + t.OnGoing + t.MLARequestReceived + t.Shilanyas + t.Lokarpan + t.TaskInProgress +  t.Completed)
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

  downloadAttachment(Url) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = 'Docs';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

  }

}
function MatSort(MatSort: any, arg1: { static: true; }) {
  throw new Error('Function not implemented.');
}

