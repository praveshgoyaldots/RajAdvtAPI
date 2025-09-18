import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { ComplainEntryTypeMasterViewModel } from '../Model/Master/complain-entry-type-master-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ComplainEntryTypeMasterService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.ComplainEntryTypeListUrl, model);
  }

  Add(model: ComplainEntryTypeMasterViewModel) {
    return this._baseService.post(AppSetting.ComplainEntryTypeAddUrl, model);
  }

  Edit(model: ComplainEntryTypeMasterViewModel) {
    return this._baseService.post(AppSetting.ComplainEntryTypeUpdateUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.ComplainEntryTypeUpdateStatusUrl + id);
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.ComplainEntryTypeGetByIdUrl + id);
  }
}
