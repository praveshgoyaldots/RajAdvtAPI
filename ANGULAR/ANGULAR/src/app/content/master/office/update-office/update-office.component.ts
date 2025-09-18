import { strictEqual } from "assert";
import { OfficeModel } from "./../../../../Shared/Model/office-model.model";
import {
  UserViewModel,
  UserDepartmentViewModel,
} from "src/app/Shared/Model/user-model";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { Component, OnInit } from "@angular/core";
import { DDLModel, FilterDDlModel } from "src/app/Shared/Model/commonddl.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { OfficeService } from "src/app/Shared/Service/office.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserService } from "src/app/Shared/Service/user.service";
@Component({
  selector: "app-update-office",
  templateUrl: "./update-office.component.html",
  styleUrls: ["./update-office.component.css"],
})
export class UpdateOfficeComponent implements OnInit {
  //#region <<Variable>>
  model: OfficeModel;
  dDLList: DDLModel;
  fromGroup: FormGroup;
  loginData: UserViewModel;
  RecordId: number;
  filterDDlModel: FilterDDlModel[] = [];
  AdminDepartment: any;
  ddlAdminDepartment: UserDepartmentViewModel[];
  //#endregion
  ddlDepartment: UserDepartmentViewModel[];
  //#region <<constructor>>
  constructor(
    private readonly fb: FormBuilder,
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly _officeService: OfficeService,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService
  ) {
    this.RecordId = this._route.snapshot.params.id;
    this.model = new OfficeModel();
    this.appComponnet.setpagelayout(
      "Update Office :",
      "keyboard_backspace",
      "Back To List",
      "master/office"
    );
    this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
  }
  //#endregion

  //#region <<Method>>
  ngOnInit() {
    this.getDDLList();
    this.formGroupInit();
    this.getOfficeDetail();
    this.getDepartment();
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

  getOfficeDetail() {
    
    this._officeService.Detail(this.RecordId).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.model = <OfficeModel>data.Data;
          this.model.AdmDepartmentCode = String(data.Data.AdmDepartmentCode);
          this.model.DepartmentCode = String(data.Data.DepartmentCode);
          this.model.DistrictCode = String(data.Data.DistrictCode);
          this.model.TehsilCode = String(data.Data.TehsilCode);
          this.model.BlockCode = String(data.Data.BlockCode);
          this.getDepartmentList(this.model.DepartmentCode);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    this.fromGroup.markAllAsTouched();
    if (this.fromGroup.valid) {
      this.model.ModifiedBy = this.loginData.UserId;
      this._officeService.Edit(this.RecordId, this.model).subscribe(
        (data) => {
          if (data) {
            if (data.IsSuccess) {
              this._alertService.success(
                GlobalMessagesModel.updateSuccess,
                true
              );
              this._router.navigate(["master/office"]);
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(GlobalMessagesModel.updateError);
            }
          }
        },
        (error) => {
          this._commonService.ScrollingTop();
          this._alertService.error(GlobalMessagesModel.InternalError);
        }
      );
    }
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
        this._alertService.error(GlobalMessagesModel.InternalError);
      }
    );
  }

  formGroupInit() {
    this.fromGroup = this.fb.group({
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
      AdmDepartmentCode: [null, Validators.required],
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
  //#endregion

  getDepartmentList(id) {
    // 
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
}
