import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { DepartmentMenuClassificationModel } from '../Model/Master/department.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentMenuClassificationService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.DepartmentMenuClassificationListUrl, model);
  }

  Add(model: DepartmentMenuClassificationModel) {
    return this._baseService.post(AppSetting.DepartmentMenuClassificationAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.DepartmentMenuClassificationGetByIdUrl + id,
      null
    );
  }

  Edit(model: DepartmentMenuClassificationModel) {
    return this._baseService.post(AppSetting.DepartmentMenuClassificationEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.DepartmentMenuClassificationUpdateStatusUrl + id
    );
  }
}
