import { CMISAchievementFilterModel } from './../Model/Master/jankalyanLogMaster.model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { JankalyanLogSearchModel, JankalyanSummarySearchModel, CMISReportFilterModel, CMISComplianceModel } from '../Model/Master/jankalyanLogMaster.model';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class JankalyanlogService {

  constructor(private readonly _baseService: BaseService) {

   }

   GetJankalyanUserLogDetailReport(model: JankalyanLogSearchModel) {
    var result = this._baseService.post(AppSetting.GetJankalyanUserLogDetailReport, model);
    return result;
  }

  GetJankalyanUserLogSummaryReport(model: JankalyanLogSearchModel) {
    return this._baseService.post(AppSetting.GetJankalyanUserLogSummaryReport, model);
  }

  GetJankalyanSummaryReport(model: JankalyanSummarySearchModel) {
    return this._baseService.post(AppSetting.GetJankalyanSummaryReportURL, model);
  }

//#region <CMIS Report>

GetCMISNewSummaryReport(model: CMISReportFilterModel) {
  return this._baseService.post(AppSetting.CMISNewSummaryReportURL, model);
}

GetCMISNewDetailReport(model: CMISReportFilterModel) {
  return this._baseService.post(AppSetting.CMISNewDetailReportURL, model);
}

//#endregion <CMIS Report>

//#region <CMIS Compliance>

GetCMISComplianceById(id: number,achvId:number) {
  return this._baseService.get(AppSetting.CMISComplianceByIdURL+"?id="+id+"&achvId="+achvId);
}

AddUpdateCMISCompliance(model: CMISComplianceModel) {
  return this._baseService.post(AppSetting.AddUpdateCMISComplianceURL, model);
}

//#endregion <CMIS Compliance>

//#region <Compliance Report>

GetCMISComplianceReport(model: CMISReportFilterModel) {
  return this._baseService.post(AppSetting.GetCMISComplianceReportURL, model);
}

GetComplianceModuleAndDeptWiseSummaryReport(model: CMISReportFilterModel) {
  return this._baseService.post(AppSetting.ComplianceModuleAndDeptWiseSummaryReportURL, model);
}

GetJankalyanProjectReport() {
  return this._baseService.get(AppSetting.GetJankalyanProjectReport);
}
//#endregion <Compliance Report>

//#region <CMIS Achievement Report>

GetCMISAchievementSummaryReport(model: CMISAchievementFilterModel) {
  return this._baseService.post(AppSetting.CMISAchievementSummaryReportURL, model);
}

GetCMISAchievementDetailReport(model: CMISAchievementFilterModel) {
  return this._baseService.post(AppSetting.CMISAchievementDetailReportURL, model);
}

//#endregion <CMIS Achievement Report>

//#region <Compliance Detail Report>

GetComplianceNoOfEntryInJankalyanReportData(model: CMISReportFilterModel) {
  return this._baseService.post(AppSetting.ComplianceNoOfEntryInJankalyanReportDataURL, model);
}

GetNoOfComplianceDetailData(model: CMISReportFilterModel) {
  return this._baseService.post(AppSetting.NoOfComplianceDetailDataURL, model);
}
//#endregion <Compliance Detail Report>

}
