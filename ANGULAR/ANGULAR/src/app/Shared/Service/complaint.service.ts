import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { ComplaintListModel, ComplaintActionModel, CompliantSearchModel } from '../Model/complaint.model';
import { AppSetting } from '../Model/appsetting';
import { AuthenticationService } from './authentication.service';
import { subscribeOn } from 'rxjs/operators';
import { UserModel } from '../Model/user-model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    private readonly _baseService: BaseService,
    private readonly _authService: AuthenticationService,
  ) {

  }

  GetList(model: CompliantSearchModel) {
    model.LoginUserCode = this._authService.GetCurrentUserDetail().UserViewModel.UserId;
      const result = this._baseService.post(AppSetting.ComplaintList, model);
      return result;
    }

    Add(model: ComplaintListModel) {
      const result = this._baseService.post(AppSetting.ComplaintAdd, model);
      return result;
    }

    AddAction(model:ComplaintActionModel) {
      const result = this._baseService.post(AppSetting.ComplaintAddAction, model);
      return result;
    }


    // GetById(Id) {
    //   const result = this._baseService.get(AppSetting.GovermentAchivementGetById + Id, null);
    //   return result;
    // }

    // Edit(model: GovermentAchivementModel) {
    //   const result = this._baseService.post(AppSetting.GovermentAchivementEdit, model);
    //   return result;
    // }
  Detail(id: number) {
    return this._baseService.get(AppSetting.ComplaintDetailUrl + id);
  }

   }

