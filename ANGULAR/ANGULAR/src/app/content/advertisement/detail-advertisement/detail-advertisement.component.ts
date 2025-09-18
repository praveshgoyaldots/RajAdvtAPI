import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { AdvertisementEditModel } from 'src/app/Shared/Model/advertisement.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-detail-advertisement',
  templateUrl: './detail-advertisement.component.html',
  styleUrls: ['./detail-advertisement.component.css']
})
export class DetailAdvertisementComponent implements OnInit {
  id: number;
  detailModel: AdvertisementEditModel;
  constructor(private readonly _advertisementService: AdvertisementService,
    private readonly _alertService: AlertService,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent) {
    this.id = this._route.snapshot.params.id;
    this._parentApi.setpagelayout("Details Advertisement :", "keyboard_backspace", "Back to list", "advertisement/");
  }

  ngOnInit() {
    this.OnDataGetById(this.id);
  }
  OnDataGetById(id) {
    this._advertisementService.GetById(id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.detailModel = <AdvertisementEditModel>data.Data;
          // if (this.detailModel.DocumentUrl) {
          //   this.detailModel.DocumentUrl =this.detailModel.DocumentUrl;
          // }
        }

      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  downloadMyFile(temp){
    
    const link = document.createElement('a');
     link.setAttribute('href',temp);
    link.setAttribute('download', `Documents`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}


}
