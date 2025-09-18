import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { PressReleaseService } from 'src/app/Shared/Service/TenderPressRelease/press-release.service';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { PressReleaseUserConfigrationModel } from 'src/app/Shared/Model/TenderPressRelease/press-release-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AddupdateUserConfigrationComponent } from './addupdate-user-configration/addupdate-user-configration.component';

@Component({
  selector: 'app-press-release-user-configration',
  templateUrl: './press-release-user-configration.component.html',
  styleUrls: ['./press-release-user-configration.component.css']
})
export class PressReleaseUserConfigrationComponent implements OnInit {
 //#region <Variable>

 listModel: PressReleaseUserConfigrationModel[];
 dataSource: any;
 displayedColumns: string[] = [
   "index",
   "StartNo",
   "EndNo",
   "UserName",
   "IsActive",
   "Action",
 ];
 ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: "StartNo", Text: "Software Entry Start No" },
   { Value: "EndNo", Text: "Software Entry End No" },
   { Value: "UserName", Text: "Assign Person" },
  //  { Value: "NameHindi", Text: "Name Hindi" },
 ];

 columnsToDisplay: string[] = this.displayedColumns.slice();
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;

 Permission: PermissionModel = this._commonService.GetPagePermission(
   "/tender-press-release/user-configration",
   "/tender-press-release/user-configration/add",
   "",
   "/tender-press-release/user-configration/edit"
 );
 indexModel: IndexModel;
 totalRecords: number;
 fromDate: Date | string;
 toDate: Date | string;

 //#endregion <Variable>

 //#region <Constructor>

 constructor(
   private readonly _PressReleaseService: PressReleaseService,
   private readonly _commonService: CommonService,
   private readonly _alertService: AlertService,
   private _parentApi: AppComponent,
   private _dialog: MatDialog
 ) {
   this._parentApi.setpagelayout("", "", "", "", true);
   this._parentApi.setpagelayout(
    "Document Sub Type Master:",
    "",
    "",
    "",
    true
  );
   this.indexModel = new IndexModel();
 }

 //#endregion <Constructor>

 //#region <Method>

 ngOnInit() {
   this.GetList();
 }

 GetList() {
   
   this._PressReleaseService.GetUserList(this.indexModel).subscribe(
     (data) => {
       
       if (data.IsSuccess) {
         this.listModel = <PressReleaseUserConfigrationModel[]>data.Data.Data;
         this.dataSource = new MatTableDataSource<PressReleaseUserConfigrationModel>(
           this.listModel
         );
         this.totalRecords = data.Data.TotalRecords;
         if (!this.indexModel.IsPostBack) {
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

 onPaginateChange(event) {
   this.indexModel.Page = event.pageIndex + 1;
   this.indexModel.PageSize = event.pageSize;
   this.indexModel.IsPostBack = true;
   this.GetList();
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

 openDialog(Id) {
   
   const _dialogRef = this._dialog.open(AddupdateUserConfigrationComponent, {
     width: "500px",
     data: Id,
   });
   _dialogRef.afterClosed().subscribe((result: boolean) => {
     if (result) {
       this.GetList();
     }
   });
 }

 onActiveStatus(id) {
   
   // this._commonService.GenerateOTP().subscribe(
   //   data => {
   //     if (data.IsSuccess) {
   //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
   //         width: "500px",
   //         disableClose: true
   //       });
   //       _dialogRef.afterClosed().subscribe((result: boolean) => {
   //         if (result) {
   this._PressReleaseService.ChangeActiveStatusUser(id).subscribe(
     (data) => {
       if (data.IsSuccess) {
         this.GetList();
         this._alertService.success(data.Message);
       } else {
         this._alertService.error(data.Message);
       }
     },
     (error) => {
       this._alertService.error(error.message);
     }
   );
   //         }
   //       });
   //     } else {
   //       this._alertService.error(data.Message);
   //     }
   //   },
   //   error => {
   //     this._alertService.error(error.message);
   //   }
   // );
 }

 searchClick(){
  
      if (this.fromDate) {
        const uTCFromDate = new Date(
        Date.UTC(
        new Date(this.fromDate).getFullYear(),
        new Date(this.fromDate).getMonth(),
        new Date(this.fromDate).getDate()
        )
        )
        this.fromDate = uTCFromDate;
        }

        if (this.toDate) {
        const uTCToDate = new Date(
        Date.UTC(
        new Date(this.toDate).getFullYear(),
        new Date(this.toDate).getMonth(),
        new Date(this.toDate).getDate()
        )
        )
        this.toDate = uTCToDate;
        }


      if ( this.fromDate  &&  this.toDate ) {
        this.indexModel.AdvanceSearchModel = { FromDate: this.fromDate,ToDate: this.toDate };
      } else if( this.fromDate ){
        this.indexModel.AdvanceSearchModel = { FromDate: this.fromDate };
      } else if( this.toDate ){
        this.indexModel.AdvanceSearchModel = { ToDate: this.toDate };
      }
      this.GetList();
    }

    clearClick(){
      this.fromDate = null;
      this.toDate = null;
      this.indexModel = new IndexModel();
      this.GetList();
    }


 //#endregion <Method>
}
