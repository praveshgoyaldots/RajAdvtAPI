import { HttpHeaders } from '@angular/common/http';
import { Dictionary } from './../Model/dictionary';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: 'root'
})
export class HereMapService {

  constructor(private readonly _baseService: BaseService) { }

  GetLatLongByAddress(address: string) {
    let param = new Dictionary<any>();
    param.Add("app_id", "05UjfGhidSoDnGkZ3v1u");
    param.Add("app_code", "OsXpO2uP8im1Pw2uuwsUUg");
    param.Add("at", "26.90663,75.8155");
    param.Add("q", address);
    return this._baseService.get(AppSetting.HereMapGetLatLongUrl, param, false);
    //return obj;
  }

}
