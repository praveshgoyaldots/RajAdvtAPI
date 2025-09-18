import { Component, OnInit } from "@angular/core";
import {
  UserViewModel,
  UserModel,
  LoggedInUserDetailViewModel
} from "src/app/Shared/Model/user-model";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppComponent } from "src/app/app.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserTypeService } from "src/app/Shared/Service/user-type.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";

@Component({
  selector: "app-update-user-profile",
  templateUrl: "./update-user-profile.component.html",
  styleUrls: ["./update-user-profile.component.css"]
})
export class UpdateUserProfileComponent implements OnInit {
  //#region  variable
  model: UserModel;
  UserForm: FormGroup;
  loginData: UserViewModel;
  responceModel: UserViewModel;
  fileValidationMsg: string;
  fileSizeValidationMsg: string;
  //#endregion

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private readonly _userTypeService: UserTypeService,
    private readonly _parentApi: AppComponent
  ) {
    this.model = new UserModel();
    this.responceModel = new UserViewModel();
    this._parentApi.setpagelayout("Update User Profile:", "", "", "");
    this.fileSizeValidationMsg =
      "Attachment must be less than " +
      localStorage.getItem("FileValidation") +
      " MB.";
    // this.model = new UserModel();
  }

  ngOnInit() {
    this.formGroupInit();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    setTimeout(() => {
      this.getUserDetail();
    }, 3000);
  }

  getUserDetail() {
    
    this._userService.Detail(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.responceModel = <UserViewModel>data.Data;
          this.model = data.Data as UserModel;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  formGroupInit() {
    this.UserForm = this.fb.group({
      SSOID: [{ value: null, disabled: true }],
      ProfilePic: [null],
      UserName: [{ value: null, disabled: true }],
      UserEmail: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      Mobile: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(12)])
      ]
    });
  }

  numberOnly(value, isCommaOrDash: boolean = false): boolean {
    return this._commonService.numberOnly(value, isCommaOrDash);
  }

  handleFileInput(event: any) {
    if (event.target.files.item(0).type.match("image/*")) {
      if (
        event.target.files.item(0).size >
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        this.fileValidationMsg = this.fileSizeValidationMsg;
        this._commonService.ScrollingTop();
      } else {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.model.ProfilePic = event.target.result;
          this.fileValidationMsg = "";
        };
        reader.readAsDataURL(event.target.files.item(0));
      }
    } else {
      this.fileValidationMsg = "only *images file accepted!";
    }
  }

  saveClick() {
    
    this.UserForm.markAllAsTouched();
    if (this.UserForm.valid) {
      this.responceModel.ModifiedBy = this.loginData.UserId;
      this._userService.Edit(this.loginData.UserId, this.model).subscribe(
        data => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(
                GlobalMessagesModel.saveProfileSuccess,
                true
              );
              if (localStorage.getItem("UserDetails")) {
                var userDetail = JSON.parse(
                  localStorage.getItem("UserDetails")
                ) as LoggedInUserDetailViewModel;
                userDetail.UserViewModel.Mobile = this.model.Mobile;
                userDetail.UserViewModel.UserEmail = this.model.UserEmail;
                localStorage.removeItem("UserDetails");
                localStorage.setItem("UserDetails", JSON.stringify(userDetail));
              }

              this._router.navigate(["/cmdashboard"]);
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
}
