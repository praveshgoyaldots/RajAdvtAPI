import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { ProjectCategoryMaster } from '../Model/Master/project-category-master-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService {
  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.ProjectCategoryMasterListUrl, model);
  }

  Add(model: ProjectCategoryMaster) {
    return this._baseService.post(AppSetting.ProjectCategoryMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.ProjectCategoryMasterGetByIdUrl + id, null);
  }

  Edit(model: ProjectCategoryMaster) {
    return this._baseService.post(AppSetting.ProjectCategoryMasterEditUrl, model
    );
  }

  UpdateStatus(id) {
    return this._baseService.get(AppSetting.ProjectCategoryMasterUpdateStatusUrl + id, null);
  }
}
