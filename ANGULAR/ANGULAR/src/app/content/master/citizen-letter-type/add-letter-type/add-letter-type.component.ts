import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router } from "@angular/router";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { Component, OnInit } from "@angular/core";
import { CitizenLetterTypeModel } from 'src/app/Shared/Model/Master/citizen-letter-type.model';
import { CitizenLetterTypeService } from 'src/app/Shared/Service/citizen-letter-type.service';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { UserViewModel } from 'src/app/Shared/Model/user-model';

@Component({
  selector: 'app-add-letter-type',
  templateUrl: './add-letter-type.component.html',
  styleUrls: ['./add-letter-type.component.css']
})

export class AddLetterTypeComponent implements OnInit {
  //#region <<Variable>>
  model: CitizenLetterTypeModel;
  fromGroup: FormGroup;
  loginData: UserViewModel;
  dDLList: DDLModel;
  //#endregion

  //#region <<Constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _citizenLetterTypeService: CitizenLetterTypeService,
    private readonly _authService: AuthenticationService
  ) {
    this.model = new CitizenLetterTypeModel();
    this.dDLList = new DDLModel();
    this.appComponnet.setpagelayout(
      "Add Letter Type :",
      "keyboard_backspace",
      "Back To List",
      "master/citizen-letter-type"
    );
    this.getDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  ngOnInit() {
    this.formGroupInit();
  }

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForCitizenLetterType).subscribe(
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

  saveClick() {
    this.fromGroup.markAllAsTouched();
    if (this.fromGroup.valid) {
      this.model.CreatedBy = this.loginData.UserId;
      this._citizenLetterTypeService.Add(this.model).subscribe(
        data => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["master/citizen-letter-type"]);
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
      LetterType: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      LetterTypeHindi: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      AttachmentCodes: [null]
    });
  }

}
