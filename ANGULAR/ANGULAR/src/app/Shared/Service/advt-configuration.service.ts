import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AdvtConfigurationService {

  constructor(private readonly _baseService: BaseService) { }

  AddUpdate(model: any) {
    var result = this._baseService.post(AppSetting.AdvtConfigurationAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.AdvtConfigurationGetByIdUrl + id, null);
    return result;
  }

}
