import { HelpDocumentService } from './../../../Shared/Service/help-document.service';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { AddupdateHelpDocumentTypeMasterComponent } from './addupdate-help-document-type-master/addupdate-help-document-type-master.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { HelpDocumentTypeMasterModel } from 'src/app/Shared/Model/help-document-type-master-model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { HelpDocumentTypeService } from 'src/app/Shared/Service/help-document-type.service';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-help-document-type-master',
  templateUrl: './help-document-type-master.component.html',
  styleUrls: ['./help-document-type-master.component.css']
})
export class HelpDocumentTypeMasterComponent implements OnInit {
 //#region <Variable>

 listModel: HelpDocumentTypeMasterModel[];
 dataSource: any;
 displayedColumns: string[] = [
   "index",
   "Id",
   "Code",
   "IsShowInWebServiceMaster",
   "Name",
   "NameHindi",
   "IsActive",
   "Action"
 ];
 ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "Id", Text: "Entry Number" },
  { Value: "Code", Text: "Entry Code" },
  { Value: "IsShowInWebServiceMaster", Text: "Is WebService" },
   { Value: "Name", Text: "Name" },
   { Value: "NameHindi", Text: "Name Hindi" }
 ];

 columnsToDisplay: string[] = this.displayedColumns.slice();
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;

 Permission: PermissionModel = this._commonService.GetPagePermission(
   "/master/help-document-type-master",
   "/master/help-document-type-master/add",
   "",
   "/master/help-document-type-master/edit",
 );
 indexModel: IndexModel;
 totalRecords: number;

 //#endregion <Variable>

 //#region <Constructor>

 constructor(
   private readonly _helpDocumentTypeService: HelpDocumentTypeService,
   private readonly _commonService: CommonService,
   private readonly _alertService: AlertService,
   private _parentApi: AppComponent,
   private _dialog: MatDialog
 ) {
   this._parentApi.setpagelayout("", "", "", "", true);
   this.indexModel = new IndexModel();
 }

 //#endregion <Constructor>

 //#region <Method>

 ngOnInit() {
   this.GetList();
 }

 GetList() {
   
   this._helpDocumentTypeService.GetList(this.indexModel).subscribe(
     data => {
       
       if (data.IsSuccess) {
         this.listModel = <HelpDocumentTypeMasterModel[]>data.Data.Data;
         this.dataSource = new MatTableDataSource<HelpDocumentTypeMasterModel>(this.listModel);
         this.dataSource.paginator = this.paginator;
         this.totalRecords = data.Data.TotalRecords;
         this.dataSource.sort = this.sort;
       }
     },
     error => {
       this._alertService.error(error.message);
     }
   );
 }

 onPaginateChange(event) {
   this.indexModel.Page = event.pageIndex + 1;
   this.indexModel.PageSize = event.pageSize;
   this.GetList();
 }

 sortData(event) {
   this.indexModel.OrderBy = event.active;
   this.indexModel.OrderByAsc =
     event.direction == AppSetting.orderByDscAsc
       ? AppSetting.orderByAsc
       : AppSetting.orderByDsc;
   this.GetList();
 }

 openDialog(Id) {
   
   const _dialogRef = this._dialog.open(
    AddupdateHelpDocumentTypeMasterComponent,
     {
       width: "500px",
       data: Id
     }
   );
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
             this._helpDocumentTypeService
               .UpdateStatus(id)
               .subscribe(
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
   //     } else {
   //       this._alertService.error(data.Message);
   //     }
   //   },
   //   error => {
   //     this._alertService.error(error.message);
   //   }
   // );

 }


 //#endregion <Method>
}
