import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AdvCategoryModel } from '../Model/Master/AdvCategory.model';
import { IndexModel } from '../Model/general-model';
import { JANCategoryMasterModel } from '../Model/Master/jan-category-master.model';
@Injectable({
  providedIn: 'root'
})
export class JankalyanCategoryService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.JanCategoryMasterListUrl, model);
  }

  Add(model: JANCategoryMasterModel) {
    return this._baseService.post(AppSetting.JanCategoryMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.JanCategoryMasterGetByIdUrl + id, null);
  }

  Edit(model: JANCategoryMasterModel) {
    return this._baseService.post(AppSetting.JanCategoryMasterEditUrl, model
    );
  }

  UpdateStatus(id) {
    return this._baseService.get(AppSetting.JanCategoryMasterUpdateStatusUrl + id, null);
  }

}
