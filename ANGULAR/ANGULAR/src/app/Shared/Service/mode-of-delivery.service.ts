import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SectorModel } from '../Model/sector.model';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class ModeOfDeliveryService {

  constructor(private readonly _baseService: BaseService, ) {
  }


  GetList() {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.ModeOfDeliveryListUrl);
    return result;
  }

  AddModeOfDelivery(model: SectorModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.ModeOfDeliveryAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.ModeOfDeliveryUrlById + id, null);
    return result;
  }

  EditModeOfDelivery(model: SectorModel) {
    var result = this._baseService.put(AppSetting.BaseApiUrl + AppSetting.ModeOfDeliveryEditUrl, model
    );
    return result;
  }

  DeleteModeOfDelivery(Id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.ModeOfDeliveryDeleteUrl + Id, null);
    return result;
  }
}
