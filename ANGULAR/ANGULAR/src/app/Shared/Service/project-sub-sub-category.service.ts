import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { SubSubCategoryMasterModel } from '../Model/Master/projectsub-sub-category-master-model';
@Injectable({
  providedIn: 'root'
})
export class ProjectSubSubCategoryService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
   return this._baseService.post(AppSetting.ProjectSubSubCategoryMasterListUrl, model);
  }

  Add(model: SubSubCategoryMasterModel) {
    return this._baseService.post(AppSetting.ProjectSubSubCategoryMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.ProjectSubSubCategoryMasterGetByIdUrl + id, null);
  }

  Edit(model: SubSubCategoryMasterModel) {
    return this._baseService.post(AppSetting.ProjectSubSubCategoryMasterEditUrl, model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.ProjectSubSubCategoryMasterUpdateStatusUrl + id);
  }

  GetAllSubSubCategoryForDepartment() {
    return this._baseService.get(AppSetting.AllSubSubCategoryForDepartmentUrl);
  }

  DeleteProjectSubSubCategory(id: number) {
    return this._baseService.get(AppSetting.ProjectSubSubCategoryDeleteUrl + id);
  }

}
