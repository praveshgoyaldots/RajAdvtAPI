import { Injectable } from '@angular/core';
import { AppSetting } from '../Model/appsetting';
import { BaseService } from 'src/app/Shared/Service/base.service';
import { CMOLetterModel } from '../Model/CMOLetter-Model';


@Injectable({
  providedIn: 'root'
})


export class CMOLetterService {
  result: any;
  constructor(private readonly _baseService: BaseService, ) { }

  PostData(model: CMOLetterModel, operationUrl: string): any {
    const formData = new FormData();

    formData.append('data', JSON.stringify(model));
    formData.append('enctype', 'multipart/form-data');


      this.result = this._baseService.post(operationUrl,formData);



    return this.result;
  }

  Get() {
    const result = this._baseService.get( AppSetting.CMOLetterGetUrl, null);
    return result;
  }

  GetById(id: string) {
    const result = this._baseService.get(AppSetting.CMOLetterGetBYDepartmentIdUrl + id, null);
    return result;
  }

}
