import { isNullOrUndefined } from "util";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { AppSetting } from "../Model/appsetting";
import { LoggedInUserDetailViewModel, LoginUserLogModel } from "../Model/user-model";
import { AssignedUserPagePermissionViewModel } from "../Model/user-permission.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UserPermissionService } from "./user-permission.service";
import { MenuMasterServicveService } from "./menu-master-servicve.service";
import { NavItem } from "../Model/nav-item";
import { SessionTimeOut } from "../Enum/user-type.enum";
import { GlobalMessagesModel } from "../Model/common.messages";
import { MatDialog } from "@angular/material";

@Injectable({
  providedIn: "root",
})

export class AuthenticationService {

  LoggedInUserDetail: LoggedInUserDetailViewModel;
  public IsAuthentication: boolean = false;

  constructor(
    private readonly _baseService: BaseService,
    private readonly _router: Router,
    private readonly _userPermissionService: UserPermissionService,
    private readonly _menuService: MenuMasterServicveService
  ) {
    if (!this.IsAuthentication) {
      if (this.IsSessionOut()) {
        this.Login();
      }
      else {
        this.IsAuthentication = true;
        this.LoggedInUserDetail = this.GetCurrentUserDetail();
      }
    }
  }

  Login() {
    this.removelocalStorage();

    // let ssoId = localStorage.getItem("SSOID");
    // if (!ssoId && environment.production == false) {
    //   ssoId = "RAJESHSAINI.RISL";
    // }

    const ssoId = !environment.production ? "RAJESHSAINI.RISL" : localStorage.getItem("SSOID");
    //"CMISNEWTEST3", "RAJESHSAINI.RISL" 

    if (!isNullOrUndefined(ssoId)) {
      this._baseService.get(AppSetting.LogInUrl + ssoId).subscribe((data) => {
        if (data.IsSuccess) {
          this.IsAuthentication = true;
          this.LoggedInUserDetail = <LoggedInUserDetailViewModel>data.Data;

          localStorage.setItem("SessionTime", new Date().toString());
          localStorage.setItem("IsLogin", "true");
          localStorage.setItem("UserDetails", JSON.stringify(this.LoggedInUserDetail));
          localStorage.setItem("IsAuthentication", String(this.IsAuthentication));
          localStorage.setItem("Token", "AuthCMO " + this.LoggedInUserDetail.Token);
          localStorage.setItem("UserId", this.LoggedInUserDetail.UserViewModel.UserId.toString());
          localStorage.setItem("UserType", this.LoggedInUserDetail.UserViewModel.UserType);
          localStorage.setItem("SSOID", this.LoggedInUserDetail.UserViewModel.SSOID);
          localStorage.setItem("UserName", this.LoggedInUserDetail.UserViewModel.UserName);
          localStorage.setItem("FileValidation", this.LoggedInUserDetail.UserViewModel.FileSize.toString());

          if (isNullOrUndefined(this.LoggedInUserDetail.UserViewModel.ProfilePic)) {
            this.LoggedInUserDetail.UserViewModel.ProfilePic = AppSetting.DefaultProfilePic;
          }

          if (!data.Data.UserViewModel.Mobile || !data.Data.UserViewModel.UserEmail) {
            this._router.navigate(["/updateuserprofile"]);
          }
        }
        else if (data.StatusCode === 401) {
          this.LogOut();
        }
        else {
          this.IsAuthentication = false;
          alert(data.Message);
          this.BackToSSO();
        }
      }, (error) => {
        this.IsAuthentication = false;
      });
    }
    else {
      this.LogOut();
    }
  }

