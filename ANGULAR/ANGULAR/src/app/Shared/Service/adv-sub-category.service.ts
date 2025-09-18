import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AdvSubCategoryModel } from '../Model/Master/AdvSubCategory.model';
@Injectable({
  providedIn: 'root'
})
export class AdvSubCategoryService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetList() {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvSubCategoryListUrl
    );
    return result;
  }

  AddAdvSubCategory(model: AdvSubCategoryModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.AdvSubCategoryAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvSubCategoryUrlById + id, null);
    return result;
  }

  EditAdvSubCategory(model: AdvSubCategoryModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.AdvSubCategoryEditUrl, model
    );
    return result;
  }

  DeleteAdvSubCategory(Id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvSubCategoryDeleteUrl + Id, null);
    return result;

  }


  ChangeActiveStatus(id: number) {
    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvSubCategoryActiveStatusUrl + id);
    // return this._baseService.get(AppSetting.AdvSubCategoryActiveStatusUrl + id);
    return result;
  }
}
