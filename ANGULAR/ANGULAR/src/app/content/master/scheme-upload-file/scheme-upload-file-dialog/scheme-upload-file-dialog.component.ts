import { Component, OnInit, Inject } from '@angular/core';
import { UploadFileCategoryViewModel } from 'src/app/Shared/Model/Master/uploadfilecategory.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchemeUploadFileCategoryService } from 'src/app/Shared/Service/scheme-upload-file-category.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-scheme-upload-file-dialog',
  templateUrl: './scheme-upload-file-dialog.component.html',
  styleUrls: ['./scheme-upload-file-dialog.component.css']
})
export class SchemeUploadFileDialogComponent implements OnInit {
  id: number;
  model: UploadFileCategoryViewModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  constructor(private readonly _alertService: AlertService,
    private readonly _router: Router,
    public readonly _dialogRef: MatDialogRef<SchemeUploadFileDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _schemeUploadFileCategoryService: SchemeUploadFileCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new UploadFileCategoryViewModel();
    }
  }
  ngOnInit() {
  }

  Reset(){
    this.model = new UploadFileCategoryViewModel();
  }

  GetById() {
    this._schemeUploadFileCategoryService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <UploadFileCategoryViewModel>data.Data;
        }
      },
      error => {
        this.model = new UploadFileCategoryViewModel();
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid) {

      if (this.model.Id) {

        this._schemeUploadFileCategoryService.EditSchemeUploadFileCategory(this.model).subscribe(data => {
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
        this._schemeUploadFileCategoryService.AddSchemeUploadFileCategory(this.model).subscribe(data => {
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
