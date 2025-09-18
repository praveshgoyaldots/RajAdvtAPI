import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { GalleryModel } from 'src/app/Shared/Model/Master/gallery.model';
import { GalleryService } from 'src/app/Shared/Service/gallery.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { GalleryUploadType } from "src/app/Shared/Enum/scheme.enum";

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css']
})

export class GalleryDetailComponent implements OnInit {

  model: GalleryModel;
  recordId: number = 0;
  baseApiUrl: string;
  uploadType_URL: string = GalleryUploadType.URL;
  uploadType_Photo: string = GalleryUploadType.Photo;
  uploadType_Video: string = GalleryUploadType.Video;
  uploadType_PDF: string = GalleryUploadType.PDF;

  constructor(private readonly appComponnet: AppComponent,
    private _route: ActivatedRoute,
    private readonly _alertService: AlertService,
    private _galleryService: GalleryService) {
    this.model = new GalleryModel();
    if (!isNullOrUndefined(this._route.snapshot.params.id)) {
      this.recordId = this._route.snapshot.params.id;
    }
    this.appComponnet.setpagelayout("Photo / Vedio / Document Detail :", "keyboard_backspace", "Back To List", "master/gallery");
    this.baseApiUrl = AppSetting.BaseApiUrl;
  }

  ngOnInit() {
    if (this.recordId != 0) {
      this.getDetail();
    }
  }

  getDetail() {
    this._galleryService.Detail(this.recordId).subscribe(data => {
      if (data.IsSuccess) {
        this.model = <GalleryModel>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

}
