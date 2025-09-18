import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { ProjectSubCategoryMasterModel } from '../Model/Master/project-sub-category.model';
import { ProjectSchemeCategoryMasterModel } from '../Model/Master/project-scheme-category-master-model';
@Injectable({
  providedIn: 'root'
})
export class ProjectSchemeCategoryService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
   return this._baseService.post(AppSetting.ProjectSchemeCategoryMasterListUrl, model);
  }

  Add(model: ProjectSchemeCategoryMasterModel) {
    return this._baseService.post(AppSetting.ProjectSchemeCategoryMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.ProjectSchemeCategoryMasterGetByIdUrl + id, null);
  }

  Edit(model: ProjectSchemeCategoryMasterModel) {
    return this._baseService.post(AppSetting.ProjectSchemeCategoryMasterEditUrl, model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.ProjectSchemeCategoryMasterUpdateStatusUrl + id);
  }

}
