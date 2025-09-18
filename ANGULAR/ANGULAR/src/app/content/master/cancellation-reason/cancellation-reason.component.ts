import { PermissionModel, IndexModel } from './../../../Shared/Model/general-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CancellationReasonViewModel } from 'src/app/Shared/Model/Master/cancellation-reason-master.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router } from '@angular/router';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { CancellationReasonService } from 'src/app/Shared/Service/cancellation-reason.service';
import { ReasonAddUpdateDialogComponent } from './reason-add-update-dialog/reason-add-update-dialog.component';

@Component({
  selector: 'app-cancellation-reason',
  templateUrl: './cancellation-reason.component.html',
  styleUrls: ['./cancellation-reason.component.css']
})
export class CancellationReasonComponent implements OnInit {


  //#region Variable
  listModel: CancellationReasonViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'Name', 'NameHindi', 'IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Name' }, { Value: 'NameHindi', Text: 'Name In Hindi' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/cancellationreason", "/cancellationreason/add", "", "/cancellationreason/update");
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion

  //#region constructor
  constructor(private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _cancellationReasonService: CancellationReasonService) {
    this._parentApi.setpagelayout("CC Category:", "", "", "", true);
    this.indexModel = new IndexModel();

  }
  //#endregion

  //#region  Method

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    this._cancellationReasonService.GetList(this.indexModel).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.listModel = <CancellationReasonViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<CancellationReasonViewModel>(this.listModel);
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

    const _dialogRef = this._dialog.open(ReasonAddUpdateDialogComponent, {
      width: "500px",
      data: Id,
      disableClose: true
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
            disableClose: true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {

            if (result) {

              this._cancellationReasonService.UpdateStatus(id).subscribe(
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
