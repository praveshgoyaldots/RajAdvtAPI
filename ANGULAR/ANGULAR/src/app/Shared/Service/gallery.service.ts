import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IndexModel } from '../Model/general-model';
import { AppSetting } from '../Model/appsetting';
import { GalleryModel } from '../Model/Master/gallery.model';

@Injectable({
    providedIn: 'root'
})

export class GalleryService {
    constructor(private readonly _baseService: BaseService) { }

    GetList(model: IndexModel) {
        return this._baseService.post(AppSetting.GalleryListUrl, model);
    }

    AddUpdate(model: GalleryModel) {
        return this._baseService.post(AppSetting.GalleryAddUpdateUrl, model);
    }

    Detail(id: number) {
        return this._baseService.get(AppSetting.GalleryDetailUrl + id);
    }

    ChangeDeleteStatus(id: number) {
        return this._baseService.get(AppSetting.GalleryDeleteStatusChangeUrl + id);
    }

    ChangeActiveStatus(id: number) {
        return this._baseService.get(AppSetting.GalleryActiveStatusChangeUrl + id);
    }

}
