import { Injectable } from "@angular/core";
import { AppSetting } from "../../Model/appsetting";
import { IndexModel } from "../../Model/general-model";
import { BaseService } from "../base.service";
import {
  TenderMasterModel,
  TenderMappingModel
} from "../../Model/TenderPressRelease/tender-master-model";

@Injectable({
  providedIn: "root"
})
export class TenderMasterService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.TenderMasterListUrl, model);
  }

  Add(model: TenderMasterModel) {
    return this._baseService.post(AppSetting.TenderMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(AppSetting.TenderMasterGetByIdUrl + id, null);
  }

  Edit(model: TenderMasterModel) {
    return this._baseService.post(AppSetting.TenderMasterEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.TenderMasterUpdateStatusUrl + id);
  }

  UpdateTenderProgress(model: TenderMappingModel) {
    return this._baseService.post(AppSetting.UpdateTenderProgressUrl, model);
  }

  ModifyTenderProgress(model: TenderMappingModel) {
    return this._baseService.post(AppSetting.ModifyTenderProgressUrl, model);
  }

  GetTenderDetailWithChildList(id: number) {
    return this._baseService.get(AppSetting.TenderDetailWithChildListUrl + id);
  }

  GetTenderProgressById(id: number) {
    return this._baseService.get(AppSetting.TenderProgressByIdUrl + id);
  }
}
