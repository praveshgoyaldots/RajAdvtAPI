import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';

import { BaseService } from './base.service';
import { SchemeCommonViewModel } from '../Model/Master/SchemeCommonMaster.model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class SchemeCommonService {
  constructor(
    private readonly _baseService: BaseService,
  ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.SchemeCommonMasterListUrl, model);
    return result;
  }

  AddSchemeCommon(model: SchemeCommonViewModel) {
    var result = this._baseService.post(AppSetting.SchemeCommonMasterAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.SchemeCommonMasterUrlById + id, null);
    return result;
  }

  EditSchemeCommon(model: SchemeCommonViewModel) {
    var result = this._baseService.post(AppSetting.SchemeCommonMasterEditUrl, model
    );
    return result;
  }

  DeleteSchemeCommon(Id) {

    var result = this._baseService.get(AppSetting.SchemeCommonMasterDeleteUrl + Id, null);
    return result;

  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.SchemeCommonMasterUpdateStatusUrl + id);
  }
}
