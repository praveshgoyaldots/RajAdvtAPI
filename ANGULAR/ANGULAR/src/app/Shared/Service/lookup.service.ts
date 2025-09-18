import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { LookupModel, LookUpFilterModel } from '../Model/lookup.model';



@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private readonly _baseService: BaseService, ) {

  }
  GetList(model:LookUpFilterModel) {

    var result = this._baseService.post(AppSetting.LookupListUrl,model
    );
    return result;
  }

  AddLookUp(model: LookupModel) {
    var result = this._baseService.post(AppSetting.LookUpAddUrl, model
    );
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(AppSetting.LookUpUrlById + id, null);
    return result;
  }

  EditLookUp(model: LookupModel) {
    var result = this._baseService.post(AppSetting.LookUpEditUrl, model
    );
    return result;
  }

  DeleteLookUp(Id) {

    var result = this._baseService.get(AppSetting.LookUpDeleteUrl + Id, null);
    return result;
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.LookUpMasterActiveStatusUrl + id);
  }

}
