import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import {
  ColumnHeaderModel,
  DDLModel,
} from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import {
  AchievementModel,
  CustomSearchModel,
} from "src/app/Shared/Model/achievement-model";

import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material";
import {
  UserViewModel,
  UserDepartmentViewModel,
  UserAchievementSubCategoryViewModel,
} from "src/app/Shared/Model/user-model";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { importantdesicionservice } from "src/app/Shared/Service/important-desicion-service";
import { AppDateAdapter } from "src/app/Shared/Model/format-datepicker";
import { APP_DATE_FORMATS } from "src/app/Shared/Service/Common/format-datepicker";

@Component({
  selector: "app-important-decision",
  templateUrl: "./important-decision.component.html",
  styleUrls: ["./important-decision.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class ImportantDecisionComponent implements OnInit {
  //#region Variable
  model: AchievementModel[];
  loginData: UserViewModel;
  dataSource: any;
  searchModel: CustomSearchModel;
  dDLList: DDLModel;
  deptlNameItems: { [index: string]: string } = {};
  categoryNameItems: { [index: string]: string } = {};
  subcategoryNameItems: { [index: string]: string } = {};
  // displayedColumns: string[] = [
  //   "index",
  //   "Department",
  //   "AchievementCategory",
  //   "AchievementSubCategory",
  //   "Achievement",
  //   "AchievementHindi",
  //   "IsActive",
  //   "Action",
  // ];

  displayedColumns: string[] = [
    "index",
    "Department",
    "Achievement",
    //"AchievementHindi",
    "CMOComments",
    "UserName",
    "IsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    //{ Value: "Department", Text: "Department/Category/Sub category" },
    //   // { Value: "Achievement", Text: "Summary" },
    // { Value: "AchievementHindi", Text: "Important Decisions(Details)" },
    // { Value: "CreatedBy", Text: "User By" },
    // { Value: "AchievementDate", Text: "Date" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: CustomSearchModel;
  totalRecords: number;

  Permission = this._commonService.GetPagePermission(
    "ImportantDecision",
    "ImportantDecision/add-ImportantDecision",

    "ImportantDecision/detail",
    "ImportantDecision/update-ImportantDecision",
    "ImportantDecision/delete",
    "/ImportantDecision/update-ImportantDecisionComment"
  );
  ddlDepartment: UserDepartmentViewModel[];
  ddlAchievementCategory: UserDepartmentViewModel[];
  ddlAchievementSubcategorylist: UserAchievementSubCategoryViewModel[];
  fromDate: Date | string = new Date("12/17/2018");
  toDate: Date | string = new Date();
  isShow = true;
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  //#endregion

  //#region constructor
  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _importantdesicionservice: importantdesicionservice,
    private readonly _dialog: MatDialog,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService
  ) {
    // this.Permission.AddPageAccess
    //   ?
    this.appComponnet.setpagelayout(
      "Important Decisions :",
      "add",
      "Create",
      "/master/ImportantDecision/add-ImportantDecision"
    );

    // : this.appComponnet.setpagelayout("Important Decision :");
    dDLList: DDLModel;
    this.indexModel = new CustomSearchModel();
    this.searchModel = new CustomSearchModel();
    // this.indexModel = new IndexModel();
    this.searchModel.indexmodel.OrderByAsc = 1;
    this.searchModel.indexmodel.PageSize = 1000000;
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  //#region  Method
  ngOnInit() {
    this.getList();
    this.GetDDLList();
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

  getImportantDecisionSubcategory() {
    this._userService
      .GetUserAchievementSubcategory(this.loginData.UserId)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.ddlAchievementSubcategorylist = <
              UserAchievementSubCategoryViewModel[]
            >data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  getFilterdDDL(DepartmentCode, AchievementCategoryCode) {
    
    if (DepartmentCode && AchievementCategoryCode) {
      this._commonService
        .GetImpdecsubcategoryList(DepartmentCode, AchievementCategoryCode)
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
              this.dDLList.ddlImportantDecisionSubCategory = data.Data;
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {
      this.dDLList.ddlAchievementSubCategory = [];
    }
  }

  GetDDLList() {
    
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForImportantDecision)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            
            this.dDLList = <DDLModel>data.Data;
            this.dDLList.ddlDepartment.forEach((obj) => {
              this.deptlNameItems[obj.Value] = obj.Text;
            });
            this.dDLList.ddlImpCategory.forEach((obj) => {
              this.categoryNameItems[obj.Value] = obj.Text;
            });
            this.dDLList.ddlImportantDecisionSubCategory.forEach((obj) => {
              this.subcategoryNameItems[obj.Value] = obj.Text;
            });
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
        
        this._importantdesicionservice.ChangeDeleteStatus(id).subscribe(
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

  updateActiveStatus(id) {
    
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: GlobalMessagesModel.ConfirmStatusChanged,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._importantdesicionservice.ChangeActiveStatus(id).subscribe(
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
    this.searchModel.indexmodel.OrderBy = event.active;
    this.searchModel.indexmodel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.searchModel.indexmodel.IsPostBack = true;
    this.getList();
  }

  onPaginateChange(event) {
    this.searchModel.indexmodel.Page = event.pageIndex + 1;
    this.searchModel.indexmodel.PageSize = event.pageSize;
    this.searchModel.indexmodel.IsPostBack = true;
    this.getList();
  }

  Reset() {
    this.indexModel = new CustomSearchModel();
    this.searchModel = new CustomSearchModel();
    this.fromDate = new Date("12/17/2018");
    this.toDate = new Date();
    this.getList();
  }

  print() {
    this.searchModel.indexmodel.PageSize = 1000000;
    this._importantdesicionservice
      .GetFilterList(this.searchModel, this.loginData.UserId)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.model = <AchievementModel[]>data.Data.Data;
            this.dataSource = new MatTableDataSource<AchievementModel>(
              this.model
            );
            this.totalRecords = data.Data.TotalRecords;
            if (!this.searchModel.indexmodel.IsPostBack) {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              let printContents, popupWin;
              printContents = document.getElementById("print").outerHTML;
              popupWin = window.open(
                "",
                "_blank",
                "top=0,left=0,height=100%,width=auto"
              );
              popupWin.document.open();
              popupWin.document.write(`
    <html>
      <head>
        <title>Important Decisions</title>
        <style>
        .doNotPrint{display:none !important;}
        table th,table td{
          border: 1px solid black;

          // padding:1px;
        }
        #print {
          border-collapse: collapse;
        }
        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`);
              popupWin.document.close();
            }
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  // getListPrint() {
  //   this.getList();
  // }

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

    // if (this.fromDate || this.toDate) {
    //   this.indexModel.AdvanceSearchModel = {
    //     FromDate: this.fromDate,
    //     ToDate: this.toDate,
    //   };
    // }
    this.searchModel.CreatedFrom = this.fromDate;
    this.searchModel.CreatedTo = this.toDate;
    

    this.searchModel;
    this._importantdesicionservice
      .GetFilterList(this.searchModel, this.loginData.UserId)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.model = <AchievementModel[]>data.Data.Data;
            this.dataSource = new MatTableDataSource<AchievementModel>(
              this.model
            );
            this.totalRecords = data.Data.TotalRecords;
            if (!this.searchModel.indexmodel.IsPostBack) {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  //#endregion
}
