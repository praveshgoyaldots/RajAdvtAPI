import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { MonitoringParameterLookupViewModel } from 'src/app/Shared/Model/Master/monitoring-parameter-lookup-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { MonitoringParameterLookupServiceService } from 'src/app/Shared/Service/monitoring-parameter-lookup-service.service';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MPTypeDialogComponent } from './m-p-type-dialog/m-p-type-dialog.component';
import { MPDialogComponent } from './m-p-dialog/m-p-dialog.component';

@Component({
  selector: 'app-monitoring-parameter-lookup',
  templateUrl: './monitoring-parameter-lookup.component.html',
  styleUrls: ['./monitoring-parameter-lookup.component.css']
})
export class MonitoringParameterLookupComponent implements OnInit {


  dataSource: any;
  displayedColumns: string[] = ["index", "lookuptypeName", "Name","NameHindi", "Action"];

  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "lookuptypeName", Text: "Lookup Type Name" },
    { Value: "Name", Text: "Name" },
    { Value: "NameHindi", Text: "Name In Hindi" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  listModel:MonitoringParameterLookupViewModel[];
  indexModel: IndexModel;
  totalRecords: number;
  constructor(
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent,
    private _dialog: MatDialog,
    private readonly _monitoringParameterLookupService:MonitoringParameterLookupServiceService
  ) { 
    this._parentApi.setpagelayout("Monitoring Parameter Lookup :", "", "", "",true);
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }

  
  GetList() {
    this._monitoringParameterLookupService.GetAll(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <MonitoringParameterLookupViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<MonitoringParameterLookupViewModel>(this.listModel);
          if (this.indexModel.IsPostBack === false) {
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
    
        const _dialogRef = this._dialog.open(MPDialogComponent, {
          width: "500px",
          data: { Id },
    
        });
        _dialogRef.afterClosed().subscribe((result: boolean) => {
    
          if (result) {
              this.GetList();
          }
        });
      }

      OpenTypeDialog() {
      this._dialog.open(MPTypeDialogComponent, {
      width: "500px",
      data: null,

    });
  }

  
  SortData(event) {
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



}
