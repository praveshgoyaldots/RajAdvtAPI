import { ESignPdfModel } from './../Model/generate-order.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from '../Model/general-model';
import { OrderGenerateMasterModel, ReferencyNotificationResponseModel } from '../Model/generate-order.model';
@Injectable({
  providedIn: 'root'
})
export class GenerateOrderService {

  constructor(
    private readonly _baseService: BaseService,
  ) {
  }
  GetList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.GenerateOrderListUrl, model);
    return result;
  }

  GetAuthorityList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.GenerateOrderAuthorityListUrl, model);
    return result;
  }

  Add(model: OrderGenerateMasterModel) {
    var result = this._baseService.post(AppSetting.GenerateOrderAddUrl, model);
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(AppSetting.GenerateOrderGetByIdUrl + id, null);
    return result;
  }

  Edit(model: OrderGenerateMasterModel) {
    var result = this._baseService.post(AppSetting.GenerateOrderEditUrl, model
    );
    return result;
  }

  Lock(id) {
    var result = this._baseService.get(AppSetting.GenerateOrderLock + id, null);
    return result;
  }

  SetStatus(id,dispatchNo) {
    var result = this._baseService.get(AppSetting.GenerateOrderSetStatus + id + '&dispatchNo=' + dispatchNo, null);
    return result;
  }

  GeneratePdf(id: number) {
    var result = this._baseService.get(AppSetting.GenerateOrderPdfUrl+id);
    return result;
  }

  GenerateWithEsignPdf(model: ESignPdfModel) {
    var result = this._baseService.post(AppSetting.GenerateWithEsignPdfUrl,model);
    return result;
  }

  GenerateWord(id: number) {
    var result = this._baseService.get(AppSetting.GenerateOrderWordUrl+id);
    return result;
  }

  GenerateUINumber(id: number) {
    var result = this._baseService.get(AppSetting.GenerateUINumberUrl+id);
    return result;
  }

  SendNotification(model: ReferencyNotificationResponseModel) {
    var result = this._baseService.post(AppSetting.GenerateSendNotificationUrl, model
    );
    return result;
  }

  SetFinalAProval(id: number) {
    var result = this._baseService.get(AppSetting.GeneratSetFinalAProvalUrl+id);
    return result;
  }

  GetFinalApprovalList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.GeneratFinalAprovalListUrl, model
    );
    return result;
  }
}
