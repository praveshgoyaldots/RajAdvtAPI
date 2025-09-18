import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { NewsClassificationMasterModel } from '../Model/Master/news-classification-model';

@Injectable({
  providedIn: 'root'
})
export class NewsClassificationService {
  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.NewsClassificationMasterListUrl, model);
  }

  Add(model: NewsClassificationMasterModel) {
    return this._baseService.post(AppSetting.NewsClassificationMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.NewsClassificationMasterGetByIdUrl + id, null);
  }

  Edit(model: NewsClassificationMasterModel) {
    return this._baseService.post(AppSetting.NewsClassificationMasterEditUrl, model
    );
  }

  UpdateStatus(id) {
    return this._baseService.get(AppSetting.NewsClassificationMasterUpdateStatusUrl + id, null);
  }
}
