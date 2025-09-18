import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TenderMasterModel } from "src/app/Shared/Model/TenderPressRelease/tender-master-model";
import {
  UserViewModel,
  UserDepartmentViewModel
} from "src/app/Shared/Model/user-model";
import { AppComponent } from "src/app/app.component";
import { TenderMasterService } from "src/app/Shared/Service/TenderPressRelease/tender-master.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { DomSanitizer } from "@angular/platform-browser";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "src/app/Shared/Model/format-datepicker";

@Component({
  selector: "app-addupdate-tender",
  templateUrl: "./addupdate-tender.component.html",
  styleUrls: ["./addupdate-tender.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AddupdateTenderComponent implements OnInit {
  //#region << Variable >>

  formGroup: FormGroup;
  model: TenderMasterModel;
  title: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  fileValidationMsg: string = "";
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentApi: AppComponent,
    private readonly _tenderMasterService: TenderMasterService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    public sanitizer: DomSanitizer
  ) {
    this.model = new TenderMasterModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Tender Master :",
        "keyboard_backspace",
        "Back To List",
        "/tender-press-release/tendor"
      );
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout(
        "Add Tender Master :",
        "keyboard_backspace",
        "Back To List",
        "/tender-press-release/tendor"
      );
      this.title = "Add";
    }
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    this.FormGroupInit();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetById() {
    
    this._tenderMasterService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <TenderMasterModel>data.Data;

          if (this.model.DepartmentCode) {
            this.model.DepartmentCode = String(this.model.DepartmentCode);
          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    

    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.model.ReleaseDate) {
        let uTCDate = new Date(
          Date.UTC(
            new Date(this.model.ReleaseDate).getFullYear(),
            new Date(this.model.ReleaseDate).getMonth(),
            new Date(this.model.ReleaseDate).getDate()
          )
        ).toISOString();
        this.model.ReleaseDate = uTCDate;
      }
      if (this.model.FormIssuingDate) {
        let uTCDate = new Date(
          Date.UTC(
            new Date(this.model.FormIssuingDate).getFullYear(),
            new Date(this.model.FormIssuingDate).getMonth(),
            new Date(this.model.FormIssuingDate).getDate()
          )
        ).toISOString();
        this.model.FormIssuingDate = uTCDate;
      }
      if (this.model.FormSubmissionDate) {
        let uTCDate = new Date(
          Date.UTC(
            new Date(this.model.FormSubmissionDate).getFullYear(),
            new Date(this.model.FormSubmissionDate).getMonth(),
            new Date(this.model.FormSubmissionDate).getDate()
          )
        ).toISOString();
        this.model.FormSubmissionDate = uTCDate;
      }
      if (this.model.TenderOpeningDate) {
        let uTCDate = new Date(
          Date.UTC(
            new Date(this.model.TenderOpeningDate).getFullYear(),
            new Date(this.model.TenderOpeningDate).getMonth(),
            new Date(this.model.TenderOpeningDate).getDate()
          )
        ).toISOString();
        this.model.TenderOpeningDate = uTCDate;
      }
      if (this.model.Id) {
        this._tenderMasterService.Edit(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["/tender-press-release/tendor"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._tenderMasterService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["/tender-press-release/tendor"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    }
  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      DepartmentCode: [null, Validators.required],
      RONo: [null, null],
      ReleaseDate: [null, Validators.required],
      NITNo: [null],
      NITPurpose: [null],
      FormIssuingDate: [null],
      FormSubmissionDate: [null],
      TenderOpeningDate: [null],
      SoftCopyURL: [null]
    });
  }

  handleFileInput(event: any) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.model.SoftCopyURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.fileValidationMsg = "";
    } else {
      this.fileValidationMsg = "only *pdf file accepted ";
    }
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

  //#endregion  << Method >>
}
