import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationTemplateTypeModel } from 'src/app/Shared/Model/Master/notificationtemplatetype.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { NotificationTemplateTypeService } from 'src/app/Shared/Service/notification-template-type.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AddEditDialogComponent } from './add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'app-notification-template-type',
  templateUrl: './notification-template-type.component.html',
  styleUrls: ['./notification-template-type.component.css']
})
export class NotificationTemplateTypeComponent implements OnInit {


 //#region << Variable >>
 listModel: NotificationTemplateTypeModel[];
 dataSource: MatTableDataSource<NotificationTemplateTypeModel>;
 displayedColumns: string[] = [
   'index',
   'Name',
   'NameHindi',
   'Action'
 ];
 // tslint:disable-next-line: max-line-length
 ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: 'Name', Text: 'Name' },
   { Value: 'NameHindi', Text: 'Name In Hindi' }
 ];

 columnsToDisplay: string[] = this.displayedColumns.slice();
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
 indexModel: IndexModel;
 totalRecords: number;
 //#endregion

 //#region << constructor >>

constructor(
  private _parentApi: AppComponent,
  private readonly _notificationTemplateTypeService: NotificationTemplateTypeService,
  private readonly _alertService: AlertService,
  private readonly _dialog: MatDialog,
) {
  this._parentApi.setpagelayout(
    'Notification Templates Type:',
    'add',
    '',
    ''
  );
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
    this._notificationTemplateTypeService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess)  {
          this.listModel = <NotificationTemplateTypeModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<
          NotificationTemplateTypeModel
          >(this.listModel);
          if (this.indexModel.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.Data.TotalRecords;
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
    const _dialogRef = this._dialog.open(AddEditDialogComponent, {
      width: "500px",
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.GetList();
      }
    });
  }

  //#endregion

}
