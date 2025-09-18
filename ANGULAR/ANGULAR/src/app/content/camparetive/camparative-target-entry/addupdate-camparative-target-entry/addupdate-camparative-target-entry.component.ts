import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { ComparativeTargetEntryService } from "src/app/Shared/Service/Comperative/comparative-target-entry.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import {
  ComparativeTargetEntryModel,
  ComparativeTargetParmeterListModel,
  ComparativeParameterTargetParameterMappingModel
} from "src/app/Shared/Model/Camparetive/comparative-target-entry-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DDLModel, DdlItemModel } from "src/app/Shared/Model/commonddl.model";
import {
  UserViewModel,
  UserDepartmentViewModel
} from "src/app/Shared/Model/user-model";

@Component({
  selector: "app-addupdate-camparative-target-entry",
  templateUrl: "./addupdate-camparative-target-entry.component.html",
  styleUrls: ["./addupdate-camparative-target-entry.component.css"]
})
export class AddupdateCamparativeTargetEntryComponent implements OnInit {
  //#region << Variable >>

  model: ComparativeTargetEntryModel;
  updateModel: ComparativeTargetEntryModel;
  title: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  listModel: ComparativeTargetParmeterListModel[] = [];
  ddlKPICategory: DdlItemModel[];
  mappinglistModel: ComparativeParameterTargetParameterMappingModel[] = [];
  department = new FormControl("", [Validators.required]);
  year = new FormControl("", [Validators.required]);
  id: number;
  btnHide : boolean;
  // kpi = new FormControl("", [Validators.required]);
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentApi: AppComponent,
    private readonly _ComparativeTargetEntryService: ComparativeTargetEntryService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService
  ) {
    this.model = new ComparativeTargetEntryModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Camparative Target Entry :",
        "keyboard_backspace",
        "Back To List",
        "camparative/camparativetargetentry"
      );
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout(
        "Add Camparative Target Entry :",
        "keyboard_backspace",
        "Back To List",
        "camparative/camparativetargetentry"
      );
      this.title = "Add";
      //this.GetAllParameterList();
    }
    this.btnHide = false;
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    //this.FormGroupInit();
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    // this.getDepartment();
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.ComparativeTargetEnrtyDDLKey)
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
      this.GetAllParameterList(0, this.model.DepartmentCode);
     // this.isDuplicateData();
    }
  }

  GetById() {
    this._ComparativeTargetEntryService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <ComparativeTargetEntryModel>data.Data;

          if (this.model.DepartmentCode) {
            this.getKPIList(this.model.DepartmentCode, true);
            this.model.DepartmentCode = String(this.model.DepartmentCode);
          }
          // if (this.model.KPICategoryCode) {
          //   this.model.KPICategoryCode = String(this.model.KPICategoryCode);
          // }
          if (this.model.YearCode) {
            this.model.YearCode = String(this.model.YearCode);
          }
          this.listModel = <ComparativeTargetParmeterListModel[]>(
            this.model.ComparativeParameterTargetParameterMappingModel
          );
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
    if (this.department.valid && this.year.valid ) {
      this.model.ComparativeParameterTargetParameterMappingModel = <
        ComparativeParameterTargetParameterMappingModel[]
      >this.listModel;
      if (this.model.Id) {
        this._ComparativeTargetEntryService.Edit(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["camparative/camparativetargetentry"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._ComparativeTargetEntryService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["camparative/camparativetargetentry"]);
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

  GetAllParameterList(kPICode, dpt) {
    
    if (kPICode || dpt) {
      this._ComparativeTargetEntryService
        .GetAllParameterList(kPICode, dpt)
        .subscribe(
          data => {
            if (data.IsSuccess) {
              
              this.listModel = <ComparativeTargetParmeterListModel[]>data.Data;
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
  
  if (
    // this.model.KPICategoryCode &&
    this.model.DepartmentCode && this.model.YearCode ) {

  this._ComparativeTargetEntryService.isDuplicateData(this.model).subscribe(
    data => {
      
       if (data.IsSuccess) {
        this.btnHide =  true;
        this._alertService.error(data.Message);
      //   if (data.Data) {
      //     const temp = <ComparativeTargetEntryModel>data.Data;
      //     this.model.Id = temp.Id;
      //     this.mappinglistModel = <ComparativeParameterTargetParameterMappingModel[]>(
      //       temp.ComparativeParameterTargetParameterMappingModel
      //     );
      //   } else {
      //     this.model.Id = this.id;
      //     if (!this.model.Id) {
      //       // this.GetAllParameterList(
      //       //   this.model.KPICategoryCode,
      //       //   this.model.DepartmentCode
      //       // );
      //     } else if (
      //       this.updateModel.Id == this.model.Id &&
      //       // this.model.KPICategoryCode == this.updateModel.KPICategoryCode &&
      //       this.model.DepartmentCode == this.updateModel.DepartmentCode
      //     ) {
      //       this.mappinglistModel = <ComparativeParameterTargetParameterMappingModel[]>(
      //         this.updateModel.ComparativeParameterTargetParameterMappingModel
      //       );
      //     }
      //   }
      } else {
        
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
