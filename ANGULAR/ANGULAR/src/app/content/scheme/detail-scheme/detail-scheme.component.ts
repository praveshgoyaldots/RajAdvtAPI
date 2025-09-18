import { Component, OnInit } from "@angular/core";

import { AppComponent } from "src/app/app.component";
import { SchemeService } from "src/app/Shared/Service/scheme.service";
import {
  SchemResponseModel,
  EligibilityCriteriaModel,
  EntryLookUpModel,
  RequiredDocumentModel,
  OtherDocumentModel
} from "src/app/Shared/Model/scheme-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import {
  DocumentUrlModel,
  DDLModel,
  DdlItemModel
} from "src/app/Shared/Model/commonddl.model";
import { CommonService } from "src/app/Shared/Service/common.service";

@Component({
  selector: "app-detail-scheme",
  templateUrl: "./detail-scheme.component.html",
  styleUrls: ["./detail-scheme.component.css"]
})
export class DetailSchemeComponent implements OnInit {
  model: SchemResponseModel;
  RecordId: number;
  dDLList: DDLModel;
  EligibilityCriteria: EligibilityCriteriaModel[] = [];
  EntryLookUp: EntryLookUpModel[] = [];
  RequiredDocument: RequiredDocumentModel[] = [];
  OtherDocument: OtherDocumentModel[] = [];
  AdminItems: { [index: string]: string } = {};
  NodelItems: { [index: string]: string } = {};
  EligibilityItems: { [index: string]: string } = {};
  RequiredDocItems: { [index: string]: string } = {};
  OtherDocItems: { [index: string]: string } = {};
  RequiredDoctypeItems: { [index: string]: string } = {};
  RequiredDocmandatoryItems: { [index: string]: string } = {};
  ContactPersonTypeItems: { [index: string]: string } = {};
  BlockItems: { [index: string]: string } = {};
  TahsilItems: { [index: string]: string } = {};
  DistrictItems: { [index: string]: string } = {};
  ddlBlockByDistrict: DdlItemModel[];
  ddlTahsilByBlock: DdlItemModel[];

  // strModeofApplication: string = "Offline";
  // strRequiredDocument: string = "";
  constructor(
    private _parentApi: AppComponent,
    private readonly _schemeService: SchemeService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.RecordId = this._route.snapshot.params.id;
    this._parentApi.setpagelayout(
      "Detail of Scheme/Services :",
      "keyboard_backspace",
      "Back To List",
      "scheme"
    );
    // this.model = new SchemResponseModel();
  }

  ngOnInit() {
    this.GetById(this.RecordId);
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForScheme).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;

          this.dDLList.ddlAdminDepartment.forEach(obj => {
            this.AdminItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlDepartment.forEach(obj => {
            this.NodelItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeEligibility.forEach(obj => {
            this.EligibilityItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlSchemeNameOfDocument.forEach(obj => {
            this.RequiredDocItems[obj.Value] = obj.Text;
          });

          this.dDLList.ddlSchemeListOfRequiredDoc.forEach(obj => {
            this.RequiredDoctypeItems[obj.Value] = obj.Text;
          });
          this.dDLList.RadioListOfRequiredDoc.forEach(obj => {
            this.RequiredDocmandatoryItems[obj.Value] = obj.Text;
          });

          this.dDLList.ddlSchemeListOfOtherDoc.forEach(obj => {
            this.OtherDocItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlContactPersonType.forEach(obj => {
            this.ContactPersonTypeItems[obj.Value] = obj.Text;
          });
          this.dDLList.ddlDistrict.forEach(obj => {
            this.DistrictItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getBlockByDistrict(code) {

    this.getTahsilByDistrict(code);
    this._commonService.GetBlockByDistrict(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlBlockByDistrict = <DdlItemModel[]>data.Data;
          this.ddlBlockByDistrict.forEach(obj => {
            this.BlockItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getTahsilByDistrict(code) {

    this._commonService.GetTahsilByBlock(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlTahsilByBlock = <DdlItemModel[]>data.Data;
          this.ddlTahsilByBlock.forEach(obj => {
            this.TahsilItems[obj.Value] = obj.Text;
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetById(id) {
    this._schemeService.GetById(id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <SchemResponseModel>data.Data;
        }
      },
      error => {
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
  }
}
