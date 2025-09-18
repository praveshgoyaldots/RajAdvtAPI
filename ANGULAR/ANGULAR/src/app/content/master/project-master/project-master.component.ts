import { Data } from '@angular/router';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { ProjectMasterService } from "src/app/Shared/Service/project-master.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import {
  IndexModel,
  PermissionModel
} from "src/app/Shared/Model/general-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import {
  ProjectMasterViewModel,
  ProjectReportFilterModel
} from "src/app/Shared/Model/Master/project-master-model";
import {
  ColumnHeaderModel,
  DDLModel,
  DdlItemModel
} from "src/app/Shared/Model/commonddl.model";
import { AppDateAdapter } from "src/app/Shared/Model/format-datepicker";
import { APP_DATE_FORMATS } from "src/app/Shared/Service/Common/format-datepicker";
import { UpdateProjectProgressComponent } from "./update-project-progress/update-project-progress.component";
import {
  UserDepartmentViewModel,
  UserDistrictViewModel,
  UserViewModel
} from "src/app/Shared/Model/user-model";
import { ProjectSchemeCategoryMasterViewModel } from "src/app/Shared/Model/Master/project-scheme-category-master-model";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-project-master",
  templateUrl: "./project-master.component.html",
  styleUrls: ["./project-master.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ProjectMasterComponent implements OnInit {
  listModel: ProjectMasterViewModel[];
  dataSource: MatTableDataSource<ProjectMasterViewModel>;
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
    "ModifiedDate",
    "MLAConstituencyName",
    "IsActive",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "ProjectSchemeName", Text: "Project/Scheme Name" },
    { Value: "StatusName", Text: "Status" },
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "ProjectSchemeDescription", Text: "Project/Scheme Description" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: ProjectReportFilterModel;
  // ddlDistrict: UserDistrictViewModel[];
  ddlDistrict: DdlItemModel[];
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/projectmaster",
    "/master/projectmaster/add/",
    "",
    "/master/projectmaster/edit/",
    "/master/projectmaster/delete/",
    "/master/projectmaster/updateProgress"
  );
  totalRecords: number;
  subSubCategory = -1;
  isShilanyas=-1;
  //#region   constructor
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
    
    this.Permission.AddPageAccess
      ? this._parentComponent.setpagelayout(
          "Works Entry List:",
          "add",
          "Create",
          "master/projectmasteradd"
        )
      : this._parentComponent.setpagelayout("Works Entry List :");

    
    if (sessionStorage.getItem("ProjectSearch")) {
      this.indexModel = <ProjectReportFilterModel>(
        JSON.parse(sessionStorage.getItem("ProjectSearch"))
      );
    }

    if (!this.indexModel) {
      this.indexModel = new ProjectReportFilterModel();
    }

    if (this.indexModel.CategoryCode) {
      this.getSubCategoryByCategoryCode(this.indexModel.CategoryCode);
    }
    if (this.indexModel.SubCategoryCode) {
      this.getSubSubCategoryByCategoryCode(this.indexModel.SubCategoryCode);
    }
    if (this.indexModel.DistrictCode) {
      this.getMLAByDisctrictCode(this.indexModel.DistrictCode);
    }
    if (this.indexModel.NodalDepartmentCode) {
      this.GetProjectSchemeCategoryByDepartment(
        this.indexModel.NodalDepartmentCode
      );
    }
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
   // this.GetList(this.subSubCategory);
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDistrict();
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

  getDepartmentByadmDepartment(code) {
    if (code) {
     this.indexModel.NodalDepartmentCode=0;
      this._commonService.GetLoginUserDepartmentListByAdminDepartment(code).subscribe(
        data => {
          
          if (data) {
            this.ddlDepartment = <DdlItemModel[]>data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  GetProjectSchemeCategoryByDepartment(code) {
    if (code) {
      //if (this.indexModel.IsPostBack === false) {
        this.indexModel.ProjectSchemeCode = null;
      //}
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

  getSubCategoryByCategoryCode(code) {
    //this.getSubSubCategoryByCategoryCode(code);
    if (this.indexModel.IsPostBack === false) {
      this.indexModel.SubCategoryCode = 0;
    }
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
      if (this.indexModel.IsPostBack === false) {
        this.indexModel.SubSubCategoryCode = 0;
      }
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
   // if (this.indexModel.IsPostBack === false) {
      this.indexModel.MLACode = null;
    //}
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
    //}
  }

  searchClick() {
    if (this.indexModel.ToDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.indexModel.ToDate).getFullYear(),
          new Date(this.indexModel.ToDate).getMonth(),
          new Date(this.indexModel.ToDate).getDate()
        )
      ).toISOString();
      this.indexModel.ToDate = uTCDate;
    }
    if (this.indexModel.FromDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.indexModel.FromDate).getFullYear(),
          new Date(this.indexModel.FromDate).getMonth(),
          new Date(this.indexModel.FromDate).getDate()
        )
      ).toISOString();
      this.indexModel.FromDate = uTCDate;
    }
    this.indexModel.Page=1;
    this.GetList(this.subSubCategory);
  }

  clearClick() {
    this.isShilanyas=-1;
    this.indexModel = new ProjectReportFilterModel();
    this.listModel =[];
          this.dataSource = new MatTableDataSource<ProjectMasterViewModel>(
            this.listModel
          );
          this.totalRecords=0;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
   // this.GetList(this.subSubCategory);
    sessionStorage.removeItem("ProjectSearch");
  }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction === AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList(this.subSubCategory);
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList(this.subSubCategory);
  }

  setShilanyas(data){
    this.indexModel.IsShilanyas=data
  }


  GetList(subSubCatCode) {
    
    if (this.indexModel.DistrictCode) {
      this.indexModel.DistrictCode = this.indexModel.DistrictCode.toString();
    }
    if (this.indexModel.MLACode) {
      this.indexModel.MLACode = this.indexModel.MLACode.toString();
    }
    if (this.indexModel.ProjectSchemeCode) {
      this.indexModel.ProjectSchemeCode = this.indexModel.ProjectSchemeCode.toString();
    }
    this._projectMasterService
      .GetList(this.indexModel, subSubCatCode)
      .subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.listModel = <ProjectMasterViewModel[]>data.Data.Data;
            this.dataSource = new MatTableDataSource<ProjectMasterViewModel>(
              this.listModel
            );
            this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          }
        },
        error => {
          this.listModel =[];
          this.dataSource = new MatTableDataSource<ProjectMasterViewModel>(
            this.listModel
          );
          this.totalRecords=0;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this._alertService.error(error.message);
        }
      );
   // sessionStorage.setItem("ProjectSearch", JSON.stringify(this.indexModel));
  }

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
    this.GetList(this.subSubCategory);
  }


  getActiveDeActiveData(data) {
    this.indexModel.Status = data;
    //this.GetList();
  }

  OnActiveStatus(id) {
    
    // this._commonService.GenerateOTP().subscribe(
    //   data => {
    //     if (data.IsSuccess) {
    //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
    //         width: "500px",
    //         disableClose: true
    //       });
    //       _dialogRef.afterClosed().subscribe((result: boolean) => {
    //         if (result) {
    this._projectMasterService.ChangeActiveStatus(id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.GetList(this.subSubCategory);
          this._alertService.success(data.Message);
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
    //         }
    //       });
    //     } else {
    //       this._alertService.error(data.Message);
    //     }
    //   },
    //   error => {
    //     this._alertService.error(error.message);
    //   }
    // );
  }

  DeleteProjectBySuperAdmin(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Are you sure! You want to delete this record"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._projectMasterService.DeleteProjectBySuperAdmin(id).subscribe(
          data => {
            if (data.IsSuccess) {
              this.GetList(this.subSubCategory);
              this._alertService.success(data.Message);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    });
  }

  //#endregion

  //#region <Update Progress>

  openDialog(Id) {
    const _dialogRef = this._dialog.open(UpdateProjectProgressComponent, {
      width: "800px",
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList(this.subSubCategory);
      }
    });
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

  //#endregion <Update Progress>
}
