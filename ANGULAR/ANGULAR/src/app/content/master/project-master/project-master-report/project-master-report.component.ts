import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ProjectReportModel,
  ProjectMasterViewModel,
  ProjectReportFilterModel
} from "src/app/Shared/Model/Master/project-master-model";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import {
  ColumnHeaderModel,
  DDLModel,
  DdlItemModel
} from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { ProjectMasterService } from "src/app/Shared/Service/project-master.service";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DatePipe } from '@angular/common';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { ProjectSchemeCategoryMasterViewModel } from 'src/app/Shared/Model/Master/project-scheme-category-master-model';
import { ActivatedRoute } from '@angular/router';
import { UserDepartmentViewModel, UserDistrictViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-project-master-report",
  templateUrl: "./project-master-report.component.html",
  styleUrls: ["./project-master-report.component.css"],
  providers: [DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})
export class ProjectMasterReportComponent implements OnInit {
  listModel: ProjectReportModel[];
  filterModel: ProjectReportFilterModel;
  dataSource: MatTableDataSource<ProjectReportModel>;
  dDLList: DDLModel;
  ddlProjectSubCategory: DdlItemModel[];
  ddlProjectSubSubCategory: DdlItemModel[];
  ddlMLAConstituency: DdlItemModel[];
  ddlDepartment: DdlItemModel[];
  loginData: UserViewModel;
  ddlProjectSchemeCategory: ProjectSchemeCategoryMasterViewModel[] = [];
  displayedColumns: string[] = [
    "index",
    "ProjectSchemeName",
    "ProjectSchemeDescription",
    "KeyIndicator",
    "UrbanRural",
    "TotalCost",
    "Action"
    
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "ProjectSchemeName", Text: "Project/Scheme Name" },
    { Value: "ProjectSchemeDescription", Text: "Project/Scheme Description" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: any;
  isShilanyas=-1;
  // ddlDistrict: UserDistrictViewModel[];
  ddlDistrict: DdlItemModel[];
  //#region   constructor
  constructor(
    private _parentComponent: AppComponent,
    private readonly _alertService: AlertService,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _projectMasterService: ProjectMasterService,
    private readonly _route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this._parentComponent.setpagelayout(
      "Works Entry Report:",
      "",
      "",
      "master/projectmaster"
    );
    this.filterModel = new ProjectReportFilterModel();
    if (this._route.snapshot.params.mlaCode) {
      this.filterModel.MLACode = (this._route.snapshot.params.mlaCode);
      this.getMLAByDisctrictCode(0);
      this.GetList();
    }
  }

  //#endregion

  //#region << Method >>
  ngOnInit() {
    this.GetDDLList();
   // this.GetList();
   this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
   this.getDistrict();
  // this.getDepartment(0);
  //  this.getSubCategoryByCategoryCode(0);
  //  this.getSubSubCategoryByCategoryCode(0);
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

  DownloadJsonFile(Data){

    var theJSON = JSON.stringify(Data);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    //  var downloadJsonHref = uri;
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    element.setAttribute('download', "Work-Entry.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
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
    this.filterModel.SubCategoryCode = 0;
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
      this.filterModel.SubSubCategoryCode = 0;
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

  getMLAByDisctrictCode(code) {
   // if (code) {
    //  if (code>0) {
      this.filterModel.MLACode = null;
    //  }

      this._commonService
        .getMLAByDisctrictCode(code)
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
    //}
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
    this.isShilanyas=-1;
    this.filterModel = new ProjectReportFilterModel();
    this.listModel = [];
    this.dataSource = new MatTableDataSource<ProjectReportModel>();
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

getAbsalutePath(url) {
   return environment.ApiBaseUrl + url.replace("~/", "");
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

    this._projectMasterService.GetProjectReport(this.filterModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <ProjectReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<ProjectReportModel>(
            this.listModel
          );
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  ExportToExcel() {
     this._projectMasterService.ExportProjectReportToExcel(this.filterModel).subscribe(
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

  getActiveDeActiveData(data,isAttachment=false) {
    if (isAttachment) {
      this.filterModel.IsAllAttachment = data;
    }else{
      this.filterModel.Status = data;
    }
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

  setShilanyas(data){
    this.filterModel.IsShilanyas=data
  }

  //#endregion <Update Progress>
}
