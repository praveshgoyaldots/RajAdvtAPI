import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { IndexModel } from "../../Model/general-model";
import { AppSetting } from "../../Model/appsetting";
import { KPICategoryMasterModel } from "../../Model/Camparetive/kpicategory-model";

@Injectable({
  providedIn: "root",
})
export class KpiCategoryService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.KPICategoryMasterListUrl, model);
  }

  Add(model: KPICategoryMasterModel) {
    return this._baseService.post(AppSetting.KPICategoryMasterAddUrl, model);
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.KPICategoryMasterGetByIdUrl + id,
      null
    );
  }

  Edit(model: KPICategoryMasterModel) {
    return this._baseService.post(AppSetting.KPICategoryMasterEditUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.KPICategoryMasterUpdateStatusUrl + id
    );
  }
}
