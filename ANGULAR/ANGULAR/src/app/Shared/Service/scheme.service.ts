import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import {
  SchemeModel,
  SchemeFAQModel,
  SchemeMonitoringParameterModel,
  MonitoringParametersByIdForDataEntryViewModel,
  MonitoringParamDataEntryAddModel,
  CustomParameterWithIndex,
  SetPriorityViewModel,
  AssignSchemeModel,
  SchemeGroupModel,
  ContactResponseModel,
  UpdateBeneficiaryModel
} from "../Model/scheme-model";
import { AppSetting } from "../Model/appsetting";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { IndexModel } from "../Model/general-model";
import { CommonIdModel } from "../Model/commonddl.model";

@Injectable({
  providedIn: "root"
})
export class SchemeService {
  result: any;
  constructor(private readonly _baseService: BaseService) {}

  PostData(model: SchemeModel, operationUrl: string): any {
    this.result = this._baseService.post(operationUrl, model);

    return this.result;
  }
  PostSchemeGroupData(model: SchemeGroupModel, operationUrl: string): any {
    this.result = this._baseService.post(operationUrl, model);

    return this.result;
  }

  Get(model: IndexModel, isActive: number) {
    const result = this._baseService.post(
      AppSetting.SchemeGetUrl + isActive,
      model
    );
    return result;
  }

  GetScheme(model: IndexModel) {
    const result = this._baseService.post(AppSetting.SchemeListGetUrl, model);
    return result;
  }

  GetSchemePriority(model: IndexModel) {
    const result = this._baseService.post(
      AppSetting.SchemeGetPriorityUrl,
      model
    );
    return result;
  }

  SetSchemePriority(model: SetPriorityViewModel[]) {
    const result = this._baseService.post(
      AppSetting.SchemeSetPriorityUrl,
      model
    );
    return result;
  }

  GetById(id: number) {
    const result = this._baseService.get(
      AppSetting.SchemeGetUrlById + id,
      null
    );
    return result;
  }

  GetByBeneficiaryId(id: number) {
    const result = this._baseService.get(
      AppSetting.GetByBeneficiaryId + id,
      null
    );
    return result;
  }


  updateBeneficiaryCategory(model: UpdateBeneficiaryModel) {
    const result = this._baseService.post(
      AppSetting.UpdateBeneficiaryCategory ,
      model
    );
    return result;
  }

  DeleteById(model: CommonIdModel) {
    const result = this._baseService.post(AppSetting.SchemeDeleteUrl, model);
    return result;
  }

  FAQPost(model: SchemeFAQModel): any {
    this.result = this._baseService.post(AppSetting.SchemeFAQUrl, model);
    return this.result;
  }

  GetFaqlist(id: number) {
    const result = this._baseService.get(AppSetting.SchemeFAQListUrl + id);
    return result;
  }

  SetStatus(id: number) {
    const result = this._baseService.get(
      AppSetting.SchemeStatusUpdateUrl + id,
      null
    );
    return result;
  }

  LockToggle(id: number) {
    const result = this._baseService.get(AppSetting.SchemeLockUrl + id, null);
    return result;
  }

  PostMonitoringParam(model: SchemeMonitoringParameterModel): any {
    this.result = this._baseService.post(
      AppSetting.SchemeMonitoringParamUrl,
      model
    );
    return this.result;
  }

  GetMonitoringParam(id: number | string) {
    const result = this._baseService.get(
      AppSetting.SchemeGetMonitoringParamById + id,
      null
    );
    return result;
  }

  GetMonitoringParamByIdForDataEntry(id: number | string) {
    const result = this._baseService.get(
      AppSetting.SchemeMonitoringParamByIdForDataentry + id,
      null
    );
    return result;
  }

  GetDataEntryListForMonitoringParameters(
    model: CustomParameterWithIndex,
    id: number | string
  ) {
    const result = this._baseService.post(
      AppSetting.SchemeMonitoringParamDataentryList + id,
      model
    );
    return result;
  }

  PostDataEntryForMonitoringParam(
    model: MonitoringParamDataEntryAddModel
  ): any {
    this.result = this._baseService.post(
      AppSetting.SchemeDataEntryMonitoringParamUrl,
      model
    );
    return this.result;
  }

  UpdateDataEntryValueForMonitoringParameters(
    model: MonitoringParamDataEntryAddModel
  ): any {
    this.result = this._baseService.post(
      AppSetting.SchemeDataEntryMonitoringParamUpdateUrl,
      model
    );
    return this.result;
  }

  UpdateMonitoringParametersStatus(id: number | string) {
    const result = this._baseService.get(
      AppSetting.SchemeUpdateMonitoringParam + id,
      null
    );
    return result;
  }

  GetAllMPRCountWithScheme(model: IndexModel) {
    const result = this._baseService.post(
      AppSetting.schemeMPRCountWithSchemeUrl,
      model
    );
    return result;
  }

  GetAllMPMonthlyBySchemeId(model: IndexModel, schemeId: number) {
    const result = this._baseService.post(
      AppSetting.schemeGetAllMPMonthlyBySchemeIdUrl + schemeId,
      model
    );
    return result;
  }

  AssignScheme(model: AssignSchemeModel) {
    const result = this._baseService.post(AppSetting.AssignSchemeAddUrl, model);
    return result;
  }

  GetContactPersonService(model: ContactResponseModel) {

    const result= this._baseService.post(AppSetting.SchemeContactPersonDetailUrl, model);
    return result
  }

  EditAssignScheme(model: AssignSchemeModel) {
    const result = this._baseService.post(
      AppSetting.AssignSchemeEditUrl,
      model
    );
    return result;
  }

  AssignSchemeGetById(id: number) {
    const result = this._baseService.get(
      AppSetting.AssignSchemeGetById + id,
      null
    );
    return result;
  }

  AssignSchemeGetList(model: IndexModel, isActive: number) {
    const result = this._baseService.post(
      AppSetting.AssignSchemeListGetUrl + isActive,
      model
    );
    return result;
  }



  GetSchemeGroupById(id: number) {
    const result = this._baseService.get(
      AppSetting.GetSchemeGroupById + id,
      null
    );
    return result;
  }

  IsSchmeNotExist(model: AssignSchemeModel) {
    const result = this._baseService.post(
      AppSetting.IsSchmeNotExistUrl,
      model
    );
    return result;
  }

}
