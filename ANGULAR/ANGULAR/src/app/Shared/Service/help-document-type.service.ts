import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { HelpDocumentTypeMasterModel } from '../Model/help-document-type-master-model';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class HelpDocumentTypeService {
  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.HelpDocumentTypeMasterListUrl, model);
  }

  Add(model: HelpDocumentTypeMasterModel) {
    return this._baseService.post(AppSetting.HelpDocumentTypeMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.HelpDocumentTypeMasterGetByIdUrl + id, null);
  }

  Edit(model: HelpDocumentTypeMasterModel) {
    return this._baseService.post(AppSetting.HelpDocumentTypeMasterEditUrl, model
    );
  }

  UpdateStatus(id) {
    return this._baseService.get(AppSetting.HelpDocumentTypeMasterUpdateStatusUrl + id, null);
  }
}
