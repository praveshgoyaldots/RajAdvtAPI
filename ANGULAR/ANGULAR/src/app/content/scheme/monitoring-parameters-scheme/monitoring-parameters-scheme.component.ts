import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import {
  SchemeMonitoringParameterModel,
  MonitoringParameterMappingModel
} from 'src/app/Shared/Model/scheme-model';
import { FormControl, Validators } from '@angular/forms';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MonitoringParameterEnum } from 'src/app/Shared/Enum/monitoring-parameter.enum';
import { MPRMaxCount } from 'src/app/Shared/Enum/scheme.enum';

@Component({
  selector: 'app-monitoring-parameters-scheme',
  templateUrl: './monitoring-parameters-scheme.component.html',
  styleUrls: ['./monitoring-parameters-scheme.component.css']
})

export class MonitoringParametersSchemeComponent implements OnInit {
  monitoringParameterEnum: MonitoringParameterEnum;

  dDLList: DDLModel;
  model: SchemeMonitoringParameterModel;
  mappingModel: MonitoringParameterMappingModel;
  monitoringItems: { [index: string]: string } = {};
  monitoringParam = new FormControl('', [Validators.required]);
  scheme = new FormControl('', [Validators.required]);
count:number=0;
mPRMaxCount=MPRMaxCount;
  constructor(
    private readonly _parentApi: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _schemeService: SchemeService,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private _router: Router
  ) {
    ;

    this.model = new SchemeMonitoringParameterModel();
    this.model.SchemeID = this._route.snapshot.params.id;
    this.GetById();
    this.mappingModel = new MonitoringParameterMappingModel();
    this._parentApi.setpagelayout(
      'Add Monitoring Parameters :',
      'keyboard_backspace',
      'Back To Count List',
      'scheme/monitoringparametercountwithscheme'
    );
  }

  ngOnInit() {
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.DDLKeySchemeMonitoringParams)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            this.dDLList = <DDLModel>data.Data;
            if (this.dDLList.ddlMonitoringParameters) {
              this.dDLList.ddlMonitoringParameters.forEach(obj => {
                this.monitoringItems[obj.Value] = obj.Text;
              });
            }
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  addMoreItems() {
    this.monitoringParam.markAsTouched();
    this.scheme.markAsTouched();
    if (this.monitoringParam.valid && this.scheme.valid) {
      if (
        this.model.MonitoringParameterList.findIndex(
          x =>
            x.MonitoringParamId.toString() ===
            this.mappingModel.MonitoringParamId.toString()
        ) < 0
      ) {
        this.mappingModel.IsNew=true;
        this.model.MonitoringParameterList.push(this.mappingModel);

        this.count= this.model.MonitoringParameterList
        .filter((item: MonitoringParameterMappingModel) => item.IsActive === true || item.IsNew===true).length;

        this.mappingModel = new MonitoringParameterMappingModel();
        this.scheme.markAsUntouched();
        this.monitoringParam.markAsUntouched();
      } else {
        this._alertService.error(GlobalMessagesModel.Exist);
      }
    }
  }

  saveClick() {


    if (this.model.MonitoringParameterList.length > 0) {
      this._schemeService.PostMonitoringParam(this.model).subscribe(
        data => {

          if (data.IsSuccess) {
            this._alertService.success(data.Message);
           // this._router.navigate(['scheme/monitoringparameterdataenty/' + this.model.SchemeID]);
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this._alertService.error(GlobalMessagesModel.FieldsAreEmpty);
    }

  }

  GetById() {
    if (this.model.SchemeID) {

    this._schemeService.GetMonitoringParam(this.model.SchemeID).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <SchemeMonitoringParameterModel>data.Data;
        this.count= this.model.MonitoringParameterList
         .filter((item: MonitoringParameterMappingModel) => item.IsActive === true ).length;

          if (this.model.SchemeID) {
            this.model.SchemeID = String(this.model.SchemeID);
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }
  }

  updateStatus(id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to status for this record?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._schemeService.UpdateMonitoringParametersStatus(id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this._alertService.success(data.Message);
              this.GetById();
            } else {
              this._alertService.error(data.Message);
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
