import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {
  MonitoringParametersByIdForDataEntryViewModel,
  MonitoringParamDataEntryAddModel,
  MonitoringParamDDLModel,
  DynamicDDLModel,
  MonitoringParametersByIdForDataEntry
} from 'src/app/Shared/Model/scheme-model';
import { Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';

@Component({
  selector: 'app-data-entry-dialog',
  templateUrl: './data-entry-dialog.component.html',
  styleUrls: ['./data-entry-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class DataEntryDialogComponent implements OnInit {
  model: MonitoringParametersByIdForDataEntryViewModel;
  schemeId: number;
  entryModel: MonitoringParamDataEntryAddModel;
  DDLModel: MonitoringParamDDLModel;
  scheme = new FormControl('', [Validators.required]);
  count = new FormControl('', [Validators.required]);
  yearMonth = new FormControl('', [Validators.required]);
  isRecord = false;

  dynamicDDL: DynamicDDLModel[];
  index: number;
  countIndex: number;
  constructor(
    public readonly _dialogRef: MatDialogRef<DataEntryDialogComponent>,
    private readonly _alertService: AlertService,
    private readonly _schemeService: SchemeService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.entryModel = new MonitoringParamDataEntryAddModel();
    this.entryModel.DataEntryList[0].YearMonth=new Date();  
    if (data) {
      this.schemeId = data.SchemeId;
      if (data.dataEntry) {
        this.entryModel.DataEntryList[0]=<MonitoringParametersByIdForDataEntryViewModel>data.dataEntry;
        //this.entryModel.DataEntryList[0].MonitoringParameterList=(<MonitoringParametersByIdForDataEntry[]>data.dataEntry.MonitoringParameterList);

      }
    }
    this.model = new MonitoringParametersByIdForDataEntryViewModel();
    // this.entryModel.SchemeId = this.schemeId;
    this.entryModel.SchemeId =String(this.schemeId) ;
  }

  ngOnInit() {
    this.GetData();
  }

  saveClick() {
    

    this.scheme.markAsTouched();
    this.count.markAsTouched();
    this.yearMonth.markAsTouched();

    this.entryModel.SchemeId = this.schemeId;

    var prevDate=   this.entryModel.DataEntryList[0].YearMonth;
    this.entryModel.DataEntryList[0].YearMonth=this.entryModel.DataEntryList[0].YearMonth.toLocaleString();

    if (this.scheme.valid && this.count.valid && this.yearMonth.valid) {
if (this.entryModel.DataEntryList[0].MonitoringParameterList[0].DataEntryFieldValueId) {
  this._schemeService
  .UpdateDataEntryValueForMonitoringParameters(this.entryModel)
  .subscribe(
    data => {
      ;
      if (data.IsSuccess) {
        this._alertService.success(data.Message);
        this._dialogRef.close(true);
      } else {
        this.entryModel.DataEntryList[0].YearMonth=prevDate;
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
      this.entryModel.DataEntryList[0].YearMonth=prevDate;
    }
  );
}else{
  this._schemeService
  .PostDataEntryForMonitoringParam(this.entryModel)
  .subscribe(
    data => {
      ;
      if (data.IsSuccess) {
        this._alertService.success(data.Message);
        this._dialogRef.close(true);
      } else {
        this.entryModel.DataEntryList[0].YearMonth=prevDate;
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
      this.entryModel.DataEntryList[0].YearMonth=prevDate;
    }
  );
}

 

    }
  }

  SetValue(index, value, mappingId) {
    this.entryModel.DataEntryList[0].MonitoringParameterList[
      index
    ].MonitoringParamId = value;
    this.entryModel.DataEntryList[0].MonitoringParameterList[
      index
    ].MappingId = mappingId;
    return false;
  }

  GetData() {
    
    this._schemeService
      .GetMonitoringParamByIdForDataEntry(this.schemeId)
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
          } else {
            this._alertService.error(data.Message);
            this.isRecord = false;
          }
        },
        error => {
          this.isRecord = false;
          this._alertService.error(error.message);
        }
      );
  }

  checkIsSelect(dDLText,FieldName,index,j){
if (dDLText===FieldName) {
if (this.index===index) {
  return false;
}else{
  this.index=index;
  return true;
}
 
}else{
  return false;
}
  }

  onNoClick() {
    this._dialogRef.close();
  }
}
