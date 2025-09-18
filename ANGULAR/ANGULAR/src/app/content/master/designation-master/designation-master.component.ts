import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { AddUpdateDesignationMasterComponent } from './add-update-designation-master/add-update-designation-master.component';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { DesignationMasterViewModel } from 'src/app/Shared/Model/Master/DesignationMaster.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { DesignationMasterService } from 'src/app/Shared/Service/designation-master.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit {

//#region  Variable's
listModel: DesignationMasterViewModel[];
dataSource: any;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
id: number;
displayedColumns: string[] = ['index', 'Name', 'NameHindi','Code','DisplayOrder','IsActive', 'Action'];
ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Name' },{ Value: 'NameHindi', Text: 'Name In Hindi' },{ Value: 'Code', Text: 'Short Name' },{Value:'DisplayOrder',Text:'Display Order'}];
columnsToDisplay: string[] = this.displayedColumns.slice();
Permission: PermissionModel = this._commonService.GetPagePermission("/designationmaster", "/designationmaster/add", "", "/designationmaster/update");
indexModel: IndexModel;
totalRecords: number;
//#endregion

//#region Constructor
constructor(
private readonly _alertService: AlertService,
  private readonly _parentApi: AppComponent,
  private readonly _dialog: MatDialog,
  private readonly _commonService: CommonService,
  private readonly _router: Router,
  private readonly _designationMasterService: DesignationMasterService
) {
this._parentApi.setpagelayout("", "", "", "", true);
this.indexModel = new IndexModel();

}
//#endregion

//#region  Method's

ngOnInit() {
this.GetList();
}

GetList() {

this._designationMasterService.GetList(this.indexModel).subscribe(
  data => {

    if (
      (data.IsSuccess)
    ) {
      
      this.listModel = <DesignationMasterViewModel[]>data.Data.Data;
      this.dataSource = new MatTableDataSource<DesignationMasterViewModel>(this.listModel);
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


OpenDialog(DesignationId) {

const _dialogRef = this._dialog.open(AddUpdateDesignationMasterComponent, {
  width: "600px",
  data: DesignationId,
  disableClose:true
});
_dialogRef.afterClosed().subscribe((result: boolean) => {

  if (result) {
    this.GetList();
  }
});
}


OnStatusClick(id) {

// this._commonService.GenerateOTP().subscribe(
//   data => {
//     if (data.IsSuccess) {

//       const _dialogRef = this._dialog.open(OTPDialogComponent, {
//         width: "500px",
//         disableClose:true
//       });
//       _dialogRef.afterClosed().subscribe((result: boolean) => {
        // if (result) {
          this._designationMasterService.ChangeActiveStatus(id).subscribe(
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

//         }
//       });
//     }else{
//       this._alertService.error(data.Message);
//     }
//   },
//   error => {
//     this._alertService.error(error.message);
//   }
// );
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
