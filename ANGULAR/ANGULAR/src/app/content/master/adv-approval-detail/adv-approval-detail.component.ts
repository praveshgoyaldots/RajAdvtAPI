import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvapprovaldetailService } from 'src/app/Shared/Service/advapprovaldetail.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { advNotificationListModel } from 'src/app/Shared/Model/Master/advnotification.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-adv-approval-detail',
  templateUrl: './adv-approval-detail.component.html',
  styleUrls: ['./adv-approval-detail.component.css']
})
export class AdvApprovalDetailComponent implements OnInit {
  advApprovalDetailList: advNotificationListModel[];
  dataSource: any;
  displayedColumns: string[] = ['index', 'Name', 'NameHindi', 'Email', 'IsActive','Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: ' Name ' }, { Value: 'NameHindi', Text: ' Name in Hindi ' }, { Value: 'Email', Text: 'Email' }];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission("/advapprovaldetail", "/advapprovaldetail/add", "/advapprovaldetail/detail", "/advapprovaldetail/update", "/advapprovaldetail/delete");
  indexModel: IndexModel;
  totalRecords: number;
  constructor(private readonly _advapprovaldetailService: AdvapprovaldetailService,
    private readonly _commonService: CommonService,
     private readonly _alertService: AlertService,
      private _parentApi: AppComponent,
      private _dialog: MatDialog, ) {



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
    this._advapprovaldetailService.GetList(this.indexModel).subscribe(
      data => {

        if (data.IsSuccess) {
          
          this.advApprovalDetailList = <advNotificationListModel[]>data.Data.Data;
          if (this.advApprovalDetailList.length>0) {
            this._parentApi.setpagelayout("Advertisement Approval Detail List :", "", "", "");
          }else{
            this.Permission.AddPageAccess ? this._parentApi.setpagelayout("Advertisement Approval Detail List :", "add", "Create", "master/advAddUpdateapprovaldetail") : this._parentApi.setpagelayout("Advertisement Approval Detail List :");

          }
          this.dataSource = new MatTableDataSource<advNotificationListModel>(
            this.advApprovalDetailList
          );
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
          }
        }else{
          this._parentApi.setpagelayout("Advertisement Approval Detail List :", "", "", "");
        }
      },
      error => {
        this._alertService.error(error.message);
        this._parentApi.setpagelayout("Advertisement Approval Detail List :", "", "", "");
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
        this._advapprovaldetailService.DeleteAdvApprovalDetail(Id).subscribe(
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

              this._advapprovaldetailService.ChangeActiveStatus(id).subscribe(
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

//   OnActiveStatus(Id) {

//     const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
//       width: '350px',
//       data: "Do you sure! want to Update this record?",
//       disableClose: true
//     });
//     dialogRef.afterClosed().subscribe(result => {

//       if (result) {
//         this._advapprovaldetailService.ChangeActiveStatus(Id).subscribe(
//           data => {

//             if (
//               (data.IsSuccess)
//             ) {
//               
//               this.GetList();
//               this._alertService.success(data.Message);

//             }
//           },
//           error => {
//             this._commonService.ScrollingTop();
//             this._alertService.error(error.message);
//           }
//         );
//       }
//     });

//   }




}
