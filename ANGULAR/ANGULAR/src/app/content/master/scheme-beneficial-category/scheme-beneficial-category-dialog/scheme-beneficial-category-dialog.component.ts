import { Component, OnInit, Inject } from '@angular/core';
import { SchemeBeneficialCategoryViewModel } from 'src/app/Shared/Model/Master/schemebeneficialcategory.model';
import { SchemeBeneficialCategoryService } from 'src/app/Shared/Service/scheme-beneficial-category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-scheme-beneficial-category-dialog',
  templateUrl: './scheme-beneficial-category-dialog.component.html',
  styleUrls: ['./scheme-beneficial-category-dialog.component.css']
})
export class SchemeBeneficialCategoryDialogComponent implements OnInit {
  id: number;
  model: SchemeBeneficialCategoryViewModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  constructor(private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<SchemeBeneficialCategoryDialogComponent>,
    private readonly  _schemeBeneficialCategoryService: SchemeBeneficialCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new SchemeBeneficialCategoryViewModel();
    }
  }

  ngOnInit() {
  }

  GetById() {
    this._schemeBeneficialCategoryService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <SchemeBeneficialCategoryViewModel>data.Data;
        }
      },
      error => {
        this.model = new SchemeBeneficialCategoryViewModel();
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid) {
     
      if (this.model.Id) {

        this._schemeBeneficialCategoryService.EditSchemeBeneficialCategory(this.model).subscribe(data => {
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
        this._schemeBeneficialCategoryService.AddSchemeBeneficialCategory(this.model).subscribe(data => {
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
