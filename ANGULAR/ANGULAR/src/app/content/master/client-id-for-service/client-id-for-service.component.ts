import { stringify } from 'querystring';
import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ClientidServiceModel,
  ClientidServiceListModel,
  ClientModuleViewDetail
} from "src/app/Shared/Model/Master/ClientidSerive.Model";
import { ClientWebServiceService } from "src/app/Shared/Service/client-web-service.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { FormControl, Validators } from "@angular/forms";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { AppComponent } from "src/app/app.component";
import { IndexModel, PermissionModel } from "src/app/Shared/Model/general-model";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
@Component({
  selector: "app-client-id-for-service",
  templateUrl: "./client-id-for-service.component.html",
  styleUrls: ["./client-id-for-service.component.css"]
})
export class ClientIdForServiceComponent implements OnInit {
  model: ClientidServiceModel;
  UserId = new FormControl("", [Validators.required]);
  Password = new FormControl("", [Validators.required]);
  ModuleName = new FormControl("", [Validators.required]);
  DepartmentCode = new FormControl("", [Validators.required]);
  dDLList: DDLModel;
  indexModel: IndexModel;
  listModel: ClientidServiceListModel[];
  ddlDepartment: UserDepartmentViewModel[];
  loginData: UserViewModel;
  dataSource: any;
  displayedColumns: string[] = ["index","DepartmentTitle", "UserName","Password", "clientId","modulename","Action"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  totalRecords: number;
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/createclient/",
    "/master/createclient/add",
    "",
    "/master/createclient/edit"
  );

  constructor(
    private readonly _clientWebServiceService: ClientWebServiceService,
    private readonly _alertService: AlertService,
    private _router: Router,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
  ) {
    this._parentApi.setpagelayout("Create Client Id :", "", "", "");
    this.model = new ClientidServiceModel();
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDDLList();
    this.GetList();
    this.getDepartment();
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    this.UserId.markAsTouched();
    this.Password.markAsTouched();
    this.ModuleName.markAsTouched();
    this.DepartmentCode.markAsTouched();
    if (this.UserId.valid && this.Password.valid && this.ModuleName.valid && this.DepartmentCode.valid) {
      if (this.model.Id > 0) {
        this._clientWebServiceService.Edit(this.model).subscribe(
          data => {
            
            if (data) {
              if (data.IsSuccess) {
                this.GetList();
                this._alertService.success(data.Message);
                this.model = new ClientidServiceModel();
                this.UserId.markAsUntouched();
                this.Password.markAsUntouched();
                this.ModuleName.markAsUntouched();
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
        this._clientWebServiceService.Add(this.model).subscribe(
          data => {
            
            if (data) {
              if (data.IsSuccess) {
                this.GetList();
                this._alertService.success(data.Message);
                this.model = new ClientidServiceModel();

                this.UserId.markAsUntouched();
                this.Password.markAsUntouched();
                this.ModuleName.markAsUntouched();
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
    }

  }

  GetList() {
    
    this._clientWebServiceService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <ClientidServiceListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<ClientidServiceListModel>(
            this.listModel
          );
          if (this.indexModel.IsPostBack == false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        //
        this._alertService.error(error.message);
      }
    );
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

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.clientModuleDDLKey).subscribe(
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

  getByID(id) {
    
    this._clientWebServiceService.GetById(id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          var temp=<ClientModuleViewDetail>data.Data;

          this.model = <ClientidServiceModel>data.Data;
          if ( temp.moduleIds) {
            this.model.ModuleName= temp.moduleIds.split(",");
          }
          if ( temp.DepartmentCode) {
            this.model.DepartmentCode= String(temp.DepartmentCode);
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
}
