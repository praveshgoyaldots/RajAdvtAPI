import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { JankalyanEntryMasterViewModel, JankalyanEntryMasterModel } from '../Model/Master/JankalyanEntryMaster.model';

@Injectable({
  providedIn: 'root'
})
export class JankalyanEntryMasterService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.JankalyanEntryListUrl, model);
  }

  Add(model: JankalyanEntryMasterModel) {
    return this._baseService.post(AppSetting.JankalyanEntryAddUrl, model);
  }

  Edit(model: JankalyanEntryMasterModel) {
    return this._baseService.post(AppSetting.JankalyanEntryUpdateUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.JankalyanEntryUpdateStatusUrl + id);
  }

   GetById(id: number) {
    return this._baseService.get(AppSetting.JankalyanEntryGetByIdUrl + id);
  }

}
