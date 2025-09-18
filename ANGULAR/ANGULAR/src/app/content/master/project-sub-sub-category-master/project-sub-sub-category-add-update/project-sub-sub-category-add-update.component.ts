import { Component, OnInit, Inject } from "@angular/core";
import { SubSubCategoryMasterModel } from "src/app/Shared/Model/Master/projectsub-sub-category-master-model";
import { FormControl, Validators } from "@angular/forms";
import { DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { ProjectSubSubCategoryService } from "src/app/Shared/Service/project-sub-sub-category.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";

@Component({
  selector: "app-project-sub-sub-category-add-update",
  templateUrl: "./project-sub-sub-category-add-update.component.html",
  styleUrls: ["./project-sub-sub-category-add-update.component.css"]
})
export class ProjectSubSubCategoryAddUpdateComponent implements OnInit {
  //#region <Variable>

  id: number;
  model: SubSubCategoryMasterModel;
  Name = new FormControl("", [Validators.required]);
  categoryCode = new FormControl("", [Validators.required]);
  subCategory = new FormControl("", [Validators.required]);
  IsApplicableToAll = new FormControl("");
  title = "Add";
  dDLList: DDLModel;
  ddlProjectSubCategory: DdlItemModel[] = [];

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    public readonly _dialogRef: MatDialogRef<
      ProjectSubSubCategoryAddUpdateComponent
    >,
    private readonly _alertService: AlertService,
    private readonly _projectSubSubCategoryService: ProjectSubSubCategoryService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    if (data) {
      this.id = data;
      this.GetById();
      this.title = "Update";
    } else {
      this.model = new SubSubCategoryMasterModel();
      this.title = "Add";
    }
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.ProjectSubSubCategoryMasterDDLKey)
      .subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.dDLList = <DDLModel>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  GetById() {
    this._projectSubSubCategoryService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <SubSubCategoryMasterModel>data.Data;
          if (this.model.CategoryCode) {
            this.getSubCategoryByCategoryCode(this.model.CategoryCode);
            this.model.CategoryCode = String(this.model.CategoryCode);
          }
          if (this.model.SubCategoryCode) {
            this.model.SubCategoryCode = String(this.model.SubCategoryCode);
          }
          if (this.model.IsApplicableToAll) {
            this.model.IsApplicableToAll = String(this.model.IsApplicableToAll);
          }
        }
      },
      error => {
        this.model = new SubSubCategoryMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  getSubCategoryByCategoryCode(code) {
    
    if (code) {
      this._commonService.GetSubCategoryByCategoryCode(Number(code)).subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.ddlProjectSubCategory = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  SaveClick() {
    this.Name.markAsTouched();
    this.categoryCode.markAsTouched();
    this.subCategory.markAsTouched();
    if (
      this.Name.valid &&
      this.categoryCode.valid &&
      this.subCategory.valid 
    ) {
      if (this.model.Id) {
        this._projectSubSubCategoryService.Edit(this.model).subscribe(
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
        this._projectSubSubCategoryService.Add(this.model).subscribe(
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
