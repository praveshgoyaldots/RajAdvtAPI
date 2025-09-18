import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { MenuClassificationModel } from '../Model/Master/menu-classification-model';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class MenuClassificationService {

  constructor(private readonly _baseService: BaseService) {
  }


 GetList(model: IndexModel) {
  return this._baseService.post(AppSetting.MenuClassificationListUrl, model);
}

Add(model: MenuClassificationModel) {
  return this._baseService.post(AppSetting.MenuClassificationAddUrl, model);
}

Edit(model: MenuClassificationModel) {
  return this._baseService.post(AppSetting.MenuClassificationUpdateUrl, model);
}

ChangeActiveStatus(id: number) {
  return this._baseService.get(AppSetting.MenuClassificationUpdateStatusUrl + id);
}

GetById(id: number) {
  return this._baseService.get(AppSetting.MenuClassificationGetByIdUrl + id);
}

//#region <end>
}
