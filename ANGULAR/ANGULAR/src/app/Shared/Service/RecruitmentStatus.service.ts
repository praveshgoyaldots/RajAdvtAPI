import { Injectable } from "@angular/core";
import { AppSetting } from "../Model/appsetting";
import { BaseService } from "src/app/Shared/Service/base.service";
import { RecruitmentStatusModel } from "../Model/RecruitmentStatus-Model";

@Injectable({
  providedIn: "root"
})
export class RecruitmentStatusService {
  result: any;
  constructor(private readonly _baseService: BaseService) {}

  PostData(model: RecruitmentStatusModel, operationUrl: string): any {
    var formData = new FormData();

    formData.append("data", JSON.stringify(model));
    formData.append("enctype", "multipart/form-data");

    this.result = this._baseService.post(operationUrl, formData);

    return this.result;
  }

  Get() {
    var result = this._baseService.get(
      AppSetting.RecruitmentStatusGetUrl,
      null
    );
    return result;
  }

  GetById(id: string, startDate?: string, endDate?: string) {
    var result = this._baseService.get(
      AppSetting.RecruitmentStatusGetBYDepartmentIdUrl +
        id +
        "&startDate=" +
        startDate +
        "&endDate=" +
        endDate,
      null
    );
    return result;
  }
}
