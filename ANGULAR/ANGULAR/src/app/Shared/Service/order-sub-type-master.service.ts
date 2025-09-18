import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { OrderSubTypeMasterModel } from '../Model/Master/order-SubType-Master-model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class OrderSubTypeMasterService {

  constructor(private readonly _baseService: BaseService) {

   }

  GetList(model: IndexModel) {

    return this._baseService.post(AppSetting.OrderSubTypeListUrl, model);
  }

  Add(model: OrderSubTypeMasterModel) {
    return this._baseService.post(AppSetting.OrderSubTypeAddUrl, model);
  }

  Edit(model: OrderSubTypeMasterModel) {
    return this._baseService.post(AppSetting.OrderSubTypeUpdateUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.OrderSubTypeUpdateStatusUrl + id);
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.OrderSubTypeGetByIdUrl + id);
  }
}
