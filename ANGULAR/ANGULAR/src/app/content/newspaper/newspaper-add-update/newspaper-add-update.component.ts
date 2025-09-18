import { NewspaperService } from "./../../../Shared/Service/newspaper.service";
import { Component, OnInit } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DDLModel, DdlItemModel, FilterDDlModel } from "src/app/Shared/Model/commonddl.model";
import {
  UserDepartmentViewModel,
  UserViewModel
} from "src/app/Shared/Model/user-model";
import { NewspaperModal } from "src/app/Shared/Model/newspaper-modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";

@Component({
  selector: "app-newspaper-add-update",
  templateUrl: "./newspaper-add-update.component.html",
  styleUrls: ["./newspaper-add-update.component.css"]
})
export class NewspaperAddUpdateComponent implements OnInit {
  //#region << Variable >>

  formGroup: FormGroup;
  model: NewspaperModal;
  title: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  dDLChairperson: DdlItemModel[];
  ddlAdminDepartment: UserDepartmentViewModel[] = [];
  filterDDlModel: FilterDDlModel[] = [];
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentApi: AppComponent,
    private readonly _newspaperService: NewspaperService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService
  ) {
    this.model = new NewspaperModal();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout(
        "News Item Update:",
        "keyboard_backspace",
        "Back To List",
        "newspaper/news"
      );
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout(
        "News Item Add:",
        "keyboard_backspace",
        "Back To List",
        "newspaper/news"
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
    this.getAdminDepartment();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.NewspaperDDLKey).subscribe(
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

  GetNewsSubjetByDepartent(code) {
    if (code) {
      this._commonService.GetNewsSubjetByDepartent(code).subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.dDLList.ddlNewspaperSubject = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  getAdminDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
          this.ddlAdminDepartment = <UserDepartmentViewModel[]>(
            this.ddlDepartment.filter(
              (UserDepartmentViewModel, i, arr) =>
                arr.findIndex(
                  t =>
                    t.AdmDepartmentCode ===
                    UserDepartmentViewModel.AdmDepartmentCode
                ) === i
            )
          );
          if (this.ddlAdminDepartment) {
            this.ddlAdminDepartment = this.ddlAdminDepartment.sort((a, b) => {
              return this._commonService.compare(
                a.AdmDepartmentTitle,
                b.AdmDepartmentTitle,
                true
              );
            });
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getDepartment(data) {
    if (data) {
      this._commonService
      .GetDepartmentByAdminDepartmentCodes(data)
      .subscribe(
        (data) => {
          
          if (data.IsSuccess) {
              this.dDLList.ddlDepartment = <DdlItemModel[]>data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  GetChairpersonList(data) {
    if (data) {
      this._commonService.GetChairpersonByMultipleCategory(data).subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.dDLChairperson = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  GetById() {
    this._newspaperService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <NewspaperModal>data.Data;
          this.GetChairpersonList(this.model.ChairpersonCategoryCodes);
          this.GetNewsSubjetByDepartent(this.model.NodalDepartmentCodes);
          this.getDepartment(this.model.AdminDepartmentCodes);
          if (this.model.SubjectCode) {
            this.model.SubjectCode = String(this.model.SubjectCode);
          }
          if (this.model.SourceTypeCode) {
            this.model.SourceTypeCode = String(this.model.SourceTypeCode);
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
      if (this.model.Date) {
        const uTCDate = new Date(
          Date.UTC(
            new Date(this.model.Date).getFullYear(),
            new Date(this.model.Date).getMonth(),
            new Date(this.model.Date).getDate()
          )
        ).toISOString();
        this.model.Date = uTCDate;
      }
      if (this.model.Id) {
        this._newspaperService.Edit(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["newspaper/news"]);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
          }
        );
      } else {
        this._newspaperService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._router.navigate(["newspaper/news"]);
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
      Topic: [null, Validators.required],
      NodalDepartmentCodes: [null, Validators.required],
      SubjectCode: [null, Validators.required],
      Date: [null],
      SourceTypeCode: [null],
      Summary: [null],
      IsVisibleToPublic: [null],
      SearchKeyword: [null],
      ChairpersonList: [null],
      ChairpersonCategory: [null],
      AdminDepartmentCodes:[null]
    });
  }

  //#endregion  << Method >>
}
