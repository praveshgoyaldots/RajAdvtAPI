import { NewspaperMasterModel } from './../Model/Master/news-newspaper-model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class NewsNewspaperMasterService {
  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.NewspaperMasterListUrl, model);
  }

  Add(model: NewspaperMasterModel) {
    return this._baseService.post(AppSetting.NewspaperMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.NewspaperMasterGetByIdUrl + id, null);
  }

  Edit(model: NewspaperMasterModel) {
    return this._baseService.post(AppSetting.NewspaperMasterEditUrl, model
    );
  }

  UpdateStatus(id) {
    return this._baseService.get(AppSetting.NewspaperMasterUpdateStatusUrl + id, null);
  }
}
