import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { YearMasterModel } from 'src/app/Shared/Model/Camparetive/comparative-year-master-model';
import { Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ComparativeYearMasterService } from 'src/app/Shared/Service/Comperative/comparative-year-master.service';
import { CommonService } from 'src/app/Shared/Service/common.service';

@Component({
  selector: 'app-addupdatecomparative-year-master',
  templateUrl: './addupdatecomparative-year-master.component.html',
  styleUrls: ['./addupdatecomparative-year-master.component.css']
})
export class AddupdatecomparativeYearMasterComponent implements OnInit {

//#region <Variable>

id: number;
model: YearMasterModel;
YearName = new FormControl("", [Validators.required]);
title = "Add";

//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<AddupdatecomparativeYearMasterComponent>,
  private readonly _alertService: AlertService,
  private readonly _ComparativeYearMasterService : ComparativeYearMasterService,
  private readonly _commonService: CommonService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  
  if (data) {
    this.id = data;
    this.GetById();
    this.title = "Update";
  } else {
    this.model = new YearMasterModel();
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
}


GetById() {
  this._ComparativeYearMasterService.GetById(this.id).subscribe(
    data => {
      if (data.IsSuccess) {
        this.model = <YearMasterModel>data.Data;
        // if (this.model.IsDepartment){
        //   this.model.IsDepartment = String(this.model.IsDepartment);
        // }
        // if (this.model.IsDistrict){
        //   this.model.IsDistrict = String(this.model.IsDistrict);
        // }
      }
    },
    error => {
      this.model = new YearMasterModel();
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  
  this.YearName.markAsTouched();
  if (this.YearName.valid ) {
    if (this.model.Id) {
      this._ComparativeYearMasterService.Edit(this.model).subscribe(
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
      this._ComparativeYearMasterService.Add(this.model).subscribe(
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
