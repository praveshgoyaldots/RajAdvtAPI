import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { AppSetting } from "../Model/appsetting";
import {
  DefaultPagePermissionListModel,
  UserPagePermissionListModel,
} from "../Model/user-permission.model";

@Injectable({
  providedIn: "root",
})
export class UserPermissionService {
  constructor(private readonly _baseService: BaseService) {}

  GetDefaultPagePermissons(applicationCode: string, userType: string) {
    return this._baseService.get(
      AppSetting.GetDefaultPagePermissionUrl +
        "?applicationCode=" +
        applicationCode +
        "&userType=" +
        userType
    );
  }

  SaveDefaultPagePermissions(model: DefaultPagePermissionListModel[]): any {
    return this._baseService.post(
      AppSetting.SaveDefaultPagePermissionUrl,
      model
    );
  }

  GetUserPagePermissons(applicationCode: string, userId: number) {
    return this._baseService.get(
      AppSetting.GetUserPagePermissionByApplicationUrl +
        "?applicationCode=" +
        applicationCode +
        "&userId=" +
        userId
    );
  }

  GetUserDefaultPagePermissons(applicationCode: string, userId: number) {
    return this._baseService.get(
      AppSetting.GetUserDefaultPagePermissionByApplicationUrl +
        "?applicationCode=" +
        applicationCode +
        "&userId=" +
        userId
    );
  }

  GetUserListByApplicationUrl(
    userType: string,
    departmentcode: string,
    office: string
  ) {
    return this._baseService.get(
      AppSetting.GetUserByApplicationUrl +
        "?userType=" +
        userType +
        "&departmentcode=" +
        departmentcode +
        "&office=" +
        office
    );
  }

  SaveUserPagePermissions(model: UserPagePermissionListModel[]): any {
    return this._baseService.post(AppSetting.SaveUserPagePermissionUrl, model);
  }
  GetPermissionByuserId(userId) {
    return this._baseService.get(
      AppSetting.GetAssignedUserPagePermissionUrl + "?userId=" + userId
    );
  }
}
