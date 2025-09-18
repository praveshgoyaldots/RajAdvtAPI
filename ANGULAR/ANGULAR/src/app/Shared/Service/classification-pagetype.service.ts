import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { IndexModel } from "../Model/general-model";
import { AppSetting } from "../Model/appsetting";
import { ClassificationPageTypeModel } from "../Model/Master/classification-pagetype-model";

@Injectable({
  providedIn: "root",
})
export class ClassificationPagetypeService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel) {
    return this._baseService.post(
      AppSetting.ClassificationPageTypeListUrl,
      model
    );
  }

  Add(model: ClassificationPageTypeModel) {
    return this._baseService.post(
      AppSetting.ClassificationPageTypeAddUrl,
      model
    );
  }

  Edit(model: ClassificationPageTypeModel) {
    return this._baseService.post(
      AppSetting.ClassificationPageTypeUpdateUrl,
      model
    );
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.ClassificationPageTypeUpdateStatusUrl + id
    );
  }

  GetById(id: number) {
    return this._baseService.get(
      AppSetting.ClassificationPageTypeGetByIdUrl + id
    );
  }

  //#region <end>
}
