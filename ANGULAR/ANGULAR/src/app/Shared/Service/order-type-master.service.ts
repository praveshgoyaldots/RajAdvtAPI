import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { OrderTypeModel } from '../Model/Master/order-Type-master-model';
import { IndexModel } from '../Model/general-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderTypeMasterService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.OrderTypeMasterListUrl, model);
  }

  Add(model: OrderTypeModel) {
    return this._baseService.post(AppSetting.OrderTypeMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.OrderTypeMasterGetByIdUrl + id,
      null
    );
  }

  Edit(model: OrderTypeModel) {
    return this._baseService.post(AppSetting.OrderTypeMasterEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.OrderTypeMasterUpdateStatusUrl + id
    );
  }
}
