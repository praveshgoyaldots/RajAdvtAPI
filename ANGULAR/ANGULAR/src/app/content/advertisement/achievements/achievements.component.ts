import { formatDate } from '@angular/common';
import { SearchModel } from 'src/app/Shared/Model/general-model';
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import {
  ColumnHeaderModel,
  DdlItemModel,
  DDLModel,
} from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import {
  AchievementModel,
  CustomSearchModel,
} from "src/app/Shared/Model/achievement-model";
import { AchievementService } from "src/app/Shared/Service/achievement.service";
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
import { AppDateAdapter } from "src/app/Shared/Service/Common/format-datepicker";
import { APP_DATE_FORMATS } from "src/app/Shared/Model/format-datepicker";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-achievements",
  templateUrl: "./achievements.component.html",
  styleUrls: ["./achievements.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class AchievementsComponent implements OnInit {
  //#region Variable
  model: AchievementModel[];
  loginData: UserViewModel;
  dataSource: any;
  catCode: number;
  searchModel = new CustomSearchModel();
  dDLList: DDLModel;
  deptlNameItems: { [index: string]: string } = {};
  categoryNameItems: { [index: string]: string } = {};
  subcategoryNameItems: { [index: string]: string } = {};
  displayedColumns: string[] = [
    "index",
    "Department",
    //"AchievementCategory",
    // "AchievementSubCategory",
    //"Achievement",
    "AchievementHindi",
    //"CMOComments",
    "DescriptionHindi",
    "UserName",
    "IsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    // { Value: "Department", Text: "Department" },
    // { Value: "AchievementCategory", Text: "Category" },
    // { Value: "AchievementSubCategory", Text: "Sub category" },
    // //{ Value: "Achievement", Text: "Achievement" },
    // { Value: "AchievementHindi", Text: "Achievement (Hindi)" },
    // { Value: "CMOComments", Text: "CMO Comments" },
    // { Value: "AchievementDate", Text: "Date" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: CustomSearchModel;
  totalRecords: number;

  Permission = this._commonService.GetPagePermission(
    "achievements",
    "achievements/add-achievements",
    "achievements/detail",
    "achievements/update-achievements",
    "achievements/delete",
    "/achievements/update-achievementsComment"
  );
  ddlDepartment: UserDepartmentViewModel[];
  // ddlAchievementCategory: UserDepartmentViewModel[];
  ddlAchievementSubcategorylist: UserAchievementSubCategoryViewModel[];
  fromDate: Date | string; //= new Date("12/17/2018");
  toDate: Date | string; //= new Date();
  isShow = false;
  toggleDisplay() {
    this.isShow = !this.isShow;

  }
  ddlAchievementCategory: DdlItemModel[];
  //#endregion

  //#region constructor
  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _achievementService: AchievementService,
    private readonly _dialog: MatDialog,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    private _route: ActivatedRoute,
  ) {
    this.catCode = this._route.snapshot.params.catCode;

    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.Permission.AddPageAccess
      ? this.appComponnet.setpagelayout(
        this.catCode ? 'E-Booklet' : 'General -multiple Entry',
        "add",
        "Create",
        this.catCode ? "advertisement/add-e-booklet" : "advertisement/achievements/add-achievements"
      )
      : this.appComponnet.setpagelayout(this.catCode ? 'E-Booklet' : 'General -multiple Entry');
    ///dDLList: DDLModel;
    // this.searchModel.indexmodel = new CustomSearchModel();
    if (sessionStorage.getItem("achvSearch")) {
      this.searchModel = <CustomSearchModel>(
        JSON.parse(sessionStorage.getItem("achvSearch"))
      );
      if (this.searchModel.CreatedFrom) {
        this.fromDate = new Date(this.searchModel.CreatedFrom);
      }
      if (this.searchModel.CreatedTo) {
        this.toDate = new Date(this.searchModel.CreatedTo);
      }
      if (this.catCode) {
        this.searchModel.CategortyCode = String(this.catCode);
      }
      this.toggleDisplay();
      this.getList();
    } else {
      this.searchModel = new CustomSearchModel();
      this.searchModel.indexmodel.OrderByAsc = 1;
    }
    if (this.catCode) {
      this.searchModel.CategortyCode = String(this.catCode);
    }
    // this.searchModel.indexmodel.PageSize = 1000000;

  }
  //#endregion

  //#region  Method
  ngOnInit() {
    debugger
    // this.getList();
    this.GetDDLList();
    this.getDepartment();
    this.GetDDLListByDepartment(0);
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

  // getAchievementSubcategory() {
  //   this._userService
  //     .GetUserAchievementSubcategory(this.loginData.UserId)
  //     .subscribe(
  //       (data) => {
  //         if (data.IsSuccess) {
  //           this.ddlAchievementSubcategorylist = <
  //             UserAchievementSubCategoryViewModel[]
  //           >data.Data;
  //         }
  //       },
  //       (error) => {
  //         this._alertService.error(error.message);
  //       }
  //     );
  // }


  GetGeneralSubCategory(AchievementCategoryCode: number) {

    if (this.searchModel.CategortyCode) {
      this._commonService
        .GetGeneralSubCategory(AchievementCategoryCode)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              this.dDLList.ddlAchievementSubCategory = data.Data;
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
    } else {
      this.dDLList.ddlAchievementSubCategory = [];
    }
  }

  // Getcategorybydepartmentcode(DepartmentCode: number){

  //   // if (DepartmentCode) {
  //     this._commonService.Getcategorybydepartmentcode(Number(DepartmentCode)).subscribe(
  //       data => {
  //         if (data.IsSuccess) {
  //           this.ddlAchievementCategory = data.Data as DdlItemModel[];
  //         }
  //       },
  //       error => {
  //         this._alertService.error(error.message);
  //       }
  //     );
  //   }


  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForCustomSearch).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLListByDepartment(code = 0) {
    this._commonService.GetAllDDL("ddlAchievementCategory", String(code)).subscribe(
      (data) => {

        if (data.IsSuccess) {
          this.ddlAchievementCategory = data.Data.ddlAchievementCategory as DdlItemModel[];

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

        this._achievementService.ChangeDeleteStatus(id).subscribe(
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
        this._achievementService.ChangeActiveStatus(id).subscribe(
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

  // SearchByKeyword(searchValue) {
  //   this.searchModel.indexmodel.Search = searchValue;
  //   this.getList();
  // }

  reset() {
    this.searchModel = new CustomSearchModel();
    this.indexModel = new CustomSearchModel();
    this.searchModel.indexmodel.OrderByAsc = 1;
    //this.searchModel.indexmodel.PageSize = 10000000;
    this.fromDate = null;
    this.toDate = null;
    //  this.getList();
    this.dataSource = null;
    this.model = null;
    sessionStorage.removeItem("achvSearch");
  }

  print() {
    this.searchModel.indexmodel.PageSize = 101;
    this._achievementService
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

  downloadCsv() {
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

    // if (this.fromDate || this.toDate) {
    //   this.indexModel.AdvanceSearchModel = {
    //     FromDate: this.fromDate,
    //     ToDate: this.toDate,
    //   };
    // }
    this.searchModel.CreatedFrom = this.fromDate;
    this.searchModel.CreatedTo = this.toDate;

    if (this.searchModel.IsExportToExcel) {
      this._achievementService.ExportAchievementData(this.searchModel, this._authService.GetCurrentUserDetail().UserViewModel.UserId)
        .subscribe((data) => {

          if (data.IsSuccess) {

            const linkSource = data.Data;
            const downloadLink = document.createElement("a");
            const fileName = "General Entry Report";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.target = "blank";
            downloadLink.click();
          } else {
            this._alertService.error(data.Message);
          }
          this.searchModel.IsExportToExcel = false;
        },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {

      this._achievementService
        .GetFilterList(this.searchModel, this.loginData.UserId)
        .subscribe(
          (data) => {

            if (data.IsSuccess) {
              this.model = <AchievementModel[]>data.Data.Data;
              this.dataSource = new MatTableDataSource<AchievementModel>(
                this.model
              );
              this.totalRecords = data.Data.TotalRecords;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              // if (!this.searchModel.indexmodel.IsPostBack) {
              //   // this.dataSource.paginator = this.paginator;
              //   this.dataSource.sort = this.sort;
              // }
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    }

    sessionStorage.setItem(
      "achvSearch",
      JSON.stringify(this.searchModel)
    );


  }

  downloadPdf(Url) {


    var w = window.open('about:blank');

    setTimeout(function () { //FireFox seems to require a setTimeout for this to work.
      w.document.body.appendChild(w.document.createElement('iframe'))
        .src = Url;
      w.document.getElementsByTagName("iframe")[0].style.width = '100%';
      w.document.getElementsByTagName("iframe")[0].style.height = '100%';
    }, 0);


  }
  //#endregion
}
