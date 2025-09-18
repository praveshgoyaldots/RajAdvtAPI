import { Injectable } from '@angular/core';
import { IndexModel } from '../../Model/general-model';
import { BaseService } from '../base.service';
import { AppSetting } from '../../Model/appsetting';
import { DepartmentalProgressModel } from '../../Model/Camparetive/departmental-progress-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentalProgressService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel,catCode) {
    return this._baseService.post(AppSetting.DepartmentalProgressListUrl+catCode, model);
  }

  Add(model: DepartmentalProgressModel) {
    return this._baseService.post(AppSetting.DepartmentalProgressAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.DepartmentalProgressGetByIdUrl + id,
      null
    );
  }

  Edit(model: DepartmentalProgressModel) {
    return this._baseService.post(AppSetting.DepartmentalProgressEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.DepartmentalProgressUpdateStatusUrl + id
    );
  }

  isDuplicateData(model: DepartmentalProgressModel) {
    return this._baseService.post(AppSetting.IsDepartmentalProgressDuplicateUrl, model);
  }

}
