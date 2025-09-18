import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AdvApprovalDetailModel } from '../Model/Master/advApprovalDetail.model';
import { AppSetting } from '../Model/appsetting';
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: 'root'
})
export class AdvapprovaldetailService {

  constructor(private readonly _baseService: BaseService, ) {

  }

  GetList(model: IndexModel) {

    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.AdvApprovalDetailListUrl, model);
    return result;
  }

  AddAdvApprovalDetail(model: AdvApprovalDetailModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.AdvApprovalDetailAddUrl, model
    );
    return result;
  }

  GetById(id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvApprovalDetailUrlById + id, null);
    return result;
  }

  EditAdvApprovalDetail(model: AdvApprovalDetailModel) {
    var result = this._baseService.post(AppSetting.BaseApiUrl + AppSetting.AdvApprovalDetailEditUrl, model
    );
    return result;
  }

  DeleteAdvApprovalDetail(Id) {

    var result = this._baseService.get(AppSetting.BaseApiUrl + AppSetting.AdvApprovalDetailDeleteUrl + Id, null);
    return result;

  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.AdvApprovalDetailMasterActiveStatusUrl + id);
  }
}
