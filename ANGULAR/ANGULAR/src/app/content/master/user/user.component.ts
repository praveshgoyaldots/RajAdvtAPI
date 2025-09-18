import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import {
  UserModel,
  CustomSearchModel,
  UserDepartmentViewModel,
  UserViewModel,
  UserOfficeViewModel,
  UserDistrictViewModel,
} from "src/app/Shared/Model/user-model";
import {
  ColumnHeaderModel,
  DDLModel,
  DdlItemModel,
} from "src/app/Shared/Model/commonddl.model";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { UserService } from "src/app/Shared/Service/user.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { IndexModel, SearchModel } from "src/app/Shared/Model/general-model";
import { CommonService } from "src/app/Shared/Service/common.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserTypeModel } from "src/app/Shared/Model/user-type.model";
import { UserTypeService } from "src/app/Shared/Service/user-type.service";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/Shared/Model/format-datepicker";
import { UserSpecificPermissionDialogComponent } from "./user-specific-permission-dialog/user-specific-permission-dialog.component";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class UserComponent implements OnInit {

  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _userService: UserService,
    private readonly _dialog: MatDialog,
    private readonly _userTypeService: UserTypeService,
    public readonly _commonService: CommonService,
    private readonly _authService: AuthenticationService
  ) {
    this.Permission.AddPageAccess
      ? this.appComponnet.setpagelayout(
          "User :",
          "add",
          "Create",
          "master/user/add"
        )
      : this.appComponnet.setpagelayout("User :");
    this.indexModel = new IndexModel();
    this.searchModel = new CustomSearchModel();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    dDLList: DDLModel;
  }
  isShow = true;

  model: UserModel[];
  dataSource: any;
  loginData: UserViewModel;
  searchModel: CustomSearchModel = new CustomSearchModel();
  ddlUserType: DdlItemModel[] = [];
  selectedAll = -1;
  displayedColumns: string[] = [
    "index",
    "UserName",
    "DepartmentNames",
    //"UserTypeTitle",
    // "DistrictNames",
    "OfficeName",
    "UserEmail",
    "Mobile",
    // "SSOID",
    "UserIsActive",
    "SpecificPermissionCount",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    // { Value: "UserName", Text: "Name" },

    { Value: "DepartmentNames", Text: "Department" },
    // { Value: "UserTypeTitle", Text: "User Type" },
    //{ Value: "DistrictNames", Text: "District" },
    //{ Value: "OfficeName", Text: "Office" },
    { Value: "UserEmail", Text: "User Email" },
    { Value: "Mobile", Text: "Mobile" },
    // { Value: "SpecificPermissionCount", Text: "Specific Permission Count" },
  ];

  ViewSearchColumns: ColumnHeaderModel[] = [
    { Value: "UserName", Text: "Name" },
    { Value: "UserTypeTitle", Text: "User Type" },
    { Value: "DepartmentNames", Text: "Department" },
    { Value: "DistrictNames", Text: "District" },
    { Value: "OfficeName", Text: "Office" },
    { Value: "SSOID", Text: "SSOID" },
    { Value: "UserEmail", Text: "User Email" },
    { Value: "Mobile", Text: "Mobile" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;
  Permission = this._commonService.GetPagePermission(
    "/master/user",
    "/master/user/add",
    "/master/user/detail",
    "/master/user/update",
    "/master/user/delete"
  );

  ddlDepartment: UserDepartmentViewModel[];
  ddlOffice: UserOfficeViewModel[];
  ddlDistrict: UserDistrictViewModel[];

  fromDate: Date | string = new Date("12/17/2018");
  toDate: Date | string = new Date();

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  ngOnInit() {
    this.getList();
    this.getDepartment();
    this.getOffice();
    this.getDistrict();
    this.getDownLevelUserType();
  }


  getDownLevelUserType() {
    this._userTypeService
      .GetDownLevelUserType(this.loginData.UserType)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            const usertypes = <UserTypeModel[]>data.Data;
            usertypes.forEach((element) => {
              this.ddlUserType.push({
                Value: element.UserType,
                Text: element.UserTypeTitle,
              });
            });
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  downloadCsv(){
    this.searchModel.IsExportToExcel = true;
    this.getList();
  }

  getList() {
    if (this.fromDate) {
      const uTCFromDate = new Date(
        Date.UTC(
          new Date(this.fromDate).getFullYear(),
          new Date(this.fromDate).getMonth(),
          new Date(this.fromDate).getDate()
        )
      );
      this.fromDate = uTCFromDate;
    }

    if (this.toDate) {
      const uTCToDate = new Date(
        Date.UTC(
          new Date(this.toDate).getFullYear(),
          new Date(this.toDate).getMonth(),
          new Date(this.toDate).getDate()
        )
      );
      this.toDate = uTCToDate;
    }

    if (this.fromDate || this.toDate) {
      this.indexModel.AdvanceSearchModel = {
        FromDate: this.fromDate,
        ToDate: this.toDate,
      };
    }
    this.searchModel.CreatedFrom = this.fromDate;
    this.searchModel.CreatedTo = this.toDate;
    this.indexModel.AdvanceSearchModel = this.searchModel;
if (this.searchModel.IsExportToExcel) {
  this._userService
  .ExportUserData(
    this.indexModel,
    this._authService.GetCurrentUserDetail().UserViewModel.UserId
  )
  .subscribe(
    (data) => {
      if (data.IsSuccess) {
          
          const linkSource = data.Data;
          const downloadLink = document.createElement("a");
          const fileName = "Report";
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.target = "blank";
          downloadLink.click();
      } else {
        this._alertService.error(data.Message);
      }
      this.searchModel.IsExportToExcel=false;
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}else{
    this._userService
      .GetList(
        this.indexModel,
        this._authService.GetCurrentUserDetail().UserViewModel.UserId
      )
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.model = <UserModel[]>data.Data.Data;
            this.dataSource = new MatTableDataSource<UserModel>(this.model);
            this.totalRecords = data.Data.TotalRecords;
            if (!this.indexModel.IsPostBack) {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;

              // this.searchModel.push({ColumnName:  "UserType",HeaderName: "User Type"},
              // {ColumnName:  "UserType",HeaderName: "User Name"},
              // {ColumnName:  "UserType",HeaderName: "User Type"} );
            }

          } else {
            this._alertService.error(data.Message);
          }
          this.searchModel.IsExportToExcel=false;
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }


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

  getOffice() {
    
    this._userService.GetUserOffice(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlOffice = <UserOfficeViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDistrict() {
    
    this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  updateDeleteStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: GlobalMessagesModel.ConfirmStatusChanged,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._userService.ChangeDeleteStatus(id).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._commonService.ScrollingTop();
              this.getList();
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      }
    });
  }

  viewPermission(userId){

  this._dialog.open(UserSpecificPermissionDialogComponent, {
      width: "800px",
      data: userId,
    });

  }

  updateActiveStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: GlobalMessagesModel.ConfirmStatusChanged,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._userService.ChangeActiveStatus(id).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this.getList();
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      }
    });
  }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.getList();
  }
  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.getList();
  }

  SearchByKeyword(value) {
    this.indexModel.Search = value;
    this.getList();
  }

  Reset() {
    this.indexModel = new IndexModel();
    this.searchModel = new CustomSearchModel();
    this.getList();
  }

  // getFilterdDDL(searchModel) {
  //   
  //   if (searchModel) {
  //     this._commonService
  //       .GetImpdecsubcategoryList(KeywordSearch, AchievementCategoryCode)
  //       .subscribe(
  //         (data) => {
  //           if (data.IsSuccess) {
  //             this.dDLList.ddlImportantDecisionSubCategory = data.Data;
  //           }
  //         },
  //         (error) => {
  //           this._alertService.error(error.message);
  //         }
  //       );
  //   } else {
  //     this.dDLList.ddlAchievementSubCategory = [];
  //   }
  // }

  resetUserSpecificPermission(userId) {
    
    this._userService.ResetUserSpecificPermission(userId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.getList();
          this._alertService.success(data.Message);
          this._commonService.ScrollingTop();
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

}
