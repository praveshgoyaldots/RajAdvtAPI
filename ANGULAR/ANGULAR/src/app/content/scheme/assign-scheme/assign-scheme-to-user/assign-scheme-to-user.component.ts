import { Component, OnInit, ViewChild } from "@angular/core";
import { IndexModel } from "src/app/Shared/Model/general-model";
import {
  AssignSchemeModel,
  AssignSchemeViewModel
} from "src/app/Shared/Model/scheme-model";
import { SchemeService } from "src/app/Shared/Service/scheme.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { FormControl, Validators } from "@angular/forms";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import {
  UserDepartmentViewModel,
  UserViewModel
} from "src/app/Shared/Model/user-model";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserService } from "src/app/Shared/Service/user.service";

@Component({
  selector: "app-assign-scheme-to-user",
  templateUrl: "./assign-scheme-to-user.component.html",
  styleUrls: ["./assign-scheme-to-user.component.css"]
})
export class AssignSchemeToUserComponent implements OnInit {
  dDLList: DDLModel;
  model: AssignSchemeModel;
  listmodel: AssignSchemeViewModel[];
  NameEnglish = new FormControl("", [Validators.required]);
  SSOID = new FormControl("", [Validators.required]);
  PageType = new FormControl("", [Validators.required]);
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "NameEnglish",
    "UserName",
    "schemePageTypeName",
    "status",
    "Action"
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isActive: number = 1;
  indexModel: IndexModel;
  totalRecords: number;
  adminDepartment: number | string;
  department: number | string;
  ddlAdminDepartment: UserDepartmentViewModel[];
  ddlDepartment: UserDepartmentViewModel[];
  loginData: UserViewModel;
  isSchemeNotExist: boolean = true;
  constructor(
    private readonly _schemeService: SchemeService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _parentApi: AppComponent,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService
  ) {
    this._parentApi.setpagelayout("Create Scheme List :", "", "", "");
    this.model = new AssignSchemeModel();
    this.indexModel = new IndexModel();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }

  ngOnInit() {
    this.GetList();
    
    this.getDDLList();
    this.getAdminDepartment();
  }

  isSchmeNotExist() {
    this._schemeService.IsSchmeNotExist(this.model).subscribe(
      data => {
        if (data.IsSuccess) {
          this.isSchemeNotExist = true;
        } else {
          this.isSchemeNotExist = false;
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    
    this.NameEnglish.markAsTouched();
    this.SSOID.markAsTouched();
    this.PageType.markAsTouched();
    if (this.NameEnglish.valid && this.SSOID.valid && this.PageType.valid && this.isSchemeNotExist == true) {
      if (this.model.Id > 0) {
        this._schemeService.EditAssignScheme(this.model).subscribe(
          data => {
            
            if (data) {
              if (data.IsSuccess) {
                this.GetList();
                this._alertService.success(data.Message);
                this.model = new AssignSchemeModel();
                this.NameEnglish.markAsUntouched();
                this.SSOID.markAsUntouched();
                this.PageType.markAsUntouched();
              } else {
                this._commonService.ScrollingTop();
                this._alertService.error(data.Message);
              }
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.saveError);
          }
        );
      } else {
        this._schemeService.AssignScheme(this.model).subscribe(
          data => {
            
            if (data) {
              if (data.IsSuccess) {
                this.GetList();
                this._alertService.success(data.Message);
                this.model = new AssignSchemeModel();
                this.NameEnglish.markAsUntouched();
                this.SSOID.markAsUntouched();
                this.PageType.markAsUntouched();
              } else {
                this._commonService.ScrollingTop();
                this._alertService.error(data.Message);
              }
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.saveError);
          }
        );
      }
    }else if(this.isSchemeNotExist == false){
      this._alertService.error(GlobalMessagesModel.SchmeExist);
    }
  }

  GetList() {
    
    this._schemeService
      .AssignSchemeGetList(this.indexModel, this.isActive)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            this.listmodel = <AssignSchemeViewModel[]>data.Data.Data;
            this.dataSource = new MatTableDataSource<AssignSchemeViewModel>(
              this.listmodel
            );
           // if (this.indexModel.IsPostBack == false) {
              this.dataSource.paginator = this.paginator;
              this.totalRecords = data.Data.TotalRecords;
              this.dataSource.sort = this.sort;
            //}
          }
        },
        error => {
          //
          this._alertService.error(error.message);
        }
      );
  }

  getActiveDeActiveData(data) {
    this.isActive = data;
    // this.indexModel = new CustomSearchModel();
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  getByID(Id) {
    
    this._schemeService.AssignSchemeGetById(Id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <AssignSchemeModel>data.Data;
          if (this.model.PageType) {
            this.model.PageType = String(this.model.PageType);
          }
          if (this.model.SSOID) {
            this.model.SSOID = String(this.model.SSOID);
          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.error.ExceptionMessage);
      }
    );
  }

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.AssignSchemeDDLKey).subscribe(
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

  getDepartmentList(id) {
    this.dDLList.ddlDepartment = [];
    this.department = null;
    
    if (id) {
      this._commonService.GetSchemeDepartment(id).subscribe(
        data => {
          if (data.IsSuccess) {
            this.dDLList.ddlDepartment = data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  getAdminDepartment() {
    
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
          let temp = <UserDepartmentViewModel[]>data.Data;
          this.ddlAdminDepartment = <UserDepartmentViewModel[]>(
            temp.filter(
              (UserDepartmentViewModel, i, arr) =>
                arr.findIndex(
                  t =>
                    t.AdmDepartmentCode ===
                    UserDepartmentViewModel.AdmDepartmentCode
                ) === i
            )
          );
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  searchClick() {
    
    if (this.adminDepartment || this.department) {
      this.indexModel.AdvanceSearchModel = {
        AdminDepartment: this.adminDepartment,
        Department: this.department
      };
    }
    this.GetList();
  }

  clearClick() {
    

    this.indexModel = new IndexModel();
    this.adminDepartment = null;
    this.department = null;
    this.dDLList.ddlDepartment = [];
    this.GetList();
  }
}
