import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { TransferDeptModel } from '../Model/Master/department-contact-details.model';
import { DepartmentContactFilterModel } from '../Model/SendstatusEmail.model';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class TransferdeptService {

  constructor(private readonly _baseService: BaseService) { }

  Edit(model: TransferDeptModel) {
    return this._baseService.post(AppSetting.TransferDeptstatuUrl, model);
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.TransferDeptAllUrl, model);
  }

  Editold(model: TransferDeptModel) {
    return this._baseService.post(AppSetting.TransferDeptAlloldUrl, model);
  }
}
