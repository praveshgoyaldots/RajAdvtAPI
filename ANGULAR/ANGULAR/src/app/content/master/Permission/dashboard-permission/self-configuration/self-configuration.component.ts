import { GlobalMessagesModel } from "./../../../../../Shared/Model/common.messages";
import {
  SelfConfigModel,
  ConfigDataModel,
  ConfigDataViewModel
} from "./../../../../../Shared/Model/self-config.model";
import { Component, OnInit } from "@angular/core";
import { DDLModel, FilterDDlModel } from "src/app/Shared/Model/commonddl.model";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { ConfigurationService } from "src/app/Shared/Service/configuration.service";
import {
  ConfigUserModeEnum,
  ConfigTypeEnum,
  UserTypeEnum
} from "src/app/Shared/Enum/user-type.enum";
import { UserViewModel } from "src/app/Shared/Model/user-model";

@Component({
  selector: "app-self-configuration",
  templateUrl: "./self-configuration.component.html",
  styleUrls: ["./self-configuration.component.css"]
})
export class SelfConfigurationComponent implements OnInit {
  userTypes = UserTypeEnum;
  configTypeEnum = ConfigTypeEnum;
  permission: string;
  dDLList: DDLModel;
  dataModel: ConfigDataViewModel;
  model: SelfConfigModel;
  departmentDataModel: ConfigDataModel[] = [];
  schemeDataModel: ConfigDataModel[] = [];
  serviceDataModel: ConfigDataModel[] = [];
  filterDDlModel: FilterDDlModel[] = [];
  loginData: UserViewModel;
  constructor(
    private readonly appComponnet: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _configurationService: ConfigurationService,
    private readonly _router: Router,
    private readonly _alertService: AlertService,
    private readonly _authService: AuthenticationService) {
    this.appComponnet.setpagelayout("Self Configuration:", "keyboard_backspace", "", "", false, false);
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getConfigData();
  }

  getConfigData() {
    this._configurationService.GetConfigurationData(String(this.loginData.UserType), ConfigTypeEnum.Self, null, String(this.loginData.UserId))
      .subscribe(data => {
        if (data.IsSuccess) {
          this.departmentDataModel = [];
          this.serviceDataModel = [];
          this.schemeDataModel = [];
          this.dataModel = <ConfigDataViewModel>data.Data;

          if (
            this.dataModel.departmentConfig != null &&
            this.dataModel.departmentConfig.length > 0
          ) {
            this.dataModel.departmentConfig.forEach(element => {
              this.departmentDataModel.push({
                DataValue:
                  element.DepartmentCode != null
                    ? String(element.DepartmentCode)
                    : undefined,
                DataText:
                  element.DepartmentName != null
                    ? String(element.DepartmentName)
                    : undefined,
                Priority:
                  element.DisplayOrder != null
                    ? String(element.DisplayOrder)
                    : undefined,
                DepartmentCode:
                  element.DepartmentCode != null
                    ? Number(element.DepartmentCode)
                    : undefined,
                PermissionId:
                  element.PermissionId != null
                    ? Number(element.PermissionId)
                    : undefined,
                Type: element.Type != null ? String(element.Type) : undefined
              });
            });
          }
          if (
            this.dataModel.serviceConfig != null &&
            this.dataModel.serviceConfig.length > 0
          ) {
            this.dataModel.serviceConfig.forEach(element => {
              this.serviceDataModel.push({
                DataValue:
                  element.ServiceId != null
                    ? String(element.ServiceId)
                    : undefined,
                DataText:
                  element.ServiceName != null
                    ? String(element.ServiceName)
                    : undefined,
                Priority:
                  element.DisplayOrder != null
                    ? String(element.DisplayOrder)
                    : undefined,
                DepartmentCode:
                  element.DepartmentCode != null
                    ? Number(element.DepartmentCode)
                    : undefined,
                PermissionId:
                  element.PermissionId != null
                    ? Number(element.PermissionId)
                    : undefined,
                Type: element.Type != null ? String(element.Type) : undefined
              });
            });
          }
          if (
            this.dataModel.schemeConfig != null &&
            this.dataModel.schemeConfig.length > 0
          ) {
            this.dataModel.schemeConfig.forEach(element => {
              this.schemeDataModel.push({
                DataValue:
                  element.SchemeId != null
                    ? String(element.SchemeId)
                    : undefined,
                DataText:
                  element.SchemeName != null
                    ? String(element.SchemeName)
                    : undefined,
                Priority:
                  element.DisplayOrder != null
                    ? String(element.DisplayOrder)
                    : undefined,
                DepartmentCode:
                  element.DepartmentCode != null
                    ? Number(element.DepartmentCode)
                    : undefined,
                PermissionId:
                  element.PermissionId != null
                    ? Number(element.PermissionId)
                    : undefined,
                Type: element.Type != null ? String(element.Type) : undefined
              });
            });
          }
        }
      },
        error => {
          this._alertService.error(GlobalMessagesModel.InternalError);
        }
      );
  }

