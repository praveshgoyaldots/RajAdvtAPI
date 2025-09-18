import { Component, OnInit, Inject } from '@angular/core';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { SchemeCategoryViewModel } from 'src/app/Shared/Model/Master/schemecategory.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchemeCategoryService } from 'src/app/Shared/Service/scheme-category.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-scheme-category-dialog',
  templateUrl: './scheme-category-dialog.component.html',
  styleUrls: ['./scheme-category-dialog.component.css']
})
export class SchemeCategoryDialogComponent implements OnInit {
  id: number;
  model: SchemeCategoryViewModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  constructor(private readonly _alertService: AlertService,
    private readonly _router: Router,
    public readonly _dialogRef: MatDialogRef<SchemeCategoryDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _schemeCategoryService: SchemeCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   
    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new SchemeCategoryViewModel();
    }
  }
  ngOnInit() {
  }


  GetById() {
    this._schemeCategoryService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <SchemeCategoryViewModel>data.Data;
        }
      },
      error => {
        this.model = new SchemeCategoryViewModel();
        this._alertService.error(error.message);
      }
    );
}

SaveClick() {
  this.Name.markAsTouched();
  this.NameHindi.markAsTouched();
  if (this.Name.valid && this.NameHindi.valid) {
    if(this.model.Id){

      this._schemeCategoryService.EditSchemeCategory(this.model).subscribe(data => {
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
      this._schemeCategoryService.AddSchemeCategory(this.model).subscribe(data => {
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
