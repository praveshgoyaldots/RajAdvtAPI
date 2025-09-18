import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { NotificationEmailTemplatesModel } from '../Model/Master/email-template.model';
@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.EmailTemplateListUrl, model);
  }

  AddNew(model: NotificationEmailTemplatesModel) {
    return this._baseService.post(AppSetting.EmailTemplateAddUrl, model);
  }

  Update(model: NotificationEmailTemplatesModel) {
    return this._baseService.post(AppSetting.EmailTemplateUpdateUrl, model);

  }

  GetById(id) {
    return this._baseService.get(AppSetting.EmailTemplateGetByIdUrl + id, null);
  }

  Delete(Id) {
    return this._baseService.get(AppSetting.EmailTemplateDeleteUrl + Id, null);
  }
}
