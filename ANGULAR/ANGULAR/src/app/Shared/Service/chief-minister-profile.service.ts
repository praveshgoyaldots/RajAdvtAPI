import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { Dictionary } from '../Model/dictionary';
import { IndexModel } from '../Model/general-model';
import { ChiefMinisterProfilePostModel } from '../Model/Master/chief-minister-profile.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChiefMinisterProfileService {


  constructor(private readonly _baseService: BaseService) {

  }

 GetList(model: IndexModel) {

   return this._baseService.post(AppSetting.ChiefMinisterListUrl, model);
 }

 AddUpdate(model: ChiefMinisterProfilePostModel) {
   return this._baseService.post(AppSetting.ChiefMinisterAddUpdateUrl, model);
 }
 

 ChangeActiveStatus(id: number) {
  var param = new Dictionary<any>();
  param.Add("id", id)
   return this._baseService.get(AppSetting.ChiefMinisterUpdateActiveStatusUrl ,param);
 }
 ChangeDeleteStatus(id: number) {
  var param = new Dictionary<any>();
  param.Add("id", id)
  return this._baseService.get(AppSetting.ChiefMinisterUpdateDeleteStatusUrl ,param);
}
 GetById(id: number) {
  var param = new Dictionary<any>();
  param.Add("id", id)
   return this._baseService.get(AppSetting.ChiefMinisterGetByIdUrl ,param);
 }
}
