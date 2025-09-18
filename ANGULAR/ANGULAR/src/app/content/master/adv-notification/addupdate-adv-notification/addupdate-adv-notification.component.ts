import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { LookupModel } from 'src/app/Shared/Model/lookup.model';
import { advNotificationModel } from 'src/app/Shared/Model/Master/advnotification.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { AdvnotificationService } from 'src/app/Shared/Service/advnotification.service';

import { AdvNotificationEnum } from 'src/app/Shared/Enum/adv-notification.enum';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addupdate-adv-notification',
  templateUrl: './addupdate-adv-notification.component.html',
  styleUrls: ['./addupdate-adv-notification.component.css']
})
export class AddupdateAdvNotificationComponent implements OnInit {
  model: advNotificationModel;
  dDLList: DDLModel;
  deprtList: DdlItemModel;
  id: number;
  typeAdminDepartment: string = AppSetting.adminDepartment;
  typeDepartment: string = AppSetting.department;
  typePlatformUser: string = AppSetting.platformUser;
  adminDepartmentMaster: number;
  isValidEmailList = false;
  isValidMobileNoList = false;
  title = 'Add';
  advNotificationEnum = AdvNotificationEnum;

  type = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  mappingCode = new FormControl('', [Validators.required]);
  notificationPeriod = new FormControl('', [Validators.required]);
  constructor(
    private _parentApi: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _advnotificationService: AdvnotificationService,
    private _route: ActivatedRoute,
    private readonly _formBuilder: FormBuilder
  ) {
    this.model = new advNotificationModel();
    this.id = this._route.snapshot.params.id;
    if (this.id) {
      this.OnDataGetById();
      this.title = 'Update';
    } else {
      this.model.Id = 0;
      this.title = 'Add';
    }
    // tslint:disable-next-line: max-line-length
    this._parentApi.setpagelayout(
      this.title + ' Advertisement Notification :',
      'keyboard_backspace',
      'Back To List',
      'master/advnotification'
    );
  }

  ngOnInit() {
    this.GetDDLList();
  }

  AddMoreEmail() {
    if (this.model.EmailList[this.model.EmailList.length - 1]) {
      this.model.EmailList.push('');
      this.isValidEmailList = false;
    } else {
      this.isValidEmailList = true;
    }
  }

  AddMoreMobileNumber() {
    if (this.model.MobileNoList[this.model.MobileNoList.length - 1]) {
      this.model.MobileNoList.push('');
      this.isValidMobileNoList = false;
    } else {
      this.isValidMobileNoList = true;
    }
  }

  trackByfn(index: any) {
    return index;
  }

  RemoveClickEmail(index) {
    this.model.EmailList.splice(index, 1);
  }

  RemoveClickMobileNo(index) {
    this.model.MobileNoList.splice(index, 1);
  }

  OnDataGetById() {
    this.GetAdvertisementDepartmentList(0);
    this._advnotificationService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {

          this.model = <advNotificationModel>data.Data;
          if (this.model.Email != null) {
            this.model.EmailList = this.model.Email.split(',');
          }
          if (this.model.MobileNo != null) {
            this.model.MobileNoList = this.model.MobileNo.split(',');
          }

          if (this.model.Type != null) {
            this.model.Type = String(this.model.Type);
          }
          if (this.model.MappingCode != null) {
            this.model.MappingCode = String(this.model.MappingCode);
          }
          if (this.model.IsPullOrPushCode != null) {
            this.model.IsPullOrPushCode = String(this.model.IsPullOrPushCode);
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {

    this._commonService.GetAllDDL(AppSetting.DDlKeyForLookUp).subscribe(
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

  GetAdvertisementDepartmentList(id) {

    this._commonService.GetSchemeDepartment(id).subscribe(
      data => {

        if (data.IsSuccess) {
          this.deprtList = <DdlItemModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {

    if (this.model.EmailList) {
      this.model.Email = this.model.EmailList.toString();
    }
    if (this.model.MobileNoList) {
      this.model.MobileNo = this.model.MobileNoList.toString();
    }
    this.type.markAllAsTouched();
    this.name.markAllAsTouched();
    this.mappingCode.markAllAsTouched();
    this.notificationPeriod.markAllAsTouched();

    if (this.type.valid && this.name.valid && this.mappingCode.valid && this.notificationPeriod.valid && this.model.Email.length > 0 && this.model.MobileNo.length > 0) {
      if (this.id) {

        this._advnotificationService.EditAdvNotification(this.model).subscribe(
          data => {
            if (data.IsSuccess) {

              this._alertService.success(GlobalMessagesModel.updateSuccess);
              this._router.navigate(['master/advnotification']);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._advnotificationService.AddAdvNotification(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(GlobalMessagesModel.saveSuccess);
              this.model = new advNotificationModel();
              this._router.navigate(['master/advnotification']);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    } else {
      this.isValidMobileNoList = true;
      this.isValidEmailList = true;
    }

  }


  typeChange(event) {

    this.model.MappingCode = '';
  }

}
