import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchemeOutputService } from 'src/app/Shared/Service/scheme-output.service';
import { SchemeOutputViewModel } from 'src/app/Shared/Model/Master/schemeoutput.model';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-scheme-output-dialog',
  templateUrl: './scheme-output-dialog.component.html',
  styleUrls: ['./scheme-output-dialog.component.css']
})
export class SchemeOutputDialogComponent implements OnInit {
  id: number;
  model: SchemeOutputViewModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  constructor(private readonly _alertService: AlertService,
    private readonly _router: Router,
    public readonly _dialogRef: MatDialogRef<SchemeOutputDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _schemeOutputService: SchemeOutputService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new SchemeOutputViewModel();
    }
  }
  ngOnInit() {
  }

  Reset(){
    this.model = new SchemeOutputViewModel();
  }

  GetById() {
    this._schemeOutputService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <SchemeOutputViewModel>data.Data;
        }
      },
      error => {
        this.model = new SchemeOutputViewModel();
        this._alertService.error(error.message);
      }
    );
}


SaveClick() {
  this.Name.markAsTouched();
  this.NameHindi.markAsTouched();
  if (this.Name.valid && this.NameHindi.valid) {

    if(this.model.Id){

      this._schemeOutputService.EditSchemeOutput(this.model).subscribe(data => {
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
    else{
      this._schemeOutputService.AddSchemeOutput(this.model).subscribe(data => {
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
