import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { AdminDepartmentMasterModel } from '../Model/Master/admin-department.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDepartmentService {

  constructor(private readonly _baseService: BaseService) {

  }

 GetList(model: IndexModel) {

   return this._baseService.post(AppSetting.AdminDepartmentListUrl, model);
 }

 Add(model: AdminDepartmentMasterModel) {
   return this._baseService.post(AppSetting.AdminDepartmentAddUrl, model);
 }

 Edit(model: AdminDepartmentMasterModel) {
   return this._baseService.post(AppSetting.AdminDepartmentUpdateUrl, model);
 }

 ChangeActiveStatus(id: number) {
   return this._baseService.get(AppSetting.AdminDepartmentUpdateStatusUrl + id);
 }

 GetById(id: number) {
   return this._baseService.get(AppSetting.AdminDepartmentGetByIdUrl + id);
 }
}
