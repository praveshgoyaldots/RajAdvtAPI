import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { CCCategoryMasterModel, CCCategoryLookupModel } from '../Model/Master/cc-category-master-model';

@Injectable({
  providedIn: 'root'
})
export class CCCategoryService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {

    return this._baseService.post(AppSetting.CCCategoryListUrl, model);
  }

  Add(model: CCCategoryMasterModel) {
    return this._baseService.post(AppSetting.CCCategoryAddUrl, model);
  }

  Edit(model: CCCategoryMasterModel) {
    return this._baseService.post(AppSetting.CCCategoryUpdateUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.CCCategoryUpdateStatusUrl + id);
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.CCCategoryGetByIdUrl + id);
  }

 
  GetCCCategoryReferenceList(model: CCCategoryLookupModel) {
    return this._baseService.post(AppSetting.CCCategoryReferenceListUrl , model );
  }

  SaveCCCategoryMapping(model: CCCategoryLookupModel) {
    return this._baseService.post(AppSetting.SaveCCCategoryMappingtUrl, model);
  }

}
