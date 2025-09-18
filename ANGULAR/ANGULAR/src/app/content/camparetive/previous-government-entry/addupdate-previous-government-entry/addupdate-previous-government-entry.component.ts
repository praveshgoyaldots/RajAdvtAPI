import { stringify } from 'querystring';
import { Component, OnInit } from "@angular/core";
import { DdlItemModel, DDLModel } from "src/app/Shared/Model/commonddl.model";
import {
  UserDepartmentViewModel,
  UserViewModel,
} from "src/app/Shared/Model/user-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { PreviousGovernmentEntryModel, PreviousGovernmentEntryParameterMappingModel } from "src/app/Shared/Model/Camparetive/previous-government-entry-model";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { PreviousGovernmentEntryService } from "src/app/Shared/Service/Comperative/previous-government-entry.service";
import { ComparativeTargetEntryService } from "src/app/Shared/Service/Comperative/comparative-target-entry.service";
import { ComparativeTargetParmeterListModel } from "src/app/Shared/Model/Camparetive/comparative-target-entry-model";
import { YearMasterModel } from "src/app/Shared/Model/Camparetive/comparative-year-master-model";

@Component({
  selector: "app-addupdate-previous-government-entry",
  templateUrl: "./addupdate-previous-government-entry.component.html",
  styleUrls: ["./addupdate-previous-government-entry.component.css"],
})
export class AddupdatePreviousGovernmentEntryComponent implements OnInit {
  //#region << Variable >>

  model: PreviousGovernmentEntryModel;
  title: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  ddlParameter: ComparativeTargetParmeterListModel[];
  parameterDetail: ComparativeTargetParmeterListModel;
  dDLList: DDLModel;
  yearListModel: PreviousGovernmentEntryParameterMappingModel[] = [];
  ddlKPICategory: DdlItemModel[];
  department = new FormControl("", [Validators.required]);
  kpi = new FormControl("", [Validators.required]);
  parameter = new FormControl("", [Validators.required]);

  //#endregion

  //#region << constructor >>

  constructor(
    private _parentApi: AppComponent,
    private readonly _previousGovernmentEntryService: PreviousGovernmentEntryService,
    private readonly _comparativeTargetEntryService: ComparativeTargetEntryService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService
  ) {
    this.model = new PreviousGovernmentEntryModel();
    this.parameterDetail=new ComparativeTargetParmeterListModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Previous Govt. Entry :",
        "keyboard_backspace",
        "Back To List",
        "camparative/previous-government-entry"
      );
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout(
        "Add Previous Govt. Entry :",
        "keyboard_backspace",
        "Back To List",
        "camparative/previous-government-entry"
      );
      this.title = "Add";
    }
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
this.GetAllYearList();
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.PreviousGovernmentEntryDDLKey)
      .subscribe(
        (data) => {
          
          if (data.IsSuccess) {
            this.dDLList = <DDLModel>data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  GetAllYearList() {
    this._previousGovernmentEntryService
      .GetAllYearList()
      .subscribe(
        (data) => {
          
          if (data.IsSuccess) {
            this.yearListModel = <PreviousGovernmentEntryParameterMappingModel[]>data.Data;
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
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getKPIList(code) {
    this._commonService.GetKPIByDepartmentCode(Number(code)).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.ddlKPICategory = data.Data as DdlItemModel[];
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  GetById() {
    this._previousGovernmentEntryService.GetById(this.model.Id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.model = <PreviousGovernmentEntryModel>data.Data;

          if (this.model.DepartmentCode) {
            this.getKPIList(this.model.DepartmentCode);
            this.model.DepartmentCode = String(this.model.DepartmentCode);
          }
          if (this.model.KPICategoryCode) {
            this.GetAllParameterList(this.model.KPICategoryCode)
            this.model.KPICategoryCode = String(this.model.KPICategoryCode);
          }
          if (this.model.ParameterCode) {
            this.model.ParameterCode = String(this.model.ParameterCode);
            if(this.ddlParameter){
            const paraDetail=this.ddlParameter.filter(x=>x.ParameterCode==this.model.ParameterCode);
            this.getParameterDetail(paraDetail);
          }
          }
          if (this.model.PreviousGovernmentEntryParameterMappingModel.length>0){
          this.yearListModel=<PreviousGovernmentEntryParameterMappingModel[]>this.model.PreviousGovernmentEntryParameterMappingModel;
          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.department.markAsTouched();
    this.kpi.markAsTouched();
    this.parameter.markAsTouched();
    if (this.department.valid && this.kpi.valid && this.parameter.valid) {
      this.model.PreviousGovernmentEntryParameterMappingModel=<PreviousGovernmentEntryParameterMappingModel[]>this.yearListModel;
      if (this.model.Id) {
        this._previousGovernmentEntryService.Edit(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["camparative/previous-government-entry"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._previousGovernmentEntryService.Add(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["camparative/previous-government-entry"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      }
    } else {
    }
  }

  GetAllParameterList(kPICode) {
    this._comparativeTargetEntryService.GetAllParameterList(kPICode).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.ddlParameter = <ComparativeTargetParmeterListModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getParameterDetail(data)
{
 this.parameterDetail=data as ComparativeTargetParmeterListModel;
}

  //#endregion  << Method >>
}
