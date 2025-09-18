import { Injectable } from '@angular/core';
import { AppSetting } from '../../Model/appsetting';
import { BaseService } from '../base.service';
import { VCGLocationFilterModel, VCGParticipantFilterModel } from '../../Model/VC/vc-g-report.model';

@Injectable({
  providedIn: 'root'
})
export class VCGraphicalReportService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetDistrictCountByVC(vCCode: number) {
    return this._baseService.get(AppSetting.VCGReportByDistrictURL + vCCode);
  }

  GetLocationCountByDistrict(model:VCGLocationFilterModel) {
    return this._baseService.post(AppSetting.VCGReportByLocationURL, model);
  }

  GetParticipantByLocation(model: VCGParticipantFilterModel) {
    return this._baseService.post(AppSetting.VCGParticipantByLocationURL,model);
  }

}
