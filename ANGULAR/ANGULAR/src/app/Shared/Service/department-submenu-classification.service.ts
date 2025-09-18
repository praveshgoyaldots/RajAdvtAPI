import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { DepartmentSubMenuModel, ImportSectionMenuAndSubMenuFilterModel } from '../Model/Master/department.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentSubmenuClassificationService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.DepartmentSubMenuListUrl, model);
  }

  Add(model: DepartmentSubMenuModel) {
    return this._baseService.post(AppSetting.DepartmentSubMenuAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.DepartmentSubMenuGetByIdUrl + id,
      null
    );
  }

  Edit(model: DepartmentSubMenuModel) {
    return this._baseService.post(AppSetting.DepartmentSubMenuEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.DepartmentSubMenuUpdateStatusUrl + id
    );
  }

  //#region <ImportSectionMenuAndSubMenu>


  ImportSectionMenuAndSubMenu(model: ImportSectionMenuAndSubMenuFilterModel) {
  return this._baseService.post(AppSetting.ImportSectionMenuAndSubMenuUrl, model);
}
//#endregion
}
