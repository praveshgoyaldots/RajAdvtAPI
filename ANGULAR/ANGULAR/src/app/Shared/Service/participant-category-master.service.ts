import { Injectable } from "@angular/core";
import { BaseService } from "src/app/Shared/Service/base.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { IndexModel } from "../Model/general-model";
import { ParticipantCategoryMasterModel } from "../Model/Master/participant-category-master.model";
@Injectable({
  providedIn: "root"
})
export class ParticipantCategoryMasterService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(
      AppSetting.ParticipantCategoryMasterListUrl,
      model
    );
  }

  Add(model: ParticipantCategoryMasterModel) {
    return this._baseService.post(
      AppSetting.ParticipantCategoryMasterAddUrl,
      model
    );
  }

  GetById(id) {
    return this._baseService.get(
      AppSetting.ParticipantCategoryMasterGetByIdUrl + id,
      null
    );
  }

  Edit(model: ParticipantCategoryMasterModel) {
    return this._baseService.post(
      AppSetting.ParticipantCategoryMasterEditUrl,
      model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.ParticipantCategoryMasterUpdateStatusUrl + id
    );
  }

}
