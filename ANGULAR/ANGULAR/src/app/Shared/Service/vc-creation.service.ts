import { VCSearchModel, VCReportSearchModel, VCSummeryReportSearchModel, ParticipantByDistrictReportModel, ChairpersonSummeryReportSearchModel, CategoryAndDptWiseSummaryVCReportFilterModel } from 'src/app/Shared/Model/vccreationView.model';
import { Injectable } from "@angular/core";
import { IndexModel } from "../Model/general-model";
import { BaseService } from "./base.service";
import { AppSetting } from "../Model/appsetting";
import { VCCreationViewModel, VCCreationModel } from "../Model/vccreationView.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class VcCreationService {
  constructor(private readonly _baseService: BaseService, private _http: HttpClient) {}

  GetList(model: IndexModel) {
    return this._baseService.post(AppSetting.VCCreationListUrl, model);
  }

  Add(model: VCCreationModel) {
    return this._baseService.post(AppSetting.VCCreationAddUrl, model);
  }

  GetAllVcReport(model: VCReportSearchModel) {
    return this._baseService.post(AppSetting.VCGetAllVcReportUrl, model);
  }

  Edit(model: VCCreationModel) {
    return this._baseService.post(AppSetting.VCCreationUpdateUrl, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.VCCreationUpdateStatusUrl + id);
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.VCCreationGetByIdUrl + id);
  }

  VCSummaryReport(model: VCSummeryReportSearchModel) {
    return this._baseService.post(AppSetting.VCSummaryReport, model);
  }

  VCParticipantCountByDistrictReport(model: ParticipantByDistrictReportModel) {
    return this._baseService.post(AppSetting.VCParticipantCountByDistrictReportReport, model);
  }

  Delete(id: number) {
    return this._baseService.get(AppSetting.VCDeleteUrl + id);
  }

  VCChairpersonCategorySummaryReport(model: ChairpersonSummeryReportSearchModel) {
    return this._baseService.post(AppSetting.VCChairpersonCategorySummaryReportURL, model);
  }

  GetCategoryAndDptWiseSummaryVCReport(model: CategoryAndDptWiseSummaryVCReportFilterModel) {
    return this._baseService.post(AppSetting.CategoryAndDptWiseSummaryVCReportURL, model);
  }

  GetAdmDptCatWiseSummaryVCReport(model: CategoryAndDptWiseSummaryVCReportFilterModel) {
    return this._baseService.post(AppSetting.AdmDptCatWiseSummaryVCReportURL, model);
  }

}
