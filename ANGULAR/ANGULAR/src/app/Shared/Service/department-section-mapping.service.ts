import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { DepartmentSectionMappingModel } from '../Model/department-section-mapping-model';
import { IndexModel } from '../Model/general-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentSectionMappingService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.DepartmentSectionMappingListUrl, model);
  }

  Add(model: DepartmentSectionMappingModel) {
    return this._baseService.post(AppSetting.DepartmentSectionMappingAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.DepartmentSectionMappingGetByIdUrl + id,
      null
    );
  }

  Edit(model: DepartmentSectionMappingModel) {
    return this._baseService.post(AppSetting.DepartmentSectionMappingEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.DepartmentSectionMappingUpdateStatusUrl + id
    );
  }
}
