import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { LookupTypeDialogComponent } from '../../lookup-type/lookup-type-dialog/lookup-type-dialog.component';
import { MonitoringParameterLookupServiceService } from 'src/app/Shared/Service/monitoring-parameter-lookup-service.service';
import { MonitoringParameterLookupTypeModel } from 'src/app/Shared/Model/Master/monitoring-parameter-lookup-model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-m-p-type-dialog',
  templateUrl: './m-p-type-dialog.component.html',
  styleUrls: ['./m-p-type-dialog.component.css']
})
export class MPTypeDialogComponent implements OnInit {

  model: MonitoringParameterLookupTypeModel;
  id: number;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  //List Data 

  dataSource: any;
  displayedColumns: string[] = ["index", "NameHindi", "Name", "Action"];

  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "NameHindi", Text: "Name In Hindi" },
    { Value: "Name", Text: "Name" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  listModel:MonitoringParameterLookupTypeModel[];
  indexModel: IndexModel;
  totalRecords: number;
  //---
  constructor(private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _router: Router,
    public _dialogRef: MatDialogRef<LookupTypeDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _monitoringParameterLookupService:MonitoringParameterLookupServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.indexModel = new IndexModel();

      this.model = new MonitoringParameterLookupTypeModel();

  }


  ngOnInit() {
    this.GetList();
  }


  GetList() {
    this._monitoringParameterLookupService.GetAllLookupType(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <MonitoringParameterLookupTypeModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<MonitoringParameterLookupTypeModel>(this.listModel);
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

  getById(id) {
    this._monitoringParameterLookupService.GetByIdLookupType(id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <MonitoringParameterLookupTypeModel>data.Data;
        }
      },
      error => {
        this.model = new MonitoringParameterLookupTypeModel();
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
if (this.Name.valid &&  this.NameHindi.valid) {
  if (this.model.Id) {

    this._monitoringParameterLookupService.EditLookupType(this.model).subscribe(data => {
      if (data.IsSuccess) {

        this._alertService.success(data.Message);
        this.GetList();
        this.model = new MonitoringParameterLookupTypeModel();
        this.Name.markAsUntouched();
        this.NameHindi.markAsUntouched();
      }
      else {
        this._alertService.error(data.Message);

      }
    }, error => {
      console.log(error);
      this._alertService.error(error.message);
    });
  }
  else {

    this._monitoringParameterLookupService.CreateLookupType(this.model).subscribe(data => {
      if (data.IsSuccess) {
        this._alertService.success(data.Message);
        this.GetList();
      this.model = new MonitoringParameterLookupTypeModel();
      this.Name.markAsUntouched();
        this.NameHindi.markAsUntouched();
      }
      else {
        this._alertService.error(data.Message);
      }
    }, error => {
      console.log(error);
      this._alertService.error(error.message);
    });
  }
}

   
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

}
