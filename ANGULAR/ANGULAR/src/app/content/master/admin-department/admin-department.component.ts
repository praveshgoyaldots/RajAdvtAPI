import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { AddUpdateAdminDepartmentComponent } from './add-update-admin-department/add-update-admin-department.component';
import { AdminDepartmentService } from 'src/app/Shared/Service/admin-department.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AdminDepartmentMasterViewModel } from 'src/app/Shared/Model/Master/admin-department.model';

@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.css']
})
export class AdminDepartmentComponent implements OnInit {


  //#region Variable
  listModel: AdminDepartmentMasterViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'AdmDepartmentTitle', 'AdmDepartmentTitleHindi','AdmDepartmentIsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'AdmDepartmentTitle', Text: 'Admin Department Name' }, { Value: 'AdmDepartmentTitleHindi', Text: 'Admin Department Name In Hindi' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/AdminDepartment", "/master/AdminDepartment/add", "","/master/AdminDepartment/edit","");
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion
  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _adminDepartmentService: AdminDepartmentService) {
      this._parentApi.setpagelayout("CC Category:", "", "", "", true);
      this.indexModel = new IndexModel();

    }
    //#endregion

  ngOnInit() {
    this.GetList();
  }


  GetList() {

    this._adminDepartmentService.GetList(this.indexModel).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.listModel = <AdminDepartmentMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<AdminDepartmentMasterViewModel>(this.listModel);
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  OpenDialog(Id) {

    const _dialogRef = this._dialog.open(AddUpdateAdminDepartmentComponent, {
      width: "500px",
      data: Id,
      disableClose:true
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.GetList();
      }
    });
  }


  OnStatusClick(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {

          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose:true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {

            if (result) {

              this._adminDepartmentService.ChangeActiveStatus(id).subscribe(
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
        }else{
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
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
  //#endregion


}
