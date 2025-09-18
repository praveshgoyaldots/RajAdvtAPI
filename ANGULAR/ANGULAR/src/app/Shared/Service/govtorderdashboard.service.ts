import { Injectable } from "@angular/core";
import { AppSetting } from "../Model/appsetting";
import { BaseService } from "src/app/Shared/Service/base.service";
import { govtorderdashboardModel } from "../Model/govtorderdashboard.model";

@Injectable({
  providedIn: "root"
})
export class govtorderdashboardService {
  result: any;
  constructor(private readonly _baseService: BaseService) {}

  PostData(model: govtorderdashboardModel, operationUrl: string): any {
    const formData = new FormData();

    formData.append("data", JSON.stringify(model));
    formData.append("enctype", "multipart/form-data");

    this.result = this._baseService.post(operationUrl, formData);

    return this.result;
  }

  GetById(departmentCodes: string, startDate?: string, endDate?: string) {
    var result = this._baseService.get(
      AppSetting.GovtOrderDashboardGetBYUrl +
        "?DepartmentCode=" +
        departmentCodes +
        "&startDate=" +
        startDate +
        "&endDate=" +
        endDate,
      null
    );
    return result;
  }
}
