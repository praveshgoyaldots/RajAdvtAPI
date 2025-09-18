import { Component, OnInit, Inject } from '@angular/core';
import { SchemeTypeViewModel } from 'src/app/Shared/Model/Master/SchemeType.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemeTypeService } from 'src/app/Shared/Service/scheme-type.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-scheme-type-dialog',
  templateUrl: './scheme-type-dialog.component.html',
  styleUrls: ['./scheme-type-dialog.component.css']
})
export class SchemeTypeDialogComponent implements OnInit {
  id: number;
  model: SchemeTypeViewModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  constructor(private readonly _alertService: AlertService,
    private readonly _router: Router,
    public readonly _dialogRef: MatDialogRef<SchemeTypeDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _schemeTypeService: SchemeTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new SchemeTypeViewModel();
    }
  }

  ngOnInit() {
  }

  GetById() {
    this._schemeTypeService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <SchemeTypeViewModel>data.Data;
        }
      },
      error => {
        this.model = new SchemeTypeViewModel();
        this._alertService.error(error.message);
      }
    );
  }

  Reset(){
    this.model = new SchemeTypeViewModel();
  }


  SaveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid) {
      if (this.model.Id) {

        this._schemeTypeService.EditSchemeType(this.model).subscribe(data => {
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
        this._schemeTypeService.AddSchemeType(this.model).subscribe(data => {
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
