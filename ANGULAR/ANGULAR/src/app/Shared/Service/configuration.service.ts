import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { AppSetting } from "../Model/appsetting";
import { ConfigDataViewModel } from "../Model/self-config.model";

@Injectable({
  providedIn: "root"
})
export class ConfigurationService {
  constructor(private readonly _baseService: BaseService) { }

  GetConfigurationData(UserType, ConfigType, Department, UserId) {
    return this._baseService.get(AppSetting.GetConfigDataUrl + "?UserType=" + UserType + "&ConfigType=" + ConfigType + "&Department=" + Department + "&UserId=" + UserId
      // "&area=" + area
    );
  }

  SetConfiguration(model: ConfigDataViewModel) {
    return this._baseService.post(AppSetting.SetConfigDataUrl, model);
  }
}
