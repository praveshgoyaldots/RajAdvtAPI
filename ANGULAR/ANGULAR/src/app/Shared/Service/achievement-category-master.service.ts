import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { AchievementCategoryMasterModel } from '../Model/Master/achievement-category-master-model';

@Injectable({
  providedIn: 'root'
})
export class AchievementCategoryMasterService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.AchievementCategoryMasterListUrl, model);
    return result;
  }

  Add(model: AchievementCategoryMasterModel) {
    var result = this._baseService.post(AppSetting.AchievementCategoryMasterAddUrl, model);
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(AppSetting.AchievementCategoryMasterGetByIdUrl + id, null);
    return result;
  }

  Edit(id,model: AchievementCategoryMasterModel) {
    var result = this._baseService.post(AppSetting.AchievementCategoryMasterEditUrl+id, model);
    return result;
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.AchievementCategoryMasterActiveStatusUrl + id);
  }

}
