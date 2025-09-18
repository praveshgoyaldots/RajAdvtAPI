import { Injectable } from "@angular/core";
import { AppSetting } from "../Model/appsetting";
import { BaseService } from "src/app/Shared/Service/base.service";
import { SchemeDashboardModel } from "../Model/SchemeDashboard.model";

@Injectable({
  providedIn: "root"
})
export class SchemeDashboardService {
  result: any;
  constructor(private readonly _baseService: BaseService) {}

  PostData(model: SchemeDashboardModel, operationUrl: string): any {
    var formData = new FormData();

    formData.append("data", JSON.stringify(model));
    formData.append("enctype", "multipart/form-data");

    this.result = this._baseService.post(operationUrl, formData);

    return this.result;
  }

  Get() {
    var result = this._baseService.get(
      AppSetting.SchemeDashboardGetBYUrl,
      null
    );
    return result;
  }

  GetById(UserType: string, UserId: number) {
    var result = this._baseService.get(
      AppSetting.SchemeDashboardGetBYUrl +
        "?UserType=" +
        UserType +
        "&UserId=" +
        UserId
    );
    return result;
  }
}
