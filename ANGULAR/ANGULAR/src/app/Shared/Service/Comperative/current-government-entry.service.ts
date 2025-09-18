import { Injectable } from '@angular/core';
import { IndexModel } from '../../Model/general-model';
import { AppSetting } from '../../Model/appsetting';
import { CurrentGovtEntryModel } from '../../Model/Camparetive/current-government-entry-model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentGovernmentEntryService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel,catCode) {
    return this._baseService.post(AppSetting.CurrentGovernmentEntryListUrl+catCode, model);
  }

  Add(model: CurrentGovtEntryModel) {
    return this._baseService.post(AppSetting.CurrentGovernmentEntryAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.CurrentGovernmentEntryGetByIdUrl + id,
      null
    );
  }

  Edit(model: CurrentGovtEntryModel) {
    return this._baseService.post(AppSetting.CurrentGovernmentEntryEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.CurrentGovernmentEntryUpdateStatusUrl + id
    );
  }

  isDuplicateData(model: CurrentGovtEntryModel) {
    return this._baseService.post(AppSetting.IsCurrentGovDuplicateUrl, model);
  }

}
