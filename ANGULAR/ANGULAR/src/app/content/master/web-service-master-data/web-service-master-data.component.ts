import { Component, OnInit } from '@angular/core';
import { HelpDocumentModel } from 'src/app/Shared/Model/Master/helpdocument.model';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { HelpDocumentService } from 'src/app/Shared/Service/help-document.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CommonDocModel } from 'src/app/Shared/Model/general-model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-web-service-master-data',
  templateUrl: './web-service-master-data.component.html',
  styleUrls: ['./web-service-master-data.component.css']
})
export class WebServiceMasterDataComponent implements OnInit {

  //#region <Variables>
  model: HelpDocumentModel;
  dDLList: DDLModel;
  helpDocument: CommonDocModel;
  PDFFile: SafeResourceUrl;

  //#endregion <Variables>


 //#region <Constructor>

 constructor(
  private readonly _helpDocumentService: HelpDocumentService,
  private readonly _alertService: AlertService,
  private readonly _commonService: CommonService,
  private readonly _parentApi: AppComponent,
  public sanitizer: DomSanitizer,
) {
  this._parentApi.setpagelayout("Web Service Master Document :", "", "", "");
  this.model = new HelpDocumentModel();
}


  //#endregion <Constructor>

   //#region <Methods>
  ngOnInit() {
    this.getDDLList();
  }

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.HelpDocKey).subscribe(
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

  GetHelpDocument(data) {
    this._commonService.GetHelpDocument(data,false).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.helpDocument = <CommonDocModel>data.Data;
          this.PDFFile = this.sanitizer.bypassSecurityTrustResourceUrl(this.helpDocument.Url);
          if(!this.helpDocument.Url){
          }
        }else{
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  //#endregion <Methods>
}
