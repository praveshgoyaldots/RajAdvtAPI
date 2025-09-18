import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';
import { Advertisement, AdvertisementRedesignRequestIdModel, ApproveByAdminModel, AdvertisementReportSearchModel } from '../Model/advertisement.model';
import { Params } from '../Model/service.model';
import { RedesignRequestModel } from '../Model/redesignrequest.model';
import { IndexModel } from '../Model/general-model';


@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private readonly _baseService: BaseService,) { }

  AddAdvertisement(model: Advertisement) {
    var result = this._baseService.post(AppSetting.AdvertisementAddUrl, model);
    return result;
  }

  GetList(model: IndexModel) {
    var result = this._baseService.post(AppSetting.AdvertisementListUrl, model);
    return result;
  }

  DeleteAdvertisement(id) {
    var result = this._baseService.get(AppSetting.AdvertisementDeleteUrl + id, null);
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(AppSetting.AdvertisementEditUrl + id, null);
    return result;
  }

  PublishAdvertisement(id) {
    var result = this._baseService.get(AppSetting.AdvertisementPublishUrl + id, null);
    return result;
  }


  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.AdvertisementUpdateStatusUrl + id);
  }

  RedesignRequestByPlatformUser(model: RedesignRequestModel) {
    const formData: FormData = new FormData();
    if (model.File) {
      for (let index = 0; index < model.File.length; index++) {
        var item = model.File.item(index);
        formData.append(item.name, item);
      }
    }

    formData.append("Data", JSON.stringify(model));
    formData.append("enctype", "multipart/form-data");

    var result = this._baseService.post(
      AppSetting.RedesignRequestByPlatformUserUrl,
      formData
    );
    return result;
  }

  GetRedesignListForAdmin(model: IndexModel) {

    var result = this._baseService.post(AppSetting.RedesignRequestforAdminUrl, model);
    return result;
  }

  GetRedesignDetailForAdmin(model: AdvertisementRedesignRequestIdModel) {

    var result = this._baseService.post(AppSetting.RedesignRequestDetailforAdminUrl, model);
    return result;
  }

  RedesignApproveByAdmin(model: ApproveByAdminModel) {

    var result = this._baseService.post(AppSetting.RedesignApproveByAdminUrl, model);
    return result;
  }

  GetAdvListForAdminDepartmentDepartmentPlatformUser(model: IndexModel) {
    return this._baseService.post(AppSetting.AdvListForUsersUrl, model);
  }

  UploadedService(id) {
    return this._baseService.get(AppSetting.AdvUploadedUrl + id, null);
  }

  LockToggle(id) {
    return this._baseService.get(AppSetting.AdvertisementLockUrl + id, null);
  }

  GetVisitorCountReportList(model: AdvertisementReportSearchModel) {
    return this._baseService.post(AppSetting.VisitorCountReportUrl, model);
  }

  GetVisitorCountDetailReportList(model: AdvertisementReportSearchModel) {
    return this._baseService.post(AppSetting.VisitorCountDetailReportUrl, model);
  }

  GetDateWiseVisitorCountReportList(model: AdvertisementReportSearchModel) {
    return this._baseService.post(AppSetting.DateWiseVisitorCountReportUrl, model);
  }

}
