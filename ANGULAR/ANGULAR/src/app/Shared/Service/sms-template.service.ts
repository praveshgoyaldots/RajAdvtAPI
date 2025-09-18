import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { NotificationSMSTemplatesModel } from '../Model/Master/sms-template.model';
@Injectable({
  providedIn: 'root'
})
export class SMSTemplateService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.SMSTemplateListUrl, model);
  }

  AddNew(model: NotificationSMSTemplatesModel) {
    return this._baseService.post(AppSetting.SMSTemplateAddUrl, model);
  }

  Update(model: NotificationSMSTemplatesModel) {
    return this._baseService.post(AppSetting.SMSTemplateUpdateUrl, model);

  }

  GetById(id) {
    return this._baseService.get(AppSetting.SMSTemplateGetByIdUrl + id, null);
  }

  Delete(Id) {
    return this._baseService.get(AppSetting.SMSTemplateDeleteUrl + Id, null);
  }
}
