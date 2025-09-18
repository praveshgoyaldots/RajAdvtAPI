import { Component, OnInit, Inject } from '@angular/core';
import { TenderMappingModel } from 'src/app/Shared/Model/TenderPressRelease/tender-master-model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { TenderMasterService } from 'src/app/Shared/Service/TenderPressRelease/tender-master.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';

@Component({
  selector: 'app-tender-progress-dialog',
  templateUrl: './tender-progress-dialog.component.html',
  styleUrls: ['./tender-progress-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class TenderProgressDialogComponent implements OnInit {

//#region <Variable>

id: number;
model: TenderMappingModel;
desciption = new FormControl("", [Validators.required]);
progressDate = new FormControl("", [Validators.required]);
title = "Add";
fileValidationMsg: string = "";
//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<TenderProgressDialogComponent>,
  private readonly _alertService: AlertService,
  private readonly _tenderMasterService: TenderMasterService,
  private readonly _commonService: CommonService,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  
  this.model = new TenderMappingModel();
  if (data) {
    this.model.TenderId = data;
  }
  if (data && data.Id) {
    this.model.Id = data.Id;
    this.GetById();
    this.title = "Update";
  } else {
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {

}

GetById() {
  
  this._tenderMasterService.GetTenderProgressById(this.model.Id).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.model = <TenderMappingModel>data.Data;
      } else {
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  
  this.desciption.markAsTouched();
  this.progressDate.markAsTouched();
  if (this.desciption.valid && this.progressDate.valid) {
    if (this.model.Date) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.model.Date).getFullYear(),
          new Date(this.model.Date).getMonth(),
          new Date(this.model.Date).getDate()
        )
      ).toISOString();
      this.model.Date = uTCDate;
    }
    if (this.model.Id) {
      this._tenderMasterService.ModifyTenderProgress(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          console.log(error);
          this._alertService.error(error.message);
        }
      );
    } else {
      this._tenderMasterService.UpdateTenderProgress(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          console.log(error);
          this._alertService.error(error.message);
        }
      );
    }
  }
}

onNoClick(): void {
  this._dialogRef.close();
}

handleFileInput(event: any) {
  if (event.target.files.item(0).type.match("application/pdf")) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.model.PDFUrl = event.target.result;
    };
    reader.readAsDataURL(event.target.files.item(0));
    this.fileValidationMsg = "";
  } else {
    this.fileValidationMsg = "only *pdf file accepted ";
  }
}

downloadPdf(url, name) {
  if (url) {
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", name + ".pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

//#endregion <Method>
}
