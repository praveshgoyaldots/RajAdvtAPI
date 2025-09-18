import { Injectable } from '@angular/core';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { BaseService } from './base.service';
import { DesignationMasterModel } from '../Model/Master/DesignationMaster.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationMasterService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.DesignationListUrl, model);
  }

  Add(model: DesignationMasterModel) {
    return this._baseService.post(AppSetting.DesignationAddUrl, model);
  }

  Edit(model: DesignationMasterModel) {
    return this._baseService.post(AppSetting.DesignationUpdateUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.DesignationUpdateStatusUrl + id);
  }

   GetById(id: number) {
    return this._baseService.get(AppSetting.DesignationGetByIdUrl + id);
  }

}
