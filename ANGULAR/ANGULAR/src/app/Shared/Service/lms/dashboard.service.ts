import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AppSetting } from '../../Model/appsetting';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private readonly _baseService: BaseService) { }

  GetDepartmentDashboardReport(userId: string) {
    return this._baseService.get(AppSetting.GetDepartmentDashboardReportUrl + "?id=" + userId);
  }

}
