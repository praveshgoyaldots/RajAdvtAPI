import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../Shared/Service/authentication.service';
import { UserViewModel } from '../Shared/Model/user-model';
import { HelpDocumentModel } from '../Shared/Model/Master/helpdocument.model';
import { CommonService } from '../Shared/Service/common.service';
import { HelpDocumentEnum } from '../Shared/Enum/helpdocument-module.enum';
import { CommonDocModel } from '../Shared/Model/general-model';
import { AlertService } from '../Shared/Service/alert.service';
import { MatDialog } from '@angular/material';
import { PageManualComponent } from './page-manual/page-manual.component';
import { GeneralHelpDialogComponent } from './general-help-dialog/general-help-dialog.component';
import { AdvertisementConfigSerttingComponent } from './advertisement-config-sertting/advertisement-config-sertting.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userDetail: UserViewModel;
  departmentList: string[];
  helpDocumentEnum = HelpDocumentEnum;
  helpDocument: CommonDocModel;
  @Input() PageTitle: string;
  constructor(public readonly _authenticationService: AuthenticationService,
    public readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _dialog: MatDialog,
    
    private readonly _router: Router) {
    setTimeout(function () {
      this.userDetail = _authenticationService.GetCurrentUserDetail() == null ? null : _authenticationService.GetCurrentUserDetail().UserViewModel;
      if (this.userDetail.DepartmentNames) {
        this.departmentList = this.userDetail.DepartmentNames.split(",");
      }
    }.bind(this), 250);
  }

  ngOnInit() {
    // $(document).ready(function () {
    //  $('button.drawer-btn.mat-button').click( function() {
    //     $(this).toggleClass('active');
    //     $("body").toggleClass("active");
    // } );
    // });
    this.GetHelpDocument();
  }

  GetHelpDocument() {

    this._commonService.GetHelpDocument(this.helpDocumentEnum.SupportContactNumbers).subscribe(
      data => {
        if (data.IsSuccess) {
          this.helpDocument = <CommonDocModel>data.Data;
        }else{
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  logOut() {
    this._authenticationService.LogOut();

  }
  backToSSO() {
    this._authenticationService.BackToSSO();

  }

  UpdateProfile(){
    this._router.navigate(["/updateuserprofile"]);

  }

  downloadPdf(Url) {
    var w = window.open('about:blank');
    setTimeout(function(){ //FireFox seems to require a setTimeout for this to work.
        w.document.body.appendChild(w.document.createElement('iframe'))
            .src = Url;
            w.document.getElementsByTagName("iframe")[0].style.width = '100%';
        w.document.getElementsByTagName("iframe")[0].style.height = '100%';
    }, 0);

    // const linkSource = Url;
    // const downloadLink = document.createElement("a");
    //     downloadLink.href = linkSource;
    //     downloadLink.target = "_blank";

    //     downloadLink.download = "Support Contact Numbers";
    //     downloadLink.click();
  }

  openPageManual(redirect = false) {
    this._dialog.open(PageManualComponent, {
      width: "95%",
      disableClose: true,
      data: { isMedia: redirect }
    });
  }
  openGeneralHelpDocument() {
    this._dialog.open(GeneralHelpDialogComponent, {
      width: "95%",
      disableClose: true
    });
  }

  openConfigrationDialog() {
    // if (counts > 0) {
   this._dialog.open(AdvertisementConfigSerttingComponent, {
        width: "500px",
        // data: { moduleName,deptName,moduleId, departmentCode } as any
      });
    // }
  }
}
