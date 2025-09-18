import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChiefMinisterProfileViewModel } from 'src/app/Shared/Model/Master/chief-minister-profile.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { ChiefMinisterProfileService } from 'src/app/Shared/Service/chief-minister-profile.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';

@Component({
  selector: 'app-chief-minister-profile',
  templateUrl: './chief-minister-profile.component.html',
  styleUrls: ['./chief-minister-profile.component.css']
})
export class ChiefMinisterProfileComponent implements OnInit {

 //#region  Variable's
listModel: ChiefMinisterProfileViewModel[];
dataSource: any;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
id: number;
displayedColumns: string[] = ['index', 'Name', 'NameHindi','DesignationName','PhotoPath','IsActive', 'Action'];
ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'DesignationName', Text: 'Designation' }];
columnsToDisplay: string[] = this.displayedColumns.slice();
Permission: PermissionModel = this._commonService.GetPagePermission("/chief-minister-profile", "/chief-minister-profile/add", "/chief-minister-profile/detail", "/chief-minister-profile/update", "/chief-minister-profile/delete");
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
  private readonly _chiefMinisterProfileService: ChiefMinisterProfileService
) {
this._parentApi.setpagelayout( "Chief Minister Profile :",
"add",
"Create",
"master/chief-minister-profile/add");
this.indexModel = new IndexModel();

}
//#endregion

//#region  Method's

ngOnInit() {
  this.GetList();
  }
  
  GetList() {
  
  this._chiefMinisterProfileService.GetList(this.indexModel).subscribe(
    data => {
  
      if (
        (data.IsSuccess)
      ) {
       
        this.listModel = <ChiefMinisterProfileViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<ChiefMinisterProfileViewModel>(this.listModel);
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
  
  
  updateDeleteStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: GlobalMessagesModel.ConfirmStatusChanged,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._chiefMinisterProfileService.ChangeDeleteStatus(id).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._commonService.ScrollingTop();
              this.GetList();
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      }
    });
  }

  updateActiveStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: GlobalMessagesModel.ConfirmStatusChanged,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._chiefMinisterProfileService.ChangeActiveStatus(id).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this.GetList();
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      }
    });
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
