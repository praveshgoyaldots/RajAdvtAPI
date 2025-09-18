import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { ProjectSubCategoryMasterModel } from '../Model/Master/project-sub-category.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectSubCategoryService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
   return this._baseService.post(AppSetting.ProjectSubCategoryMasterListUrl, model);
  }

  Add(model: ProjectSubCategoryMasterModel) {
    return this._baseService.post(AppSetting.ProjectSubCategoryMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.ProjectSubCategoryMasterGetByIdUrl + id, null);
  }

  Edit(model: ProjectSubCategoryMasterModel) {
    return this._baseService.post(AppSetting.ProjectSubCategoryMasterEditUrl, model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.ProjectSubCategoryMasterUpdateStatusUrl + id);
  }

  GetProjectSubCategoryByCategoryCode(catCode: number) {
    return this._baseService.get(AppSetting.ProjectSubCategoryByCategoryCodeUrl + catCode);
  }

  DeleteProjectSubCategory(id: number) {
    return this._baseService.get(AppSetting.ProjectSubCategoryDeleteUrl + id);
  }
  
}
