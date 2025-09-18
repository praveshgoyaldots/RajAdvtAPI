import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { SectionMasterModel } from '../Model/section-master-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SectionMasterService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.SectionMasterListUrl, model);
  }

  Add(model: SectionMasterModel) {
    return this._baseService.post(AppSetting.SectionMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.SectionMasterGetByIdUrl + id,
      null
    );
  }

  Edit(model: SectionMasterModel) {
    return this._baseService.post(AppSetting.SectionMasterEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.SectionMasterUpdateStatusUrl + id
    );
  }
}
