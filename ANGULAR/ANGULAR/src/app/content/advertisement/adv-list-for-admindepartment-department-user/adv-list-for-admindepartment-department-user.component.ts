import { FAQModel } from 'src/app/Shared/Model/scheme-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvListForAdmindeptDptPlatformUserModel } from 'src/app/Shared/Model/advertisement.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { IndexModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-adv-list-for-admindepartment-department-user',
  templateUrl: './adv-list-for-admindepartment-department-user.component.html',
  styleUrls: ['./adv-list-for-admindepartment-department-user.component.css'],
  providers: [AdvertisementService]
})
export class AdvListForAdmindepartmentDepartmentUserComponent implements OnInit {
  listModel: AdvListForAdmindeptDptPlatformUserModel[];

  dataSource: any;
  displayedColumns: string[] ;//= ['index', 'SubjectEng', "DocumentUrl", 'RequestedStatus', 'IsApprovedStatus', 'IsUploadedStatus', 'Action'];
  // ViewdisplayedColumns: ColumnHeaderModel[] = [
  //   { Value: "SubjectEng", Text: "Subject English" },
  //   { Value: "RequestedStatus", Text: "Requested Status" },
  //   { Value: "IsApprovedStatus", Text: "IsApproved" },
  //   { Value: "IsUploadedStatus", Text: "IsUploaded" }
  // ];

  columnsToDisplay: string[]; // = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  indexModel: IndexModel;
  totalRecords: number;
  uploadedId: number;
  isApprovalUser: boolean=false;
  constructor(
    private readonly _advertisementService: AdvertisementService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private readonly _dialog: MatDialog
  ) {
    this._parentApi.setpagelayout(
      'Advertisement List For Users :', '', '', '');
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }

  IsExpired(date: Date) {
    if (date) {
      if (new Date(date).getTime() < new Date().getTime()) {
        return true;
      } else {
        return false;
      }
    }
  }

  downloadPdf(Url) {
    const downloadLink = document.createElement('a');
    downloadLink.href = Url;
    downloadLink.download = 'Adv-Image';
    downloadLink.click();
  }

  GetList() {
    this._advertisementService.GetAdvListForAdminDepartmentDepartmentPlatformUser(this.indexModel).subscribe(
      data => {

        if (data.IsSuccess) {
          this.listModel = <AdvListForAdmindeptDptPlatformUserModel[]>data.Data.Data;
          if (this.listModel.length>0) {
            this.isApprovalUser = this.listModel[0].IsApprovalUserOrNot;
            if (this.isApprovalUser) {
              this.displayedColumns= ['index', 'SubjectEng', "DocumentUrl",'Expired', 'RequestedStatus', 'IsApprovedStatus', 'IsUploadedStatus', 'Action'];
            }else{
              this.displayedColumns= ['index', 'SubjectEng', "DocumentUrl",'Expired', 'IsUploadedStatus', 'Action'];
            }
            this.columnsToDisplay = this.displayedColumns.slice();
          }


          this.dataSource = new MatTableDataSource<AdvListForAdmindeptDptPlatformUserModel>(this.listModel);
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

  SortData(event) {
    this.indexModel.IsPostBack = true;
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;

    this.GetList();
  }

  onPaginateChange(event) {

    this.indexModel.IsPostBack = true;
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;

    this.GetList();
  }

  UploadedClick(id) {
    this.uploadedId = id;
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure! You have uploaded this advertisement on your portal'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._advertisementService.UploadedService(this.uploadedId).subscribe(
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
  }



}
