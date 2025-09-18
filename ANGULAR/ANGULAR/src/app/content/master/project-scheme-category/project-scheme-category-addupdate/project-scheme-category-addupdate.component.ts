import { Component, OnInit, Inject } from '@angular/core';
import { ProjectSchemeCategoryMasterModel } from 'src/app/Shared/Model/Master/project-scheme-category-master-model';
import { FormControl, Validators } from '@angular/forms';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ProjectSchemeCategoryService } from 'src/app/Shared/Service/project-scheme-category.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { UserService } from 'src/app/Shared/Service/user.service';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: 'app-project-scheme-category-addupdate',
  templateUrl: './project-scheme-category-addupdate.component.html',
  styleUrls: ['./project-scheme-category-addupdate.component.css']
})
export class ProjectSchemeCategoryAddupdateComponent implements OnInit {
//#region <Variable>

id: number;
model: ProjectSchemeCategoryMasterModel;
ddlDepartment: UserDepartmentViewModel[];
programSchemeName = new FormControl("", [Validators.required]);
nodalDepartmentCode = new FormControl("", [Validators.required]);
programSchemeTypeCode = new FormControl("", [Validators.required]);
title = "Add";
dDLList: DDLModel;
loginData: UserViewModel;

//#endregion <Variable>

//#region <Constructor>

constructor(
  public readonly _dialogRef: MatDialogRef<
  ProjectSchemeCategoryAddupdateComponent
  >,
  private readonly _alertService: AlertService,
  private readonly _projectSchemeCategoryService : ProjectSchemeCategoryService,
  private readonly _commonService: CommonService,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  
  if (data) {
    this.id = data;
    this.GetById();
    this.title = "Update";
  } else {
    this.model = new ProjectSchemeCategoryMasterModel();
    this.title = "Add";
  }
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
  this.GetDDLList();
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  this.getDepartment();
}

getDepartment() {
  this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
    data => {
      if (data.IsSuccess) {
        this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

GetDDLList() {
 this._commonService.GetAllDDL(AppSetting.ProjectSchemeCategoryMasterDDLKey).subscribe(
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
  this._projectSchemeCategoryService.GetById(this.id).subscribe(
    data => {
      if (data.IsSuccess) {
        this.model = <ProjectSchemeCategoryMasterModel>data.Data;
        if (this.model.NodalDepartmentCode){
this.model.NodalDepartmentCode = String(this.model.NodalDepartmentCode);
        }
        if (this.model.ProgramSchemeTypeCode){
          this.model.ProgramSchemeTypeCode = String(this.model.ProgramSchemeTypeCode);
                  }
      }
    },
    error => {
      this.model = new ProjectSchemeCategoryMasterModel();
      this._alertService.error(error.message);
    }
  );
}

SaveClick() {
  this.programSchemeName.markAsTouched();
  this.nodalDepartmentCode.markAsTouched();
  this.programSchemeTypeCode.markAsTouched();
  if (this.programSchemeName.valid && this.nodalDepartmentCode.valid && this.programSchemeTypeCode.valid) {
    if (this.model.Id) {
      this._projectSchemeCategoryService.Edit(this.model).subscribe(
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
      this._projectSchemeCategoryService.Add(this.model).subscribe(
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
