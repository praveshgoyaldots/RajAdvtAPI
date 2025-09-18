import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';
import { CommonDocModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-help-document',
  templateUrl: './dashboard-help-document.component.html',
  styleUrls: ['./dashboard-help-document.component.css'],
  providers: [CommonService]

})
export class DashboardHelpDocumentComponent implements OnInit {
  //#region 
  helpDocumentEnum = HelpDocumentEnum;
  helpDocument: CommonDocModel;
  PDFFile: SafeResourceUrl;
  //#endregion
  constructor(
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    public sanitizer: DomSanitizer,
    private _router: Router,
    public _dialogRef: MatDialogRef<DashboardHelpDocumentComponent>,
  
  ) { }

  ngOnInit() {
    this.GetHelpDocument();
  }
  
  GetHelpDocument() {

    this._commonService.GetHelpDocument(this.helpDocumentEnum.DashBoard).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.helpDocument = <CommonDocModel>data.Data;
          this.PDFFile = this.sanitizer.bypassSecurityTrustResourceUrl(this.helpDocument.Url);
          if(!this.helpDocument.Url){
            this._dialogRef.close();
          }
        }else{
          this._dialogRef.close();
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._dialogRef.close();
        this._alertService.error(error.message);
      }
    );
  }

  onNoClick(): void {
    this._dialogRef.close();
  }


}
