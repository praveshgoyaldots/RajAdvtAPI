import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { StatusEmailModel, DepartmentContactFilterModel } from '../Model/SendstatusEmail.model';

@Injectable({
  providedIn: 'root'
})
export class SendStatusEmailService {

  constructor(private readonly _baseService: BaseService) { }

  Edit(model: StatusEmailModel) {
    return this._baseService.post(AppSetting.SendEmailstatuUrl, model);
  }

  GetList(model: DepartmentContactFilterModel) {
    return this._baseService.post(AppSetting.ImportantDepartmentContactDetailsGetAllUrl, model);
  }

}
