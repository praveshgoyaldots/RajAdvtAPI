import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { AdvertisementOrGovermentAchievementModel } from '../Model/advertisement.model';

@Injectable({
  providedIn: 'root'
})
export class GovermentAchivementOrAdvertisementService {

  constructor(private readonly _baseService: BaseService) {

   }

   GetList(model:IndexModel) {
    const result = this._baseService.post(AppSetting.GovAchivementOrAdvList, model);
    return result;
  }

  Add(model: AdvertisementOrGovermentAchievementModel) {
    const result = this._baseService.post(AppSetting.GovAchivementOrAdvAddUrl, model);
    return result;
  }


  GetById(Id) {
    const result = this._baseService.get(AppSetting.GovAchivementOrAdvGetById + Id, null);
    return result;
  }

  Edit(model: AdvertisementOrGovermentAchievementModel) {
    const result = this._baseService.post(AppSetting.GovAchivementOrAdvEditUrl, model);
    return result;
  }
}
