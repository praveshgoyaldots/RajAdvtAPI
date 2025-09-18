import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { MenuClassificationModel } from 'src/app/Shared/Model/Master/menu-classification-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MenuClassificationService } from 'src/app/Shared/Service/menu-classification.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-menu-classification',
  templateUrl: './menu-classification.component.html',
  styleUrls: ['./menu-classification.component.css']
})
export class MenuClassificationComponent implements OnInit {
 //#region << Variable >>
 listModel: MenuClassificationModel[];
 dataSource: MatTableDataSource<MenuClassificationModel>;
 displayedColumns: string[] = [
   "index",
   "NameHindi",
   "NameEnglish",
   "DisplayOrder",
   "Remarks",
   "IsActive",
   "Action",
 ];
 ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: "NameHindi", Text: "Name Hindi" },
   { Value: "NameEnglish", Text: "NameEnglish" },
   { Value: "DisplayOrder", Text: "Display Order" },
   { Value: "Remarks", Text: "Remarks" },

 ];

 searchColumns: ColumnHeaderModel[] = [
   { Value: "NameHindi", Text: "Name Hindi" },
   { Value: "NameEnglish", Text: "Name English" },

 ];

 columnsToDisplay: string[] = this.displayedColumns.slice();
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
 indexModel: IndexModel;
 totalRecords: number;
 MenuClassificationPermission: PermissionModel = this._commonService.GetPagePermission(
   "/department-website/menu-Classification",
   "/department-website/menu-Classification/add",
   "",
   "/department-website/menu-Classification/update"
 );

 //#endregion

 //#region << constructor >>

 constructor(
   private _parentComponent: AppComponent,
   private readonly _menuClassificationService: MenuClassificationService,
   private readonly _alertService: AlertService,
   public readonly _commonService: CommonService,
   private readonly _dialog: MatDialog
 ) {
   this.MenuClassificationPermission.AddPageAccess
     ? this._parentComponent.setpagelayout(
         "Menu Classification List:",
         "add",
         "Add",
         "/department-website/menu-Classification/add"
       )
     : this._parentComponent.setpagelayout("Menu Classification List:");
   this.indexModel = new IndexModel();
 }

 //#endregion

 //#region << Method >>

 ngOnInit() {
   this.GetList();
 }

 SortData(event) {
   this.indexModel.OrderBy = event.active;
   this.indexModel.OrderByAsc =
     event.direction === AppSetting.orderByDscAsc
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

 GetList() {
   
   this.indexModel.PageSize=101;
   this._menuClassificationService.GetList(this.indexModel).subscribe(
     (data) => {
       if (data.IsSuccess) {
         
         this.listModel = <MenuClassificationModel[]>(
           data.Data.Data
         );
         this.dataSource = new MatTableDataSource<MenuClassificationModel>(
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

 OnStatusClick(id) {
   this._menuClassificationService.ChangeActiveStatus(id).subscribe(
     (data) => {
       if (data.IsSuccess) {
         this.GetList();
         this._commonService.ScrollingTop();
         this._alertService.success(data.Message);
       } else {
         this._alertService.error(data.Message);
       }
     },
     (error) => {
       this._alertService.error(error.message);
     }
   );
 }

 SearchByKeyword(event) {
   
   this.indexModel.Search = event;
   this.GetList();
 }

 Reset() {
   this.indexModel = new IndexModel();
   this.GetList();
 }
 //#endregion
}
