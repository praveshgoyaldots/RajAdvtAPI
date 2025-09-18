import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { UserViewModel } from "./../../../../Shared/Model/user-model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CitizenAttachmentModel } from 'src/app/Shared/Model/Master/citizen-attachment.model';
import { CitizenAttachmentService } from 'src/app/Shared/Service/citizen-attachment.service';

@Component({
  selector: 'app-update-citizen-attachment',
  templateUrl: './update-citizen-attachment.component.html',
  styleUrls: ['./update-citizen-attachment.component.css']
})
export class UpdateCitizenAttachmentComponent implements OnInit {

  //#region <<Variable>>
  model: CitizenAttachmentModel;
  fromGroup: FormGroup;
  loginData: UserViewModel;
  RecordId: number;
  //#endregion

  //#region <<Constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _attachmentService: CitizenAttachmentService,
    private readonly _authService: AuthenticationService
  ) {
    this.RecordId = this._route.snapshot.params.id;
    this.model = new CitizenAttachmentModel();
    this.appComponnet.setpagelayout(
      "Update Attachment :",
      "keyboard_backspace",
      "Back To List",
      "master/citizen-attachment"
    );
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  ngOnInit() {
    this.formGroupInit();
    this.getDetail();
  }

  getDetail() {
    this._attachmentService.Detail(this.RecordId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <CitizenAttachmentModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    this.fromGroup.markAllAsTouched();
    if (this.fromGroup.valid) {
      this.model.ModifiedBy = this.loginData.UserId;
      this._attachmentService.Edit(this.RecordId, this.model).subscribe(
        data => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(GlobalMessagesModel.updateSuccess);
              this._router.navigate(["master/citizen-attachment"]);
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(GlobalMessagesModel.updateError);
            }
          } else {
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.InternalError);
          }
        },
        error => {
          this._commonService.ScrollingTop();
          this._alertService.error(GlobalMessagesModel.InternalError);
        }
      );
    }
  }

  formGroupInit() {
    this.fromGroup = this.fb.group({
      Attachment: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      AttachmentHindi: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ]
    });
  }

}
