import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { MLAConstituencyMasterModel } from '../Model/Master/mla-constituency-master-model';

@Injectable({
  providedIn: 'root'
})
export class MLAContituencyMasterService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
   return this._baseService.post(AppSetting.MLAConstituencyMasterListUrl, model);
  }

  Add(model: MLAConstituencyMasterModel) {
    return this._baseService.post(AppSetting.MLAConstituencyMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.MLAConstituencyMasterGetByIdUrl + id, null);
  }

  Edit(model: MLAConstituencyMasterModel) {
    return this._baseService.post(AppSetting.MLAConstituencyMasterEditUrl, model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.MLAConstituencyMasterUpdateStatusUrl + id);
  }

}
