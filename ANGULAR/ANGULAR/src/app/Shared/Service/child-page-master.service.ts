import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { AchievementSearchModel, ChildPageMasterModel, PageManualModel } from '../Model/Master/child-page-master.model';

@Injectable({
  providedIn: 'root'
})
export class ChildPageMasterService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
   return this._baseService.post(AppSetting.ChildPageMasterGetAllUrl, model);
  }

  Add(model: ChildPageMasterModel) {
    return this._baseService.post(AppSetting.ChildPageMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.ChildPageMasterGetByIdUrl + id, null);
  }

  Edit(model: ChildPageMasterModel) {
    return this._baseService.post(AppSetting.ChildPageMasterEditUrl, model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.ChildPageMasterUpdateStatusUrl + id);
  }

  GetPageDetailByPageCode(id) {
    return this._baseService.get(AppSetting.PageDetailByPageCodeUrl + id);
  }

  GetPageListByMenuName(manuName: PageManualModel) {
    return this._baseService.post(AppSetting.PageListByMenuNameUrl , manuName);
  }
  GetAchievementListBySearchFilter(model: AchievementSearchModel) {
    return this._baseService.post(AppSetting.GetAchievementListBySearchFilter, model);
  }
}
