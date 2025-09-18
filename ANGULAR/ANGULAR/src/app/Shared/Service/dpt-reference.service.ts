import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AdvCategoryModel } from '../Model/Master/AdvCategory.model';
import { IndexModel } from '../Model/general-model';
import { DepartmentReferenceModel } from '../Model/Master/department-reference.model';
@Injectable({
  providedIn: 'root'
})
export class DepartmentReferenceService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.DptReferenceListUrl, model);
    return result;
  }

  Add(model: DepartmentReferenceModel) {
    var result = this._baseService.post(AppSetting.DptReferenceAddUrl, model);
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(AppSetting.DptReferenceGetByIdUrl + id, null);
    return result;
  }

  Edit(model: DepartmentReferenceModel) {
    var result = this._baseService.post(AppSetting.DptReferenceEditUrl, model);
    return result;
  }
  ChangeActiveStatus(id: number) {
    var result= this._baseService.get(AppSetting.DptReferenceActiveStatusUrl + id);
    return result;
  }

}
