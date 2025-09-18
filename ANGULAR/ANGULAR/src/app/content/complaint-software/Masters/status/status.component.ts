import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from "src/app/app.component";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { PermissionModel, IndexModel } from "src/app/Shared/Model/general-model";
import { ChangeStatus, ComplainStatusMasterViewModel } from "src/app/Shared/Model/Master/complain-status-master-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { ComplainStatusMasterService } from "src/app/Shared/Service/complain-status-master.service";
import { AddUpdateStatusComponent } from "./add-update-status/add-update-status.component";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { UserViewModel } from "src/app/Shared/Model/user-model";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  //#region Variable
  loginData: UserViewModel;
  listModel: ComplainStatusMasterViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'Name', 'NameHindi', 'IsAdmAction', 'IsDevAction', 'IsUserAction', 'IsAdmFilter', 'IsDevFilter', 'IsUserFilter', 'SMSContent', 'NoOfDaysForAutoClose', 'IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Status Name' }, { Value: 'NameHindi', Text: 'Status Name In Hindi' }, { Value: 'SMSContent', Text: 'SMS Content' }, { Value: 'NoOfDaysForAutoClose', Text: 'No Of Days For Auto Close' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/compliant/master/status", "/compliant/master/status/add", "", "/compliant/master/status/edit", "");
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion
  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _authService: AuthenticationService,
    private readonly _complainStatusMasterService: ComplainStatusMasterService) {
    this._parentApi.setpagelayout("", "", "", "", true);
    this.indexModel = new IndexModel();

  }
  //#endregion

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetList();
  }


  GetList() {
    this._complainStatusMasterService.GetList(this.indexModel).subscribe(
      data => {
        if ((data.IsSuccess)) {
          this.listModel = <ComplainStatusMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<ComplainStatusMasterViewModel>(this.listModel);
          console.log(this.listModel)
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
    const _dialogRef = this._dialog.open(AddUpdateStatusComponent, {
      width: "50%",
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
          const _dialogRef = this._dialog.open(ConfirmationDialogComponent, {
            width: "50%",
            data: GlobalMessagesModel.ConfirmStatusChanged
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {

              this._complainStatusMasterService.ChangeActiveStatus(id).subscribe(
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
  OnActionStatusClick(id, userType, actionType) {
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {
          const _dialogRef = this._dialog.open(ConfirmationDialogComponent, {
            width: "50%",
            data: GlobalMessagesModel.ConfirmStatusChanged
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              let changeStatus = new ChangeStatus();
              changeStatus.Id = id;
              changeStatus.UserType = userType;
              changeStatus.ActionType = actionType;
              changeStatus.UserId = this.loginData.UserId;
              this._complainStatusMasterService.ChangeStatus(changeStatus).subscribe(
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
