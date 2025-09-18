import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import {  AchievementSubCategoryMasterPostModel } from '../Model/Master/achievement-sub-category-master-model';

@Injectable({
  providedIn: 'root'
})
export class AchievementSubCategoryMasterService {

  constructor(    private readonly _baseService: BaseService  ) {
  }
  GetList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.AchievementSubCategoryMasterListUrl, model);
    return result;
  }

  Add(model: AchievementSubCategoryMasterPostModel) {
    var result = this._baseService.post(AppSetting.AchievementSubCategoryMasterAddUrl, model);
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(AppSetting.AchievementSubCategoryMasterGetByIdUrl + id, null);
    return result;
  }

  Edit(id,model: AchievementSubCategoryMasterPostModel) {
    var result = this._baseService.post(AppSetting.AchievementSubCategoryMasterEditUrl+id, model);
    return result;
  }
  ChangeDeleteStatus(id: number) {
    return this._baseService.get(AppSetting.AchievementSubCategoryMasterDeleteUrl + id);
  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.AchievementSubCategoryMasterActiveStatusUrl + id);
  }

}
