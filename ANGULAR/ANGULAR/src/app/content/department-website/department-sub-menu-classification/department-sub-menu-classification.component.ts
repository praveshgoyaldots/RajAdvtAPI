import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DepartmentSubMenuFilterModel, DepartmentSubMenuListModel } from 'src/app/Shared/Model/Master/department.model';
import { ColumnHeaderModel, DdlItemModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { DepartmentSubmenuClassificationService } from 'src/app/Shared/Service/department-submenu-classification.service';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';

@Component({
  selector: 'app-department-sub-menu-classification',
  templateUrl: './department-sub-menu-classification.component.html',
  styleUrls: ['./department-sub-menu-classification.component.css']
})

export class DepartmentSubMenuClassificationComponent implements OnInit {

  ddlDepartment: UserDepartmentViewModel[];
  loginData: UserViewModel;
  departmentCode: string;

  listModel: DepartmentSubMenuListModel[];
  dataSource: MatTableDataSource<DepartmentSubMenuListModel>;
  displayedColumns: string[] = ["index", "Department", "Type", "Module", "DisplayNameEnglish", "DisplayOrder",
    //"CreatedDate", 
    "ModifiedBy", "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    // { Value: "DisplayNameHindi", Text: "Display Name Hindi" },
    // { Value: "DisplayNameEnglish", Text: "Display Name English" },
    // { Value: "DisplayOrder", Text: "Display Order" },
    //{ Value: "DepartmentMainMenuName", Text: "Department Main Menu" },
    //{ Value: "ModuleCategoryNameEnglish", Text: "Module Category" },
  ];

  searchColumns: ColumnHeaderModel[] = [
    { Value: "DisplayNameHindi", Text: "Display Name Hindi" },
    { Value: "DisplayNameEnglish", Text: "Display Name English" },
    { Value: "DepartmentTitle", Text: "Department Title" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // indexModel: DepartmentSubMenuFilterModel  ;

  indexModel = this._commonService.modelSetGet(new DepartmentSubMenuFilterModel()) as DepartmentSubMenuFilterModel;

  totalRecords: number;
  DepartmentSubMenuClassificationPermission: PermissionModel = this._commonService.GetPagePermission(
    "/department-website/department-submenu-Classification",
    "/department-website/department-submenu-Classification/add",
    "",
    "/department-website/department-submenu-Classification/update"
  );
  dDLList: DDLModel;
  ddlmainmenulist: DdlItemModel[];
  ddlModuleCategory: DdlItemModel[];
  ddlModuleSubCategory: DdlItemModel[];

  constructor(
    private _parentComponent: AppComponent,
    private readonly _DepartmentSubmenuClassificationService: DepartmentSubmenuClassificationService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private readonly _dialog: MatDialog,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService
  ) {
    this.DepartmentSubMenuClassificationPermission.AddPageAccess
      ? this._parentComponent.setpagelayout(
        "Department Sub-Menu Classification List:",
        "add",
        "Add",
        "/department-website/department-submenu-Classification/add"
      )
      : this._parentComponent.setpagelayout("Department Sub-Menu Classification List:");
    // this.indexModel = new DepartmentSubMenuFilterModel();

    if (this.indexModel.DepartmentCode) {
      this.GetDepartmentMainMenuByDepartment(this.indexModel.DepartmentCode);
    }
    if (this.indexModel.ModuleName) {
      this.GetModuleCategoryByModule(this.indexModel.ModuleName);
    }
  }

  ngOnInit() {
    this.GetList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
    this.GetDDLList();
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

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForDepartmentSubMenuFilter).subscribe(data => {
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  GetModuleCategoryByModule(code) {
    if (code) {
      this._commonService.GetModuleCategoryByModule(Number(code)).subscribe(data => {
        if (data.IsSuccess) {
          this.ddlModuleCategory = <DdlItemModel[]>data.Data;
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
  }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction === AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
    this.indexModel = this._commonService.modelSetGet(this.indexModel, true)
  }

  GetList() {
    this.indexModel.PageSize = 101;
    this._DepartmentSubmenuClassificationService.GetList(this._commonService.modelSetGet(this.indexModel, true)).subscribe((data) => {
      if (data.IsSuccess) {
        this.listModel = <DepartmentSubMenuListModel[]>(data.Data.Data);

        console.log('listModel');
        console.log(this.listModel);

        this.dataSource = new MatTableDataSource<DepartmentSubMenuListModel>(this.listModel);
        this.totalRecords = data.Data.TotalRecords;
        if (!this.indexModel.IsPostBack) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    }, (error) => {
      this._alertService.error(error.message);
    });
  }

  OnStatusClick(id) {
    this._DepartmentSubmenuClassificationService.ChangeActiveStatus(id).subscribe((data) => {
      if (data.IsSuccess) {
        this.GetList();
        this._commonService.ScrollingTop();
        this._alertService.success(data.Message);
      }
      else {
        this._alertService.error(data.Message);
      }
    }, (error) => {
      this._alertService.error(error.message);
    });
  }

  GetDepartmentMainMenuByDepartment(code) {
    if (code) {
      this._commonService.GetDepartmentMainMenuByDepartment(Number(code)).subscribe(data => {
        if (data.IsSuccess) {
          this.ddlmainmenulist = <DdlItemModel[]>data.Data;
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
  }

  getActiveDeActiveData(data) {
    this.indexModel.Status = data;
  }

  SearchByKeyword(event) {
    this.indexModel.IsPostBack = true;
    this.indexModel.Search = event;
    if (this.indexModel.ModifiedToDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.indexModel.ModifiedToDate).getFullYear(),
          new Date(this.indexModel.ModifiedToDate).getMonth(),
          new Date(this.indexModel.ModifiedToDate).getDate()
        )
      ).toISOString();
      this.indexModel.ModifiedToDate = uTCDate;
    }
    if (this.indexModel.ModifiedFromDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.indexModel.ModifiedFromDate).getFullYear(),
          new Date(this.indexModel.ModifiedFromDate).getMonth(),
          new Date(this.indexModel.ModifiedFromDate).getDate()
        )
      ).toISOString();
      this.indexModel.ModifiedFromDate = uTCDate;
    }
    this.indexModel.Page = 1;
    this.GetList();
    this.indexModel = this._commonService.modelSetGet(this.indexModel, true)
  }

  Reset() {
    this.indexModel = new DepartmentSubMenuFilterModel();
    this.departmentCode = "";
    this.GetList();
    this.indexModel = this._commonService.modelSetGet(this.indexModel, true)
  }

  GetModuleSubCategoryByModule(moduleCode, moduleCatCode) {
    if (moduleCode || moduleCatCode) {
      this._commonService.GetModuleSubCategoryByModule(moduleCode, moduleCatCode).subscribe(data => {
        if (data.IsSuccess) {
          this.ddlModuleSubCategory = <DdlItemModel[]>data.Data;
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
  }

}

