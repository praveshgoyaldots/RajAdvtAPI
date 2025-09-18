import { Component, OnInit, ViewChild } from '@angular/core';
import { MonitoringParameterMasterViewModel } from 'src/app/Shared/Model/Master/monitoring-parameters-master.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { MonitoringParameterMasterService } from 'src/app/Shared/Service/monitoring-parameter-master.service';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { MonitoringParameterMasterDialogComponent } from './monitoring-parameter-master-dialog/monitoring-parameter-master-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-monitoring-parameter-master',
  templateUrl: './monitoring-parameter-master.component.html',
  styleUrls: ['./monitoring-parameter-master.component.css']
})
export class MonitoringParameterMasterComponent implements OnInit {
  modelList: MonitoringParameterMasterViewModel[];
  isMaster = false;
  totalRecords: number;
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'Name','Type','DepartmentTitle','IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Name' },{ Value: 'DepartmentTitle', Text: 'Department Name' },{ Value: 'Type', Text: 'Type' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  indexModel: IndexModel;
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/monitoringparametermaster/view", "/master/monitoringparametermaster/add", " ", "/master/monitoringparametermaster/edit", "/master/monitoringparametermaster/delete");
  constructor(private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _monitoringParameterMasterService: MonitoringParameterMasterService,
  ) {

    this._parentApi.setpagelayout(" Monitoring Parameter Master :", "add", "Create", "master/lookupType", true);
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }


  GetList() {

    this._monitoringParameterMasterService.GetList(this.indexModel).subscribe(
      data => {

        if (data.IsSuccess) {
          this.modelList = <MonitoringParameterMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<MonitoringParameterMasterViewModel>(this.modelList);
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


  OpenDialog(Id) {
    const _dialogRef = this._dialog.open(MonitoringParameterMasterDialogComponent, {
      width: '500px',
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
  }


  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }
  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }


  OnActiveStatus(Id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to Update this record?",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._monitoringParameterMasterService.ChangeActiveStatus(Id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this.GetList();
              this._alertService.success(data.Message);

            }
          },
          error => {
            this._commonService.ScrollingTop();
            this._alertService.error(error.message);
          }
        );
      }
    });

  }

}
