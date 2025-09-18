import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentReferenceModel } from 'src/app/Shared/Model/Master/department-reference.model';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { AppComponent } from 'src/app/app.component';
import { DepartmentSetupService } from 'src/app/Shared/Service/dpt-setup.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { DepartmentSetupModel } from 'src/app/Shared/Model/Master/department-setup.model';
import { DepartmentReferenceService } from 'src/app/Shared/Service/dpt-reference.service';

@Component({
  selector: 'app-department-reference-add-edit',
  templateUrl: './department-reference-add-edit.component.html',
  styleUrls: ['./department-reference-add-edit.component.css']
})
export class DepartmentReferenceAddEditComponent implements OnInit {
  formGroup: FormGroup;
  model: DepartmentReferenceModel;
  title:string;
  fileValidationMsg:string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  constructor(
    private _parentApi: AppComponent,
    private readonly _departmentReferenceService: DepartmentReferenceService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService
  ) {
    this.model = new DepartmentReferenceModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id=id;
      this.GetById();
      this._parentApi.setpagelayout("Update Correspondence Copy :", "keyboard_backspace", "Back To List", "master/departmentreference");
      this.title="Update";

    } else {
      this._parentApi.setpagelayout("Add Correspondence Copy :", "keyboard_backspace", "Back To List", "master/departmentreference");
      this.title="Add";
    }
  }

  ngOnInit() {
    this.FormGroupInit();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
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


GetById(){
  this._departmentReferenceService.GetById(this.model.Id)
          .subscribe(
            data => {
              if (data.IsSuccess) {
            this.model=<DepartmentReferenceModel>data.Data;
            if (this.model.DepartmentCode) {
              this.model.DepartmentCode=String(this.model.DepartmentCode);
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
      if (this.model.Id) {
        this._departmentReferenceService.Edit(this.model)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(data.Message);
                this._router.navigate(["master/departmentreference"]);
              } else {
                this._alertService.error(data.Message);
              }
            },
            error => {
              this._alertService.error(error.message);
            }
          );
      } else {
        this._departmentReferenceService.Add(this.model)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(data.Message);
                this._router.navigate(["master/departmentreference"]);
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
      DepartmentCode: [null, Validators.required],
      Reference: [null, Validators.required],
      ReferenceHindi: [null],
      OrderBy: [null],
      Post: [null],
      MobileNumber1: [null],
      MobileNumber2: [null],
      Email1: [ null, Validators.compose([ Validators.email]) ],
      Email2: [ null, Validators.compose([ Validators.email]) ]
    });
  }

}
