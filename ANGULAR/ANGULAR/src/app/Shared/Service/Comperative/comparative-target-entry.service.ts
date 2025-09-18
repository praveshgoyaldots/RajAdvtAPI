import { Injectable } from '@angular/core';
import { AppSetting } from '../../Model/appsetting';
import { IndexModel } from '../../Model/general-model';
import { BaseService } from '../base.service';
import { ComparativeTargetEntryModel } from '../../Model/Camparetive/comparative-target-entry-model';

@Injectable({
  providedIn: 'root'
})
export class ComparativeTargetEntryService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.CamparativeTargetEntryListUrl, model);
  }

  Add(model: ComparativeTargetEntryModel) {
    return this._baseService.post(AppSetting.CamparativeTargetEntryAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.CamparativeTargetEntryGetByIdUrl + id,
      null
    );
  }

  Edit(model: ComparativeTargetEntryModel) {
    return this._baseService.post(AppSetting.CamparativeTargetEntryEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.CamparativeTargetEntryUpdateStatusUrl + id
    );
  }

  GetAllParameterList(kPICode: number,dpt=0) {
    return this._baseService.get(AppSetting.CamparativeAllParameterListUrl+'?kPICode=' +kPICode + '&dpt='+dpt);
  }

  isDuplicateData(model: ComparativeTargetEntryModel) {
    return this._baseService.post(AppSetting.IsTargetEntryDuplicateUrl, model);
  }

}
