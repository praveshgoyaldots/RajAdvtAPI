import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JankalyanSummaryReportModel, JankalyanSummarySearchModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { DDLModel, ColumnHeaderModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserTypeService } from 'src/app/Shared/Service/user-type.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DepartmentCategoryEnum } from 'src/app/Shared/Enum/Common.enum';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';

@Component({
  selector: 'app-jankalyan-summery-reportforall-module',
  templateUrl: './jankalyan-summery-reportforall-module.component.html',
  styleUrls: ['./jankalyan-summery-reportforall-module.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class JankalyanSummeryReportforallModuleComponent implements OnInit {

  //#region  Variable
  listModel: JankalyanSummaryReportModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "ModuleName",
    "TotalCount"
    ];
  totalModuleCount: number;
  // ViewdisplayedColumns: ColumnHeaderModel[] = [
  //   { Value: "UserName", Text: "User Name" },
  //   { Value: "SSOID", Text: "SSOID" }
  //   ];
   totalRecords: number;
   indexModel: JankalyanSummarySearchModel;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ddlDepartment: DdlItemModel[] = [];
  loginData: UserViewModel;
  dDLList: DDLModel;
  departmentCategoryEnum = DepartmentCategoryEnum;
  ddlAdminDepartment: UserDepartmentViewModel[];
  //#endregion

   //#region  Constructor
   constructor(
    private readonly _alertService: AlertService,
    private readonly _jankalyanlogService: JankalyanlogService,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _userTypeService: UserTypeService
  ) {
    
    this._parentComponent.setpagelayout("Jankalyan Summary Report For All Module:", "", "", "");
    this.indexModel = new JankalyanSummarySearchModel();
    this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
   }

  //#endregion

   //#region  Method
   ngOnInit() {
   // this.getDepartment();
   this.GetDDLList();
    this.indexModel.Status = 1;
   // this.indexModel.DepartmentCategoryCode = String(DepartmentCategoryEnum.Category);
    this.indexModel.DepartmentCategoryCode=String(0);
    this.GetList();
    this.getDepartment();
    //this.GetDepartmentByDepartmentCategory(String(DepartmentCategoryEnum.Category),0);
  }

  GetList() {
    this._jankalyanlogService.GetJankalyanSummaryReport(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <JankalyanSummaryReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<JankalyanSummaryReportModel>(this.listModel);
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
            this.getTotalCost();
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDepartmentByDepartmentCategory(code,admCode) {
    
   if (code ||admCode) {
     this.indexModel.DepartmentCode=0;
    this._commonService
    .GetDepartmentByDepartmentCategory(code,admCode)
    .subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlDepartment = <DdlItemModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
   } else {
    this.ddlDepartment = [];
   }
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForAllModuleReport)
      .subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.dDLList = <DDLModel>data.Data;
            // if (data.Data.ddlDepartmentCategory[0].Value) {
            //   this.indexModel.DepartmentCategoryCode = data.Data.ddlDepartmentCategory[0].Value;
            //   this.GetList();
            // }
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          let temp = <UserDepartmentViewModel[]>data.Data;
          this.ddlAdminDepartment = <UserDepartmentViewModel[]>(
            temp.filter(
              (UserDepartmentViewModel, i, arr) =>
                arr.findIndex(
                  (t) =>
                    t.AdmDepartmentCode ===
                    UserDepartmentViewModel.AdmDepartmentCode
                ) === i
            )
          );
          if (this.ddlAdminDepartment) {
            this.ddlAdminDepartment = this.ddlAdminDepartment.sort((a, b) => {
              return this._commonService.compare(
                a.AdmDepartmentTitle,
                b.AdmDepartmentTitle,
                true
              );
            });
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  // getDepartment() {
  //   this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
  //     (data) => {
  //       if (data.IsSuccess) {
  //         this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
  //        }
  //     },
  //     (error) => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

  getTotalCost() {
    this.totalModuleCount= this.listModel.map(t => t.TotalCount).reduce((acc, value) => acc + value, 0);
  }

  getActiveDeActiveData(data) {
    
    this.indexModel.Status = data;
    this.GetList();
  }

  searchClick() {
    if (this.indexModel.EntryFromDate) {
      const uTCFromDate = new Date(
        Date.UTC(
          new Date(this.indexModel.EntryFromDate).getFullYear(),
          new Date(this.indexModel.EntryFromDate).getMonth(),
          new Date(this.indexModel.EntryFromDate).getDate()
        )
      ).toISOString();
      this.indexModel.EntryFromDate = uTCFromDate;
    }

    if (this.indexModel.EntryToDate) {
      const uTCToDate = new Date(
        Date.UTC(
          new Date(this.indexModel.EntryToDate).getFullYear(),
          new Date(this.indexModel.EntryToDate).getMonth(),
          new Date(this.indexModel.EntryToDate).getDate()
        )
      ).toISOString();
      this.indexModel.EntryToDate = uTCToDate;
    }

    this.GetList();
  }

  clearClick() {
    this.indexModel = new JankalyanSummarySearchModel();
    this.indexModel.Status = 1;
    this.indexModel.DepartmentCategoryCode=String(0);
    this.GetList();
  }

  //#endregion

}
