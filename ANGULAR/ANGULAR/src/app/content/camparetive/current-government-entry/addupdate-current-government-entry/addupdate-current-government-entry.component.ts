import { debug } from "util";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ComparativeTargetParmeterListModel } from "src/app/Shared/Model/Camparetive/comparative-target-entry-model";
import {
  CurrentGovtEntryModel,
  CurrentGovtEntryParameterMappingModel
} from "src/app/Shared/Model/Camparetive/current-government-entry-model";
import { DdlItemModel, DDLModel } from "src/app/Shared/Model/commonddl.model";
import {
  UserDepartmentViewModel,
  UserViewModel
} from "src/app/Shared/Model/user-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserService } from "src/app/Shared/Service/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { ComparativeTargetEntryService } from "src/app/Shared/Service/Comperative/comparative-target-entry.service";
import { AppComponent } from "src/app/app.component";
import { CurrentGovernmentEntryService } from "src/app/Shared/Service/Comperative/current-government-entry.service";

@Component({
  selector: "app-addupdate-current-government-entry",
  templateUrl: "./addupdate-current-government-entry.component.html",
  styleUrls: ["./addupdate-current-government-entry.component.css"]
})
export class AddupdateCurrentGovernmentEntryComponent implements OnInit {
  //#region << Variable >>

