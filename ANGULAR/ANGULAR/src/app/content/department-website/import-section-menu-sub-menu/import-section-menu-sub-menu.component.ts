import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { ImportSectionMenuAndSubMenuFilterModel } from "src/app/Shared/Model/Master/department.model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { DepartmentSubmenuClassificationService } from "src/app/Shared/Service/department-submenu-classification.service";

@Component({
  selector: "app-import-section-menu-sub-menu",
  templateUrl: "./import-section-menu-sub-menu.component.html",
  styleUrls: ["./import-section-menu-sub-menu.component.css"],
})
export class ImportSectionMenuSubMenuComponent implements OnInit {
  //#region << Variable >>

  formGroup: FormGroup;
  model: ImportSectionMenuAndSubMenuFilterModel;
  dDLList: DDLModel;
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentApi: AppComponent,
    private readonly _DepartmentSubmenuClassificationService: DepartmentSubmenuClassificationService,
    private readonly _alertService: AlertService,
    private readonly formBuilder: FormBuilder,
    private readonly _commonService: CommonService
  ) {
    
    this.model = new ImportSectionMenuAndSubMenuFilterModel();
    this._parentApi.setpagelayout(
      "Import Section, Menu and Sub Menu Form single department to multiple department :",
      "",
      "",
      ""
    );
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForImportSectionMenuAndSubMenu)
      .subscribe(
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

  SaveClick() {
    
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.model.ToDepartmentCodes=this.model.ToDepartmentList.toString();
      this._DepartmentSubmenuClassificationService
        .ImportSectionMenuAndSubMenu(this.model)
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
            //  this._commonService.ScrollingTop();
              this._alertService.success(data.Message);
              window.alert(data.Message);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    }
  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      FromDepartmentCode: [null, Validators.required],
      ToDepartmentList: [null, Validators.required],
      IsSectionImport: [null],
      IsMenuImport: [null],
      IsSubMenuImport: [null],
    });
  }

  //#endregion  << Method >>
}
