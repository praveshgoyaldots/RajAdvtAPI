import { Component, OnInit, Inject } from '@angular/core';
import { ProjectMileStoneMasterModel } from 'src/app/Shared/Model/Master/project-mile-stone.model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ProjectMileStoneService } from 'src/app/Shared/Service/project-mile-stone.service';
import { CommonService } from 'src/app/Shared/Service/common.service';

@Component({
  selector: 'app-project-mile-stone-add-update',
  templateUrl: './project-mile-stone-add-update.component.html',
  styleUrls: ['./project-mile-stone-add-update.component.css']
})
export class ProjectMileStoneAddUpdateComponent implements OnInit {
//#region <Variable>

id: number;
model: ProjectMileStoneMasterModel;
Name = new FormControl("", [Validators.required]);
DispalyOrder = new FormControl("", [Validators.required]);
Description = new FormControl("", [Validators.required]);
title = "Add";

//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<
  ProjectMileStoneAddUpdateComponent
  >,
  private readonly _alertService: AlertService,
  private readonly _projectMileStoneService : ProjectMileStoneService,
  private readonly _commonService: CommonService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  
  if (data) {
    this.id = data;
    this.GetById();
    this.title = "Update";
  } else {
    this.model = new ProjectMileStoneMasterModel();
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
}

GetById() {
  this._projectMileStoneService.GetById(this.id).subscribe(
    data => {
      if (data.IsSuccess) {
        this.model = <ProjectMileStoneMasterModel>data.Data;
      }
    },
    error => {
      this.model = new ProjectMileStoneMasterModel();
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  
  this.Name.markAsTouched();
  this.DispalyOrder.markAsTouched();
  this.Description.markAsTouched();
  if (this.Name.valid && this.DispalyOrder.valid && this.Description.valid) {
    if (this.model.Id) {
      this._projectMileStoneService.Edit(this.model).subscribe(
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
      this._projectMileStoneService.Add(this.model).subscribe(
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
