import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ProjectSubCategoryMasterModel } from 'src/app/Shared/Model/Master/project-sub-category.model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ProjectSubCategoryService } from 'src/app/Shared/Service/project-sub-category.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-project-sub-category-addupdate-dialog',
  templateUrl: './project-sub-category-addupdate-dialog.component.html',
  styleUrls: ['./project-sub-category-addupdate-dialog.component.css']
})
export class ProjectSubCategoryAddupdateDialogComponent implements OnInit {
 //#region <Variable>

 id: number;
 model: ProjectSubCategoryMasterModel;
 Name = new FormControl("", [Validators.required]);
 categoryCode = new FormControl("", [Validators.required]);
 LabelName = new FormControl("", [Validators.required]);
 IsNumeric = new FormControl("", null);
 title = "Add";
 dDLList: DDLModel;

 //#endregion <Variable>

 //#region <Constructor>

 constructor(
   public readonly _dialogRef: MatDialogRef<
   ProjectSubCategoryAddupdateDialogComponent
   >,
   private readonly _alertService: AlertService,
   private readonly _projectSubCategoryService : ProjectSubCategoryService,
   private readonly _commonService: CommonService,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) {
   
   if (data) {
     this.id = data;
     this.GetById();
     this.title = "Update";
   } else {
     this.model = new ProjectSubCategoryMasterModel();
     this.title = "Add";
   }
 }

 //#endregion <Constructor>

 //#region <Method>

 ngOnInit() {
   this.GetDDLList();
 }

 GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.ProjectSubCategoryMasterDDLKey).subscribe(
    (data) => {
      
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}

 GetById() {
   this._projectSubCategoryService.GetById(this.id).subscribe(
     data => {
       if (data.IsSuccess) {
         this.model = <ProjectSubCategoryMasterModel>data.Data;
         if (this.model.CategoryCode){
this.model.CategoryCode = String(this.model.CategoryCode);
         }
       }
     },
     error => {
       this.model = new ProjectSubCategoryMasterModel();
       this._alertService.error(error.message);
     }
   );
 }

 SaveClick() {
   this.Name.markAsTouched();
   this.categoryCode.markAsTouched();
   this.LabelName.markAsTouched();
   this.IsNumeric.markAsTouched();
   if (this.Name.valid && this.categoryCode.valid && this.LabelName.valid && this.IsNumeric.valid) {
     if (this.model.Id) {
       this._projectSubCategoryService.Edit(this.model).subscribe(
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
       this._projectSubCategoryService.Add(this.model).subscribe(
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
