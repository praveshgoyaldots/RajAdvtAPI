import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { CancellationLookupModel } from '../Model/order-cancellation.model';

@Injectable({
  providedIn: 'root'
})
export class OrderCancellationService {

  constructor(private readonly _baseService: BaseService, ) { }

  SaveCancellationOrder(model: CancellationLookupModel) {
    return this._baseService.post(AppSetting.SaveCancellationOrderURL, model);
  }

  GetByLoggedInDepartment() {
    return this._baseService.get(AppSetting.GetByLoggedInDepartmentURL);
  }


}
