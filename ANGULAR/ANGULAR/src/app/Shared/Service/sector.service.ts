import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SectorModel } from '../Model/sector.model';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private readonly _baseService: BaseService, ) {

  }

  GetList() {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.SectorListUrl
    );
    return result;
  }

  AddSector(model: SectorModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.SectorAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.SectorUrlById + id, null);
    return result;
  }

  EditSector(model: SectorModel) {
    var result = this._baseService.put(AppSetting.BaseApiUrl + AppSetting.SectorEditUrl, model
    );
    return result;
  }

  DeleteSector(Id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.SectorDeleteUrl + Id, null);
    return result;
  }
}
