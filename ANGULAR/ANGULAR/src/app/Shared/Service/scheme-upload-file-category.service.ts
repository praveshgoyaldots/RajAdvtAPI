import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

import { AppSetting } from '../Model/appsetting';
import { UploadFileCategoryViewModel } from '../Model/Master/uploadfilecategory.model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class SchemeUploadFileCategoryService {

  constructor(
    private readonly _baseService: BaseService,
  ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.SchemeUploadFileCategoryListUrl, model);
    return result;
  }

  AddSchemeUploadFileCategory(model: UploadFileCategoryViewModel) {
    var result = this._baseService.post(AppSetting.SchemeUploadFileCategoryAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.SchemeUploadFileCategoryUrlById + id, null);
    return result;
  }

  EditSchemeUploadFileCategory(model: UploadFileCategoryViewModel) {
    var result = this._baseService.put(AppSetting.SchemeUploadFileCategoryEditUrl, model
    );
    return result;
  }

  DeleteSchemeUploadFileCategory(Id) {

    var result = this._baseService.get(AppSetting.SchemeUploadFileCategoryDeleteUrl + Id, null);
    return result;

  }
}
