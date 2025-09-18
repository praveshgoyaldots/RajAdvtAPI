import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { IndexModel } from "../../Model/general-model";
import { AppSetting } from "../../Model/appsetting";
import { VCLocationMasterViewModel } from "../../Model/VC/vc-locationmaster.model";

@Injectable({
  providedIn: "root",
})
export class VcLocationmasterService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.VCLocationMasterListUrl, model);
  }

  Add(model: VCLocationMasterViewModel) {
    return this._baseService.post(AppSetting.VCLocationMasterAddUrl, model);
  }

  Edit(model: VCLocationMasterViewModel) {
    return this._baseService.post(AppSetting.VCLocationMasterUpdateUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.VCLocationMasterUpdateStatusUrl + id
    );
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.VCLocationMasterGetByIdUrl + id);
  }

  Delete(id: number) {
    return this._baseService.get(AppSetting.VCLocationDeleteUrl + id);
  }
}
