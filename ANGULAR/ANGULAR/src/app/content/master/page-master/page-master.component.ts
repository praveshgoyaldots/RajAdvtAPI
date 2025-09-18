import { GlobalMessagesModel } from './../../../Shared/Model/common.messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { PageMasterListViewModel } from 'src/app/Shared/Model/page-master-model.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { PageMasterServicveService } from 'src/app/Shared/Service/page-master-servicve.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-page-master',
  templateUrl: './page-master.component.html',
  styleUrls: ['./page-master.component.css']
})
export class PageMasterComponent implements OnInit {
  model: PageMasterListViewModel[];
  dataSource: any;
  displayedColumns: string[] = ['index', 'PageTitle', 'ApplicationTitle', 'PageTypeName', 'MenuTitle', 'IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: 'PageTitle', Text: 'Permission Name' },
    { Value: 'ApplicationTitle', Text: 'Module Name' },
    { Value: 'PageTypeName', Text: 'Permission Type' },
    { Value: 'MenuTitle', Text: 'Menu Name' }

  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;

  constructor(
    private readonly _alertService: AlertService,
    private readonly _dialog: MatDialog,
    public readonly _commonService: CommonService,
    private readonly appComponnet: AppComponent,
    private readonly _pageMasterService: PageMasterServicveService, ) {
    this.appComponnet.setpagelayout('Pages :', 'add', 'Create', 'master/pagemaster/add');
    this.indexModel = new IndexModel();
  }
  ngOnInit() {
    this.getList();
  }


  getList() {
    this._pageMasterService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {

          this.model = <PageMasterListViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<PageMasterListViewModel>(this.model);
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
        else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.getList();
  }
  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.getList();
  }

  SearchByKeyword(value) {
    this.indexModel.Search = value;
    this.getList();
  }
  updateDeleteStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: GlobalMessagesModel.ConfirmStatusChanged
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._pageMasterService.ChangeDeleteStatus(id).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._commonService.ScrollingTop();
              this.getList();
            }
          },
          error => {
            this._alertService.error(error.message);
          });
      }
    });
  }

  updateActiveStatus(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: GlobalMessagesModel.ConfirmStatusChanged
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._pageMasterService.ChangeActiveStatus(id).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this.getList();
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
