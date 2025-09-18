import { Component, OnInit } from "@angular/core";
import { Validators, FormControl } from "@angular/forms";
import { AuthenticationService } from "../Shared/Service/authentication.service";
import { AlertService } from "../Shared/Service/alert.service";
import { CommonService } from "../Shared/Service/common.service";
import { DDLModel, DdlItemModel } from "../Shared/Model/commonddl.model";
import { UserTypeService } from '../Shared/Service/user-type.service';
import { UserTypeModel } from '../Shared/Model/user-type.model';
import { UserViewModel, UserDepartmentViewModel } from '../Shared/Model/user-model';
import { UserService } from '../Shared/Service/user.service';

@Component({
  selector: "app-temporary-login",
  templateUrl: "./temporary-login.component.html",
  styleUrls: ["./temporary-login.component.css"],
})

export class TemporaryLoginComponent implements OnInit {

  selSSOId: string;
  dDLList: DDLModel;
  userType: number;
  loginData: UserViewModel;
  ddlUserType: DdlItemModel[] = [];
  ddlSSOId: DdlItemModel[] = [];
  ssoid = new FormControl("", [Validators.required]);
  ddlDepartment: UserDepartmentViewModel[];
  DepartmentCode: number;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _userTypeService: UserTypeService,
    private readonly _userService: UserService,
  ) {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }

  ngOnInit() {
    this.getDepartment();
    this.getDownLevelUserType();
  }

  getSSOIDList(data, dptCode) {
    this._commonService.GetAllSSOIDByUserType(data, dptCode).subscribe((data) => {
      if (data.IsSuccess) {
        this.ddlSSOId = <DdlItemModel[]>data.Data;
      }
    }, (error) => {
      this._alertService.error(error.message);
    });
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe((data) => {
      if (data.IsSuccess) {
        this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
      }
    }, (error) => {
      this._alertService.error(error.message);
    });
  }

  getDownLevelUserType() {
    this._userTypeService.GetDownLevelUserType(this.loginData.UserType).subscribe((data) => {
      if (data.IsSuccess) {
        const usertypes = <UserTypeModel[]>data.Data;
        usertypes.forEach((element) => {
          this.ddlUserType.push({
            Value: element.UserType,
            Text: element.UserTypeTitle,
          });
        });
      }
    }, (error) => {
      this._alertService.error(error.message);
    });
  }

  SaveClick() {
    this.ssoid.markAsTouched();
    if (this.ssoid.valid) {
      localStorage.setItem("SSOID", this.selSSOId);
      this._authService.Login();
    }
  }

}
