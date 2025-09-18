import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { IndexModel } from "../Model/general-model";
import { AppSetting } from "../Model/appsetting";
import {
  AchievementModel,
  AchievementPostModel,
  CustomSearchModel,
} from "../Model/achievement-model";
import { Dictionary } from "../Model/dictionary";
import { HttpParams } from "@angular/common/http";
import { isNullOrUndefined } from "util";
import { DepartmentCategoryReportFilterModel } from '../Model/orderlist.model';

@Injectable({
  providedIn: "root",
})
export class AchievementService {
  constructor(private readonly _baseService: BaseService) {}
  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.AchievementListUrl, model);
  }

  GetFilterList(model: CustomSearchModel, UserId: number) {
    return this._baseService.post(
      AppSetting.AchievementFilterListUrl + "?UserId=" + UserId,
      model
    );
  }

  Add(model: AchievementPostModel) {
    return this._baseService.post(AppSetting.AchievementAddUrl, model);
  }

  Detail(id: number) {
    return this._baseService.get(AppSetting.AchievementDetailUrl + id);
  }

  Edit(id: number, model: AchievementPostModel) {
    return this._baseService.post(AppSetting.AchievementUpdateUrl + id, model);
  }

  ChangeDeleteStatus(id: number) {
    return this._baseService.get(
      AppSetting.AchievementUpdateDeleteStatusUrl + id
    );
  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.AchievementUpdateActiveStatusUrl + id
    );
  }

  //#region <Achievement Reports>

  GetAchievementsCategoryWiseSummaryReport(model:DepartmentCategoryReportFilterModel) {
    return this._baseService.post(
      AppSetting.GetAchievementsCategoryWiseSummaryReportUrl, model
    );
  }

  ExportAchievementData(model: CustomSearchModel, loginUserId: number) {
    return this._baseService.post(
      AppSetting.ExportAchievementDataUrl + "?loginUserId=" + loginUserId,
      model
    );
  }

  //#endregion <Achievement Report>

}
