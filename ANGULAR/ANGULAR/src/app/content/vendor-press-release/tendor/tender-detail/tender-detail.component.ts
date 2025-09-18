import { Component, OnInit } from '@angular/core';
import { TenderDetailModel } from 'src/app/Shared/Model/TenderPressRelease/tender-master-model';
import { AppComponent } from 'src/app/app.component';
import { TenderMasterService } from 'src/app/Shared/Service/TenderPressRelease/tender-master.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TenderProgressDialogComponent } from '../tender-progress-dialog/tender-progress-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent implements OnInit {
//#region << Variable >>
model: TenderDetailModel;
tenderId:number;
//#endregion

//#region << constructor >>

constructor(
  private _parentApi: AppComponent,
  private readonly _tenderMasterService: TenderMasterService,
  private readonly _alertService: AlertService,
  private readonly _router: Router,
  private _route: ActivatedRoute,
  public sanitizer: DomSanitizer,
  private _dialog: MatDialog
) {
  this.model = new TenderDetailModel();
  this._parentApi.setpagelayout(
    "Tender Master Detail :",
    "keyboard_backspace",
    "Back To List",
    "/tender-press-release/tendor"
  );
  this.tenderId= this._route.snapshot.params.id;
  if (this.tenderId) {
    this.GetById();
  }

}

//#endregion

//#region << Method >>

ngOnInit() {

}

GetById() {
  
  this._tenderMasterService.GetTenderDetailWithChildList(this.tenderId).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.model = <TenderDetailModel>data.Data;
      } else {
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

downloadPdf(url, name) {
  if (url) {
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", name + ".pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}


openUpdateProgressDialog(id) {
  
  const _dialogRef = this._dialog.open(TenderProgressDialogComponent, {
    width: "700px",
    data: {Id:id},
  });
  _dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.GetById();
    }
  });
}


//#endregion  << Method >>
}
