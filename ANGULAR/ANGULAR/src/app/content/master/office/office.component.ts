import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import {
  OfficeModel,
  CustomSearchModel,
} from "src/app/Shared/Model/office-model.model";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { CommonService } from "src/app/Shared/Service/common.service";
import { OfficeService } from "src/app/Shared/Service/office.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  UserDepartmentViewModel,
  UserViewModel,
  UserOfficeViewModel,
} from "src/app/Shared/Model/user-model";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/Shared/Model/format-datepicker";

@Component({
  selector: "app-office",
  templateUrl: "./office.component.html",
  styleUrls: ["./office.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class OfficeComponent implements OnInit {
  model: OfficeModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "Department",
    "OfficeName",
    "OfficeNameHindi",
    "OfficeShortName",
    "IsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Department", Text: "Department" },
    { Value: "OfficeName", Text: "Name" },
    { Value: "OfficeNameHindi", Text: "Hindi Name" },
    { Value: "OfficeShortName", Text: "Office Short Name" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;
  Permission = this._commonService.GetPagePermission(
    "/master/office",
    "/master/office/add",
    "/master/office/detail",
    "/master/office/update",
    "/master/office/delete"
  );

  fromDate: Date | string = new Date("12/17/2018");
  toDate: Date | string = new Date();
  searchModel: CustomSearchModel = new CustomSearchModel();
  isShow = true;
  ddlDepartment: UserDepartmentViewModel[];
  loginData: UserViewModel;
  ddlOffice: UserOfficeViewModel[];
  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _officeService: OfficeService,
    private readonly _userService: UserService,
    private readonly _dialog: MatDialog,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService
  ) {
    this.Permission.AddPageAccess
      ? this.appComponnet.setpagelayout(
          "Office :",
          "add",
          "Create",
          "master/office/add"
        )
      : this.appComponnet.setpagelayout("Office :");
    this.indexModel = new IndexModel();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }

  ngOnInit() {
    this.getList();
    this.getDepartment();
    this.getOffice();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
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
    this.searchModel.Userid = this.loginData.UserId;

    this.indexModel.AdvanceSearchModel = this.searchModel;

    this._officeService.GetList(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.model = <OfficeModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<OfficeModel>(this.model);
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
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

  Reset() {
    this.indexModel = new IndexModel();
    this.searchModel = new CustomSearchModel();
    this.getList();
  }
  updateDeleteStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: GlobalMessagesModel.ConfirmStatusChanged,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._officeService.ChangeDeleteStatus(id).subscribe(
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
        this._officeService.ChangeActiveStatus(id).subscribe(
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

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
    this.getList();
  }
}
