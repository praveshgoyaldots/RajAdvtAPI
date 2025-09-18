import { Component, OnInit, Inject } from '@angular/core';
import { PlatformModel, PlatformListModel } from 'src/app/Shared/Model/Master/platform-master.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformService } from 'src/app/Shared/Service/platform.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-platform-dialog',
  templateUrl: './platform-dialog.component.html',
  styleUrls: ['./platform-dialog.component.css'],
  providers: [PlatformService]
})
export class PlatformDialogComponent implements OnInit {
  id: number;
  model: PlatformModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  title:string="Add";
  constructor(
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<PlatformDialogComponent>,
    private readonly _platformService: PlatformService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      this.id = data;
      this.GetById();
      this.title="Update";
    }
    else {
      this.model = new PlatformModel();
      this.title="Add";
    }
  }

  ngOnInit() {
  }

  GetById() {
    this._platformService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <PlatformModel>data.Data;
        }
      },
      error => {
        this.model = new PlatformModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid) {

      if (this.model.PlatformId) {

        this._platformService.EditPlatform(this.model).subscribe(data => {
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
        this._platformService.AddPlatform(this.model).subscribe(data => {
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
  }



  onNoClick(): void {

    this._dialogRef.close();
  }


}
