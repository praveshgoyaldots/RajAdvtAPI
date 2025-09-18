import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AdvCategoryModel } from '../Model/Master/AdvCategory.model';
import { IndexModel } from '../Model/general-model';
import { MonitoringParameterMasterModel } from '../Model/Master/monitoring-parameters-master.model';
@Injectable({
  providedIn: 'root'
})
export class MonitoringParameterMasterService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    //
    var result = this._baseService.post(AppSetting.MPMListUrl, model);
    return result;
  }

  Add(model: MonitoringParameterMasterModel) {
    var result = this._baseService.post(AppSetting.MPMAddUrl, model);
    return result;
  }

  GetById(id) {
    //
    var result = this._baseService.get(AppSetting.MPMUrlById + id, null);
    return result;
  }

  Edit(model: MonitoringParameterMasterModel) {
    var result = this._baseService.post(AppSetting.MPMEditUrl, model
    );
    return result;
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.MPMActiveStatusUrl + id);
  }

}
