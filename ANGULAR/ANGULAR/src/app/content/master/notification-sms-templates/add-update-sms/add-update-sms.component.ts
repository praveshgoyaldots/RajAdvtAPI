import { AlertService } from './../../../../Shared/Service/alert.service';
import { Component, OnInit } from '@angular/core';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { NotificationSMSTemplatesModel } from 'src/app/Shared/Model/Master/sms-template.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SMSTemplateService } from 'src/app/Shared/Service/sms-template.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-add-update-sms',
  templateUrl: './add-update-sms.component.html',
  styleUrls: ['./add-update-sms.component.css']
})
export class AddUpdateSmsComponent implements OnInit {
  dDLList: DDLModel;
  model: NotificationSMSTemplatesModel;
  smsForm: FormGroup;
  constructor(
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _smsTemplateService: SMSTemplateService
  ) {
    this._parentApi.setpagelayout(
      'Notification SMS Templates :',
      'keyboard_backspace',
      'Back to List',
      'master/smstemplates'
    );
    this.model = new NotificationSMSTemplatesModel();
    this.model.Id = this._route.snapshot.params.id;
    if (this.model.Id) {
      this.GetByID();
    }
  }

  ngOnInit() {
    this.smsForm = this.formBuilder.group({
      TypeCode: [null, Validators.required],
      SMSContent: [null, Validators.required]
    });

    this.GetDDLList();
  }

  saveClick() {
    this.smsForm.markAllAsTouched();
    if (this.smsForm.valid) {
      if (this.model.Id) {
        this._smsTemplateService.Update(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._router.navigate(['master/smstemplates']);
              this._alertService.success(data.Message);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._smsTemplateService.AddNew(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(['master/smstemplates']);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            console.log(error);
            this._alertService.error(error.message);
          }
        );
      }
    }
  }

  GetByID() {
    this._smsTemplateService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <NotificationSMSTemplatesModel>data.Data;
          if (this.model.TypeCode) {
            this.model.TypeCode = String(this.model.TypeCode);
          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.NotificationTemplateTypeKey)
      .subscribe(
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
}
