import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { UserViewModel } from "./../../../../Shared/Model/user-model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CitizenAttachmentService } from 'src/app/Shared/Service/citizen-attachment.service';
import { CitizenAttachmentModel } from 'src/app/Shared/Model/Master/citizen-attachment.model';

@Component({
  selector: 'app-add-citizen-attachment',
  templateUrl: './add-citizen-attachment.component.html',
  styleUrls: ['./add-citizen-attachment.component.css']
})
export class AddCitizenAttachmentComponent implements OnInit {

  //#region <<Variable>>
  model: CitizenAttachmentModel;
  fromGroup: FormGroup;
  loginData: UserViewModel;
  //#endregion

  //#region <<Constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _citizenAttachmentService: CitizenAttachmentService,
    private readonly _authService: AuthenticationService
  ) {
    this.model = new CitizenAttachmentModel();
    this.appComponnet.setpagelayout(
      "Add Attachment :",
      "keyboard_backspace",
      "Back To List",
      "master/citizen-attachment"
    );
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  ngOnInit() {
    this.formGroupInit();
  }

  saveClick() {
    this.fromGroup.markAllAsTouched();
    if (this.fromGroup.valid) {
      this.model.CreatedBy = this.loginData.UserId;
      this._citizenAttachmentService.Add(this.model).subscribe(
        data => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["master/citizen-attachment"]);
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          } else {
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.saveFaild);
          }
        },
        error => {
          this._commonService.ScrollingTop();
          this._alertService.error(GlobalMessagesModel.saveError);
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