  model: CurrentGovtEntryModel;
  updateModel: CurrentGovtEntryModel;
  title: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  listModel: CurrentGovtEntryParameterMappingModel[] = [];
  ddlKPICategory: DdlItemModel[];
  department = new FormControl("", [Validators.required]);
  year = new FormControl("", [Validators.required]);
  // kpi = new FormControl("", [Validators.required]);
  Month = new FormControl("", [Validators.required]);
  isDuplicate = false;
  id: number;
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentApi: AppComponent,
    private readonly _ComparativeTargetEntryService: ComparativeTargetEntryService,
    private readonly _CurrentGovernmentEntryService: CurrentGovernmentEntryService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService
  ) {
    this.model = new CurrentGovtEntryModel(true);
    this.id = this._route.snapshot.params.id;
    if (this.id) {
      this.model.Id = this.id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Departmental Achievements Entry :",
        "keyboard_backspace",
        "Back To List",
        "camparative/current-government-entry"
      );
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout(
        "Add Departmental Achievements Entry :",
        "keyboard_backspace",
        "Back To List",
        "camparative/current-government-entry"
      );
      this.title = "Add";
      //this.GetAllParameterList();
    }
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    //this.FormGroupInit();
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    //this.getDepartment();
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.CurrentGovernmentEntryDDLKey)
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

  // getDepartment() {
  //   this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
  //     data => {
  //       if (data.IsSuccess) {
  //         this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
  //       }
  //     },
  //     error => {
  //       this._alertService.error(error.message);
  //     }
  //   );
  // }

  getKPIList(code, isEdit = false) {
    this.isDuplicateData();
  }

  GetById() {
    this._CurrentGovernmentEntryService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <CurrentGovtEntryModel>data.Data;
          this.updateModel = new CurrentGovtEntryModel(true);
          if(!this.model.ParameterCategoryCode ){
            this.model.ParameterCategoryCode =this.updateModel.ParameterCategoryCode;
          }
          this.updateModel.Id = this.model.Id;
         this.updateModel.ParameterCategoryCode = this.model.ParameterCategoryCode;
          this.updateModel.DepartmentCode = this.model.DepartmentCode;
          this.updateModel.YearCode = this.model.YearCode;
          this.updateModel.MonthCode = this.model.MonthCode;

          if (this.model.DepartmentCode) {
           // this.getKPIList(this.model.DepartmentCode, true);
            this.model.DepartmentCode = String(this.model.DepartmentCode);
          }
          if (this.model.ParameterCategoryCode) {
            this.model.ParameterCategoryCode = String(this.model.ParameterCategoryCode);
          }
          if (this.model.YearCode) {
            this.model.YearCode = String(this.model.YearCode);
          }
          if (this.model.MonthCode) {
            this.model.MonthCode = String(this.model.MonthCode);
          }
          this.listModel = <CurrentGovtEntryParameterMappingModel[]>(
            this.model.CurrentGovtEntryParameterMappingModel
          );
          this.updateModel.CurrentGovtEntryParameterMappingModel = this.model.CurrentGovtEntryParameterMappingModel;
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
    
    this.department.markAsTouched();
    this.year.markAsTouched();
    // this.kpi.markAsTouched();
    this.Month.markAsTouched();
    if (
      this.department.valid &&
      this.year.valid &&
      // this.kpi.valid &&
      this.Month.valid
    ) {
      this.model.CurrentGovtEntryParameterMappingModel = <
        CurrentGovtEntryParameterMappingModel[]
      >this.listModel;
      if (this.model.Id) {
        this._CurrentGovernmentEntryService.Edit(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["camparative/current-government-entry"]);
            } else {
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._CurrentGovernmentEntryService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["camparative/current-government-entry"]);
            } else {
              this._commonService.ScrollingTop();
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

  GetAllParameterList(kPICode, dpt) {
    
    if ( this.updateModel &&
      this.updateModel.Id == this.model.Id &&
      // this.model.KPICategoryCode == this.updateModel.KPICategoryCode &&
      this.model.DepartmentCode == this.updateModel.DepartmentCode
    ) {
      this.listModel = <CurrentGovtEntryParameterMappingModel[]>(
        this.updateModel.CurrentGovtEntryParameterMappingModel
      );
      return;
    }
    if (kPICode || dpt) {
      this._ComparativeTargetEntryService
        .GetAllParameterList(kPICode, dpt)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              
              this.listModel = <CurrentGovtEntryParameterMappingModel[]>(
                data.Data
              );
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
    }
    this.isDuplicateData();
  }

  isDuplicateData() {
    
    // if (
    //   // this.model.KPICategoryCode &&
    //   this.model.DepartmentCode && this.model.YearCode && this.model.MonthCode) {

    this._CurrentGovernmentEntryService.isDuplicateData(this.model).subscribe(
      data => {
        
        if (data.IsSuccess) {
          if (data.Data) {
            const temp = <CurrentGovtEntryModel>data.Data;
            this.model.Id = temp.Id;
            this.listModel = <CurrentGovtEntryParameterMappingModel[]>(
              temp.CurrentGovtEntryParameterMappingModel
            );
          } else {
            this.model.Id = this.id;
            if (!this.model.Id) {
              // this.GetAllParameterList(
              //   this.model.KPICategoryCode,
              //   this.model.DepartmentCode
              // );
            } else if (
              this.updateModel.Id == this.model.Id &&
               this.model.ParameterCategoryCode == this.updateModel.ParameterCategoryCode &&
              this.model.DepartmentCode == this.updateModel.DepartmentCode
            ) {
              this.listModel = <CurrentGovtEntryParameterMappingModel[]>(
                this.updateModel.CurrentGovtEntryParameterMappingModel
              );
            }
          }
        } else {
          this.model.Id = this.id;
          if (!this.model.Id) {
            const temp = <CurrentGovtEntryModel>data.Data;
            this.listModel = <CurrentGovtEntryParameterMappingModel[]>(
              temp.CurrentGovtEntryParameterMappingModel
            );

          } else if (
            this.updateModel.Id == this.model.Id &&
            this.model.YearCode == this.updateModel.YearCode &&
            this.model.MonthCode == this.updateModel.MonthCode &&
            this.model.ParameterCategoryCode == this.updateModel.ParameterCategoryCode &&
            this.model.DepartmentCode == this.updateModel.DepartmentCode
          ) {
            this.listModel = <CurrentGovtEntryParameterMappingModel[]>(
              this.updateModel.CurrentGovtEntryParameterMappingModel
            );
          }else{
            const temp = <CurrentGovtEntryModel>data.Data;
            this.listModel = <CurrentGovtEntryParameterMappingModel[]>(
              temp.CurrentGovtEntryParameterMappingModel
            );
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );

 // }
  }

  //#endregion  << Method >>
}
