import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel) {

    return this._baseService.post(AppSetting.UserTypeListUrl, model);
  }

  Add(model: any) {
    return this._baseService.post(AppSetting.UserTypeAddUrl, model);
  }
  Detail(id: number) {
    return this._baseService.get(AppSetting.UserTypeDetailUrl + id);
  }
  Edit(id: number, model: any) {
    return this._baseService.post(AppSetting.UserTypeEditUrl + id, model);
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.UserTypeDetailUrl + id);
  }


  ChangeDeleteStatus(id: number) {
    return this._baseService.post(AppSetting.UserTypeDeleteUrl, id);
  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.UserTypeUpdateIsActiveUrl + id);
  }
  GetDownLevelUserType(userType: string) {
    return this._baseService.get(AppSetting.UserTypeGetDownLevelUrl + userType);
  }

}
