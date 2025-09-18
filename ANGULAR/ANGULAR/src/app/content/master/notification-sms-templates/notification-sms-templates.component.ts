import { NotificationSMSTemplateViewModel } from './../../../Shared/Model/Master/sms-template.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { SMSTemplateService } from 'src/app/Shared/Service/sms-template.service';

@Component({
  selector: 'app-notification-sms-templates',
  templateUrl: './notification-sms-templates.component.html',
  styleUrls: ['./notification-sms-templates.component.css']
})
export class NotificationSmsTemplatesComponent implements OnInit {

 //#region << Variable >>
 listModel: NotificationSMSTemplateViewModel[];
 dataSource: MatTableDataSource<NotificationSMSTemplateViewModel>;
 displayedColumns: string[] = [
   'index',
   'TemplateType',
   'SMSContent',
   'Action'
 ];
 // tslint:disable-next-line: max-line-length
 ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: 'TemplateType', Text: 'Template Type' },
   { Value: 'SMSContent', Text: 'SMS Content' }
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
  private readonly _smsService: SMSTemplateService,
  private readonly _alertService: AlertService,
  private readonly _dialog: MatDialog,
) {
  this._parentApi.setpagelayout(
    'Notification SMS Templates :',
    'add',
    'Create',
    'master/smstemplates/add'
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
    this._smsService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <NotificationSMSTemplateViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<
          NotificationSMSTemplateViewModel
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

  onDelete(id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you want to delete this record?'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._smsService.Delete(id).subscribe(
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

  //#endregion

}
