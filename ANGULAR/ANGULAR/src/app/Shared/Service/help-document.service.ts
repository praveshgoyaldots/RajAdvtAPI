import { IndexModel } from './../Model/general-model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { HelpDocumentModel } from '../Model/Master/helpdocument.model';
@Injectable({
  providedIn: 'root'
})
export class HelpDocumentService {

  constructor(private readonly _baseService: BaseService, ) {

  }
  GetList(model:IndexModel) {

    const result = this._baseService.post(AppSetting.HelpDocListUrl,model);
    return result;
  }

  Add(model: HelpDocumentModel) {
    const result = this._baseService.post(AppSetting.HelpDocAddUrl, model);
    return result;
  }

  GetById(id) {

    const result = this._baseService.get(AppSetting.HelpDocUrlById + id, null);
    return result;
  }

  Edit(model: HelpDocumentModel) {
    const result = this._baseService.post(AppSetting.HelpDocEditUrl, model);
    return result;
  }

  Delete(Id) {

    const result = this._baseService.get(AppSetting.HelpDocHDeleteUrl + Id, null);
    return result;
  }
}
