import { Injectable } from '@angular/core';
import { AppSetting } from '../../Model/appsetting';
import { IndexModel } from '../../Model/general-model';
import { BaseService } from '../base.service';
import { YearMasterModel } from '../../Model/Camparetive/comparative-year-master-model';

@Injectable({
  providedIn: 'root'
})
export class ComparativeYearMasterService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.ComparativeYearMasterListUrl, model);
  }

  Add(model: YearMasterModel) {
    return this._baseService.post(AppSetting.ComparativeYearMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.ComparativeYearMasterGetByIdUrl + id,
      null
    );
  }

  Edit(model: YearMasterModel) {
    return this._baseService.post(AppSetting.ComparativeYearMasterEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.ComparativeYearMasterUpdateStatusUrl + id
    );
  }
}
