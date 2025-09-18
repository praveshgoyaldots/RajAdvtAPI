import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { MPConstituencyMasterModel } from '../Model/Master/mp-constituency-master-model';

@Injectable({
  providedIn: 'root'
})
export class MPContituencyMasterService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
   return this._baseService.post(AppSetting.MPConstituencyMasterListUrl, model);
  }

  Add(model: MPConstituencyMasterModel) {
    return this._baseService.post(AppSetting.MPConstituencyMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.MPConstituencyMasterGetByIdUrl + id, null);
  }

  Edit(model: MPConstituencyMasterModel) {
    return this._baseService.post(AppSetting.MPConstituencyMasterEditUrl, model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.MPConstituencyMasterUpdateStatusUrl + id);
  }

}
