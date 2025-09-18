import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchemeRequiredDocumentCategoryViewModel } from 'src/app/Shared/Model/Master/requiredocumentcategory.model';
import { SchemeRequiredDocumentCategoryService } from 'src/app/Shared/Service/scheme-required-document-category.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-scheme-required-document-category-dialog',
  templateUrl: './scheme-required-document-category-dialog.component.html',
  styleUrls: ['./scheme-required-document-category-dialog.component.css']
})
export class SchemeRequiredDocumentCategoryDialogComponent implements OnInit {
  id: number;
  model: SchemeRequiredDocumentCategoryViewModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  constructor(private readonly _alertService: AlertService,
    private readonly _router: Router,
    public readonly _dialogRef: MatDialogRef<SchemeRequiredDocumentCategoryDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _schemeRequiredDocumentCategoryService: SchemeRequiredDocumentCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new SchemeRequiredDocumentCategoryViewModel();
    }
  }
  ngOnInit() {
  }

  
  GetById() {
    this._schemeRequiredDocumentCategoryService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          
          this.model = <SchemeRequiredDocumentCategoryViewModel>data.Data;
        }
      },
      error => {
        this.model = new SchemeRequiredDocumentCategoryViewModel();
        this._alertService.error(error.message);
      }
    );
}


SaveClick() {
  this.Name.markAsTouched();
  this.NameHindi.markAsTouched();
  if (this.Name.valid && this.NameHindi.valid) {
    
    if(this.model.Id){
      
      this._schemeRequiredDocumentCategoryService.EditSchemeReqDocumentCategory(this.model).subscribe(data => {
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
      this._schemeRequiredDocumentCategoryService.AddSchemeReqDocumentCategory(this.model).subscribe(data => {
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
