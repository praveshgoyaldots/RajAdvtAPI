import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ProjectCategoryMaster } from 'src/app/Shared/Model/Master/project-category-master-model';
import { FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ProjectCategoryService } from 'src/app/Shared/Service/project-category.service';

@Component({
  selector: 'app-project-category-add-update',
  templateUrl: './project-category-add-update.component.html',
  styleUrls: ['./project-category-add-update.component.css']
})
export class ProjectCategoryAddUpdateComponent implements OnInit {
//#region <Variable>

id: number;
model: ProjectCategoryMaster;
Name = new FormControl('', [Validators.required]);
NameHindi = new FormControl('', [Validators.required]);
title: string = "Add";

//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<ProjectCategoryAddUpdateComponent>,
  private readonly _alertService: AlertService,
  private readonly _projectCategoryService: ProjectCategoryService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  if (data) {
    this.id = data;
    this.GetById();
    this.title = "Update";
  } else {
    this.model = new ProjectCategoryMaster();
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
}

GetById() {
  this._projectCategoryService.GetById(this.id).subscribe(
    data => {
      if (
        (data.IsSuccess)
      ) {
        this.model = <ProjectCategoryMaster>data.Data;
      }
    },
    error => {
      this.model = new ProjectCategoryMaster();
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  this.Name.markAsTouched();
  this.NameHindi.markAsTouched();
  if (this.Name.valid && this.NameHindi.valid) {
    if (this.model.Id) {
      this._projectCategoryService.Edit(this.model).subscribe(data => {
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
      this._projectCategoryService.Add(this.model).subscribe(data => {
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
