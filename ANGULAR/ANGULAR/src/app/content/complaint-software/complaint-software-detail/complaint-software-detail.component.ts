import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { UserTypeEnum } from "src/app/Shared/Enum/user-type.enum";
import { ComplaintEntryListModel } from "src/app/Shared/Model/complaint.model";
import { PermissionModel } from "src/app/Shared/Model/general-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { ComplaintService } from "src/app/Shared/Service/complaint.service";
import { environment } from "src/environments/environment";
import { isNullOrUndefined } from "util";
import { CompliantActionDialogComponent } from "../compliant-action-dialog/compliant-action-dialog.component";
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
@Component({
  selector: 'app-complaint-software-detail',
  templateUrl: './complaint-software-detail.component.html',
  styleUrls: ['./complaint-software-detail.component.css']
})
export class ComplaintSoftwareDetailComponent implements OnInit {

  //#region <<Variable>>
  loginBaseUserType: string;
  model: ComplaintEntryListModel;
  RecordId: number = 0;
  IsHideDeptInternal_VendorCommBtn: boolean = false;
  userTypeEnum = UserTypeEnum;
  Permission: PermissionModel = this._commonService.GetPagePermission("/compliant", "compliant/create", "compliant/detail", "compliant/update", "compliant/delete");
  //#endregion

  //#region <<Constructor>>
  constructor(
    private _parentApi: AppComponent,
    private readonly appComponent: AppComponent,
    public readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _authService: AuthenticationService,
    private _complaintService: ComplaintService
  ) {
    this.model = new ComplaintEntryListModel();
    if (!isNullOrUndefined(this._route.snapshot.params.id)) {
      this.RecordId = this._route.snapshot.params.id;
    }
    this._parentApi.setpagelayout(
      "Suggestion-Feedback :",
      "keyboard_backspace",
      "Back To List",
      "compliant"
    );

  }
  //#endregion

  ngOnInit() {
    if (this.RecordId != 0) {
      this.getDetail();
    }
  }

  getDetail() {
    this._complaintService.Detail(this.RecordId).subscribe(
      data => {
        console.log(data)
        if (data.IsSuccess) {
          this.model = <ComplaintEntryListModel>data.Data;
          // if (this.model.Status == StatusEnum.SENT && this.loginBaseUserType != UserTypeEnum.VNDR && this.loginBaseUserType != UserTypeEnum.VNDRUSER) {
          //   this.model.Status = StatusEnum.RECEIVED;
          // }

          // if (this.model.Status == StatusEnum.RECEIVED || this.model.Status == StatusEnum.RETURN || this.model.Status == StatusEnum.ACCEPT || this.model.Status == StatusEnum.CLOSE || this.model.Status == StatusEnum.DISPOSED || this.model.Status == StatusEnum.REJECT) {
          //   this.IsHideDeptInternal_VendorCommBtn = true;
          // }
          // else{
          //   this.IsHideDeptInternal_VendorCommBtn = false;
          // }
          //  this.appComponent.setPageLayout("Suggestion-Feedback Detail :", "keyboard_backspace", "Back To List", "complaint-software");
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  OpenChangeOfficeDialog(Id) {
    // const _dialogRef = this._dialog.open(ChangeCommunicationOfficeDialogComponent, {
    //   width: "500px",
    //   data: { Id },
    //   disableClose: true
    // });
    // _dialogRef.afterClosed().subscribe((result: boolean) => {
    //   if (result) {
    //     this.getDetail();
    //   }
    // });
  }
  getAbsalutePath(url) {
    return environment.ApiBaseUrl + url.replace("~/", "").trim();
  }
  downloadPdf(Url, name) {

    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

  }
  OpenDialog(id) {
    const dialogRef = this._dialog.open(CompliantActionDialogComponent, {
      width: '500px',
      data: id
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDetail();
      }
    });
  }
}

