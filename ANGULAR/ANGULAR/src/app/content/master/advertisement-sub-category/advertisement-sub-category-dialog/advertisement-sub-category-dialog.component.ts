import { Component, OnInit, Inject } from "@angular/core";
import { AdvSubCategoryService } from "src/app/Shared/Service/adv-sub-category.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AdvSubCategoryModel } from "src/app/Shared/Model/Master/AdvSubCategory.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppComponent } from "src/app/app.component";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-advertisement-sub-category-dialog",
  templateUrl: "./advertisement-sub-category-dialog.component.html",
  styleUrls: ["./advertisement-sub-category-dialog.component.css"],
  providers: [AdvSubCategoryService],
})
export class AdvertisementSubCategoryDialogComponent implements OnInit {
  id: number;
  model: AdvSubCategoryModel;

  fromGroup: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<
      AdvertisementSubCategoryDialogComponent
    >,
    private readonly _advSubCategoryService: AdvSubCategoryService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
      this.GetById();
    }
    this.model = new AdvSubCategoryModel();
  }

  ngOnInit() {}

  GetById() {
    this._advSubCategoryService.GetById(this.id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.model = <AdvSubCategoryModel>data.Data;
        }
      },
      (error) => {
        this.model = new AdvSubCategoryModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    if (this.model.Id) {
      this._advSubCategoryService.EditAdvSubCategory(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(GlobalMessagesModel.updateSuccess);
            this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          console.log(error);
          this._alertService.error(error.message);
        }
      );
    } else {
      this._advSubCategoryService.AddAdvSubCategory(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(GlobalMessagesModel.saveSuccess);
            this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          console.log(error);
          this._alertService.error(error.message);
        }
      );
    }
  }

  onNoClick(): void {
    this._dialogRef.close();
  }
}
