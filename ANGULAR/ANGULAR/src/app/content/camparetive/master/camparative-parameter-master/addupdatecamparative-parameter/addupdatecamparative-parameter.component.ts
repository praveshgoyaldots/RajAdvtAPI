import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ComparativeParameterMasterModel } from 'src/app/Shared/Model/Camparetive/comparative-parameter-model';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AppComponent } from 'src/app/app.component';
import { ComparativeParameterMasterService } from 'src/app/Shared/Service/Comperative/comparative-parameter-master.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { StatusEnum } from 'src/app/Shared/Enum/scheme.enum';

@Component({
  selector: "app-addupdatecamparative-parameter",
  templateUrl: "./addupdatecamparative-parameter.component.html",
  styleUrls: ["./addupdatecamparative-parameter.component.css"],
})
export class AddupdatecamparativeParameterComponent implements OnInit {
  //#region << Variable >>

  formGroup: FormGroup;
  model: ComparativeParameterMasterModel;
  title: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  ddlKPICategory: DdlItemModel[];
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentApi: AppComponent,
    private readonly _ComparativeParameterMasterService: ComparativeParameterMasterService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService
  ) {
    this.model = new ComparativeParameterMasterModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Parameter :",
        "keyboard_backspace",
        "Back To List",
        "camparative/camparativeparameter"
      );
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout(
        "Add Parameter :",
        "keyboard_backspace",
        "Back To List",
        "camparative/camparativeparameter"
      );
      this.title = "Add";
    }
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ComparativeParameterDDLKey).subscribe(
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

  GetById() {
    this._ComparativeParameterMasterService.GetById(this.model.Id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.model = <ComparativeParameterMasterModel>data.Data;

          if (this.model.DepartmentCode) {
            this.model.DepartmentCode = String(this.model.DepartmentCode);

              this.getSchemeList(this.model.DepartmentCode);

          }
          if (this.model.KPICategoryCode) {
            this.model.KPICategoryCode = String(this.model.KPICategoryCode);
          }
          if (this.model.SchemeCode) {
            this.model.SchemeCode = String(this.model.SchemeCode);
          }
          if (this.model.FinancialUnitCode) {
            this.model.FinancialUnitCode = String(this.model.FinancialUnitCode);
          }
          if (this.model.PhysicalUnitCode) {
            this.model.PhysicalUnitCode = String(this.model.PhysicalUnitCode);
          }
          if (this.model.YearGrandTotalCode) {
            this.model.YearGrandTotalCode = String(this.model.YearGrandTotalCode);
          }
          if (this.model.CategoryCode) {
            this.model.CategoryCode = String(this.model.CategoryCode);
          }
          if (this.model.TargetBasedCode) {
            this.model.TargetBasedCode = String(this.model.TargetBasedCode);
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
    

    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.model.Id) {
        this._ComparativeParameterMasterService.Edit(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["camparative/camparativeparameter"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._ComparativeParameterMasterService.Add(this.model).subscribe(
          (data) => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["camparative/camparativeparameter"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
      }

    }

  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      DepartmentCode: [null, Validators.required],
      KPICategoryCode: [null, Validators.required],
      Name: [null],//, Validators.required
      NameHindi: [null],
      IsPhysical: [null],
      PhysicalUnitCode: [null],
      IsFinancial: [null],
      FinancialUnitCode: [null],
      IsDepartment: [null],
      IsDistrict: [null],
      IsConnectWithScheme: [null],
      SchemeCode: [null],
      Description2: [null],
      Description1: [null],
      YearGrandTotalCode: [null],
      BenificiaryList:[null],
      IsComparativeReport:[null],
      IsEbookletReport :[null],
      IsCompilationReport:[null],
      IsDistrictParameterReport:[null],
      DisplayOrder:[null],
      IsWebservice: [null],
      WebserviceUserName: [null],
      WebserviceURL: [null],
      WebServicePassword: [null],
      CategoryCode:[null],
      TargetBasedCode:[null],
      Weighted:[null, Validators.pattern("[0-9.0-9]*$")]
     
    });
  }


  getSchemeList($event) {
    
    this._commonService.GetSchemeList(Number($event), StatusEnum.Active).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.dDLList.ddlSchemeName = data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
    this._commonService.GetKPIByDepartmentCode(Number($event)).subscribe(
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


phynancialClick(events) {
  if (events) {
    this.formGroup.get("Name").setValidators([Validators.required]);
    this.formGroup.get("PhysicalUnitCode").setValidators([Validators.required]);
  } else {
    this.formGroup.get("Name").setValidators(null);
    this.formGroup.get("PhysicalUnitCode").setValidators(null);
  }
  this.formGroup.get("Name").updateValueAndValidity();
  this.formGroup.get("PhysicalUnitCode").updateValueAndValidity();
}

financialClick(events) {
  if (events) {
    this.formGroup.get("NameHindi").setValidators([Validators.required]);
    this.formGroup.get("FinancialUnitCode").setValidators([Validators.required]);
  } else {
    this.formGroup.get("NameHindi").setValidators(null);
    this.formGroup.get("FinancialUnitCode").setValidators(null);
  }
  this.formGroup.get("NameHindi").updateValueAndValidity();
  this.formGroup.get("FinancialUnitCode").updateValueAndValidity();
}


  //#endregion  << Method >>
}
