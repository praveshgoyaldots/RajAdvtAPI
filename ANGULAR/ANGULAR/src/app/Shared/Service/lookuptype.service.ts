import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { LookupTypeViewModel } from '../Model/lookuptype.model';
@Injectable({
  providedIn: 'root'
})
export class LookuptypeService {

  constructor(private readonly _baseService: BaseService, ) {

  }
  GetList() {

    var result = this._baseService.get(AppSetting.LookupTypeListUrl
    );
    return result;
  }

  AddLookUpType(model: LookupTypeViewModel) {
    var result = this._baseService.post(AppSetting.LookupTypeAddUrl, model
    );
    return result;
  }


  GetById(id) {

    var result = this._baseService.get(AppSetting.LookupTypeUrlById + id, null);
    return result;
  }


  GetByTypeId(id) {

    var result = this._baseService.get(AppSetting.LookupTypeGetById + id, null);
    return result;
  }


  EditLookUpType(model: LookupTypeViewModel) {
    var result = this._baseService.put(AppSetting.LookupTypeEditUrl, model
    );
    return result;
  }

  DeleteLookUpType(Id) {

    var result = this._baseService.get(AppSetting.LookupTypeDeleteUrl + Id, null);
    return result;
  }
}
