import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { IndexModel, DateWiseSearchModel } from "../Model/general-model";
import { AppSetting } from "../Model/appsetting";
import {
  AchievementModel,
  AchievementPostModel,
  ImpDescSummaryReportFilterModel,
  CustomSearchModel,
} from "../Model/achievement-model";
import { Dictionary } from "../Model/dictionary";
import { HttpParams } from "@angular/common/http";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root",
})
export class importantdesicionservice {
  constructor(private readonly _baseService: BaseService) {}
  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.ImportantDecisionListUrl, model);
  }

  GetFilterList(model: CustomSearchModel, UserId: number) {
    return this._baseService.post(
      AppSetting.ImportantDecisionFilterListUrl + "?UserId=" + UserId,
      model
    );
  }

  Add(model: AchievementPostModel) {
    return this._baseService.post(AppSetting.ImportantDecisionAddUrl, model);
  }

  Detail(id: number) {
    return this._baseService.get(AppSetting.ImportantDecisionDetailUrl + id);
  }

  Edit(id: number, model: AchievementPostModel) {
    return this._baseService.post(
      AppSetting.ImportantDecisionUpdateUrl + id,
      model
    );
  }

  ChangeDeleteStatus(id: number) {
    return this._baseService.get(
      AppSetting.ImportantDecisionUpdateDeleteStatusUrl + id
    );
  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(
      AppSetting.ImportantDecisionUpdateActiveStatusUrl + id
    );
  }

  GetImportantDecisionSummaryReport(model: ImpDescSummaryReportFilterModel) {
    return this._baseService.post(
      AppSetting.ImportantDecisionSummaryReportUrl,
      model
    );
  }

  GetImportantDecisionDepartmentCountReport(model: DateWiseSearchModel) {
    var result = this._baseService.post(
      AppSetting.GetImportantDecisionDepartmentSummaryReport,
      model
    );
    return result;
  }
}
