import { Injectable } from '@angular/core';
import { AppSetting } from '../../Model/appsetting';
import { IndexModel } from '../../Model/general-model';
import { BaseService } from '../base.service';
import { PreviousGovernmentEntryModel } from '../../Model/Camparetive/previous-government-entry-model';

@Injectable({
  providedIn: 'root'
})
export class PreviousGovernmentEntryService {

  constructor(private readonly _baseService: BaseService) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.PreviousGovernmentEntryListUrl, model);
  }

  Add(model: PreviousGovernmentEntryModel) {
    return this._baseService.post(AppSetting.PreviousGovernmentEntryAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.PreviousGovernmentEntryGetByIdUrl + id,
      null
    );
  }

  Edit(model: PreviousGovernmentEntryModel) {
    return this._baseService.post(AppSetting.PreviousGovernmentEntryEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.PreviousGovernmentEntryUpdateStatusUrl + id
    );
  }


  GetAllYearList() {
    return this._baseService.get(
      AppSetting.AllYearListUrl
    );
  }
}
