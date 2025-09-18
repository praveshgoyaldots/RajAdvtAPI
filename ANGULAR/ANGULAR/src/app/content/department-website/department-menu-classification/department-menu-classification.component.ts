import { PermissionModel } from 'src/app/Shared/Model/general-model';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { DepartmentMainMenuFilterModel, DepartmentMainMenuModel } from 'src/app/Shared/Model/Master/department.model';
import { DepartmentMenuClassificationService } from 'src/app/Shared/Service/department-menu-classification.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ColumnHeaderModel, DdlItemModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';

@Component({
  selector: 'app-department-menu-classification',
  templateUrl: './department-menu-classification.component.html',
  styleUrls: ['./department-menu-classification.component.css']
})
export class DepartmentMenuClassificationComponent implements OnInit {

//#region << Variable >>
dDLList: DDLModel;
ddlDepartment: UserDepartmentViewModel[];
loginData: UserViewModel;
departmentCode: string;
menuClassificationCode: string;

listModel: DepartmentMainMenuModel[];
dataSource: MatTableDataSource<DepartmentMainMenuModel>;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "MenuClassificationName",
  "DisplayNameHindi",
  "DisplayNameEnglish",
  "DisplayOrder",
  "IsActive",
  "CreatedDate",
  "ModifiedByName",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DisplayNameHindi", Text: "Display Name Hindi" },
  { Value: "DisplayNameEnglish", Text: "Display Name English" },
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "MenuClassificationName", Text: "Menu Classification" },
  { Value: "DisplayOrder", Text: "Display Order" },
];

searchColumns: ColumnHeaderModel[] = [
  { Value: "DisplayNameHindi", Text: "Display Name Hindi" },
  { Value: "DisplayNameEnglish", Text: "Display Name English" },

];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;


indexModel = this._commonService.modelSetGet(new DepartmentMainMenuFilterModel()) as DepartmentMainMenuFilterModel;

totalRecords: number;
DepartmentMenuClassificationPermission: PermissionModel = this._commonService.GetPagePermission(
  "/department-website/department-menu-Classification",
  "/department-website/department-menu-Classification/add",
  "",
  "/department-website/department-menu-Classification/update"
);

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _departmentMenuClassificationService: DepartmentMenuClassificationService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
) {
  this.DepartmentMenuClassificationPermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Department Menu Classification List:",
        "add",
        "Add",
        "/department-website/department-menu-Classification/add"
      )
    : this._parentComponent.setpagelayout("Department Menu Classification List:");
  // this.indexModel = new DepartmentMainMenuFilterModel();

}

//#endregion

//#region << Method >>

ngOnInit() {
  this.GetList();
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  this.getDepartment();
  this.GetDDLList();
}


GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.DDlKeyForDepartmentMenuClassification).subscribe(
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

getDepartment() {
  this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
    data => {
      if (data.IsSuccess) {
        this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
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
    event.direction === AppSetting.orderByDscAsc
      ? AppSetting.orderByAsc
      : AppSetting.orderByDsc;
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
   
   this.indexModel.PageSize=101;
  if (this.indexModel.DepartmentCode) {
    this.indexModel.DepartmentCode = this.indexModel.DepartmentCode.toString();
  }
  if (this.indexModel.MenuClassificationCode) {
    this.indexModel.MenuClassificationCode = this.indexModel.MenuClassificationCode.toString();
  }

  this._departmentMenuClassificationService.GetList(this._commonService.modelSetGet(this.indexModel, true)).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <DepartmentMainMenuModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<DepartmentMainMenuModel>(
          this.listModel
        );
        this.totalRecords = data.Data.TotalRecords;
        if (!this.indexModel.IsPostBack) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}

OnStatusClick(id) {
  this._departmentMenuClassificationService.ChangeActiveStatus(id).subscribe(
    (data) => {
      if (data.IsSuccess) {
        this.GetList();
        this._commonService.ScrollingTop();
        this._alertService.success(data.Message);
      } else {
        this._alertService.error(data.Message);
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}

SearchByKeyword(event) {
  
  this.indexModel.Search = event;
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
  this.GetList();
  this.indexModel = this._commonService.modelSetGet(this.indexModel, true)
}

Reset() {
  this.indexModel = new DepartmentMainMenuFilterModel();
  this.departmentCode="";
  this.menuClassificationCode="";
  this.GetList();
  this.indexModel = this._commonService.modelSetGet(this.indexModel, true)
}

getActiveDeActiveData(data) {
  this.indexModel.Status = data;
}
//#endregion
}
