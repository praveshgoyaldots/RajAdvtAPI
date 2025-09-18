import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { BeneficiaryCategoryMasterModel } from '../Model/Master/beneficiary-category-master-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryCategoryMasterService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.BeneficiaryCategoryMasterListUrl, model);
  }

  Add(model: BeneficiaryCategoryMasterModel) {
    return this._baseService.post(AppSetting.BeneficiaryCategoryMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.BeneficiaryCategoryMasterGetByIdUrl + id,
      null
    );
  }

  Edit(model: BeneficiaryCategoryMasterModel) {
    return this._baseService.post(AppSetting.BeneficiaryCategoryMasterEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.BeneficiaryCategoryMasterUpdateStatusUrl + id
    );
  }
}
