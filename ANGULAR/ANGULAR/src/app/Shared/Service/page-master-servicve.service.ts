import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { PageMasterModel } from '../Model/page-master-model.model';

@Injectable({
  providedIn: 'root'
})
export class PageMasterServicveService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.PageMasterListUrl, model);
  }

  Add(model: PageMasterModel) {
    return this._baseService.post(AppSetting.PageMasterAddUrl, model);
  }

  Detail(id: number) {
    return this._baseService.get(AppSetting.PageMasterDetailUrl + id)
  }

  Edit(id: number, model: PageMasterModel) {
    return this._baseService.post(AppSetting.PageMasterEditUrl + id, model);
  }

  ChangeDeleteStatus(id: number) {
    return this._baseService.get(AppSetting.PageMasterDeleteStatusChangeUrl + id);
  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.PageMasterActiveStatusChangeUrl + id);
  }
}
