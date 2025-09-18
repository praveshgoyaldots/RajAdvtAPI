import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildPageMasterViewModel, ChildPageFilterModel } from 'src/app/Shared/Model/Master/child-page-master.model';
import { ColumnHeaderModel, DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { ChildPageMasterService } from 'src/app/Shared/Service/child-page-master.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-child-page-master',
  templateUrl: './child-page-master.component.html',
  styleUrls: ['./child-page-master.component.css']
})

export class ChildPageMasterComponent implements OnInit {
  //#region <Variable>

  listModel: ChildPageMasterViewModel[];
  dataSource: any;
  displayedColumns: string[] = ["index", "PageTypeName", "ApplicationTitle", "PageTitle", "ManualType",
    "PageDescriptionCategoryName", "Description", "IsActive", "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "PageDescriptionCategoryName", Text: "Description Category" },
    { Value: "ApplicationTitle", Text: "Application" },
    { Value: "PageTitle", Text: "Page" },
    { Value: "ManualType", Text: "Manual Type" },
    { Value: "PageTypeName", Text: "Page Type" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/childpagemaster", "/master/childpagemaster/add", "", "/master/childpagemaster/edit");
  totalRecords: number;
  dDLList: DDLModel;
  ddlPageMasterDetails: DdlItemModel[] = [];
  indexModel: ChildPageFilterModel = new ChildPageFilterModel();
  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    private readonly _childPageMasterService: ChildPageMasterService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog
  ) {
    this.Permission.AddPageAccess
      ? this._parentApi.setpagelayout("Child Page Master List:", "add", "Create", "master/childpagemaster-addupdate")
      : this._parentApi.setpagelayout("Child Page Master List:");
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    //this.GetList();
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ChildPageMasterDDLKey).subscribe(
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

  getPageByPageType(code = 0, applicationCode = '') {
    this._commonService.GetPageMasterByPageTypeCode(code, applicationCode).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlPageMasterDetails = <DdlItemModel[]>data.Data;
        }
      }, error => {
        this._alertService.error(error.message);
      });
  }

  clearClick() {
    this.indexModel = new ChildPageFilterModel();
    this.GetList();
  }

  GetList() {
    this._childPageMasterService.GetList(this.indexModel).subscribe(data => {
      if (data.IsSuccess) {
        this.listModel = <ChildPageMasterViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<ChildPageMasterViewModel>(this.listModel);
        this.dataSource.paginator = this.paginator;
        this.totalRecords = data.Data.TotalRecords;
        this.dataSource.sort = this.sort;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.GetList();
  }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.GetList();
  }

  onActiveStatus(id) {
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {
          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose: true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this._childPageMasterService.ChangeActiveStatus(id).subscribe(
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

  //#endregion <Method>
}
