import { Injectable } from '@angular/core';
import { AppSetting } from '../../Model/appsetting';
import { IndexModel } from '../../Model/general-model';
import { BaseService } from '../base.service';
import { VCParticipantModel, VCCustomFilter } from '../../Model/VC/vc-participant-model';

@Injectable({
  providedIn: 'root'
})
export class VCParticipantService {

  constructor(private readonly _baseService: BaseService, ) { }

  GetList(model: IndexModel, vCCode) {

    return this._baseService.post(AppSetting.VCParticipantGetListURL+vCCode, model);
  }

  GetVCParticipantReport(model: VCCustomFilter) {

    return this._baseService.post(AppSetting.VCReportURL, model);
  }

  GetParicipantReport(model: IndexModel, vCCode) {

    return this._baseService.post(AppSetting.VCParticipantGetParicipantReportURL+vCCode, model);
  }

  Add(model: VCParticipantModel) {
    return this._baseService.post(AppSetting.VCParticipantAddURL, model);
  }

  Edit(model: VCParticipantModel) {
    return this._baseService.post(AppSetting.VCParticipantUpdateURL, model);
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.VCParticipantUpdateStatusURL + id);
  }

  GetById(id: number) {
    return this._baseService.get(AppSetting.VCParticipantGetByIdURL + id);
  }


  UploadExcel(formData: FormData) {
    return this._baseService.post(AppSetting.ParticipantExcelUploadURL, formData);
}

GetExcelFileDownload() {
  return this._baseService.get(AppSetting.GetExcelFileDownloadUrl);
}

ParticipantExcelFinalUpload() {
  return this._baseService.get(AppSetting.ParticipantExcelFinalSubmitURL);
}

DeleteItemFromExcelGrid(id: number) {
  return this._baseService.get(AppSetting.deleteDataFromExcelURL + id);
}

GetParticipantExcelUploadTempList() {
  return this._baseService.get(AppSetting.GetParticipantExcelUploadTempListURL );
}

Delete(id: number) {
  return this._baseService.get(AppSetting.VCParticipantDeleteURL + id);
}

MarkAsPresentAbsent(id: number) {
  return this._baseService.get(AppSetting.MarkPresentAbsentURL + id);
}

}
