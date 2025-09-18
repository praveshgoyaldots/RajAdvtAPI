import { CommonService } from "src/app/Shared/Service/common.service";
import { AppComponent } from "src/app/app.component";
import { Component, OnInit } from "@angular/core";
import { DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { EbookletEnum, EbookletEnumProd } from "src/app/Shared/Enum/ebooklet.enum";
import { EBookletService } from "src/app/Shared/Service/Comperative/e-booklet.service";
import {
  EBookletFilterModel,
  EBookletResponseModel,
} from "src/app/Shared/Model/Camparetive/e-booklet-model";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-e-booklet",
  templateUrl: "./e-booklet.component.html",
  styleUrls: ["./e-booklet.component.css"],
})
export class EBookletComponent implements OnInit {
  //#region Variable
  model: EBookletFilterModel;
  dataModel: EBookletResponseModel;
  dDLList: DDLModel;
  ebookletEnum = environment.production?EbookletEnumProd:EbookletEnum;
  Category = new FormControl("", [Validators.required]);
  department = new FormControl("", [Validators.required]);
  CategoryCode = new FormControl("", [Validators.required]);
  //#endregion

  constructor(
    private readonly fb: FormBuilder,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _eBookletService: EBookletService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent
  ) {
    this.model = new EBookletFilterModel();
    this._parentApi.setpagelayout('E-Booklet Report :',  "", "", "");
  }

  ngOnInit() {
    
    this.getDDLList();
  }

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForEbooklet).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      (error) => {
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
  }

  getBookletList() {
    
    if (this.model.CategoryWiseRadio == this.ebookletEnum.category) {
      this.model.DepartmentCode = 0;
      this.model.KPICategoryCode = 0;
    }
    if (this.model.CategoryWiseRadio == this.ebookletEnum.department) {
      this.model.BeneficiaryCategoryCode = 0;
       this.model.KPICategoryCode = 0;
    }
    if (this.model.CategoryWiseRadio == this.ebookletEnum.KPICategory) {
      this.model.BeneficiaryCategoryCode = 0;
      this.model.DepartmentCode = 0;
    }

    this._eBookletService.GetEbookLet(this.model).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.dataModel = <EBookletResponseModel>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  RadioChanges(){
    
    this.dataModel = new EBookletResponseModel();
    if (this.model.CategoryWiseRadio == this.ebookletEnum.category) {
      this.model.DepartmentCode = 0;
      this.model.KPICategoryCode = 0;
    }
    if (this.model.CategoryWiseRadio == this.ebookletEnum.department) {
      this.model.BeneficiaryCategoryCode = 0;
       this.model.KPICategoryCode = 0;
    }
    if (this.model.CategoryWiseRadio == this.ebookletEnum.KPICategory) {
      this.model.BeneficiaryCategoryCode = 0;
      this.model.DepartmentCode = 0;
    }
  }



}
