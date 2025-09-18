import {
  ChildPageMasterViewModel,
  PageManualModel
} from "./../../Shared/Model/Master/child-page-master.model";
import { Component, OnInit, Inject } from "@angular/core";
import { ChildPageMasterService } from "src/app/Shared/Service/child-page-master.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: "app-page-manual",
  templateUrl: "./page-manual.component.html",
  styleUrls: ["./page-manual.component.css"]
})
export class PageManualComponent implements OnInit {
  //#region <Variables>

  listModel: ChildPageMasterViewModel[];
  isReturn = false;
  isRedirect = false;
  PDFFile: SafeResourceUrl;
  //#endregion <Variables>

  //#region <Constructor>

  constructor(
    private readonly _childPageMasterService: ChildPageMasterService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<ChildPageMasterViewModel>,
    private sanitized: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      if (data.isReturn) {
        this.isReturn = data.isReturn;
      }

      if (data.isMedia) {
        this.isRedirect = data.isMedia;
      }
      if (data.SchemeTypeCode) {
        const manualModel = new PageManualModel("", 0, data.SchemeTypeCode);
        this.GetList(manualModel);
      } else if (data.LookupTypeId) {
        const manualModel = new PageManualModel("", data.LookupTypeId,0);
        this.GetList(manualModel);
      }

      if (data.PagePermission) {
        const manualModel = new PageManualModel(data.PagePermission, 0, 0);
        this.GetList(manualModel);
      }
      else {
        this.GetList();
      }

    } else {
      this.GetList();
    }
  }

  //#endregion <Constructor>

  //#region <Methods>

  ngOnInit() {
    //this.GetList();
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  GetList(usermanualModel = null) {
    const manuName = sessionStorage.getItem("MenuName");
    const manualModel = new PageManualModel(manuName);
    //if (manuName) {
      this._childPageMasterService.GetPageListByMenuName(usermanualModel ? usermanualModel : manualModel).subscribe(
        data => {
          if (data.IsSuccess) {
            this.listModel = <ChildPageMasterViewModel[]>data.Data;
            // if (this.listModel[0].IsShowPDF) {
            //   this.PDFFile = this.sanitized.bypassSecurityTrustResourceUrl(this.listModel[0].PDFURL);
            // }
            if (this.isRedirect) {

              let urlLinks = this.listModel.filter(item => item.URL != undefined);
              if (urlLinks.length > 0) {
                window.open(urlLinks[0].URL, "_blank")
                this.onNoClick();

              } else {
                this.onNoClick();
              }

            }
            if (this.isReturn) {


              if (this.listModel.length > 0) {
                this._dialogRef.close(true);
              } else {
                this._dialogRef.close(false);
              }
            }
          }

        },
        error => {
          this._alertService.error(error.message);
        }
      );
    //}
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  downloadPdf(Url) {
    var w = window.open("about:blank");

    setTimeout(function() {
      //FireFox seems to require a setTimeout for this to work.
      w.document.body.appendChild(w.document.createElement("iframe")).src = Url;
      w.document.getElementsByTagName("iframe")[0].style.width = "100%";
      w.document.getElementsByTagName("iframe")[0].style.height = "100%";
    }, 0);
  }

  //#endregion <Methods>
}
