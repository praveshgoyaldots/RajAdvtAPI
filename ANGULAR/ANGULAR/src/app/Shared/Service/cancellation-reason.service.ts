import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { CancellationReasonMasterModel } from '../Model/Master/cancellation-reason-master.model';

@Injectable({
  providedIn: 'root'
})
export class CancellationReasonService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {

    return this._baseService.post(AppSetting.CancellationReasonListUrl, model);
  }

  Add(model: CancellationReasonMasterModel) {
    return this._baseService.post(AppSetting.CancellationReasonAddUrl, model);
  }

  Edit(model: CancellationReasonMasterModel) {
    return this._baseService.post(AppSetting.CancellationReasonUpdateUrl, model);
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.CancellationReasonGetByIdUrl + id);
  }

  UpdateStatus(id: number) {
    return this._baseService.get(AppSetting.CancellationReasonUpdateStatusUrl + id);
  }
}
