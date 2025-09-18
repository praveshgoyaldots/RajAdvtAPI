import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CancellationReasonMasterModel } from 'src/app/Shared/Model/Master/cancellation-reason-master.model';
import { Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CancellationReasonService } from 'src/app/Shared/Service/cancellation-reason.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: 'app-reason-add-update-dialog',
  templateUrl: './reason-add-update-dialog.component.html',
  styleUrls: ['./reason-add-update-dialog.component.css']
})
export class ReasonAddUpdateDialogComponent implements OnInit {

  id: number;
  model: CancellationReasonMasterModel;
  name = new FormControl('', [Validators.required]);
  departmentCode = new FormControl('', [Validators.required]);
  title: string = "Add";

  constructor(
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<ReasonAddUpdateDialogComponent>,
    private readonly _cancellationReasonService: CancellationReasonService,
    private readonly _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
      this.GetById();
    }
    this.model = new CancellationReasonMasterModel();
  }

  ngOnInit() {
  }

  GetById() {
    this._cancellationReasonService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <CancellationReasonMasterModel>data.Data;
        }
      },
      error => {
        this.model = new CancellationReasonMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    this.name.markAsTouched();
    if (this.name.valid) {
    if (this.model.Id) {
      this._cancellationReasonService.Edit(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._dialogRef.close(true);
        } else {
          this._alertService.error(data.Message);

        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    } else {
      this._cancellationReasonService.Add(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._dialogRef.close(true);
        } else {
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
