import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { AppSetting } from "../Model/appsetting";
import { ClientidServiceModel } from "../Model/Master/ClientidSerive.Model";
import { IndexModel } from '../Model/general-model';

@Injectable({
  providedIn: "root"
})
export class ClientWebServiceService {
  constructor(private readonly _baseService: BaseService) {}

  Add(model: ClientidServiceModel) {
    const result = this._baseService.post(AppSetting.clientAdd, model);
    return result;
  }

  Edit(model: ClientidServiceModel) {
    const result = this._baseService.post(AppSetting.clientEdit, model);
    return result;
  }

  GetList(model:IndexModel) {
    const result = this._baseService.post(AppSetting.clientList,model);
    return result;
  }

  GetById(id) {
    const result = this._baseService.get(AppSetting.ClientGetById + id, null);
    return result;
  }
}
