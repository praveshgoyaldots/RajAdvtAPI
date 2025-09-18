import { SetPriorityViewModel } from "./../../../Shared/Model/scheme-model";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { SchemeService } from "src/app/Shared/Service/scheme.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: "app-set-priority",
  templateUrl: "./set-priority.component.html",
  styleUrls: ["./set-priority.component.css"]
})
export class SetPriorityComponent implements OnInit {
  model: SetPriorityViewModel[];
  dataSource: any;
  displayedColumns: string[] = ["index", "NameEnglish", "Status", "Priority","IsFlagShipScheme","FlagShipSchemeImage"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  indexModel: IndexModel;
  totalRecords: number;
  ddlAdminDepartment: UserDepartmentViewModel[];
  ddlDepartment: UserDepartmentViewModel[];
  loginData: UserViewModel;
  dDLList: DDLModel;
  department: number;
  isPriority: number;
  isFlagShip: number;
  flagshipImage: string;
  data: string;
  constructor(
    private readonly _schemeService: SchemeService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _parentApi: AppComponent,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
  ) {
    this._parentApi.setpagelayout("Set priority of scheme :", "", "", "");
    this.indexModel = new IndexModel();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.dDLList = new DDLModel();
    this.isPriority = 1;
    this.isFlagShip = -1;
  }

  ngOnInit() {
    this.GetList();
    this.getAdminDepartment();
  }

  GetList() {
    
    if ( !this.indexModel.AdvanceSearchModel ) {
      this.indexModel.AdvanceSearchModel = { Priority: this.isPriority,IsFlagShip:this.isFlagShip };
    }
    this._schemeService.GetSchemePriority(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <SetPriorityViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<SetPriorityViewModel>(
            this.model
          );
          if (this.indexModel.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
          }
          this.model.map(p => ({
                label:p.FlagshipImage,                
                value:p.FlagshipImage                
          }));
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
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

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.SaveClick();
    this.GetList();
  }


  SaveClick() {
      this._schemeService.SetSchemePriority(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
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

    getDepartmentList(id) {
      this.dDLList.ddlDepartment = [];
      this.department = null;
      if (id) {
        this._commonService.GetSchemeDepartment(id).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this.dDLList.ddlDepartment = data.Data;
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      }
    }

    getAdminDepartment() {
          this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
            (data) => {
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
            (error) => {
              this._alertService.error(error.message);
            }
          );
        }

            getActiveDeActiveData(data) {
              
                this.indexModel.AdvanceSearchModel = { Priority: data, Department: this.department, IsFlagShip : data };
              this.GetList();
            }

            handleFileInput(event: any,dataindex) {
              
              if (event.target.files.item(0).type.match("image/*")) {
                if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
                var reader = new FileReader();
                reader.onload = (event: any) => {
                  this.model[dataindex].FlagshipImage = event.target.result;
                };
                reader.readAsDataURL(event.target.files.item(0));
                this.model[dataindex].FlagshipImage= event.target.files.item(0);
              }else{
                // this.fileValidationMsg=this.fileSizeValidationMsg;
              }
              } else {
                // this.fileValidationMsg = "only *images file accepted ";
              }
            }

            RemoveImage(i){
              this.model[i].FlagshipImage = null;
            }

}
