import { Injectable } from '@angular/core';
import {  } from '../Model/commonddl.model';
import { BaseService } from './base.service';
import { DashboardPermissionModel } from '../Model/Master/dashboardPermission-model';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
@Injectable({
  providedIn: 'root'
})
export class dashboardPermissionService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.dashboardPermissionListUrl, model);

  }
  Add(model: DashboardPermissionModel) {
    return this._baseService.post(AppSetting.dashboardPermissionAddUrl, model);

  }

  
 
}
