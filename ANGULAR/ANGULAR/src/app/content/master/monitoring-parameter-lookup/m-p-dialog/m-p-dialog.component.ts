import { Component, OnInit, Inject } from '@angular/core';
import { MonitoringParameterlookupModel } from 'src/app/Shared/Model/Master/monitoring-parameter-lookup-model';
import { Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MonitoringParameterLookupServiceService } from 'src/app/Shared/Service/monitoring-parameter-lookup-service.service';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-m-p-dialog',
  templateUrl: './m-p-dialog.component.html',
  styleUrls: ['./m-p-dialog.component.css']
})
export class MPDialogComponent implements OnInit {
  
  model: MonitoringParameterlookupModel;
  id: number;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  TypeCode = new FormControl('', [Validators.required]);
  dDLList: DDLModel;
  indexModel:IndexModel;
  constructor(private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _router: Router,
    public _dialogRef: MatDialogRef<MPDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _monitoringParameterLookupService:MonitoringParameterLookupServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.indexModel = new IndexModel();
      this.model = new MonitoringParameterlookupModel();
      
if (data.Id) {
  this.getById(data.Id);
}
  }


  ngOnInit() {
    this.GetDDLList()
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyMPL).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getById(id) {
    
    this._monitoringParameterLookupService.GetById(id).subscribe(
      data => {
        
        if (
          (data.IsSuccess)
        ) {
          this.model = <MonitoringParameterlookupModel>data.Data;
          if (this.model.LookupTypeCode) {
            this.model.TypeCode=String(this.model.LookupTypeCode);
          }
        }
      },
      error => {
        this.model = new MonitoringParameterlookupModel();
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    this.TypeCode.markAsTouched();
if (this.Name.valid &&  this.NameHindi.valid && this.TypeCode.valid) {
  if (this.model.Id) {

    this._monitoringParameterLookupService.Edit(this.model).subscribe(data => {
      if (data.IsSuccess) {

        this._alertService.success(data.Message);
        this._dialogRef.close(true);
        this.model = new MonitoringParameterlookupModel();
        this.Name.markAsUntouched();
        this.NameHindi.markAsUntouched();
        this.TypeCode.markAsUntouched();
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

    this._monitoringParameterLookupService.Add(this.model).subscribe(data => {
      if (data.IsSuccess) {
        this._alertService.success(data.Message);
        this._dialogRef.close(true);
      this.model = new MonitoringParameterlookupModel();
      this.Name.markAsUntouched();
        this.NameHindi.markAsUntouched();
        this.TypeCode.markAsUntouched();
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
