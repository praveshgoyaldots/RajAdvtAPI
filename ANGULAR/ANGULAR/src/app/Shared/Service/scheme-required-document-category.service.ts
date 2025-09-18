import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { SchemeRequiredDocumentCategoryViewModel } from '../Model/Master/requiredocumentcategory.model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class SchemeRequiredDocumentCategoryService {
  constructor(
    private readonly _baseService: BaseService,
  ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.SchemeReqDocumentCategoryListUrl, model);
    return result;
  }

  AddSchemeReqDocumentCategory(model: SchemeRequiredDocumentCategoryViewModel) {
    var result = this._baseService.post(AppSetting.SchemeReqDocumentCategoryAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.SchemeReqDocumentCategoryUrlById + id, null);
    return result;
  }

  EditSchemeReqDocumentCategory(model: SchemeRequiredDocumentCategoryViewModel) {
    var result = this._baseService.put(AppSetting.SchemeReqDocumentCategoryEditUrl, model
    );
    return result;
  }

  DeleteSchemeReqDocumentCategory(Id) {

    var result = this._baseService.get(AppSetting.SchemeReqDocumentCategoryDeleteUrl + Id, null);
    return result;

  }
}
