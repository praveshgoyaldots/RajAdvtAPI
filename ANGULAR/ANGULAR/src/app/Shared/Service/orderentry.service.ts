import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { AppSetting } from "../Model/appsetting";
import {
  OrderEntryModel,
  UploadAttachmentModel,
  CustomDateSearchModel,
  OrderReportSearchModel,
  DepartmentCategoryReportFilterModel,
} from "../Model/orderlist.model";
import { IndexModel, DateWiseSearchModel } from "../Model/general-model";
import { OrderSummaryReportFilterModel, OrderSummaryTypeReportWithLastTransactionModel } from '../Model/generate-order.model';

@Injectable({
  providedIn: "root",
})
export class OrderEntryService {
  constructor(private readonly _baseService: BaseService) {}

  GetOrderEntryList(model: CustomDateSearchModel) {
    var result = this._baseService.post(AppSetting.RelatedToOrderUrl, model);
    return result;
  }

  AddOrderEntry(model: OrderEntryModel) {
    var result = this._baseService.post(AppSetting.OrderEntryUrl, model);
    return result;
  }

  DeleteOrder(id) {
    var result = this._baseService.get(AppSetting.OrderDeleteUrl + id);
    return result;
  }

  GetByID(id) {
    var result = this._baseService.get(AppSetting.OrderByIdUrl + id, null);
    return result;
  }

  SetStatus(id) {
    var result = this._baseService.get(AppSetting.OrderSetStatusUrl + id);
    return result;
  }

  UploadAttachment(model: UploadAttachmentModel) {
    var result = this._baseService.post(
      AppSetting.OrderUploadAttachmentUrl,
      model
    );
    return result;
  }

  LockToggle(id) {
    var result = this._baseService.get(AppSetting.OrderLockUrl + id);
    return result;
  }

  //start
  //this method for order report list
  GetOrderReportList(model : DepartmentCategoryReportFilterModel) {
    var result = this._baseService.post(AppSetting.OrderReportApiUrl, model);
    return result;
  }

  OrderDetailReport(model: OrderReportSearchModel) {
    return this._baseService.post(AppSetting.OrderDetailReportApiUrl, model);
  }
  //end

//#region <order report>

GetOrderSummaryReport(model: OrderSummaryReportFilterModel) {
  return this._baseService.post(AppSetting.OrderSummaryReportUrl, model);
}

GetOrderSummaryReportWithLastTransaction(model: OrderSummaryReportFilterModel) {
  return this._baseService.post(AppSetting.OrderSummaryReportWithLastTransactionUrl, model);
}

GetOrderTypeSummaryReportWithLastTransaction(model: OrderSummaryReportFilterModel) {
  return this._baseService.post(AppSetting.GetOrderTypeSummaryReportWithLastTransaction, model);
}

GetOrderDepartmentCountReport(model: DateWiseSearchModel) {
  var result = this._baseService.post(AppSetting.GetOrderDepartmentCountReport, model);
  return result;
}
//#endregion <order report>

//#region

ExportGovernmentDocumentData(model: CustomDateSearchModel) {
  var result = this._baseService.post(AppSetting.ExportGovernmentDocumentDataUrl, model);
  return result;
}

//#endregion
}
