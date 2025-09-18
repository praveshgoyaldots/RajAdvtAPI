import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { SectionMasterService } from 'src/app/Shared/Service/section-master.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { SectionMasterModel } from 'src/app/Shared/Model/section-master-model';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-section-master',
  templateUrl: './section-master.component.html',
  styleUrls: ['./section-master.component.css']
})
export class SectionMasterComponent implements OnInit {

//#region << Variable >>
loginData: UserViewModel;
departmentCode: string;
menuClassificationCode: string;

listModel: SectionMasterModel[];
dataSource: MatTableDataSource<SectionMasterModel>;
displayedColumns: string[] = [
  "index",
  "ComponentName",
  "SelectorName",
  "NameEnglish",
  "NameHindi",
  "DefaultOrder",
  "IsActive",
  "CreatedDate",
  // "ModifiedByName",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "ComponentName", Text: "Component Name" },
  { Value: "SelectorName", Text: "Selector Name" },
  { Value: "NameEnglish", Text: "Name English" },
  { Value: "NameHindi", Text: "Name Hindi" },
  { Value: "DefaultOrder", Text: "Default Order" },
];

searchColumns: ColumnHeaderModel[] = [
  { Value: "ComponentName", Text: "Component Name" },
  { Value: "SelectorName", Text: "Selector Name" },
  { Value: "NameEnglish", Text: "Name English" },
  { Value: "NameHindi", Text: "Name Hindi" },

];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
DepartmentMenuClassificationPermission: PermissionModel = this._commonService.GetPagePermission(
  "/department-website/section-master",
  "/department-website/section-master/add",
  "",
  "/department-website/section-master/update"
);

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _sectionMasterService: SectionMasterService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
) {
  this.DepartmentMenuClassificationPermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Section master List:",
        "add",
        "Add",
        "/department-website/section-master/add"
      )
    : this._parentComponent.setpagelayout("Section master List:");
  this.indexModel = new IndexModel();
}

//#endregion

//#region << Method >>

ngOnInit() {
  this.GetList();
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;

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
}

GetList() {
  
  this.indexModel.PageSize=101;
  this._sectionMasterService.GetList(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <SectionMasterModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<SectionMasterModel>(
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
  this._sectionMasterService.ChangeActiveStatus(id).subscribe(
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
  this.indexModel.AdvanceSearchModel={"DepartmentCode": this.departmentCode,"MenuClassificationCode": this.menuClassificationCode }
  this.GetList();
}

Reset() {
  this.indexModel = new IndexModel();
  this.departmentCode="";
  this.menuClassificationCode="";
  this.GetList();
}
//#endregion
}
