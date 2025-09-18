import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit } from "@angular/core";

import { AchievementModel } from "src/app/Shared/Model/achievement-model";
import { IndexModel } from "src/app/Shared/Model/general-model";
import { AchievementSearchModel } from "src/app/Shared/Model/Master/child-page-master.model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { ChildPageMasterService } from "src/app/Shared/Service/child-page-master.service";
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GeneralHelpEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';
@Component({
  selector: 'app-general-help-dialog',
  templateUrl: './general-help-dialog.component.html',
  styleUrls: ['./general-help-dialog.component.css'],
  providers: [CommonService]
})
export class GeneralHelpDialogComponent implements OnInit {
  //#region <Variables>

  listModel: AchievementModel[];
  url: string = '';
  isReturn = false;
  isRedirect = false;
  PDFFile: SafeResourceUrl;
  //#endregion <Variables>

  //#region <Constructor>

  constructor(

    private readonly _childPageMasterService: ChildPageMasterService,
    private readonly _alertService: AlertService,
    //public readonly _dialogRef: MatDialogRef<AchievementModel>,
    public sanitized: DomSanitizer,

    //private readonly _commonService: CommonService,
    // private readonly _alertService: AlertService,
    //public sanitizer: DomSanitizer,
    //private _router: Router,
    public _dialogRef: MatDialogRef<GeneralHelpDialogComponent>

  ) {

    //  this.GetList();

  }

  //#endregion <Constructor>

  //#region <Methods>

  ngOnInit() {
    this.GetList();
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  GetList(usermanualModel = null) {
    let achievementSearchModel = new AchievementSearchModel()
    achievementSearchModel.CategoryCode = GeneralHelpEnum.CategoryCode;
    achievementSearchModel.SubCategoryCode = GeneralHelpEnum.SubCategoryCode;
    achievementSearchModel.IndexModel = new IndexModel();
    this._childPageMasterService.GetAchievementListBySearchFilter(achievementSearchModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <AchievementModel[]>data.Data.Data;
          if (this.listModel.length > 0) {
            this.PDFFile = this.sanitized.bypassSecurityTrustResourceUrl(this.listModel[0].PdfFIleName);
            this.url = this.listModel[0].PdfFIleName;
            if (!this.listModel[0].PdfFIleName) {
              this._dialogRef.close();
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

    setTimeout(function () {
      //FireFox seems to require a setTimeout for this to work.
      w.document.body.appendChild(w.document.createElement("iframe")).src = Url;
      w.document.getElementsByTagName("iframe")[0].style.width = "100%";
      w.document.getElementsByTagName("iframe")[0].style.height = "100%";
    }, 0);
  }

  //#endregion <Methods>
}


