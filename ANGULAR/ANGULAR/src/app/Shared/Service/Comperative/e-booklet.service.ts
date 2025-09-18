import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { EBookletFilterModel } from '../../Model/Camparetive/e-booklet-model';
import { AppSetting } from '../../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class EBookletService {

  constructor(private readonly _baseService: BaseService) { }

  GetEbookLet(model: EBookletFilterModel) {
    return this._baseService.post(AppSetting.GetEbookletListUrl, model);
  }

}
