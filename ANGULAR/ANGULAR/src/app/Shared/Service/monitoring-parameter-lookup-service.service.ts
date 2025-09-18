import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MonitoringParameterlookupModel, MonitoringParameterLookupTypeModel } from '../Model/Master/monitoring-parameter-lookup-model';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class MonitoringParameterLookupServiceService {

  constructor(private readonly _baseService: BaseService,) { }

  //  #region MonitoringParameterLookup
  GetAll(model: IndexModel) {
    var result = this._baseService.post(AppSetting.MonitoringParameterlookupListUrl, model);
    return result;
  }

  Add(model: MonitoringParameterlookupModel) {
    const result = this._baseService.post(AppSetting.MonitoringParameterlookupAddUrl, model);
    return result;
  }

  Edit(model: MonitoringParameterlookupModel) {
    var result = this._baseService.post(AppSetting.MonitoringParameterlookupEditUrl, model);
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.MonitoringParameterlookupByIdUrl + id, null);
    return result;
  }
  //#endregion MonitoringParameterLookup
 
  //  #region MonitoringParameterLookupType
  GetAllLookupType(model: IndexModel) {

    var result = this._baseService.post(AppSetting.MonitoringParameterlookupTypeListUrl, model);
    return result;
  }

  CreateLookupType(model: MonitoringParameterLookupTypeModel) {
    const result = this._baseService.post(AppSetting.MonitoringParameterlookupTypeAddUrl, model);
    return result;
  }

  EditLookupType(model: MonitoringParameterLookupTypeModel) {
    var result = this._baseService.post(AppSetting.MonitoringParameterlookupTypeEditUrl, model);
    return result;
  }

  GetByIdLookupType(id) {

    var result = this._baseService.get(AppSetting.MonitoringParameterlookupTypeByIdUrl + id, null);
    return result;
  }
  //#endregion MonitoringParameterLookupType

}
