import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { DepartmentSectionMappingFilterModel, DepartmentSectionMappingModel } from 'src/app/Shared/Model/department-section-mapping-model';
import { ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { DepartmentSectionMappingService } from 'src/app/Shared/Service/department-section-mapping.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-department-section-mapping',
  templateUrl: './department-section-mapping.component.html',
  styleUrls: ['./department-section-mapping.component.css']
})
export class DepartmentSectionMappingComponent implements OnInit {

//#region << Variable >>

ddlDepartment: UserDepartmentViewModel[];
loginData: UserViewModel;
departmentCode: string;

listModel: DepartmentSectionMappingModel[];
dataSource: MatTableDataSource<DepartmentSectionMappingModel>;

displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "SectionMasterName",
  "NameHindi",
  "NameEnglish",
  "DisplayOrder",
  "IsActive",
  // "CreatedDate",
  "ModifiedByName",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "SectionMasterName", Text: "Section Name" },
  { Value: "NameHindi", Text: "Display Name Hindi" },
  { Value: "NameEnglish", Text: "Display Name English" },
  { Value: "DisplayOrder", Text: "Display Order" },
  { Value: "DepartmentTitle", Text: "Department Title" },

];

searchColumns: ColumnHeaderModel[] = [
  { Value: "NameHindi", Text: "Display Name Hindi" },
  { Value: "NameEnglish", Text: "Display Name English" },
  { Value: "DepartmentTitle", Text: "Department Title" },
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel = this._commonService.modelSetGet(new DepartmentSectionMappingFilterModel()) as DepartmentSectionMappingFilterModel;
totalRecords: number;
DepartmentSectionMappingPermission: PermissionModel = this._commonService.GetPagePermission(
  "/department-website/department-section-mapping",
  "/department-website/department-section-mapping/add",
  "",
  "/department-website/department-section-mapping/update"
);
dDLList: DDLModel;

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _DepartmentSectionMappingService: DepartmentSectionMappingService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService
) {
  this.DepartmentSectionMappingPermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Department Section Mapping List:",
        "add",
        "Add",
        "/department-website/department-section-mapping/add"
      )
    : this._parentComponent.setpagelayout("Department Section Mapping List:");
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
  
  this._commonService.GetAllDDL(AppSetting.DDlKeyForDepartmentSectionMapping).subscribe(
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
  this._DepartmentSectionMappingService.GetList(this._commonService.modelSetGet(this.indexModel, true)).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <DepartmentSectionMappingModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<DepartmentSectionMappingModel>(
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
  this._DepartmentSectionMappingService.ChangeActiveStatus(id).subscribe(
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
  this.indexModel.Page=1;
  this.GetList();
  this.indexModel = this._commonService.modelSetGet(this.indexModel, true)
}

Reset() {
  this.indexModel = new DepartmentSectionMappingFilterModel();
  this.departmentCode="";
  this.GetList();
  this.indexModel = this._commonService.modelSetGet(this.indexModel, true)
}

getActiveDeActiveData(data) {
  this.indexModel.Status = data;
}
//#endregion

}

