import { Component, OnInit, Inject } from '@angular/core';
import { ModeOfDeliveryViewModel } from 'src/app/Shared/Model/modeOfDelivery.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModeOfDeliveryService } from 'src/app/Shared/Service/mode-of-delivery.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';

@Component({
  selector: 'app-mode-of-delivery-dialog',
  templateUrl: './mode-of-delivery-dialog.component.html',
  styleUrls: ['./mode-of-delivery-dialog.component.css'],
  providers: [CommonService, ModeOfDeliveryService]
})
export class ModeOfDeliveryDialogComponent implements OnInit {
  id: number;
  model: ModeOfDeliveryViewModel;
  constructor(
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    public readonly _dialogRef: MatDialogRef<ModeOfDeliveryDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _modeOfDeliveryService: ModeOfDeliveryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new ModeOfDeliveryViewModel();
    }
  }

  ngOnInit() {
  }

  GetById() {

    this._modeOfDeliveryService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <ModeOfDeliveryViewModel>data.Data;
        }
      },
      error => {
        this.model = new ModeOfDeliveryViewModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {

    if (this.model.Id) {

      this._modeOfDeliveryService.EditModeOfDelivery(this.model).subscribe(data => {
        if (data.IsSuccess) {

          this._alertService.success(GlobalMessagesModel.updateSuccess);
          this._dialogRef.close(true);
        }
        else {
          this._alertService.error(data.Message);

        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    }
    else {
      this._modeOfDeliveryService.AddModeOfDelivery(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(GlobalMessagesModel.saveSuccess);
          this._dialogRef.close(true);
        }
        else {
          this._alertService.error(data.Message);
        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    }
  }

  onNoClick(): void {

    this._dialogRef.close();
  }


}
