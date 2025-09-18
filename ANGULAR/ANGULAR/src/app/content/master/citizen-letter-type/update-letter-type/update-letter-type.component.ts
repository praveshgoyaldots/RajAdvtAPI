import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { UserViewModel } from "./../../../../Shared/Model/user-model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { Component, OnInit } from "@angular/core";
import { CitizenLetterTypeModel } from 'src/app/Shared/Model/Master/citizen-letter-type.model';
import { CitizenLetterTypeService } from 'src/app/Shared/Service/citizen-letter-type.service';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-update-letter-type',
  templateUrl: './update-letter-type.component.html',
  styleUrls: ['./update-letter-type.component.css']
})

export class UpdateLetterTypeComponent implements OnInit {
  //#region <<Variable>>
  model: CitizenLetterTypeModel;
  fromGroup: FormGroup;
  loginData: UserViewModel;
  dDLList: DDLModel;
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
    private readonly _citizenLetterTypeService: CitizenLetterTypeService,
    private readonly _authService: AuthenticationService
  ) {
    this.RecordId = this._route.snapshot.params.id;
    this.model = new CitizenLetterTypeModel();
    this.dDLList = new DDLModel();
    this.appComponnet.setpagelayout(
      "Update Letter Type :",
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
    this.getLetterTypeDetail();
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

  getLetterTypeDetail() {
    this._citizenLetterTypeService.Detail(this.RecordId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <CitizenLetterTypeModel>data.Data;
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
      this._citizenLetterTypeService.Edit(this.RecordId, this.model).subscribe(
        data => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(GlobalMessagesModel.updateSuccess);
              this._router.navigate(["master/citizen-letter-type"]);
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
