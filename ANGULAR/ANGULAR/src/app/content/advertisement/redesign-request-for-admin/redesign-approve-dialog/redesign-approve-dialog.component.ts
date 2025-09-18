import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ApproveByAdminModel } from 'src/app/Shared/Model/advertisement.model';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redesign-approve-dialog',
  templateUrl: './redesign-approve-dialog.component.html',
  styleUrls: ['./redesign-approve-dialog.component.css']
})
export class RedesignApproveDialogComponent implements OnInit {
  model:ApproveByAdminModel;
  remarks = new FormControl('', [Validators.required]);
  isapprove=new FormControl('', [Validators.required]);
  constructor(
    private readonly _advertisementService: AdvertisementService,
    private readonly _alertService: AlertService,
    private _router: Router,
    public _dialogRef: MatDialogRef<RedesignApproveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model=new ApproveByAdminModel();
    if (data) {
      this.model.Id=data;
    }
  }

  ngOnInit() {
  }

  SaveClick(){

    this.remarks.markAsTouched();
    this.isapprove.markAllAsTouched();
    if (this.remarks.valid && this.isapprove)
    {
    this._advertisementService.RedesignApproveByAdmin(this.model).subscribe(
      data => {

        if (
          (data.IsSuccess)
        ) {
          this._router.navigate(["/advertisement/redesignrequestforadmin"]);
          this._dialogRef.close();
          this._alertService.success(data.Message);

        }else{
          this._alertService.error(data.Message);
        }

      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  }

  onNoClick(): void {
    this._dialogRef.close();
  }


}