  Onsubmit() {
    this.dataModel.departmentConfig = [];
    this.dataModel.serviceConfig = [];
    this.dataModel.schemeConfig = [];

    this.removeNonPriorityItems(this.departmentDataModel).forEach(element => {
      this.dataModel.departmentConfig.push({
        DepartmentCode: this._commonService.IsNullOrEmpty(element.DataValue) ? 0 : Number(element.DataValue),
        DepartmentName: this._commonService.IsNullOrEmpty(element.DataText) ? null : String(element.DataText),
        DisplayOrder: this._commonService.IsNullOrEmpty(element.Priority) ? 0 : Number(element.Priority),
        PermissionId: this._commonService.IsNullOrEmpty(String(element.PermissionId)) ? 0 : Number(element.PermissionId),
        Type: this._commonService.IsNullOrEmpty(String(element.Type)) ? this.configTypeEnum.Self : String(element.Type)
      });
    });
    this.removeNonPriorityItems(this.schemeDataModel).forEach(element => {
      this.dataModel.schemeConfig.push({
        SchemeId: this._commonService.IsNullOrEmpty(element.DataValue) ? 0 : Number(element.DataValue),
        SchemeName: this._commonService.IsNullOrEmpty(element.DataText) ? null : String(element.DataText),
        DepartmentCode: this._commonService.IsNullOrEmpty(String(element.DepartmentCode)) ? 0 : Number(element.DepartmentCode),
        DisplayOrder: this._commonService.IsNullOrEmpty(element.Priority) ? 0 : Number(element.Priority),
        PermissionId: this._commonService.IsNullOrEmpty(String(element.PermissionId)) ? 0 : Number(element.PermissionId),
        Type: this._commonService.IsNullOrEmpty(String(element.Type)) ? this.configTypeEnum.Self : String(element.Type)
      });
    });
    this.removeNonPriorityItems(this.serviceDataModel).forEach(element => {
      this.dataModel.serviceConfig.push({
        ServiceId: this._commonService.IsNullOrEmpty(element.DataValue) ? 0 : Number(element.DataValue),
        ServiceName: this._commonService.IsNullOrEmpty(element.DataText) ? null : String(element.DataText),
        DepartmentCode: this._commonService.IsNullOrEmpty(String(element.DepartmentCode)) ? 0 : Number(element.DepartmentCode),
        DisplayOrder: this._commonService.IsNullOrEmpty(element.Priority) ? 0 : Number(element.Priority),
        PermissionId: this._commonService.IsNullOrEmpty(String(element.PermissionId)) ? 0 : Number(element.PermissionId),
        Type: this._commonService.IsNullOrEmpty(String(element.Type)) ? this.configTypeEnum.Self : String(element.Type)
      });
    });

    this.dataModel.UserId = this.loginData.UserId;
    this.dataModel.CreatedBy = this.loginData.UserId;
    this.dataModel.UserType = this.loginData.UserType;

    this._configurationService.SetConfiguration(this.dataModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this._alertService.success(GlobalMessagesModel.saveSuccess);
        }
      },
      error => {
        this._alertService.success(GlobalMessagesModel.saveError);
      }
    );
  }

  numberOnly(value): boolean {
    return this._commonService.numberOnly(value);
  }

  removeNonPriorityItems(listModel: ConfigDataModel[]) {
    const returnModel: ConfigDataModel[] = [];
    listModel.forEach(item => {
      if (item != null && item.Priority != null && item.Priority != undefined && String(item.Priority) !== "" && Number(item.Priority) > 0) {
        returnModel.push(item);
      }
    });
    return returnModel;
  }
}
