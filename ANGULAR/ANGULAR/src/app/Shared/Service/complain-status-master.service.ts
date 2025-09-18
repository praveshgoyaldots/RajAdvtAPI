import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { ChangeStatus, ComplainStatusMasterViewModel } from '../Model/Master/complain-status-master-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ComplainStatusMasterService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.ComplainStatusListUrl, model);
  }

  Add(model: ComplainStatusMasterViewModel) {
    return this._baseService.post(AppSetting.ComplainStatusAddUrl, model);
  }

  Edit(model: ComplainStatusMasterViewModel) {
    return this._baseService.post(AppSetting.ComplainStatusUpdateUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.ComplainStatusUpdateStatusUrl + id);
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.ComplainStatusGetByIdUrl + id);
  }
  ChangeStatus(model: ChangeStatus) {
    return this._baseService.post(AppSetting.ComplainStatusChangeStatusUrl, model);
  }
}
