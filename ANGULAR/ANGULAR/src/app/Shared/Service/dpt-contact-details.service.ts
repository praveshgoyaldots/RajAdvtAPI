import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { DepartmentContactDetailsModel } from '../Model/Master/department-contact-details.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentContactDetailsService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.DepartmentContactDetailsGetAllUrl, model);
  }

  AddUpdate(model: DepartmentContactDetailsModel) {
    return this._baseService.post(AppSetting.DepartmentContactDetailsAddUpdateUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.DepartmentContactDetailsGetByIdUrl + id, null);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.DepartmentContactDetailsUpdateStatusUrl + id);
  }

  GetDepartmentByCode(id: number) {
    return this._baseService.get(AppSetting.GetDepartmentByCodeUrl + id);
  }

  GetDepartmentOfficerByDepartment(departmentCode: number) {
    return this._baseService.get(AppSetting.DepartmentOfficerByDepartmentUrl + departmentCode);
  }

}
