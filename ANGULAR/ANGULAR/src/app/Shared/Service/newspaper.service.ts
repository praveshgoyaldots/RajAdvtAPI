import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { NewspaperModal, NewspaperProgressMappingModel } from '../Model/newspaper-modal';

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {
  constructor(
    private readonly _baseService: BaseService,
  ) {
  }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.NewspaperListUrl, model);
  }

  Add(model: NewspaperModal) {
    return this._baseService.post(AppSetting.NewspaperAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.NewspaperGetByIdUrl + id, null);
  }

  Edit(model: NewspaperModal) {
    return this._baseService.post(AppSetting.NewspaperEditUrl, model
    );
  }

  UpdateStatus(id) {
    return this._baseService.get(AppSetting.NewspaperUpdateStatusUrl + id, null);
  }

  GetNewspaperTransactionDetailWithProgressList(id) {
    return this._baseService.get(AppSetting.NewspaperTransactionDetailWithProgressListUrl + id, null);
  }

  //#region <Update Progress>

  UpdateNewsProgress(model: NewspaperProgressMappingModel) {
    return this._baseService.post(AppSetting.NewspaperUpdateNewsProgressUrl, model
    );
  }

  GetNewspaperShortDetailById(id) {
    return this._baseService.get(AppSetting.NewspaperShortDetailByIdsUrl + id, null);
  }

  GetNewsProgressById(id) {
    return this._baseService.get(AppSetting.NewsProgressByIdUrl + id, null);
  }

  EditNewsProgress(model: NewspaperProgressMappingModel) {
    return this._baseService.post(AppSetting.EditNewsProgressUrl, model
    );
  }

  //#endregion
}
