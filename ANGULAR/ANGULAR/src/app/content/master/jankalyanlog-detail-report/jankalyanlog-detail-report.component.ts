import { CommonService } from 'src/app/Shared/Service/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JankalyanUserLogDetailReportModel, JankalyanLogSearchModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { MatTableDataSource, MatPaginator, MatSort, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { DDLModel, ColumnHeaderModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AppComponent } from 'src/app/app.component';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { UserDistrictViewModel, UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { DatePipe } from '@angular/common';
import { UserTypeService } from 'src/app/Shared/Service/user-type.service';
import { UserTypeModel } from 'src/app/Shared/Model/user-type.model';

@Component({
  selector: 'app-jankalyanlog-detail-report',
  templateUrl: './jankalyanlog-detail-report.component.html',
  styleUrls: ['./jankalyanlog-detail-report.component.css'],
  providers: [DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})
export class JankalyanlogDetailReportComponent implements OnInit {

  listModel: JankalyanUserLogDetailReportModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "UserName",
    "IPAddress",
    "SSOID",
    // "UserType",
    "DepartmentNames",
    "UserTypeTitle",
    "LoginTime"
  ];

  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "UserName", Text: "User Name" },
    { Value: "IPAddress", Text: "IP Address" },
    { Value: "SSOID", Text: "SSOID" },
    { Value: "UserTypeTitle", Text: "User Type" },
    { Value: "DepartmentNames", Text: "Department Name" },
    // { Value: "ViewCount", Text: "UserTypeTitle" },

   ];
   totalRecords: number;
   indexModel: JankalyanLogSearchModel;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ddlDepartment: UserDepartmentViewModel[] = [];
  dDLList: DDLModel;
  loginData: UserViewModel;
  ddlDistrict: UserDistrictViewModel[];
  ddlUserType: DdlItemModel[] = [];
  constructor(
    private readonly _alertService: AlertService,
    private readonly _jankalyanlogService: JankalyanlogService,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _userTypeService: UserTypeService
  ) {
    this._parentComponent.setpagelayout("Login Log Detail Report :", "", "", "");
    this.indexModel = new JankalyanLogSearchModel();
    this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
    this.dDLList = new DDLModel();
   }

  ngOnInit() {
    this.getDistrict();
    this.getDepartment();
    this.getDownLevelUserType();
  }

  GetList() {
    
    this._jankalyanlogService.GetJankalyanUserLogDetailReport(this.indexModel).subscribe(
      data => {
        
        if (data.IsSuccess)
         {
          this.listModel = <JankalyanUserLogDetailReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<JankalyanUserLogDetailReportModel>(this.listModel);
          if (this.indexModel.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;

          }
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
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;

        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }


  getOfficeList(code) {
    
    if (code) {
      this._commonService.GetOfficeList(code).subscribe(
        (data) => {
          if (data.IsSuccess) {
            
            this.dDLList.ddlOffice = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  getDistrict() {

    this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }


  getDownLevelUserType() {
    this._userTypeService
      .GetDownLevelUserType(this.loginData.UserType)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            const usertypes = <UserTypeModel[]>data.Data;

            usertypes.forEach((element) => {
              this.ddlUserType.push({
                Value: element.UserType,
                Text: element.UserTypeTitle,
              });
            });
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }



  searchClick() {
    
    if (this.indexModel.FromDate) {
      const uTCFromDate = new Date(
        Date.UTC(
          new Date(this.indexModel.FromDate).getFullYear(),
          new Date(this.indexModel.FromDate).getMonth(),
          new Date(this.indexModel.FromDate).getDate()
        )
      ).toISOString();
      this.indexModel.FromDate = uTCFromDate;
    }

    if (this.indexModel.ToDate) {
      const uTCToDate = new Date(
        Date.UTC(
          new Date(this.indexModel.ToDate).getFullYear(),
          new Date(this.indexModel.ToDate).getMonth(),
          new Date(this.indexModel.ToDate).getDate()
        )
      ).toISOString();
      this.indexModel.ToDate = uTCToDate;
    }

    this.GetList();
  }

  clearClick() {
    
    this.indexModel = new JankalyanLogSearchModel();
    this.indexModel.FromDate = null;
    this.indexModel.ToDate = null;
    //this.GetList();
    this.dataSource = null;
    this.listModel = null;
  }

  SearchByKeyword(event) {
    
    this.GetList();
  }


print() {
  let printContents , popupWin ;
  printContents = document.getElementById("test").outerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
     popupWin.document.write(`
      <html>
        <head>
          <title>Summary Report</title>
            <style>
            table th,table td{
              border: 1px solid black;
            }
            table{
              border-collapse: collapse;
            }
            span{
              font-weight: bold;
              margin-bottom: 10px;
            }
            </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
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


}
