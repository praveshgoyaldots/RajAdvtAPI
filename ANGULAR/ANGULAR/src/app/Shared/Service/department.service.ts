import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { DepartmentMasterModel, LoginUserDepartmentListModel, DepartmentProfileModel, DepartmentProfileExistModel } from '../Model/Master/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private readonly _baseService: BaseService) {

  }


 GetList(model: IndexModel, isActive: number) {

   return this._baseService.post(AppSetting.DepartmentMasterListUrl + isActive, model);
 }

 Add(model: DepartmentMasterModel) {
   return this._baseService.post(AppSetting.DepartmentMasterAddUrl, model);
 }

 Edit(model: DepartmentMasterModel) {
   return this._baseService.post(AppSetting.DepartmentMasterUpdateUrl, model);
 }

 ChangeActiveStatus(id: number) {
   return this._baseService.get(AppSetting.DepartmentMasterUpdateStatusUrl + id);
 }

 TransferMenuClassificationToDepartmentMenu(dptCode: number) {
  return this._baseService.get(AppSetting.TransferMenuClassificationToDepartmentMenuUrl + dptCode);
}

TransferDptMenuToDepartmentSubMenu(dptCode: number) {
  return this._baseService.get(AppSetting.TransferDptMenuToDepartmentSubMenuUrl + dptCode);
}

 GetById(id: number) {
   return this._baseService.get(AppSetting.DepartmentMasterGetByIdUrl + id);
 }

//#region <Report Scheme and department>

GetDepartmentReport() {
  return this._baseService.get(AppSetting.DepartmentReportUrl);
}

GetDepartmentSchemeReport() {
  return this._baseService.get(AppSetting.DepartmentSchemeReportUrl);
}

//#endregion <Report Scheme and department>

//#region <Website Details>

GetLoginUserDepartmentList() {
  return this._baseService.get(AppSetting.GetLoginUserDepartmentListUrl);
}

UpdateLoginUserDepartment(model: LoginUserDepartmentListModel) {
  return this._baseService.post(AppSetting.UpdateLoginUserDepartmentUrl, model);
}

//#endregion <Website Details>

//#region <Department Profile>

GetDepartmentProfileList(model: IndexModel) {
  return this._baseService.post(AppSetting.GetDepartmentProfileListUrl, model);
}

GetDepartmentProfileById(id: number) {
  return this._baseService.get(AppSetting.GetDepartmentProfileByIdUrl + id);
}

DepartmentProfileAddUpdate(model: DepartmentProfileModel) {
  return this._baseService.post(AppSetting.DepartmentProfileAddUpdateUrl, model);
}

UpdateDepartmentProfileStatus(id: number) {
  return this._baseService.get(AppSetting.UpdateDepartmentProfileStatusUrl + id);
}

IsDepartmentProfileExist(model: DepartmentProfileExistModel) {
  return this._baseService.post(AppSetting.IsDepartmentProfileExistUrl, model);
}

//#endregion <Department Profile>

}
