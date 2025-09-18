import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { DepartmentSetupModel } from '../Model/Master/department-setup.model';
@Injectable({
  providedIn: 'root'
})
export class DepartmentSetupService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.DptSetupListUrl, model);
    return result;
  }

  Add(model: DepartmentSetupModel) {
    var result = this._baseService.post(AppSetting.DptSetupAddUrl, model);
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(AppSetting.DptSetupGetByIdUrl + id, null);
    return result;
  }

  Edit(model: DepartmentSetupModel) {
    var result = this._baseService.post(AppSetting.DptSetupEditUrl, model);
    return result;
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.DptSetupActiveStatusUrl + id);
  }

}