  IsAccessibleUrl(requestedUrl: string): boolean {
    // if (environment.production) {
    const currentUserDetail = this.GetCurrentUserDetail();

    if (currentUserDetail != null && currentUserDetail.AssignedUserPagePermissionViewModelList != undefined) {
      const permissionData = <AssignedUserPagePermissionViewModel>(currentUserDetail.AssignedUserPagePermissionViewModelList.find((x) =>
        x.PageUrl.includes(requestedUrl)));

      if (permissionData != undefined && permissionData.IsLoadPermission != undefined) {
        if (!permissionData.IsLoadPermission) {
          const secondPermissionData = <AssignedUserPagePermissionViewModel>(
            currentUserDetail.AssignedUserPagePermissionViewModelList.find((x) =>
              x.PageUrl.includes(requestedUrl)
              && x.UserPagePermissionId !== permissionData.UserPagePermissionId
            ));
          if (secondPermissionData) {
            return secondPermissionData.IsLoadPermission;
          } else {
            return false;
          }
        } else {
          return permissionData.IsLoadPermission;
        }
      }
      return false;
    }
    else {
      return false;
    }
    // } else {
    //   return true;
    // }
  }

  LogOut() {
    this.AddUserLog();
    this.removelocalStorage();
    localStorage.removeItem("SessionTime");
    localStorage.removeItem("SSOID");

    window.location.href = location.origin + AppSetting.LogOutUrl;
  }

  BackToSSO() {
    this.removelocalStorage();
    localStorage.removeItem("SessionTime");
    window.location.href = location.origin + AppSetting.BackToSSOUrl;
  }

  removelocalStorage() {
    this.LoggedInUserDetail = null;
    this.IsAuthentication = false;
    localStorage.removeItem("Token");
    localStorage.removeItem("UserId");
    localStorage.removeItem("UserType");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserDetails");
    localStorage.removeItem("IsAuthentication");
    localStorage.removeItem("achvSearch");
    localStorage.removeItem("FileValidation");
    sessionStorage.removeItem("AllStatusData");
    sessionStorage.removeItem("TaskCompletedData");
  }

  GetCurrentUserDetail(): LoggedInUserDetailViewModel {
    if (localStorage.getItem("UserDetails")) {
      const userDetails = <LoggedInUserDetailViewModel>(
        JSON.parse(localStorage.getItem("UserDetails"))
      );
      return userDetails;
    } else {
      this.Login();
    }
    return null;
  }

  UpdateLoginUserPermission() {
    this._userPermissionService
      .GetPermissionByuserId(this.GetCurrentUserDetail().UserViewModel.UserId)
      .subscribe((resonce) => {
        if (resonce.IsSuccess) {
          this.LoggedInUserDetail.AssignedUserPagePermissionViewModelList = <
            AssignedUserPagePermissionViewModel[]
            >resonce.Data;
          localStorage.removeItem("UserDetails");
          localStorage.setItem(
            "UserDetails",
            JSON.stringify(this.LoggedInUserDetail)
          );
        }
      });
  }

  UpdateLoginUserMenu() {
    this._menuService
      .GetAllByuserId(this.GetCurrentUserDetail().UserViewModel.UserId)
      .subscribe((responce) => {
        if (responce.IsSuccess) {
          this.LoggedInUserDetail.UserMenuViewModelList = <NavItem[]>(
            responce.Data
          );
          localStorage.removeItem("UserDetails");
          localStorage.setItem(
            "UserDetails",
            JSON.stringify(this.LoggedInUserDetail)
          );
        }
      });
  }

  AddUserLog() {
    var model = new LoginUserLogModel();
    model.LogOutTime = new Date().toLocaleString();
    model.UserName = localStorage.getItem("UserName");
    model.SSOID = localStorage.getItem("SSOID");
    model.LoginLogOutStaus = GlobalMessagesModel.LogOut;
    var result = this._baseService
      .post(AppSetting.UserLogUrl, model)
      .subscribe();
    return result;
  }

  IsSessionOut() {
    if (JSON.parse(localStorage.getItem("IsEsign"))) {
      return false;
    } else {
      if (!localStorage.getItem("SessionTime")) {
        localStorage.setItem("SessionTime", new Date().toString());
        return true;
      } else {
        const timeDiff = Math.round(
          (new Date().getTime() -
            new Date(localStorage.getItem("SessionTime")).getTime()) /
          60000
        ); //in minut
        if (!(timeDiff < SessionTimeOut.TimeInMinul)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
