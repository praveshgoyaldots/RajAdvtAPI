import { Component, OnInit, Inject } from '@angular/core';
import { SchemeCommonViewModel } from 'src/app/Shared/Model/Master/SchemeCommonMaster.model';
import { FormControl, Validators } from '@angular/forms';
import { SchemeCommonService } from 'src/app/Shared/Service/scheme-common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-scheme-common-dialog',
  templateUrl: './scheme-common-dialog.component.html',
  styleUrls: ['./scheme-common-dialog.component.css']
})
export class SchemeCommonDialogComponent implements OnInit {
  id: number;
  dDLList: DDLModel;
  model: SchemeCommonViewModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl('', [Validators.required]);
  constructor(private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<SchemeCommonDialogComponent>,
    private readonly  _schemeCommonService: SchemeCommonService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new SchemeCommonViewModel();
    }
  }
  ngOnInit() {
    this.GetDDLList();
  }



  GetById() {
    this._schemeCommonService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <SchemeCommonViewModel>data.Data;
          if (this.model.SchemeTypeCode) {
            this.model.SchemeTypeCode = String(this.model.SchemeTypeCode);
          }
        }
      },
      error => {
        this.model = new SchemeCommonViewModel();
        this._alertService.error(error.message);
      }
    );
}

Reset(){
  this.model = new SchemeCommonViewModel();
}

SaveClick() {
  
  this.Name.markAsTouched();
  this.NameHindi.markAsTouched();
  if (this.Name.valid && this.NameHindi.valid) {

    if(this.model.Id){

      this._schemeCommonService.EditSchemeCommon(this.model).subscribe(data => {
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
      this._schemeCommonService.AddSchemeCommon(this.model).subscribe(data => {
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


GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.DDlKeyForCommonSchemeMaster).subscribe(
    data => {

      if (
        (data)
      )
        this.dDLList = <DDLModel>data.Data;
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

onNoClick(): void {

  this._dialogRef.close();
}


}
