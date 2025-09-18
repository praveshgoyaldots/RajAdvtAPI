import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';

import { AppComponent } from 'src/app/app.component';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdvertisementEditModel } from 'src/app/Shared/Model/advertisement.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-delete-advertisement',
  templateUrl: './delete-advertisement.component.html',
  styleUrls: ['./delete-advertisement.component.css']
})
export class DeleteAdvertisementComponent implements OnInit {
  id: number;
  detailModel: AdvertisementEditModel;
  constructor(private readonly _advertisementService: AdvertisementService,
    private _router: Router,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent,
    private readonly _dialog: MatDialog) {
    this.id = this._route.snapshot.params.id;
    this._parentApi.setpagelayout("Delete Advertisement :", "keyboard_backspace", "Back to list", "advertisement/");
  }

  ngOnInit() {
    this.OnDataGetById();
  }

  OnDataGetById() {
    this._advertisementService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        )
          this.detailModel = <AdvertisementEditModel>data.Data;

        // if (this.detailModel.DocumentUrl) {
        //   this.detailModel.DocumentUrl = AppSetting.advimagebasepath + this.detailModel.DocumentUrl;
        // }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  Delete() {
    this._advertisementService.DeleteAdvertisement(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this._router.navigate(['/advertisement']);
        }

      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  OnDelete() {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Delete();
      }
    });
  }

}
