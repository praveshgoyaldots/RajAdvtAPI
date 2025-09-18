import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';

import { SchemeCategoryViewModel } from '../Model/Master/schemecategory.model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class SchemeCategoryService {

  constructor(
    private readonly _baseService: BaseService,
  ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.SchemeCategoryListUrl, model);
    return result;
  }

  AddSchemeCategory(model: SchemeCategoryViewModel) {
    var result = this._baseService.post(AppSetting.SchemeCategoryAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.SchemeCategoryUrlById + id, null);
    return result;
  }

  EditSchemeCategory(model: SchemeCategoryViewModel) {
    var result = this._baseService.put(AppSetting.SchemeCategoryEditUrl, model
    );
    return result;
  }

  DeleteSchemeCategory(Id) {

    var result = this._baseService.get(AppSetting.SchemeCategoryDeleteUrl + Id, null);
    return result;

  }
}
