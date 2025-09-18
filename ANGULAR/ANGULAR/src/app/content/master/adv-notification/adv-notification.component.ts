import { CommonService } from 'src/app/Shared/Service/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { advNotificationListModel } from 'src/app/Shared/Model/Master/advnotification.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { AdvnotificationService } from 'src/app/Shared/Service/advnotification.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-adv-notification',
  templateUrl: './adv-notification.component.html',
  styleUrls: ['./adv-notification.component.css']
})
export class AdvNotificationComponent implements OnInit {
  advNotificationList: advNotificationListModel[];
  dataSource: any;
  displayedColumns: string[] = ['index', 'Name', 'Email', 'MobileNo','IsActive','Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: ' Name ' }, { Value: 'Email', Text: 'Email' }, { Value: 'MobileNo', Text: 'Mobile Number' }];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/advnotification", "/master/advnotification/add", "/master/advnotification/detail", "/master/advnotification/update", "/master/advnotification/delete");
  indexModel: IndexModel;
  totalRecords: number;

  constructor(
    private readonly _advnotificationService: AdvnotificationService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService,
  ) {

    this.Permission.AddPageAccess ? this._parentApi.setpagelayout("Advertisement Notification List :", "add", "Create", "master/advAddUpdatenotification") : this._parentApi.setpagelayout("Advertisement Notification List :");

    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }


  onPaginateChange(event) {
    this.indexModel.IsPostBack = true;
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.GetList();
  }

  SortData(event) {
    this.indexModel.IsPostBack = true;
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.GetList();
  }


  GetList() {
    this._advnotificationService.GetList(this.indexModel).subscribe(
      data => {
        ;
        if (data.IsSuccess) {
          
          this.advNotificationList = <advNotificationListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<advNotificationListModel>(
            this.advNotificationList
          );
          if (!this.indexModel.IsPostBack) {
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

  OnDelete(Id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._advnotificationService.DeleteAdvNotification(Id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this.GetList();
              this._alertService.success(data.Message);

            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    });
  }


  OnActiveStatus(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {

          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose:true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {

            if (result) {

              this._advnotificationService.ChangeActiveStatus(id).subscribe(
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

}
