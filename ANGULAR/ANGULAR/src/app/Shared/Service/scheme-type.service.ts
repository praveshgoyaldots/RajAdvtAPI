import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

import { AppSetting } from '../Model/appsetting';
import { SchemeTypeViewModel } from '../Model/Master/SchemeType.model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class SchemeTypeService {

  constructor(
    private readonly _baseService: BaseService,
  ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.SchemeTypeListUrl, model);
    return result;
  }

  AddSchemeType(model: SchemeTypeViewModel) {
    var result = this._baseService.post(AppSetting.SchemeTypeAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.SchemeTypeUrlById + id, null);
    return result;
  }

  EditSchemeType(model: SchemeTypeViewModel) {
    var result = this._baseService.post(AppSetting.SchemeTypeEditUrl, model
    );
    return result;
  }

  DeleteSchemeType(Id) {

    var result = this._baseService.get(AppSetting.SchemeTypeDeleteUrl + Id, null);
    return result;

  }


  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.SchemeTypeUpdateStatusUrl + id);
  }
}
