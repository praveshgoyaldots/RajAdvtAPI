import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { OfficeModel } from '../Model/office-model.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.OfficeListUrl, model);
  }

  Add(model: OfficeModel) {
    return this._baseService.post(AppSetting.OfficeAddUrl, model);
  }

  Detail(id: number) {
    return this._baseService.get(AppSetting.OfficeDetailUrl + id);
  }

  Edit(id: number, model: OfficeModel) {
    return this._baseService.post(AppSetting.OfficeEditUrl + id, model);
  }

  ChangeDeleteStatus(id: number) {
    return this._baseService.get(AppSetting.OfficeDeleteStatusChangeUrl + id);
  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.OfficeActiveStatusChangeUrl + id);
  }

}
