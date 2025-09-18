import { DataEntryDialogComponent } from './data-entry-dialog/data-entry-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDialog,
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from 'src/app/Shared/Model/format-datepicker';
import {
  MonitoringParametersByIdForDataEntryViewModel,
  MonitoringParamDataEntryAddModel,
  MonitoringParamDDLModel,
  SearchModel,
  CustomParameterWithIndex,
  EntryDefaultModel
} from './../../../../Shared/Model/scheme-model';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class DataEntryComponent implements OnInit {
  model: MonitoringParametersByIdForDataEntryViewModel;
  schemeId: number;
  entryModel: MonitoringParamDataEntryAddModel;
  DDLModel: MonitoringParamDDLModel;
  isRecord = false;
  indexModel: CustomParameterWithIndex;
  totalRecords: number;
  fromDate: Date;
  toDate: Date;
  searchModel: SearchModel;
  toDateValidation = new FormControl('', [Validators.required]);
  fromDateValidation = new FormControl('', [Validators.required]);

  dataSource: MatTableDataSource<MonitoringParametersByIdForDataEntryViewModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private readonly _parentApi: AppComponent,
    private readonly _alertService: AlertService,
    private readonly _schemeService: SchemeService,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private _router: Router
  ) {
    this.indexModel = new CustomParameterWithIndex();
    const ids = String(this._route.snapshot.params.id).split(',');
    this.schemeId = Number(ids[0]);
   this.indexModel.Year = Number(ids[1]);
    this.indexModel.Month = Number(ids[2]);

    this.model = new MonitoringParametersByIdForDataEntryViewModel();
    this.entryModel = new MonitoringParamDataEntryAddModel();
  
    this.searchModel = new SearchModel();
    this._parentApi.setpagelayout(
      'Add Data Entry For Monitoring Parameters :',
      'keyboard_backspace',
      'Back To Monthly Count',
      'scheme/mpcountbyscheme/'+this.schemeId
    );
  }

  ngOnInit() {
    this.GetData();
  }

  OpenDialog(data) {
    
//     let obj = new EntryDefaultModel();
//  obj.SchemeId=this.schemeId;
// obj.YearMonth=
    const _dialogRef = this._dialog.open(DataEntryDialogComponent, {
      width: '700px',
      data: {"SchemeId": this.schemeId,"dataEntry":data}
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      ;
      if (result) {
        this.GetData();
      }
    });
  }

  schemeSelectionChange(event) {
    ;
    this.schemeId = event.value;
    this._parentApi.setpagelayout(
      'Add Data Entry For Monitoring Parameters :',
      'keyboard_backspace',
      'Back To Monthly Count',
      'scheme/mpcountbyscheme/'+this.schemeId
    );
    this.GetData();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetData();
  }

  searchClick() {
    this.toDateValidation.markAsTouched();
    this.fromDateValidation.markAsTouched();

    if (this.toDateValidation.valid && this.fromDateValidation.valid) {
      
      this.toDateValidation.markAsUntouched();
      this.fromDateValidation.markAsUntouched();

      this.indexModel.Search = JSON.stringify(this.searchModel);
      this.GetData();
    }
  }

  clearSearchClick() {
    this.searchModel = new SearchModel();
    this.indexModel.Search = null;
    this.GetData();
  }

  GetData() {
    ;

    this._schemeService
      .GetDataEntryListForMonitoringParameters(this.indexModel, this.schemeId)
      .subscribe(
        data => {
          ;
          if (data.IsSuccess) {
            this.isRecord = true;
            this.model = <MonitoringParametersByIdForDataEntryViewModel>(
              data.Data
            );
            if (this.model.DataDDLList) {
              this.DDLModel = <MonitoringParamDDLModel>this.model.DataDDLList;
              this.model.DataDDLList = null;
            }
            this.totalRecords = data.Data.TotalRecords;
            ;
            if (this.model.DataEntryList) {
              this.entryModel = new MonitoringParamDataEntryAddModel();
              this.entryModel.DataEntryList = this.model.DataEntryList;

              this.entryModel.SchemeId =String(this.schemeId) ;

              this.dataSource = new MatTableDataSource<
                MonitoringParametersByIdForDataEntryViewModel
              >(this.entryModel.DataEntryList);
              if (this.indexModel.IsPostBack === false) {
                this.dataSource.paginator = this.paginator;
              }
            }
          } else {
            this.isRecord = false;
            this.entryModel = new MonitoringParamDataEntryAddModel();
            this.entryModel.SchemeId =String(this.schemeId) ;
            this._alertService.error(data.Message);
          }
        },
        error => {
          this.isRecord = false;
          this._alertService.error(error.message);
        }
      );
  }

  isEdit(data){
    
return data===1? true:false;
  }

}
