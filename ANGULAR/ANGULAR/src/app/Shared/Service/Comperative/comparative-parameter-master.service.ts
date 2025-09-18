import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { IndexModel } from '../../Model/general-model';
import { AppSetting } from '../../Model/appsetting';
import { ComparativeParameterMasterModel } from '../../Model/Camparetive/comparative-parameter-model';

@Injectable({
  providedIn: 'root'
})
export class ComparativeParameterMasterService {

  constructor(private readonly _baseService: BaseService) { }
  
  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.CamparativeParameterMasterListUrl, model);
  }

  Add(model: ComparativeParameterMasterModel) {
    return this._baseService.post(AppSetting.CamparativeParameterMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.CamparativeParameterMasterGetByIdUrl + id,
      null
    );
  }

  Edit(model: ComparativeParameterMasterModel) {
    return this._baseService.post(AppSetting.CamparativeParameterMasterEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.CamparativeParameterMasterUpdateStatusUrl + id
    );
  }
}
