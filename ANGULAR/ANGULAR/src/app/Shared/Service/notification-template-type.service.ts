import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { NotificationTemplateTypeModel } from '../Model/Master/notificationtemplatetype.model';
@Injectable({
  providedIn: 'root'
})
export class NotificationTemplateTypeService {
  constructor(private readonly _baseService: BaseService) {}
  GetList(model: IndexModel) {
    //
    const result = this._baseService.post(
      AppSetting.NotificationTypeListUrl,
      model
    );
    return result;
  }

  GetById(id) {
    const result = this._baseService.get(
      AppSetting.NotificationTypeByIdUrl + id,
      null
    );
    return result;
  }

  Edit(model: NotificationTemplateTypeModel) {
    const result = this._baseService.post(
      AppSetting.NotificationTypeEditUrl,
      model
    );
    return result;
  }
}
