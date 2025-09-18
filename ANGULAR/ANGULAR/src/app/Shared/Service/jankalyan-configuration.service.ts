import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { JankalyanConfigurationMasterModel } from '../Model/Master/jankalyan-configuration-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class JankalyanConfigurationService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.JankalyanConfigurationListUrl, model);
  }

  Add(model: JankalyanConfigurationMasterModel) {
    return this._baseService.post(AppSetting.JankalyanConfigurationAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.JankalyanConfigurationGetByIdUrl + id,
      null
    );
  }

  Edit(model: JankalyanConfigurationMasterModel) {
    return this._baseService.post(AppSetting.JankalyanConfigurationEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.JankalyanConfigurationUpdateStatusUrl + id
    );
  }

  GetTopRecordForConfiguration() {
    return this._baseService.get(AppSetting.TopRecordForConfigurationUrl);
  }
}
