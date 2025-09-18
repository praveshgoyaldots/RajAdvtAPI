import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AppSetting } from '../../Model/appsetting';
import { IndexModel } from '../../Model/general-model';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  constructor(private readonly _baseService: BaseService) { }

  GetStatisticalReport(reportIndexModel: IndexModel, userId: string, groupBy1: string, groupBy2: string) {
    return this._baseService.post(AppSetting.LMS_GetStatisticalReportUrl + "?userId=" + userId + "&groupBy1=" + groupBy1 + "&groupBy2=" + groupBy2, reportIndexModel);
  }

  GetDetailReport(reportIndexModel: IndexModel, userId: string) {
    return this._baseService.post(AppSetting.LMS_GetDetailReportUrl + "?userId=" + userId, reportIndexModel);
  }

  GetAdminDepartmentAgeWiseCountReport(reportIndexModel: IndexModel, userId: string) {
    return this._baseService.post(AppSetting.LMS_GetAdminDepartmentAgeWiseCountReportUrl + "?userId=" + userId, reportIndexModel);
  }

  GetDepartmentAgeWiseCountReport(reportIndexModel: IndexModel, userId: string, adminDepartmentCode: number) {
    return this._baseService.post(AppSetting.LMS_GetDepartmentAgeWiseCountReportUrl + "?userId=" + userId + "&adminDepartmentCode=" + adminDepartmentCode, reportIndexModel);
  }

  GetActionHistoryReport(reportIndexModel: IndexModel, userId: string) {
    return this._baseService.post(AppSetting.LMS_GetActionHistoryReportUrl + "?userId=" + userId, reportIndexModel);
  }

  GetAdminDepartmentLast6MonthCountReport(reportIndexModel: IndexModel, userId: string) {
    return this._baseService.post(AppSetting.LMS_GetAdminDepartmentLast6MonthCountReportUrl + "?userId=" + userId, reportIndexModel);
  }

  GetDepartmentLast6MonthCountReport(reportIndexModel: IndexModel, userId: string, adminDepartmentCode: number) {
    return this._baseService.post(AppSetting.LMS_GetDepartmentLast6MonthCountReportUrl + "?userId=" + userId + "&adminDepartmentCode=" + adminDepartmentCode, reportIndexModel);
  }

  GetStatisticalReportGroupList() {
    let arrGroup = [
      { Value: 'AdmDepartmentCode', Text: 'Admin Department' },
      { Value: 'Letter_DepartmentCode', Text: 'Department' },
      { Value: 'LetterSender_DistrictCode', Text: 'District' },
      { Value: 'Letter_LetterTypeCode', Text: 'Grievance Type' },
      { Value: 'LetterType', Text: 'Letter Type' },
      { Value: 'Letter_GroupCode', Text: 'Officer Group' },
      { Value: 'Letter_ReferenceeCode', Text: 'Referencee' }
    ];
    return arrGroup;
  }

  GetGroupByText(grpByVal: string) {
    let arrGroup = this.GetStatisticalReportGroupList();
    let item = arrGroup.find(i => i.Value === grpByVal);
    return (item) ? item.Text : '';
  }

}
