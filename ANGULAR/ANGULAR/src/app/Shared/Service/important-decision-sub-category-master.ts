import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { IndexModel } from "../Model/general-model";
import { AppSetting } from "../Model/appsetting";
import { ImportantDicisionSubCategoryMasterPostModel } from "../Model/Master/important-decision-subcategory-master-model";

@Injectable({
  providedIn: "root",
})
export class ImportantDecisionSubCategoryMasterService {
  constructor(private readonly _baseService: BaseService) {}
  GetList(model: IndexModel) {
    var result = this._baseService.post(
      AppSetting.ImportantDecisionSubCategoryMasterListUrl,
      model
    );
    return result;
  }

  Add(model: ImportantDicisionSubCategoryMasterPostModel) {
    var result = this._baseService.post(
      AppSetting.ImportantDecisionSubCategoryMasterAddUrl,
      model
    );
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(
      AppSetting.ImportantDecisionSubCategoryMasterGetByIdUrl + id,
      null
    );
    return result;
  }

  Edit(id, model: ImportantDicisionSubCategoryMasterPostModel) {
    var result = this._baseService.post(
      AppSetting.ImportantDecisionSubCategoryMasterEditUrl + id,
      model
    );
    return result;
  }
  ChangeDeleteStatus(id: number) {
    return this._baseService.get(
      AppSetting.ImportantDecisionSubCategoryMasterDeleteUrl + id
    );
  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.ImportantDecisionSubCategoryMasterActiveStatusUrl + id
    );
  }
}
