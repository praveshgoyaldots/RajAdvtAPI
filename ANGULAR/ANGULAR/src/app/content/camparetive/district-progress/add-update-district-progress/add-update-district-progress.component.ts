import { Component, OnInit } from '@angular/core';
import { DistrictProgressModel, DistrictProgressParameterMappingModel } from 'src/app/Shared/Model/Camparetive/district-progress-model';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { DistrictProgressService } from 'src/app/Shared/Service/Comperative/district-progress.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { environment } from 'src/environments/environment';
import { EbookletEnumProd, EbookletEnum } from 'src/app/Shared/Enum/ebooklet.enum';

@Component({
  selector: 'app-add-update-district-progress',
  templateUrl: './add-update-district-progress.component.html',
  styleUrls: ['./add-update-district-progress.component.css']
})
export class AddUpdateDistrictProgressComponent implements OnInit {
//#region << Variable >>

model: DistrictProgressModel;
updateModel: DistrictProgressModel;
title: string;
loginData: UserViewModel;
ddlDepartment: UserDepartmentViewModel[];
dDLList: DDLModel;
listModel: DistrictProgressParameterMappingModel[] = [];
ddlKPICategory: DdlItemModel[];
department = new FormControl("", [Validators.required]);
year = new FormControl("", [Validators.required]);
Month = new FormControl("", [Validators.required]);
isDuplicate = false;
id: number;
ebookletEnum=environment.production?EbookletEnumProd:EbookletEnum;
//#endregion

//#region << constructor >>

constructor(
  private _parentApi: AppComponent,
  private readonly _districtProgressService: DistrictProgressService,
  private readonly _alertService: AlertService,
  private readonly _router: Router,
  private _route: ActivatedRoute,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  private readonly _commonService: CommonService
) {
  this.model = new DistrictProgressModel();
  this.id = this._route.snapshot.params.id;
  if (this.id) {
    this.model.Id = this.id;
    this.GetById();
    this._parentApi.setpagelayout(
      "Update District Progress Entry :",
      "keyboard_backspace",
      "Back To List",
      "camparative/district-progress"
    );
    this.title = "Update";
  } else {
    this._parentApi.setpagelayout(
      "Add District Progress Entry :",
      "keyboard_backspace",
      "Back To List",
      "camparative/district-progress"
    );
    this.title = "Add";
    // this.GetAllParameterList();
  }
}

//#endregion

//#region << Method >>

ngOnInit() {
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
          if(this.dDLList.ddlComparativeParameterCategory){
            this.dDLList.ddlComparativeParameterCategory=this.dDLList.ddlComparativeParameterCategory.filter(x=>x.Value!=this.ebookletEnum.EbookletCategory);
          }
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
  
  if (!isEdit) {
    this.isDuplicateData();
  }
}

GetById() {
  this._districtProgressService.GetById(this.model.Id).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.model = <DistrictProgressModel>data.Data;
        this.updateModel = new DistrictProgressModel();
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
        this.listModel = <DistrictProgressParameterMappingModel[]>(
          this.model.DistrictProgressParameterMappingModel
        );
        this.updateModel.DistrictProgressParameterMappingModel = this.model.DistrictProgressParameterMappingModel;
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
  this.Month.markAsTouched();
  if (
    this.department.valid &&
    this.year.valid &&
    this.Month.valid
  ) {
    this.model.DistrictProgressParameterMappingModel = <
      DistrictProgressParameterMappingModel[]
    >this.listModel;
    if (this.model.Id) {
      this._districtProgressService.Edit(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["camparative/district-progress"]);
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
      this._districtProgressService.Add(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["camparative/district-progress"]);
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
    this.listModel = <DistrictProgressParameterMappingModel[]>(
      this.updateModel.DistrictProgressParameterMappingModel
    );
    return;
  }
    this._districtProgressService
      .GetAllParameterList(kPICode, dpt, Number(this.model.ParameterCategoryCode))
      .subscribe(
        data => {
          if (data.IsSuccess) {
            
            this.listModel = <DistrictProgressParameterMappingModel[]>(
              data.Data
            );
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
      this.isDuplicateData();
}

isDuplicateData() {
  
  if (
    this.model.DepartmentCode && this.model.YearCode && this.model.MonthCode) {

  this._districtProgressService.isDuplicateData(this.model).subscribe(
    data => {
      
      if (data.IsSuccess) {
        if (data.Data) {
          const temp = <DistrictProgressModel>data.Data;
          this.model.Id = temp.Id;
          this.listModel = <DistrictProgressParameterMappingModel[]>(
            temp.DistrictProgressParameterMappingModel
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
            this.model.ParameterCategoryCode == this.updateModel.ParameterCategoryCode //&&
           // this.model.DepartmentCode == this.updateModel.DepartmentCode
          ) {
            this.listModel = <DistrictProgressParameterMappingModel[]>(
              this.updateModel.DistrictProgressParameterMappingModel
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
          this.updateModel.Id == this.model.Id &&
           this.model.ParameterCategoryCode == this.updateModel.ParameterCategoryCode //&&
         // this.model.DepartmentCode == this.updateModel.DepartmentCode
        ) {
          this.listModel = <DistrictProgressParameterMappingModel[]>(
            this.updateModel.DistrictProgressParameterMappingModel
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
