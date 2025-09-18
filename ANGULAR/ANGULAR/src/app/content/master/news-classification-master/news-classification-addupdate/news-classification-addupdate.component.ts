import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { NewsClassificationMasterModel } from 'src/app/Shared/Model/Master/news-classification-model';
import { Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { NewsClassificationService } from 'src/app/Shared/Service/news-classification.service';

@Component({
  selector: 'app-news-classification-addupdate',
  templateUrl: './news-classification-addupdate.component.html',
  styleUrls: ['./news-classification-addupdate.component.css']
})
export class NewsClassificationAddupdateComponent implements OnInit {
//#region <Variable>

id: number;
model: NewsClassificationMasterModel;
Name = new FormControl('', [Validators.required]);
NameHindi = new FormControl('', [Validators.required]);
title: string = "Add";

//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<NewsClassificationAddupdateComponent>,
  private readonly _alertService: AlertService,
  private readonly _newsClassificationService: NewsClassificationService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  if (data) {
    this.id = data;
    this.GetById();
    this.title = "Update";
  } else {
    this.model = new NewsClassificationMasterModel();
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
}

GetById() {
  this._newsClassificationService.GetById(this.id).subscribe(
    data => {
      if (
        (data.IsSuccess)
      ) {
        this.model = <NewsClassificationMasterModel>data.Data;
      }
    },
    error => {
      this.model = new NewsClassificationMasterModel();
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  this.Name.markAsTouched();
  this.NameHindi.markAsTouched();
  if (this.Name.valid && this.NameHindi.valid) {
    if (this.model.Id) {
      this._newsClassificationService.Edit(this.model).subscribe(data => {
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
      this._newsClassificationService.Add(this.model).subscribe(data => {
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

//#endregion <Method>
}
