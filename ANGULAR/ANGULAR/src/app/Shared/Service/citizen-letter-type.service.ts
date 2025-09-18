import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { CitizenLetterTypeModel } from '../Model/Master/citizen-letter-type.model';

@Injectable({
  providedIn: 'root'
})

export class CitizenLetterTypeService {
  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.CitizenLetterTypeListUrl, model);
  }

  Add(model: CitizenLetterTypeModel) {
    return this._baseService.post(AppSetting.CitizenLetterTypeAddUrl, model);
  }

  Detail(id: number) {
    return this._baseService.get(AppSetting.CitizenLetterTypeDetailUrl + id);
  }

  Edit(id: number, model: CitizenLetterTypeModel) {
    return this._baseService.post(AppSetting.CitizenLetterTypeEditUrl + id, model);
  }

  ChangeDeleteStatus(id: number) {
    return this._baseService.get(AppSetting.CitizenLetterTypeDeleteStatusChangeUrl + id);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.CitizenLetterTypeActiveStatusChangeUrl + id);
  }

}
