import { Injectable } from '@angular/core';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { GovermentAchivementModel } from '../Model/Master/GovermentAchivement.Model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GovermentAchivementService {
  constructor(private readonly _baseService: BaseService, ) {

  }
  GetList(model:IndexModel) {
    const result = this._baseService.post(AppSetting.GovermentAchivementList, model);
    return result;
  }

  Add(model: GovermentAchivementModel) {
    const result = this._baseService.post(AppSetting.GovermentAchivementAdd, model);
    return result;
  }


  GetById(Id) {
    const result = this._baseService.get(AppSetting.GovermentAchivementGetById + Id, null);
    return result;
  }

  Edit(model: GovermentAchivementModel) {
    const result = this._baseService.post(AppSetting.GovermentAchivementEdit, model);
    return result;
  }

  Delete(Id) {
    const result = this._baseService.get(AppSetting.GovermentAchivementDelete + Id, null);
    return result;
  }

  ChangeActiveStatus(Id) {
    const result = this._baseService.get(AppSetting.GovermentAchivementStatusChange + Id, null);
    return result;
  }
}
