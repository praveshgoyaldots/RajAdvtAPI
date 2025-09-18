import { Component, OnInit } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { SchemResponseModel, EligibilityCriteriaModel, EntryLookUpModel, RequiredDocumentModel, OtherDocumentModel } from 'src/app/Shared/Model/scheme-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DocumentUrlModel, DDLModel, CommonIdModel } from 'src/app/Shared/Model/commonddl.model';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delete-scheme',
  templateUrl: './delete-scheme.component.html',
  styleUrls: ['./delete-scheme.component.css']
})
export class DeleteSchemeComponent implements OnInit {
  model: SchemResponseModel;
  deleteModel: CommonIdModel;
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

  passwd = new FormControl('', [Validators.required]);

  constructor(private _parentApi: AppComponent,
    private readonly _schemeService: SchemeService,
    private readonly _alertService: AlertService,
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService, ) {
    this.RecordId = this._route.snapshot.params.id;
    this._parentApi.setpagelayout("Delete Scheme :", "keyboard_backspace", "Back To List", "scheme");
this.deleteModel=new CommonIdModel();
this.deleteModel.Id= this.RecordId ;
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
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  GetById(id) {

    this._schemeService.GetById(id).subscribe(data => {

      if (data.IsSuccess) {
        ;
        this.model = <SchemResponseModel>data.Data;
      }
    },
      error => {
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
  }

  OnDelete() {
    this.passwd.markAsTouched();

    if (this.passwd.valid) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._schemeService.DeleteById(this.deleteModel).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this._alertService.success(data.Message);
              this._router.navigate(["scheme"]);
            }else{
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    });

  }

  }
}
