import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { CitizenAttachmentModel } from '../Model/Master/citizen-attachment.model';

@Injectable({
  providedIn: 'root'
})

export class CitizenAttachmentService {
  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.CitizenAttachmentListUrl, model);
  }

  Add(model: CitizenAttachmentModel) {
    return this._baseService.post(AppSetting.CitizenAttachmentAddUrl, model);
  }

  Detail(id: number) {
    return this._baseService.get(AppSetting.CitizenAttachmentDetailUrl + id);
  }

  Edit(id: number, model: CitizenAttachmentModel) {
    return this._baseService.post(AppSetting.CitizenAttachmentEditUrl + id, model);
  }

  ChangeDeleteStatus(id: number) {
    return this._baseService.get(AppSetting.CitizenAttachmentDeleteStatusChangeUrl + id);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.CitizenAttachmentActiveStatusChangeUrl + id);
  }

}
