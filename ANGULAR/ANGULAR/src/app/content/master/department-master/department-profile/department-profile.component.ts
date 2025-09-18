import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentProfileListModel, DptProfileFilterModel } from 'src/app/Shared/Model/Master/department.model';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ColumnHeaderModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DepartmentService } from 'src/app/Shared/Service/department.service';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DomSanitizer } from '@angular/platform-browser';
import { AppDateAdapter } from 'src/app/Shared/Model/format-datepicker';
import { APP_DATE_FORMATS } from 'src/app/Shared/Service/Common/format-datepicker';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';

@Component({
  selector: 'app-department-profile',
  templateUrl: './department-profile.component.html',
  styleUrls: ['./department-profile.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class DepartmentProfileComponent implements OnInit {

  //#region <Variable>

  listModel: DepartmentProfileListModel[];
  indexModel: DptProfileFilterModel;
  totalRecords: number;
  dataSource: MatTableDataSource<DepartmentProfileListModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "EntryTypeName",
    "Details",
    "ImageURL",
    "PDFURL",
    "Status",
    // "CreatedDate",
    "ModifiedDate",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    // { Value: "DepartmentTitle", Text: "Department" },
    { Value: "EntryTypeName", Text: "Entry Type" },

  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/dptprofilelist",
    "/master/dptprofilelist/add", "",
    "/master/dptprofilelist/edit"
  );
  ddlDepartment: UserDepartmentViewModel[];
  ddlJankalyanCategory: DdlItemModel[];
  loginData: UserViewModel;
  entryItems: { [index: string]: string } = {};
  ddlEntryTypeMaster: DdlItemModel[];
  //#endregion <Variable>

  //#region <constructor>

  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _departmentService: DepartmentService,
    private readonly _dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService
  ) {
    this.permission.AddPageAccess
      ? this._parentApi.setpagelayout(
        "General-Single Entry",
        "add",
        "Add",
        "master/dptprofileaddupdate"
      )
      : this._parentApi.setpagelayout("General-Single Entry");
    this.indexModel = new DptProfileFilterModel();
  }

  //#endregion <constructor>

  //#region <Methods>

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetList();
    this.getDepartment();
    this.GetJankalyanCategorybyDepartmentCode(0);
    this.getEntryType(0);
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(data => {
      if (data.IsSuccess) {
        this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  GetJankalyanCategorybyDepartmentCode(DepartmentCode: number) {
    this._commonService.GetJankalyanCategorybyDepartmentCode(Number(DepartmentCode)).subscribe(data => {
      if (data.IsSuccess) {
        this.ddlJankalyanCategory = data.Data as DdlItemModel[];
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  getEntryType(code) {
    this._commonService.GetEntryTypeByCategory(Number(code)).subscribe(data => {
      if (data.IsSuccess) {
        this.ddlEntryTypeMaster = <DdlItemModel[]>data.Data;

        this.ddlEntryTypeMaster.forEach(obj => {
          this.entryItems[obj.Value] = obj.Text;
        });
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  GetList() {
    this._departmentService.GetDepartmentProfileList(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.listModel = <DepartmentProfileListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<DepartmentProfileListModel>(
            this.listModel
          );
          if (this.indexModel.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.totalRecords = data.Data.TotalRecords;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  ChangeActiveStatusClick(id) {
    const _dialogRef = this._dialog.open(OTPDialogComponent, {
      width: "500px",
      disableClose: true
    });
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this._departmentService.UpdateDepartmentProfileStatus(id).subscribe(
                data => {
                  if (data.IsSuccess) {
                    this.GetList();
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
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;

    if (this.indexModel.FromDate) {
      let uTCFromDate = new Date(
        Date.UTC(new Date(this.indexModel.FromDate).getFullYear(), new Date(this.indexModel.FromDate).getMonth(), new Date(this.indexModel.FromDate).getDate())
      ).toISOString();
      this.indexModel.FromDate = uTCFromDate;
    }

    if (this.indexModel.ToDate) {
      let uTCToDate = new Date(
        Date.UTC(new Date(this.indexModel.ToDate).getFullYear(), new Date(this.indexModel.ToDate).getMonth(), new Date(this.indexModel.ToDate).getDate())
      ).toISOString();
      this.indexModel.ToDate = uTCToDate;
    }

    this.GetList();
  }

  onClearclick() {
    this.indexModel = new DptProfileFilterModel();
  }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  downloadPdf(Url) {
    if (Url) {
      const link = document.createElement("a");
      link.setAttribute("href", Url);
      link.setAttribute("download", name + ".pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  //#endregion <Methods>
}
