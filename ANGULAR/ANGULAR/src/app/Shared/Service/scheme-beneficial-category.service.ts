import { Injectable } from '@angular/core';
import { SchemeBeneficialCategoryViewModel } from '../Model/Master/schemebeneficialcategory.model';

import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class SchemeBeneficialCategoryService {
  constructor(
    private readonly _baseService: BaseService,
  ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.SchemeBeneficialCategoryListUrl, model);
    return result;
  }

  AddSchemeBeneficialCategory(model: SchemeBeneficialCategoryViewModel) {
    var result = this._baseService.post(AppSetting.SchemeBeneficialCategoryAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.SchemeBeneficialCategoryUrlById + id, null);
    return result;
  }

  EditSchemeBeneficialCategory(model: SchemeBeneficialCategoryViewModel) {
    var result = this._baseService.put(AppSetting.SchemeBeneficialCategoryEditUrl, model
    );
    return result;
  }

  DeleteSchemeBeneficialCategory(Id) {

    var result = this._baseService.get(AppSetting.SchemeBeneficialCategoryDeleteUrl + Id, null);
    return result;

  }
}
