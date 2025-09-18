import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { NewsSubjectMasterModel } from '../Model/Master/news-subject-master-model';

@Injectable({
  providedIn: 'root'
})
export class NewsSubjectMasterService {
  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.NewsSubjectMasterListUrl, model);
  }

  Add(model: NewsSubjectMasterModel) {
    return this._baseService.post(AppSetting.NewsSubjectMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.NewsSubjectMasterGetByIdUrl + id, null);
  }

  Edit(model: NewsSubjectMasterModel) {
    return this._baseService.post(AppSetting.NewsSubjectMasterEditUrl, model
    );
  }

  UpdateStatus(id) {
    return this._baseService.get(AppSetting.NewsSubjectMasterUpdateStatusUrl + id, null);
  }

}
