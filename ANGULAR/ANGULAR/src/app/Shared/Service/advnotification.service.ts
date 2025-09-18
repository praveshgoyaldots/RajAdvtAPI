import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

import { AppSetting } from '../Model/appsetting';
import { advNotificationModel } from '../Model/Master/advnotification.model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class AdvnotificationService {

  constructor(private readonly _baseService: BaseService, ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.AdvNotificationListUrl, model);
    return result;
  }

  AddAdvNotification(model: advNotificationModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.AdvNotificationAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvNotificationUrlById + id, null);
    return result;
  }

  EditAdvNotification(model: advNotificationModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.AdvNotificationEditUrl, model
    );
    return result;
  }

  DeleteAdvNotification(Id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvNotificationDeleteUrl + Id, null);
    return result;

  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvNotificationActiveStatusUrl + id);
  }
}
