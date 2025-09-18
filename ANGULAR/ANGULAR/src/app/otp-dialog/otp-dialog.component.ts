import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonService } from '../Shared/Service/common.service';
import { AlertService } from '../Shared/Service/alert.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css']
})
export class OTPDialogComponent implements OnInit {

  otp = new FormControl('', [Validators.required]);
  oTP: string;
  constructor(
    public readonly _commonService: CommonService,
    public dialogRef: MatDialogRef<OTPDialogComponent>,
    private readonly _alertService: AlertService
  ) { }

  ngOnInit() {

  }

  saveClick(){
    this.otp.markAsTouched();
    if (this.otp.valid) {
      this._commonService.VerifyOTP(this.oTP).subscribe(
        data => {
          if (data.IsSuccess) {
            this.dialogRef.close(true);
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

  reSendOTP() {
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {
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

  onNoClick(): void {
    this.dialogRef.close();
  }


}
