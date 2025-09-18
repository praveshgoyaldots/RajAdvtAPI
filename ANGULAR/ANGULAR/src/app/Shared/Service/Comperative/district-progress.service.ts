import { Injectable } from '@angular/core';
import { IndexModel } from '../../Model/general-model';
import { BaseService } from '../base.service';
import { AppSetting } from '../../Model/appsetting';
import { DistrictProgressModel } from '../../Model/Camparetive/district-progress-model';

@Injectable({
  providedIn: 'root'
})
export class DistrictProgressService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel,catCode) {
    return this._baseService.post(AppSetting.DistrictProgressListUrl+catCode, model);
  }

  Add(model: DistrictProgressModel) {
    return this._baseService.post(AppSetting.DistrictProgressAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.DistrictProgressGetByIdUrl + id,
      null
    );
  }

  Edit(model: DistrictProgressModel) {
    return this._baseService.post(AppSetting.DistrictProgressEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.DistrictProgressUpdateStatusUrl + id
    );
  }

  isDuplicateData(model: DistrictProgressModel) {
    return this._baseService.post(AppSetting.IsDistrictProgressDuplicateUrl, model);
  }

  GetAllParameterList(kPICode: number,dpt=0,catCode=0) {
    return this._baseService.get(AppSetting.DistrictProgressAllParameterListUrl+'?kPICode=' +kPICode + '&dpt='+dpt +'&catCode='+catCode);
  }

}
