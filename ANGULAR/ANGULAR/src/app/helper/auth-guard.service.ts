import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../Shared/Service/authentication.service';
import { AlertService } from '../Shared/Service/alert.service';
import { GlobalMessagesModel } from '../Shared/Model/common.messages';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  defaultRedirectUrl = '/cmdashboard';
  constructor(private readonly _authService: AuthenticationService, private readonly _alertService: AlertService, private readonly _router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

if (state.url.includes("projectmasterdetailReport")||state.url.includes("order/update") ||state.url.includes("scheme/update") ||state.url.includes("/advertisement/achievements/update-achievements") ) {
  return true;
}

    if (state.url.includes("generateorderauthoritylistesign")) {
      if (JSON.parse(localStorage.getItem("IsEsign"))) {
        this._alertService.success(GlobalMessagesModel.EsignSuccess);
      }
      localStorage.setItem("IsEsign","false");
      return true;
    } else if (state.url.includes("generateauthoritylistesignex")) {
      if (JSON.parse(localStorage.getItem("IsEsign"))) {
      this._alertService.error(GlobalMessagesModel.EsignError);
      }
      localStorage.setItem("IsEsign","false");
     return true;
    }
    else if(state.url.includes("participant")){
      return true;
    }
    if (state.url !== this.defaultRedirectUrl) {
      const isAccessible = this._authService.IsAccessibleUrl(state.url);
      if (isAccessible) {
        return true;
      } else {
        this._alertService.error("Access Denied!!");
        this._router.navigate([this.defaultRedirectUrl]);
        return false;
      }
    } else {
      return true;
    }
  }

}
