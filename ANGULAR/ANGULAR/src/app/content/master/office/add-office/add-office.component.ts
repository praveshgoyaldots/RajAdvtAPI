import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import {
  UserViewModel,
  UserDepartmentViewModel,
} from "./../../../../Shared/Model/user-model";
import { OfficeModel } from "src/app/Shared/Model/office-model.model";
import { DDLModel, FilterDDlModel } from "src/app/Shared/Model/commonddl.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router } from "@angular/router";
import { OfficeService } from "src/app/Shared/Service/office.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Shared/Service/user.service";

@Component({
  selector: "app-add-office",
  templateUrl: "./add-office.component.html",
  styleUrls: ["./add-office.component.css"],
})
export class AddOfficeComponent implements OnInit {
  //#region <<Variable>>
  AdmDepartmentCode: number;
  model: OfficeModel;
  dDLList: DDLModel;
  fromGroup: FormGroup;
  loginData: UserViewModel;
  AdminDepartment: any;

  filterDDlModel: FilterDDlModel[] = [];
  ddlAdminDepartment: UserDepartmentViewModel[];
  //#endregion
  ddlDepartment: UserDepartmentViewModel[];
  //#region <<Constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _officeService: OfficeService,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService
  ) {
    this.model = new OfficeModel();
    this.appComponnet.setpagelayout(
      "Add Office :",
      "keyboard_backspace",
      "Back To List",
      "master/office"
    );
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  ngOnInit() {
    //
    this.getDDLList();
    this.formGroupInit();
    this.getDepartment();
  }

  saveClick() {
    
    this.fromGroup.markAllAsTouched();
    if (this.fromGroup.valid) {
      this.model.CreatedBy = this.loginData.UserId;
      this._officeService.Add(this.model).subscribe(
        (data) => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(GlobalMessagesModel.saveSuccess, true);
              this._router.navigate(["master/office"]);
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          } else {
            this._commonService.ScrollingTop();
            this._alertService.error(GlobalMessagesModel.saveFaild);
          }
        },
        (error) => {
          this._commonService.ScrollingTop();
          this._alertService.error(GlobalMessagesModel.saveError);
        }
      );
    }
  }

  getDepartment() {
    
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
          let temp = <UserDepartmentViewModel[]>data.Data;
          this.ddlAdminDepartment = <UserDepartmentViewModel[]>(
            temp.filter(
              (UserDepartmentViewModel, i, arr) =>
                arr.findIndex(
                  (t) =>
                    t.AdmDepartmentCode ===
                    UserDepartmentViewModel.AdmDepartmentCode
                ) === i
            )
          );
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDDLList() {
    
    this._commonService.GetAllDDL(AppSetting.DDlKeyForOffice).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
          this.dDLList.ddlDepartment = [];
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  formGroupInit() {
    
    this.fromGroup = this.fb.group({
      AdmDepartmentCode: [null, Validators.required],
      OfficeName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      OfficeNameHindi: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      OfficeAddress: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(1000)]),
      ],
      OfficeShortName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      OfficeShortNameHindi: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      DepartmentCode: [null, Validators.required],
      DistrictCode: [null, Validators.required],
      TehsilCode: [null, null],
      BlockCode: [null, null],
      EmailId: [null, Validators.compose([Validators.email])],
      Mobile: [null, null],
      LandlineNo: [null, Validators.maxLength(50)],
      IPNo: [null, Validators.maxLength(10)],
    });
  }

  numberOnly(value, isCommaOrDash: boolean = false): boolean {
    return this._commonService.numberOnly(value, isCommaOrDash);
  }

  getFilterdDDL(event, key, filterFrom, ctrlchield = undefined) {
    const item = new FilterDDlModel();
    item.FilterFor = key;
    item.Value =
      event.multiple == true
        ? JSON.stringify(event.value)
        : event.value == undefined || event.value == null || event.value == ""
        ? ""
        : "[" + event.value + "]";
    item.FilterFrom = filterFrom;
    this.filterDDlModel = [];
    this.filterDDlModel.push(item);

    if (item.Value == "") {
      const frmControl = this.fromGroup.get(ctrlchield);
    }

    this._commonService.GetFilterdDDL(this.filterDDlModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          if (key == "ddlDistrict") {
            this.model.District = null;
            this.dDLList.ddlDistrict = data.Data.ddlDistrict;
          } else if (key == "ddlBlock") {
            this.model.Block = null;
            this.dDLList.ddlBlock = data.Data.ddlBlock;
          } else if (key == "ddlTehsil") {
            this.model.Tehsil = null;
            this.dDLList.ddlTehsil = data.Data.ddlTehsil;
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDepartmentList(id) {
    
    if (id) {
      this._commonService.GetSchemeDepartment(id).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.dDLList.ddlDepartment = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  // getDistrictList(id) {
  //   
  //   if (id) {
  //     this._commonService.GetDistrictbyState(id).subscribe(
  //       (data) => {
  //         if (data.IsSuccess) {
  //           this.dDLList.ddlDepartment = data.Data;
  //         }
  //       },
  //       (error) => {
  //         this._alertService.error(error.message);
  //       }
  //     );
  //   }
  // }
}
