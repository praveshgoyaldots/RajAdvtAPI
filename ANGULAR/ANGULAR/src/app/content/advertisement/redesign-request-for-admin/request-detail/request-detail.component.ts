import { Component, OnInit } from '@angular/core';
import { AdvertisementRedesignRequestIdModel, AdvertisementEditModel, RedesignDetailModel } from 'src/app/Shared/Model/advertisement.model';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { RedesignApproveDialogComponent } from '../redesign-approve-dialog/redesign-approve-dialog.component';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
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
    let ids = String(this._route.snapshot.params.id).split(',');
    this.idModel.AdvId = Number(ids[0]);
    this.idModel.RedesignId = Number(ids[1]);
    this._parentApi.setpagelayout("Redesign request Detail :", "keyboard_backspace", "Back to List", "/advertisement/redesignrequestforadmin");
  }

  ngOnInit() {
    this.GetById();
  }

  GetById() {
    
    this._advertisementService.GetRedesignDetailForAdmin(this.idModel).subscribe(
      data => {
        
        if (
          (data.IsSuccess)
        ) {
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

  ApproveClick() {
    this._dialog.open(RedesignApproveDialogComponent, {
      width: "500px",
      data: this.idModel.RedesignId
    });
  }


}
