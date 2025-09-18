import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AdvCategoryModel } from '../Model/Master/AdvCategory.model';
import { IndexModel } from '../Model/general-model';
@Injectable({
  providedIn: 'root'
})
export class AdvCategoryService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    //
    var result = this._baseService.post(AppSetting.AdvCategoryListUrl, model);
    return result;
  }

  AddAdvCategory(model: AdvCategoryModel) {
    var result = this._baseService.post(AppSetting.AdvCategoryAddUrl, model);
    return result;
  }

  GetById(id) {
    //
    var result = this._baseService.get(AppSetting.AdvCategoryUrlById + id, null);
    return result;
  }

  EditAdvCategory(model: AdvCategoryModel) {
    var result = this._baseService.post(AppSetting.AdvCategoryEditUrl, model
    );
    return result;
  }

  DeleteAdvCategory(Id) {

    var result = this._baseService.get(AppSetting.AdvCategoryDeleteUrl + Id, null);
    return result;
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.AdvCategoryMasterActiveStatusUrl + id);
  }

}
