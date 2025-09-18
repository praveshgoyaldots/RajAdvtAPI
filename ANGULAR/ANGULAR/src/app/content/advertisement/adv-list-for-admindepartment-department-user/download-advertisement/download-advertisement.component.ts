import { Component, OnInit } from '@angular/core';
import { AdvertisementRedesignRequestIdModel, AdvertisementEditModel, RedesignDetailModel } from 'src/app/Shared/Model/advertisement.model';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MatDialog } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementRawdataComponent } from './advertisement-rawdata/advertisement-rawdata.component';

@Component({
  selector: 'app-download-advertisement',
  templateUrl: './download-advertisement.component.html',
  styleUrls: ['./download-advertisement.component.css']
})
export class DownloadAdvertisementComponent implements OnInit {
  idModel: AdvertisementRedesignRequestIdModel;
  detailModel: AdvertisementEditModel;
  resultModel: RedesignDetailModel;
  constructor(
    private readonly _advertisementService: AdvertisementService,
    private readonly _alertService: AlertService,
    private readonly _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent
  ) {
    this.idModel = new AdvertisementRedesignRequestIdModel();
    let id = this._route.snapshot.params.id;
    this.idModel.AdvId = id;
    this._parentApi.setpagelayout("DownLoad Advertisement :", "keyboard_backspace", "Back to List", "/advertisement/advforadmindepartmentuserdepartment");
  }


  ngOnInit() {
    this.GetById();
  }

  GetById() {
    this._advertisementService.GetRedesignDetailForAdmin(this.idModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.resultModel = <RedesignDetailModel>data.Data;
          this.detailModel = this.resultModel.AdvertisementList;
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  OpenRawData() {
    this._dialog.open(AdvertisementRawdataComponent, {
      width: "500px",
      data: this.detailModel
    });
  }

}
