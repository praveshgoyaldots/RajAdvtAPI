import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { DepartmentService } from "src/app/Shared/Service/department.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { DepartmentMasterModel } from "src/app/Shared/Model/Master/department.model";
import { UserViewModel } from "src/app/Shared/Model/user-model";
import { UserSSOIdEnum } from "src/app/Shared/Enum/Common.enum";

@Component({
  selector: "app-add-update-department",
  templateUrl: "./add-update-department.component.html",
  styleUrls: ["./add-update-department.component.css"]
})

export class AddUpdateDepartmentComponent implements OnInit {

  formGroup: FormGroup;
  model: DepartmentMasterModel;
  title: string;
  loginData: UserViewModel;
  dDLList: DDLModel;
  ImagefileValidationMsg: string;
  IsUserHasAddPer: boolean = false;

  constructor(
    private _parentApi: AppComponent,
    private readonly _departmentService: DepartmentService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService
  ) {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.model = new DepartmentMasterModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.DepartmentId = id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Department Master :",
        "keyboard_backspace",
        "Back To List",
        "master/DepartmentMaster"
      );
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout(
        "Add Department Master :",
        "keyboard_backspace",
        "Back To List",
        "master/DepartmentMaster"
      );
      this.title = "Add";
    }
  }

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
  }

  CheckUserPermission() {
    if (this.loginData.SSOID.toLowerCase() == UserSSOIdEnum.RajeshSaini.toLowerCase()) {
      this.IsUserHasAddPer = true;

      if (this.model.DepartmentId > 0) {
        this.formGroup.get("DepartmentCode").setValidators(Validators.required);
        this.formGroup.get("DepartmentCode").updateValueAndValidity();
      }
    }
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForDepartmentMaster)
      .subscribe(
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

  GetById() {

    this._departmentService.GetById(this.model.DepartmentId).subscribe(
      data => {

        if (data.IsSuccess) {
          this.model = <DepartmentMasterModel>data.Data;

          if (this.model.Department_AdmDepartmentCode) {
            this.model.Department_AdmDepartmentCode = String(
              this.model.Department_AdmDepartmentCode
            );
          }
          if (this.model.Department_DistrictCode) {
            this.model.Department_DistrictCode = String(
              this.model.Department_DistrictCode
            );
          }
          if (this.model.Department_GroupCode) {
            this.model.Department_GroupCode = String(
              this.model.Department_GroupCode
            );
          }
          if (this.model.DepartmentCategoryCode) {
            this.model.DepartmentCategoryCode = String(
              this.model.DepartmentCategoryCode
            );
          }
          if (this.model.DepartmentDistrictCode) {
            this.model.DepartmentDistrictCode = String(this.model.DepartmentDistrictCode);
          }
          if (this.model.CMOOfficerCode) {
            this.model.CMOOfficerCode = String(this.model.CMOOfficerCode);
          }
          if (this.model.CabinetMinisterCode) {
            this.model.CabinetMinisterCode = String(this.model.CabinetMinisterCode);
          }
          if (this.model.StateMinisterCode) {
            this.model.StateMinisterCode = String(this.model.StateMinisterCode);
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
      if (this.model.DepartmentId) {
        this._departmentService.Edit(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["master/DepartmentMaster"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._departmentService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["master/DepartmentMaster"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      }
    } else {
    }
  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      DepartmentCode: [null],
      DepartmentTitle: [null, Validators.required],
      DepartmentTitleHindi: [null, Validators.required],
      DepartmentShortTitle: [null],
      DepartmentShortTitleHindi: [null],
      DepartmentAddress: [null],
      DepartmentAddressHindi: [null],
      Department_DistrictCode: [null],
      Department_AdmDepartmentCode: [null, Validators.required],
      Department_GroupCode: [null],
      DepartmentCategoryCode: [null, Validators.required],
      DisplayName: [null],
      DepartmentDistrictCode: [null],
      CMOOfficerCode: [null, Validators.required],
      DisplayOrderWithinAdminDepartment: [null],
      StateMinisterCode: [null],
      CabinetMinisterCode: [null],
      IsWebsiteFromJankalyanPortal: [null],
      IsAllowMultipleDistrictAndAssembly: [null]
    });

    this.CheckUserPermission();
  }


  handleImageFileInput(event: any) {

    if (event.target.files.item(0).type.match("image/*")) {
      if (
        event.target.files.item(0).size <
        this._commonService.ConvertMbintoByte(
          Number(localStorage.getItem("FileValidation"))
        )
      ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {

          this.model.LogoUrl = event.target.result;
          this.ImagefileValidationMsg = "";
        };
        reader.readAsDataURL(event.target.files.item(0));
      } else {
        this.ImagefileValidationMsg = "Attachment must be less than " +
          localStorage.getItem("FileValidation") +
          " MB.";
      }
    } else {
      this.ImagefileValidationMsg = "only image/*";
    }
  }

  RemoveImageFile() {
    this.model.LogoUrl = null;
  }

}
