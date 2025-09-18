import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { AdvtConfigurationService } from 'src/app/Shared/Service/advt-configuration.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';

@Component({
  selector: 'app-advertisement-config-sertting',
  templateUrl: './advertisement-config-sertting.component.html',
  styleUrls: ['./advertisement-config-sertting.component.css']
})
export class AdvertisementConfigSerttingComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly _advtConfigurationService: AdvtConfigurationService,
    public readonly _dialogRef: MatDialogRef<AdvertisementConfigSerttingComponent>,
    private readonly _alertService: AlertService,
  ) { }

  ngOnInit() {
    this.GetDetail();
    this.formGroupInit();
  }

  formGroupInit() {
    this.formGroup = this.fb.group({
      Id: [0],
      SidebarFrame_RecordCount: ['', Validators.required]
    })
  }

  onNoClick() {
    this._dialogRef.close();
  }

  SaveClick() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this._advtConfigurationService.AddUpdate(this.formGroup.value).subscribe(data => {
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
      console.log(this.formGroup.value)
    }
  }

  GetDetail() {
    debugger;
    this._advtConfigurationService.GetById(1).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.formGroup.patchValue(data.Data);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }
}
