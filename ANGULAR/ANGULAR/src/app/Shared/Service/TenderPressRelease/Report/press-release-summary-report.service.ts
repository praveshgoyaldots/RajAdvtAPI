import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { PressReleaseFilterModel } from 'src/app/Shared/Model/TenderPressRelease/press-release-model';
import { BaseService } from '../../base.service';

@Injectable({
    providedIn: 'root'
  })

  export class PressReleaseSummaryReportService {
      
    constructor(private readonly _baseService: BaseService) {
    }

    GetPressReleaseCreatedByUsers(model: PressReleaseFilterModel) {
        return this._baseService.post(AppSetting.PressReleaseReportCreatedByUsers, model);
      }

    GetCategorySubCategory(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportCategorySubCategory, model);
    }

    GetDeptCatSubcat(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportDeptCatSubcat, model);
    }

    GetLookupCategory(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportLookupCategory, model);
    }

    GetDeptLookupCat(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportDeptLookupCat, model);
    }

    GetVIPDepartment(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportVIPDepartment, model);
    }

    GetDistCatSubcat(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportDistCatSubcat, model);
    }

    GetDistLookupCategory(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportDistLookupCategory, model);
    }

    GetDepartmentDistrict(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportDepartmentDistrict, model);
    }

    GetVIPDistrict(model: PressReleaseFilterModel) {
      return this._baseService.post(AppSetting.PressReleaseReportVIPDistrict, model);
    }

    GetVIPDeptDist(model: IndexModel) {
      return this._baseService.post(AppSetting.PressReleaseReportVIPDeptDist, model);
    }

    GetUserDate(model: IndexModel) {
      return this._baseService.post(AppSetting.PressReleaseReportUserDate, model);
    }
  }