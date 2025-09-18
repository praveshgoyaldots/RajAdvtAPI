import { MenuViewModel } from 'src/app/Shared/Model/menu-view-model.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MenuMasterServicveService {


  constructor(private readonly _baseService: BaseService, ) {

  }
  GetList() {

    return this._baseService.get(AppSetting.MenuMasterListUrl);
  }

  AddMenu(model: MenuViewModel) {
    return this._baseService.post(AppSetting.MenuMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.MenuMasterDetailUrl + id, null);
  }
  GetAllByuserId(id) {
    return this._baseService.get(AppSetting.MenuMasterByUserIdUrl + id);
  }

  EditMenu(id: number, model: MenuViewModel) {
    return this._baseService.post(AppSetting.MenuMasterEditUrl + id, model);
  }

  DeleteMenu(Id) {
    return this._baseService.get(AppSetting.MenuMasterDeleteUrl + Id, null);
  }
}
