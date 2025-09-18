import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { PlatformModel } from '../Model/Master/platform-master.model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private readonly _baseService: BaseService, ) {

  }
  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.PlatformMasterListUrl, model);
    return result;
  }

  AddPlatform(model: PlatformModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.PlatformMasterAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.PlatformMasterUrlById + id, null);
    return result;
  }

  EditPlatform(model: PlatformModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.PlatformMasterEditUrl, model
    );
    return result;
  }

  DeletePlatform(Id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.PlatformMasterDeleteUrl + Id, null);
    return result;

  }

  ChangeActiveStatus(id: number) {
    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.PlatformMasterActiveStatusUrl + id);
    return result;
  }

}
