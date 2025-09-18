import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { HelpDocumentTypeMasterModel } from 'src/app/Shared/Model/help-document-type-master-model';
import { FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { HelpDocumentTypeService } from 'src/app/Shared/Service/help-document-type.service';
import { CommonService } from 'src/app/Shared/Service/common.service';

@Component({
  selector: 'app-addupdate-help-document-type-master',
  templateUrl: './addupdate-help-document-type-master.component.html',
  styleUrls: ['./addupdate-help-document-type-master.component.css']
})
export class AddupdateHelpDocumentTypeMasterComponent implements OnInit {
//#region <Variable>

id: number;
model: HelpDocumentTypeMasterModel;
Name = new FormControl("", [Validators.required]);
NameHindi = new FormControl("",null);
title = "Add";

//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<AddupdateHelpDocumentTypeMasterComponent>,
  private readonly _alertService: AlertService,
  private readonly _helpDocumentTypeService : HelpDocumentTypeService,
  private readonly _commonService: CommonService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  
  if (data) {
    this.id = data;
    this.GetById();
    this.title = "Update";
  } else {
    this.model = new HelpDocumentTypeMasterModel();
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
}


GetById() {
  this._helpDocumentTypeService.GetById(this.id).subscribe(
    data => {
      if (data.IsSuccess) {
        this.model = <HelpDocumentTypeMasterModel>data.Data;

      }
    },
    error => {
      this.model = new HelpDocumentTypeMasterModel();
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  this.Name.markAsTouched();
  this.NameHindi.markAsTouched();

  if (this.Name.valid && this.NameHindi.valid ) {
    if (this.model.Id) {
      this._helpDocumentTypeService.Edit(this.model).subscribe(
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
      this._helpDocumentTypeService.Add(this.model).subscribe(
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

//#endregion <Method>
}
