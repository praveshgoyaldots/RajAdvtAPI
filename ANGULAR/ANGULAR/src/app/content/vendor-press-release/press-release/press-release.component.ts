import { MatTableDataSource, MatPaginator, MatSort, MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PressReleaseFilterModel, PressReleaseListModel } from 'src/app/Shared/Model/TenderPressRelease/press-release-model';
import { ColumnHeaderModel, DdlItemModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { PressReleaseService } from 'src/app/Shared/Service/TenderPressRelease/press-release.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: 'app-press-release',
  templateUrl: './press-release.component.html',
  styleUrls: ['./press-release.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class PressReleaseComponent implements OnInit {
//#region << Variable >>
listModel: PressReleaseListModel[];
dataSource: MatTableDataSource<PressReleaseListModel>;
displayedColumns: string[] = [
  "index",
  "Id",
  "CreatedDate",
  // "CategoryNameEnglish",
// "SubCategoryNameEnglish",
  // "DIPR_Id",
  "DepartmentTitle",
  "DistrictName",
  "Description",
  "Status",
"ModifiedByName",

  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  // { Value: "Id", Text: "Our Entry NO." },
  // { Value: "DIPR_Id", Text: "Entry NO. of DIPR" },
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "Description", Text: "Subject" },
  // { Value: "CategoryNameEnglish", Text: "Category Name " },
  // { Value: "SubCategoryNameEnglish", Text: "Sub-Category Name" },

  // { Value: "DistrictName", Text: "District" }
];

searchColumns: ColumnHeaderModel[] = [
  // { Value: "Id", Text: "Our Entry NO." },
  { Value: "DIPR_Id", Text: "Entry NO. of DIPR" },
  { Value: "DepartmentTitle", Text: "Department" },
  { Value: "DistrictName", Text: "District" }
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: PressReleaseFilterModel;
totalRecords: number;
PressReleasePermission: PermissionModel = this._commonService.GetPagePermission(
  "/tender-press-release/press-release",
  "/tender-press-release/press-release/add",
  "",
  "/tender-press-release/press-release/update"
);
parameterCategoryCode: number;
dDLList: DDLModel;
ddlDepartment: UserDepartmentViewModel[];
ddlParticipant: DdlItemModel[];
isShow = true;
selectedDepartmentAll = -1;
toggleDisplay() {
  this.isShow = !this.isShow;
}
loginData: UserViewModel;
ddlEntryTypeMaster: DdlItemModel[];
//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _PressReleaseService: PressReleaseService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
) {
  this.PressReleasePermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Press Release/Social Media List:",
        "add",
        "Add",
        "/tender-press-release/press-release/add"
      )
    : this._parentComponent.setpagelayout("Press Release/Social Media  List:");
  this.indexModel = new PressReleaseFilterModel();

  if (sessionStorage.getItem("PressReleaseSearch")) {
    this.isShow=false;
    this.indexModel = <PressReleaseFilterModel>(
      JSON.parse(sessionStorage.getItem("PressReleaseSearch"))
    );

    if (this.indexModel.CategoryCode) {
      this.GetJankalyanEntryTypebyDepartmentCode("",this.indexModel.CategoryCode);
    }
    if (this.indexModel.VipCategory) {
      this.getParticipantList(this.indexModel.VipCategory);
    }

    this.GetList();
  }

}

//#endregion

//#region << Method >>

ngOnInit() {
  // this.GetList();

   this.GetDDLList();
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  this.getDepartment();
}

GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.PressReleaseDDLKey).subscribe(
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

getParticipantList(code) {
  
  if (code) {
    this._commonService.GetVIPPersonListOfPressRelease(code).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlParticipant = data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  } else {
    this.ddlParticipant = [];
  }
}

GetJankalyanEntryTypebyDepartmentCode(DepartmentCode: string,category) {
  
  if (DepartmentCode||category) {
    this._commonService
      .GetJankalyanEntryTypebyDepartmentCode(String(DepartmentCode),Number(category))
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.ddlEntryTypeMaster = data.Data as DdlItemModel[];
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  } else {
    // this.model.WebsiteName = null;
  }
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

GetList() {

  
  this._PressReleaseService.GetList(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <PressReleaseListModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<PressReleaseListModel>(
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

statusClick(id) {
  this._PressReleaseService.ChangeActiveStatus(id).subscribe(
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


getActiveDeActiveData(data) {
  this.indexModel.Status = data;
  //this.GetList();
}

getEnglishName(name) {
  return name.replace("Collectorate,", "");
}

Reset() {
  this.indexModel = new PressReleaseFilterModel();
  // this.getList();
}


searchClick() {
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
  if (this.indexModel.PressReleaseToDate) {
    let uTCDate = new Date(
      Date.UTC(
        new Date(this.indexModel.PressReleaseToDate).getFullYear(),
        new Date(this.indexModel.PressReleaseToDate).getMonth(),
        new Date(this.indexModel.PressReleaseToDate).getDate()
      )
    ).toISOString();
    this.indexModel.PressReleaseToDate = uTCDate;
  }
  if (this.indexModel.PressReleaseFromDate) {
    let uTCDate = new Date(
      Date.UTC(
        new Date(this.indexModel.PressReleaseFromDate).getFullYear(),
        new Date(this.indexModel.PressReleaseFromDate).getMonth(),
        new Date(this.indexModel.PressReleaseFromDate).getDate()
      )
    ).toISOString();
    this.indexModel.PressReleaseFromDate = uTCDate;
  }
  this.indexModel.Page=1;

  if (this.indexModel.DeptValue) {
    this.indexModel.DepartmentCode = String(this.indexModel.DeptValue);
  }
  if (this.indexModel.DistValue) {
    this.indexModel.DistrictCode = String(this.indexModel.DistValue);
  }
  if (this.indexModel.VipCategory) {
    this.indexModel.VIPCategoryCode = String(this.indexModel.VipCategory);
  }
  if (this.indexModel.VipPerson) {
    this.indexModel.VIPPersonCode = String(this.indexModel.VipPerson);
  }
  this.GetList();
   sessionStorage.setItem("PressReleaseSearch", JSON.stringify(this.indexModel));
}

clearClick() {
  this.indexModel = new PressReleaseFilterModel();
  this.listModel =[];
  this.dataSource = new MatTableDataSource<PressReleaseListModel>(
    this.listModel
  );
  this.totalRecords=0;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  sessionStorage.removeItem("PressReleaseSearch");
}

// selectDepartmenttAll() {
//   if (this.selectedDepartmentAll < 0) {
//     this.model.PressReleaseDepartmentMappingList = this.ddlDepartment.map(
//       function(a) {
//         return String(a.DepartmentCode);
//       }
//     );
//     this.selectedDepartmentAll = 1;
//   } else {
//     this.selectedDepartmentAll = -1;
//     this.model.PressReleaseDepartmentMappingList = [];
//   }
// }

//#endregion
}
