import { PermissionModel } from "./../../../../../Shared/Model/general-model";
import { FilterDDlModel, DDLModel } from "src/app/Shared/Model/commonddl.model";
import {
  UserTypeEnum,
  ConfigUserModeEnum,
  ConfigTypeEnum,
} from "./../../../../../Shared/Enum/user-type.enum";
import { UserTypeModel } from "./../../../../../Shared/Model/user-type.model";
import {
  UserViewModel,
  UserDivisionViewModel,
  UserDistrictViewModel,
  UserDepartmentViewModel,
  UserBlockViewModel,
  UserTehsilViewModel,
} from "./../../../../../Shared/Model/user-model";
import { UserTypeService } from "./../../../../../Shared/Service/user-type.service";
import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/Shared/Service/alert.service";
import {
  ConfigDataModel,
  ConfigDataViewModel,
} from "src/app/Shared/Model/self-config.model";
import { ConfigurationService } from "src/app/Shared/Service/configuration.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserService } from "src/app/Shared/Service/user.service";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
@Component({
  selector: "app-downlevel-configuration",
  templateUrl: "./downlevel-configuration.component.html",
  styleUrls: ["./downlevel-configuration.component.css"],
})
export class DownlevelConfigurationComponent implements OnInit {
  userTypes = UserTypeEnum;
  downLevelUserType: UserTypeModel[];
  userTypeValue: string;
  areaValue: string;
  isUserTypeDisabled: boolean = true;
  dataModel: ConfigDataViewModel;
  departmentDataModel: ConfigDataModel[] = [];
  schemeDataModel: ConfigDataModel[] = [];
  serviceDataModel: ConfigDataModel[] = [];
  loginData: UserViewModel;
  dDLList = new DDLModel();
  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _configurationService: ConfigurationService,
    private readonly _alertService: AlertService,
    private readonly _authService: AuthenticationService,
    private readonly _userTypeService: UserTypeService,
    private readonly _userService: UserService
  ) {
    this.appComponnet.setpagelayout(
      "Down Level Configuration:",
      "keyboard_backspace",
      "",
      ""
    );
    this.dataModel = new ConfigDataViewModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDownLevelUserType();
    this.getArea();
  }

  getDownLevelUserType() {
    this._userTypeService
      .GetDownLevelUserType(this.loginData.UserType)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.isUserTypeDisabled = false;
            this.downLevelUserType = <UserTypeModel[]>data.Data;
            if (
              this.downLevelUserType != null &&
              this.downLevelUserType.length == 1
            ) {
              this.userTypeValue = String(this.downLevelUserType[0].UserType);
              this.isUserTypeDisabled = true;
            }
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess && data.Data != undefined) {
          const resData = <UserDepartmentViewModel[]>data.Data;
          this.dDLList.ddlDepartment = [];
          resData.forEach((element) => {
            this.dDLList.ddlDepartment.push({
              Value: element.DepartmentCode,
              Text: element.DepartmentTitle,
            });
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDivision() {
    this._userService.GetUserDivision(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess && data.Data != undefined) {
          const resData = <UserDivisionViewModel[]>data.Data;
          this.dDLList.ddlDivision = [];
          resData.forEach((element) => {
            this.dDLList.ddlDivision.push({
              Value: element.DivisionCode,
              Text: element.DivisionTitle,
            });
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDistrict() {
    this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess && data.Data != undefined) {
          const resData = <UserDistrictViewModel[]>data.Data;
          this.dDLList.ddlDistrict = [];
          resData.forEach((element) => {
            this.dDLList.ddlDistrict.push({
              Value: element.DistrictCode,
              Text: element.DistrictTitle,
            });
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getBlock() {
    this._userService.GetUserBlock(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess && data.Data != undefined) {
          const resData = <UserBlockViewModel[]>data.Data;
          this.dDLList.ddlBlock = [];
          resData.forEach((element) => {
            this.dDLList.ddlBlock.push({
              Value: element.BlockCode,
              Text: element.BlockTitle,
            });
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getTehsil() {
    this._userService.GetUserTehsil(this.loginData.UserId).subscribe(
      (data) => {
        if (data.IsSuccess && data.Data != undefined) {
          const resData = <UserTehsilViewModel[]>data.Data;
          this.dDLList.ddlTehsil = [];
          resData.forEach((element) => {
            this.dDLList.ddlTehsil.push({
              Value: element.TehsilCode,
              Text: element.TehsilTitle,
            });
          });
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getConfigData() {
    if (
      !this._commonService.IsNullOrEmpty(this.userTypeValue) &&
      !this._commonService.IsNullOrEmpty(this.areaValue)
    ) {
      this._configurationService
        .GetConfigurationData(
          this.userTypeValue,
          ConfigTypeEnum.Assign,
          this.areaValue,
          null
        )
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
              this.departmentDataModel = [];
              this.serviceDataModel = [];
              this.schemeDataModel = [];
              this.dataModel = <ConfigDataViewModel>data.Data;
              if (
                this.dataModel.departmentConfig != null &&
                this.dataModel.departmentConfig.length > 0
              ) {
                this.dataModel.departmentConfig.forEach((element) => {
                  this.departmentDataModel.push({
                    DataValue: !this._commonService.IsNullOrEmpty(
                      String(element.DepartmentCode)
                    )
                      ? String(element.DepartmentCode)
                      : undefined,
                    DataText: !this._commonService.IsNullOrEmpty(
                      element.DepartmentName
                    )
                      ? String(element.DepartmentName)
                      : undefined,
                    Priority: !this._commonService.IsNullOrEmpty(
                      String(element.DisplayOrder)
                    )
                      ? String(element.DisplayOrder)
                      : undefined,
                    DepartmentCode: !this._commonService.IsNullOrEmpty(
                      String(element.DepartmentCode)
                    )
                      ? Number(element.DepartmentCode)
                      : undefined,
                    PermissionId: !this._commonService.IsNullOrEmpty(
                      String(element.PermissionId)
                    )
                      ? Number(element.PermissionId)
                      : undefined,
                    Type: !this._commonService.IsNullOrEmpty(
                      String(element.Type)
                    )
                      ? String(element.Type)
                      : undefined,
                  });
                });
              }
              if (
                this.dataModel.serviceConfig != null &&
                this.dataModel.serviceConfig.length > 0
              ) {
                this.dataModel.serviceConfig.forEach((element) => {
                  this.serviceDataModel.push({
                    DataValue: !this._commonService.IsNullOrEmpty(
                      String(element.ServiceId)
                    )
                      ? String(element.ServiceId)
                      : undefined,
                    DataText: !this._commonService.IsNullOrEmpty(
                      element.ServiceName
                    )
                      ? String(element.ServiceName)
                      : undefined,
                    Priority: !this._commonService.IsNullOrEmpty(
                      String(element.DisplayOrder)
                    )
                      ? String(element.DisplayOrder)
                      : undefined,
                    DepartmentCode: !this._commonService.IsNullOrEmpty(
                      String(element.DepartmentCode)
                    )
                      ? Number(element.DepartmentCode)
                      : undefined,
                    PermissionId: !this._commonService.IsNullOrEmpty(
                      String(element.PermissionId)
                    )
                      ? Number(element.PermissionId)
                      : undefined,
                    Type: !this._commonService.IsNullOrEmpty(
                      String(element.Type)
                    )
                      ? String(element.Type)
                      : undefined,
                  });
                });
              }
              if (
                this.dataModel.schemeConfig != null &&
                this.dataModel.schemeConfig.length > 0
              ) {
                this.dataModel.schemeConfig.forEach((element) => {
                  this.schemeDataModel.push({
                    DataValue: !this._commonService.IsNullOrEmpty(
                      String(element.SchemeId)
                    )
                      ? String(element.SchemeId)
                      : undefined,
                    DataText: !this._commonService.IsNullOrEmpty(
                      element.SchemeName
                    )
                      ? String(element.SchemeName)
                      : undefined,
                    Priority: !this._commonService.IsNullOrEmpty(
                      String(element.DisplayOrder)
                    )
                      ? String(element.DisplayOrder)
                      : undefined,
                    DepartmentCode: !this._commonService.IsNullOrEmpty(
                      String(element.DepartmentCode)
                    )
                      ? Number(element.DepartmentCode)
                      : undefined,
                    PermissionId: !this._commonService.IsNullOrEmpty(
                      String(element.PermissionId)
                    )
                      ? Number(element.PermissionId)
                      : undefined,
                    Type: !this._commonService.IsNullOrEmpty(
                      String(element.Type)
                    )
                      ? String(element.Type)
                      : undefined,
                  });
                });
              }
            }
          },
          (error) => {
            this._alertService.error(GlobalMessagesModel.InternalError);
          }
        );
    }
  }

  onSubmit() {
    this.dataModel.departmentConfig = [];
    this.dataModel.serviceConfig = [];
    this.dataModel.schemeConfig = [];

    this.removeNonPriorityItems(this.departmentDataModel).forEach((element) => {
      this.dataModel.departmentConfig.push({
        DepartmentCode: !this._commonService.IsNullOrEmpty(element.DataValue)
          ? Number(element.DataValue)
          : 0,
        DepartmentName: !this._commonService.IsNullOrEmpty(element.DataText)
          ? String(element.DataText)
          : null,
        DisplayOrder: !this._commonService.IsNullOrEmpty(element.Priority)
          ? Number(element.Priority)
          : 0,
        PermissionId: !this._commonService.IsNullOrEmpty(
          element.PermissionId.toString()
        )
          ? Number(element.PermissionId)
          : 0,
        Type: !this._commonService.IsNullOrEmpty(element.Type)
          ? String(element.Type)
          : ConfigTypeEnum.Assign,
      });
    });
    this.removeNonPriorityItems(this.schemeDataModel).forEach((element) => {
      this.dataModel.schemeConfig.push({
        SchemeId: !this._commonService.IsNullOrEmpty(element.DataValue)
          ? Number(element.DataValue)
          : 0,
        SchemeName: !this._commonService.IsNullOrEmpty(element.DataText)
          ? String(element.DataText)
          : null,
        DepartmentCode: !this._commonService.IsNullOrEmpty(
          element.DepartmentCode.toString()
        )
          ? Number(element.DepartmentCode)
          : 0,
        DisplayOrder: !this._commonService.IsNullOrEmpty(element.Priority)
          ? Number(element.Priority)
          : 0,
        PermissionId: !this._commonService.IsNullOrEmpty(
          String(element.PermissionId)
        )
          ? Number(element.PermissionId)
          : 0,
        Type: !this._commonService.IsNullOrEmpty(element.Type)
          ? String(element.Type)
          : ConfigTypeEnum.Assign,
      });
    });
    this.removeNonPriorityItems(this.serviceDataModel).forEach((element) => {
      this.dataModel.serviceConfig.push({
        ServiceId: !this._commonService.IsNullOrEmpty(element.DataValue)
          ? Number(element.DataValue)
          : 0,
        ServiceName: !this._commonService.IsNullOrEmpty(element.DataText)
          ? String(element.DataText)
          : null,
        DepartmentCode: !this._commonService.IsNullOrEmpty(
          element.DepartmentCode.toString()
        )
          ? Number(element.DepartmentCode)
          : 0,
        DisplayOrder: !this._commonService.IsNullOrEmpty(element.Priority)
          ? Number(element.Priority)
          : 0,
        PermissionId: !this._commonService.IsNullOrEmpty(
          element.PermissionId.toString()
        )
          ? Number(element.PermissionId)
          : 0,
        Type: !this._commonService.IsNullOrEmpty(element.Type)
          ? String(element.Type)
          : ConfigTypeEnum.Assign,
      });
    });
    this.dataModel.UserType = this.userTypeValue;
    this.dataModel.CreatedBy = this.loginData.UserId;
    this.dataModel.DepartmentCode = Number(this.areaValue);

    this._configurationService.SetConfiguration(this.dataModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this._alertService.success(GlobalMessagesModel.saveSuccess);
        }
      },
      (error) => {
        this._alertService.success(GlobalMessagesModel.saveError);
      }
    );
  }

  numberOnly(value): boolean {
    return this._commonService.numberOnly(value);
  }

  removeNonPriorityItems(listModel: ConfigDataModel[]) {
    const returnModel: ConfigDataModel[] = [];
    listModel.forEach((item) => {
      if (
        item != null &&
        !this._commonService.IsNullOrEmpty(item.Priority) &&
        Number(item.Priority) > 0
      ) {
        returnModel.push(item);
      }
    });
    return returnModel;
  }

  getArea() {
    if (this.loginData.UserType === this.userTypes.DCOM) {
      this.getFilterdDDL(
        this.loginData.DivisionCodes,
        "ddlDistrict",
        "ddlDivision"
      );
    } else if (this.loginData.UserType === this.userTypes.COLL) {
      this.getFilterdDDL(
        this.loginData.DistrictCodes,
        "ddlBlock",
        "ddlDistrict"
      );
      this.getFilterdDDL(
        this.loginData.DistrictCodes,
        "ddlTehsil",
        "ddlDistrict"
      );
    } else if (this.loginData.UserType === this.userTypes.ADM) {
      this.getDepartment();
      this.getDivision();
      this.getDistrict();
      this.getBlock();
      this.getTehsil();
    } else if (
      this.loginData.UserType === this.userTypes.MNSTR ||
      this.loginData.UserType === this.userTypes.CMOO ||
      this.loginData.UserType === this.userTypes.TLO
    ) {
      this.getDepartment();
    }
  }

  getFilterdDDL(value, key, filterFrom) {
    let valueForFilter =
      value.split(",").length > 0
        ? "[" + value + "]"
        : this._commonService.IsNullOrEmpty(value)
        ? ""
        : "[" + value + "]";
    let filterDDlModel: FilterDDlModel[] = [];
    filterDDlModel.push({
      FilterFor: key,
      Value: valueForFilter,
      FilterFrom: filterFrom,
    });
    this._commonService.GetFilterdDDL(filterDDlModel).subscribe(
      (data) => {
        if (
          data.IsSuccess &&
          data.Data != null &&
          data.Data.ddlDistrict.length > 0
        ) {
          if (key === "ddlDistrict") {
            this.areaValue = undefined;
            this.dDLList.ddlDistrict = data.Data.ddlDistrict;
          } else if (key === "ddlBlock") {
            this.areaValue = undefined;
            this.dDLList.ddlBlock = data.Data.ddlBlock;
          } else if (key === "ddlTehsil") {
            this.areaValue = undefined;
            this.dDLList.ddlTehsil = data.Data.ddlTehsil;
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  clearAreaData() {
    this.areaValue = undefined;
    this.departmentDataModel = [];
    this.schemeDataModel = [];
    this.serviceDataModel = [];
  }
}
