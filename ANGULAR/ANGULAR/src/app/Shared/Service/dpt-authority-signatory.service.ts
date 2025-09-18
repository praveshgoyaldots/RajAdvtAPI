import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { DepartmentAuthoritySignatoryModel } from '../Model/Master/departmentauthoritysignatory.model';
@Injectable({
  providedIn: 'root'
})
export class DepartmentAuthoritySignatoryService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.DptAuthSignatoryListUrl, model);
    return result;
  }

  Add(model: DepartmentAuthoritySignatoryModel) {
    var result = this._baseService.post(AppSetting.DptAuthSignatoryAddUrl, model);
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(AppSetting.DptAuthSignatoryGetByIdUrl + id, null);
    return result;
  }

  Edit(model: DepartmentAuthoritySignatoryModel) {
    var result = this._baseService.post(AppSetting.DptAuthSignatoryEditUrl, model
    );
    return result;
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.DptAuthSignatoryActiveStatusUrl + id);
  }

}
