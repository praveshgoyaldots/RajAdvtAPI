import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { OrderEntryService } from 'src/app/Shared/Service/orderentry.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ComplaintService } from 'src/app/Shared/Service/complaint.service';
import {  CompliantSearchModel, ComplaintEntryListModel } from 'src/app/Shared/Model/complaint.model';
import { ColumnHeaderModel, DdlItemModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CompliantEnum } from 'src/app/Shared/Enum/compliant.enum';
import { CompliantActionDialogComponent } from './compliant-action-dialog/compliant-action-dialog.component';
import { JsonPipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';


@Component({
  selector: 'app-complaint-software',
  templateUrl: './complaint-software.component.html',
  styleUrls: ['./complaint-software.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class ComplaintSoftwareComponent implements OnInit {

  //#region  // Variable //
  dDLList: DDLModel;
  listModel: ComplaintEntryListModel[];
  indexModel: CompliantSearchModel;
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  totalRecords: number;
  compliantEnum = CompliantEnum;
  displayedColumns: string[] = [
    "index",
    "Description",
    "ScreenURL",
    "StatusName",
    "EntryTypeName",

    "ApplicationTitle",
    "PermissionTitle",
    "UserDetail",
    "PriorityId",
    "Attachments",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    //{ Value: "StatusName", Text: "Status" },
    { Value: "EntryTypeName", Text: "Entry Type" },
    { Value: "ApplicationTitle", Text: "Application" },
    { Value: "PermissionTitle", Text: "Page" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  statusId: string[] = [];
  Permission: PermissionModel = this._commonService.GetPagePermission("/compliant", "compliant/create", "compliant/detail", "compliant/update", "compliant/delete");
  //#endregion
  // searchModel = new CompliantSearchModel();
  searchModel = this._commonService.modelSetGet(new CompliantSearchModel()) as CompliantSearchModel;
  isShow = true;
  selectedAllStatus: boolean = false;
  constructor(
    private _parentApi: AppComponent,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private readonly _dialog: MatDialog,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
    private _route: ActivatedRoute,
    private _complaintService: ComplaintService
  ) {
    this._parentApi.setpagelayout('Suggestion-Feedback :', "add", "Add", "/compliant/compliantListAddUpdate");
   // this.searchModel = new CompliantSearchModel();
   }

  ngOnInit() {
    if (this.searchModel.StatusId == null) {
      this.statusId = ['2'];
    }
    this.GetList();
    this.GetDDLList();

  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ComplaintFilterDDLKey).subscribe(
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

  GetList() {
    if (this.statusId.length > 0) {
      //this.searchModel.indexModel.AdvanceSearchModel = { StatusIds: JSON.stringify(this.statusId) };
      this.searchModel.StatusId = this.statusId.toString();
    }
    this.statusId = this.searchModel.StatusId ? this.searchModel.StatusId.toString().split(",") : this.statusId;

    this._complaintService.GetList(this._commonService.modelSetGet(this.searchModel, true)).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.listModel = <ComplaintEntryListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<ComplaintEntryListModel>(
            this.listModel
          );

          this.totalRecords = data.Data.TotalRecords;
          if (!this.searchModel.indexModel.IsPostBack) {
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

  getAbsalutePath(url) {
    return environment.ApiBaseUrl + url.replace("~/", "").trim();
 }

  sortData(event) {
    this.searchModel.indexModel.OrderBy = event.active;
    this.searchModel.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.searchModel.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {
    this.searchModel.indexModel.Page = event.pageIndex + 1;
    this.searchModel.indexModel.PageSize = event.pageSize;
    this.searchModel.indexModel.IsPostBack = true;
    this.GetList();
    this.searchModel = this._commonService.modelSetGet(this.searchModel, true)
  }

  OpenDialog(id) {
    const dialogRef = this._dialog.open(CompliantActionDialogComponent, {
      width: '500px',
      data: id
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.GetList();
      }
    });
  }
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  Reset() {
    this.statusId = [];
    this.searchModel = new CompliantSearchModel();
    this.GetDDLList();
    this.GetList();
    this.searchModel = this._commonService.modelSetGet(this.searchModel, true)
  }

  selectAllStatus() {
    if (this.selectedAllStatus) {
      this.statusId = [];
      this.statusId = this.dDLList.ddlCompliantFilter.map(function (a) {
        return String(a.Value);
      });
    } else {
      this.statusId = [];
    }
    this.selectedAllStatus = !this.selectedAllStatus;
  }
  Search() {
    this.searchModel.indexModel = new IndexModel();
    this.GetList();
    this.searchModel = this._commonService.modelSetGet(this.searchModel, true)
  }
}
