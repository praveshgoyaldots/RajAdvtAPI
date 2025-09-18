import { Injectable } from '@angular/core';
import { IndexModel } from '../../Model/general-model';
import { DistrictKPIModel } from '../../Model/Camparetive/district-kpimodel';
import { BaseService } from '../base.service';
import { AppSetting } from '../../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class DistrictkpiService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel,catCode) {
    return this._baseService.post(AppSetting.DistrictKPIListUrl+catCode, model);
  }

  Add(model: DistrictKPIModel) {
    return this._baseService.post(AppSetting.DistrictKPIAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.DistrictKPIGetByIdUrl + id,
      null
    );
  }

  Edit(model: DistrictKPIModel) {
    return this._baseService.post(AppSetting.DistrictKPIEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.DistrictKPIUpdateStatusUrl + id
    );
  }

  isDuplicateData(model: DistrictKPIModel) {
    return this._baseService.post(AppSetting.IsDistrictKPIDuplicateUrl, model);
  }

  GetAllParameterList(kPICode: number,dpt=0,catCode=0) {
    return this._baseService.get(AppSetting.DistrictKPIAllParameterListUrl+'?kPICode=' +kPICode + '&dpt='+dpt +'&catCode='+catCode);
  }

}
