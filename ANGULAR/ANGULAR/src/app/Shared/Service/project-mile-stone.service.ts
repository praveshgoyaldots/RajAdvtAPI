import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ProjectMileStoneMasterModel } from '../Model/Master/project-mile-stone.model';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class ProjectMileStoneService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
   return this._baseService.post(AppSetting.ProjectMileStoneMasterListUrl, model);
  }

  Add(model: ProjectMileStoneMasterModel) {
    return this._baseService.post(AppSetting.ProjectMileStoneMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.ProjectMileStoneMasterGetByIdUrl + id, null);
  }

  Edit(model: ProjectMileStoneMasterModel) {
    return this._baseService.post(AppSetting.ProjectMileStoneMasterEditUrl, model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.ProjectMileStoneMasterUpdateStatusUrl + id);
  }

  GetMilestoneByMilestoneCode(id) {
    return this._baseService.get(AppSetting.MilestoneByMilestoneCodeUrl + id, null);
  }

}
