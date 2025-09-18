import { Injectable } from "@angular/core";
import {
  UserModel,
  UserNotificationFilterModel,
  UserNotificationModel,
} from "../Model/user-model";
import { AppSetting } from "../Model/appsetting";
import { BaseService } from "./base.service";
import { IndexModel } from "../Model/general-model";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private readonly _baseService: BaseService) {}

  GetList(model: IndexModel, loginUserId: number) {
    // const params = new Dictionary<string>();
    // params.Add('model', JSON.stringify(model));
    // params.Add('loginUserId', loginUserId.toString());
    return this._baseService.post(
      AppSetting.UserListUrl + "?loginUserId=" + loginUserId,
      model
    );
  }

  Add(model: UserModel) {
    return this._baseService.post(AppSetting.UserAddUrl, model);
  }
  Detail(id: number) {
    return this._baseService.get(AppSetting.UserDetailUrl + id);
  }
  Edit(userId: number, model: UserModel) {
    return this._baseService.post(AppSetting.UserEditUrl + userId, model);
  }

  ChangeDeleteStatus(id: number) {
    return this._baseService.get(AppSetting.UserDeleteStatusChangeUrl + id);
  }
  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.UserActiveStatusChangeUrl + id);
  }

  UserSSOIDExist(ssoId: string) {
    return this._baseService.get(AppSetting.UserSSOIDExistUrl + ssoId);
  }
  UserNameExist(userName: string) {
    return this._baseService.get(AppSetting.UserNameExistUrl + userName);
  }
  GetUserDetailBySSOFromSSO(ssoId: string) {
    return this._baseService.get(AppSetting.GetSSODetailFromSSO + ssoId);
  }
  GetUserDepartment(userId: number) {
    return this._baseService.get(AppSetting.UserDepartmentUrl + userId);
  }

  GetUserOffice(userId: number) {
    return this._baseService.get(AppSetting.UseOfficeUrl + userId);
  }

  GetUserList() {
    return this._baseService.get(AppSetting.UseridListUrl);
  }

  GetUserAchievementSubcategory(userId: number) {
    return this._baseService.get(
      AppSetting.UserAchievementSubcategoryUrl + userId
    );
  }

  GetUserDivision(userId: number) {
    return this._baseService.get(AppSetting.UserDivisionUrl + userId);
  }
  GetUserDistrict(userId: number) {
    return this._baseService.get(AppSetting.UserDistrictUrl + userId);
  }
  GetUserTehsil(userId: number) {
    return this._baseService.get(AppSetting.UserTehsilUrl + userId);
  }
  GetUserBlock(userId: number) {
    return this._baseService.get(AppSetting.UserBlockUrl + userId);
  }

  GetUseForNotification(model: UserNotificationFilterModel) {
    return this._baseService.post(AppSetting.GetUseForNotificationUrl, model);
  }

  SendNotificationToUser(model: UserNotificationModel) {
    return this._baseService.post(AppSetting.SendNotificationToUserUrl, model);
  }

  ExportUserData(model: IndexModel, loginUserId: number) {
    return this._baseService.post(
      AppSetting.ExportUserDataUrl + "?loginUserId=" + loginUserId,
      model
    );
  }

  ResetUserSpecificPermission(userId: number=0,userType='') {
    return this._baseService.get(AppSetting.ResetUserSpecificPermissionUrl + userId + '&userType='+userType);
  }

  GetUserPagePermissionByUser(userId: number) {
    return this._baseService.get(AppSetting.UserPagePermissionByUsernUrl + userId );
  }

  GetUserTypeWhichHasApefificPermission() {
    return this._baseService.get(AppSetting.UserTypeWhichHasApefificPermissionUrl  );
  }

  GetUserWhichHasApefificPermission(pageCode) {
    return this._baseService.get(AppSetting.UserWhichHasApefificPermissionUrl + pageCode );
  }

  GetUserWhichHasDefaultPermission(pageCode) {
    return this._baseService.get(AppSetting.UserWhichHasDefaultPermissionUrl + pageCode );
  }
}
