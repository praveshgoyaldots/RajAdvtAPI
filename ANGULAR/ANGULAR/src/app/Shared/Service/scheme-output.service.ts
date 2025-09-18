import { Injectable } from '@angular/core';

import { SchemeOutputViewModel } from '../Model/Master/schemeoutput.model';
import { AppSetting } from '../Model/appsetting';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class SchemeOutputService {


  constructor(
    private readonly _baseService: BaseService,
  ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.SchemeOutputListUrl, model);
    return result;
  }

  AddSchemeOutput(model: SchemeOutputViewModel) {
    var result = this._baseService.post(AppSetting.SchemeOutputAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.SchemeOutputUrlById + id, null);
    return result;
  }

  EditSchemeOutput(model: SchemeOutputViewModel) {
    var result = this._baseService.post(AppSetting.SchemeOutputEditUrl, model
    );
    return result;
  }

  DeleteSchemeOutput(Id) {

    var result = this._baseService.get(AppSetting.SchemeOutputDeleteUrl + Id, null);
    return result;

  }


  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.SchemeOutputUpdateStatusUrl + id);
  }
}
