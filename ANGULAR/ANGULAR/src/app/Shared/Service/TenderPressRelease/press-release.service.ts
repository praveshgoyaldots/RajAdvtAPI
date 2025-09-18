import { Injectable } from '@angular/core';
import { AppSetting } from '../../Model/appsetting';
import { IndexModel } from '../../Model/general-model';
import { PressReleaseModel, PressReleaseUserConfigrationModel } from '../../Model/TenderPressRelease/press-release-model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class PressReleaseService {

  constructor(private readonly _baseService: BaseService) {

  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.PressReleaseListUrl, model);
  }

  Add(model: PressReleaseModel) {
    return this._baseService.post(AppSetting.PressReleaseAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.PressReleaseGetByIdUrl + id,
      null
    );
  }

  Edit(model: PressReleaseModel) {
    return this._baseService.post(AppSetting.PressReleaseEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.PressReleaseUpdateStatusUrl + id
    );
  }

  // region user configration
  GetUserList(model: IndexModel) {
    return this._baseService.post(AppSetting.UserConfigrationListUrl, model);
  }

  AddUser(model: PressReleaseUserConfigrationModel) {
    return this._baseService.post(AppSetting.UserConfigrationAddUrl, model);
  }

  GetByIdUser(id) {
    return this._baseService.get(
      AppSetting.UserConfigrationGetByIdUrl + id,
      null
    );
  }

  EditUser(model: PressReleaseUserConfigrationModel) {
    return this._baseService.post(AppSetting.UserConfigrationEditUrl, model);
  }

  ChangeActiveStatusUser(id: number) {
    return this._baseService.get(
      AppSetting.UserConfigrationUpdateStatusUrl + id
    );
  }
  // end
}
