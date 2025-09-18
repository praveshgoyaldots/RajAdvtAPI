import { Injectable } from "@angular/core";
import { ADVTJankalyanAdvertisementModel } from "../Model/advtjankalyan-advertisement-model";
import { IndexModel } from "../Model/general-model";
import { BaseService } from "./base.service";
import { AppSetting } from "../Model/appsetting";

@Injectable({
  providedIn: "root",
})
export class JankalyanAdvertisementService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(
      AppSetting.JankalyanAdvertisementListUrl,
      model
    );
  }

  Add(model: ADVTJankalyanAdvertisementModel) {
    return this._baseService.post(
      AppSetting.JankalyanAdvertisementAddUrl,
      model
    );
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.JankalyanAdvertisementGetByIdUrl + id,
      null
    );
  }

  Edit(model: ADVTJankalyanAdvertisementModel) {
    return this._baseService.post(
      AppSetting.JankalyanAdvertisementEditUrl,
      model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.JankalyanAdvertisementUpdateStatusUrl + id
    );
  }
}
