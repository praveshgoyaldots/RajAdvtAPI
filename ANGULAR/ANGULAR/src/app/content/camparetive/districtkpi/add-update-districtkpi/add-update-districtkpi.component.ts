
import { Component, OnInit } from '@angular/core';
import { DistrictKPIModel, DistrictKPIParameterMappingModel } from 'src/app/Shared/Model/Camparetive/district-kpimodel';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ComparativeTargetEntryService } from 'src/app/Shared/Service/Comperative/comparative-target-entry.service';
import { DistrictkpiService } from 'src/app/Shared/Service/Comperative/districtkpi.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-add-update-districtkpi',
  templateUrl: './add-update-districtkpi.component.html',
  styleUrls: ['./add-update-districtkpi.component.css']
})
export class AddUpdateDistrictkpiComponent implements OnInit {
//#region << Variable >>

model: DistrictKPIModel;
updateModel: DistrictKPIModel;
title: string;
loginData: UserViewModel;
ddlDepartment: UserDepartmentViewModel[];
dDLList: DDLModel;
listModel: DistrictKPIParameterMappingModel[] = [];
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
  private readonly _DistrictkpiService: DistrictkpiService,
  private readonly _alertService: AlertService,
  private readonly _router: Router,
  private _route: ActivatedRoute,
  private readonly formBuilder: FormBuilder,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  private readonly _commonService: CommonService
) {
  this.model = new DistrictKPIModel();
  this.id = this._route.snapshot.params.id;
  if (this.id) {
    this.model.Id = this.id;
    this.GetById();
    this._parentApi.setpagelayout(
      "Update District-KPI Entry :",
      "keyboard_backspace",
      "Back To List",
      "camparative/district-kpi"
    );
    this.title = "Update";
  } else {
    this._parentApi.setpagelayout(
      "Add District-KPI Entry :",
      "keyboard_backspace",
      "Back To List",
      "camparative/district-kpi"
    );
    this.title = "Add";
    this.GetAllParameterList();
  }
}

//#endregion

//#region << Method >>

ngOnInit() {
  //this.FormGroupInit();
  this.GetDDLList();
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  this.getDepartment();
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

getDepartment() {
  this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
    data => {
      if (data.IsSuccess) {
        this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

getKPIList(code, isEdit = false) {
  
  // this._commonService.GetKPIByDepartmentCode(Number(code)).subscribe(
  //   data => {
  //     if (data.IsSuccess) {
  //       
  //       this.ddlKPICategory = data.Data as DdlItemModel[];
  //     }
  //   },
  //   error => {
  //     this._alertService.error(error.message);
  //   }
  // );
  if (!isEdit) {
    //this.GetAllParameterList(0 , this.model.DepartmentCode);
    this.isDuplicateData();
  }
}

GetById() {
  this._DistrictkpiService.GetById(this.model.Id).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.model = <DistrictKPIModel>data.Data;
        this.updateModel = new DistrictKPIModel();
        if(!this.model.ParameterCategoryCode ){
          this.model.ParameterCategoryCode =this.updateModel.ParameterCategoryCode;
        }
        this.updateModel.Id = this.model.Id;
        this.updateModel.ParameterCategoryCode = this.model.ParameterCategoryCode;
        this.updateModel.DepartmentCode = this.model.DepartmentCode;
        this.updateModel.YearCode = this.model.YearCode;
        this.updateModel.MonthCode = this.model.MonthCode;

        if (this.model.DepartmentCode) {
          this.getKPIList(this.model.DepartmentCode, true);
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
        this.listModel = <DistrictKPIParameterMappingModel[]>(
          this.model.DistrictKPIParameterMappingModel
        );
        this.updateModel.DistrictKPIParameterMappingModel = this.model.DistrictKPIParameterMappingModel;
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
    this.model.DistrictKPIParameterMappingModel = <
      DistrictKPIParameterMappingModel[]
    >this.listModel;
    if (this.model.Id) {
      this._DistrictkpiService.Edit(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["camparative/district-kpi"]);
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
      this._DistrictkpiService.Add(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["camparative/district-kpi"]);
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

GetAllParameterList(kPICode=0, dpt=0) {
  
  if ( this.updateModel &&
    this.updateModel.Id == this.model.Id &&
     this.model.ParameterCategoryCode == this.updateModel.ParameterCategoryCode &&
    this.model.DepartmentCode == this.updateModel.DepartmentCode
  ) {
    this.listModel = <DistrictKPIParameterMappingModel[]>(
      this.updateModel.DistrictKPIParameterMappingModel
    );
    return;
  }
  //if (kPICode || dpt) {
    this._DistrictkpiService
      .GetAllParameterList(kPICode, dpt, Number(this.model.ParameterCategoryCode))
      .subscribe(
        data => {
          if (data.IsSuccess) {
            
            this.listModel = <DistrictKPIParameterMappingModel[]>(
              data.Data
            );
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
 // }
  //this.isDuplicateData();
}

isDuplicateData() {
  
  if (
    // this.model.KPICategoryCode &&
    this.model.DepartmentCode && this.model.YearCode && this.model.MonthCode) {

  this._DistrictkpiService.isDuplicateData(this.model).subscribe(
    data => {
      
      if (data.IsSuccess) {
        if (data.Data) {
          const temp = <DistrictKPIModel>data.Data;
          this.model.Id = temp.Id;
          this.listModel = <DistrictKPIParameterMappingModel[]>(
            temp.DistrictKPIParameterMappingModel
          );
        } else {
          this.model.Id = this.id;
          if (!this.model.Id) {
            // this.GetAllParameterList(
            //   this.model.KPICategoryCode,
            //   this.model.DepartmentCode
            // );
          } else if (
            this.updateModel.Id == this.model.Id //&&
            // this.model.KPICategoryCode == this.updateModel.KPICategoryCode &&
           // this.model.DepartmentCode == this.updateModel.DepartmentCode
          ) {
            this.listModel = <DistrictKPIParameterMappingModel[]>(
              this.updateModel.DistrictKPIParameterMappingModel
            );
          }
        }
      } else {
        this.model.Id = this.id;
        if (!this.model.Id) {
          // this.GetAllParameterList(
          //   this.model.KPICategoryCode,
          //   this.model.DepartmentCode
          // );
        } else if (
          this.updateModel.Id == this.model.Id //&&
          // this.model.KPICategoryCode == this.updateModel.KPICategoryCode &&
         // this.model.DepartmentCode == this.updateModel.DepartmentCode
        ) {
          this.listModel = <DistrictKPIParameterMappingModel[]>(
            this.updateModel.DistrictKPIParameterMappingModel
          );
        }
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );

}
}

//#endregion  << Method >>
}
