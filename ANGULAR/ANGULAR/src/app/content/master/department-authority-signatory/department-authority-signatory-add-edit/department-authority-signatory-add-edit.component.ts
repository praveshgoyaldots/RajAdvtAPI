import { Component, OnInit } from '@angular/core';
import { DepartmentAuthoritySignatoryModel } from 'src/app/Shared/Model/Master/departmentauthoritysignatory.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { AppComponent } from 'src/app/app.component';
import { DepartmentAuthoritySignatoryService } from 'src/app/Shared/Service/dpt-authority-signatory.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: 'app-department-authority-signatory-add-edit',
  templateUrl: './department-authority-signatory-add-edit.component.html',
  styleUrls: ['./department-authority-signatory-add-edit.component.css']
})
export class DepartmentAuthoritySignatoryAddEditComponent implements OnInit {
  formGroup: FormGroup;
  model: DepartmentAuthoritySignatoryModel;
  title:string;
  fileValidationMsg:string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  constructor(
    private _parentApi: AppComponent,
    private readonly _departmentAuthoritySignatoryService: DepartmentAuthoritySignatoryService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService
  ) {
    this.model = new DepartmentAuthoritySignatoryModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id=id;
      this.GetById();
      this._parentApi.setpagelayout("Update Authority Signatory :", "keyboard_backspace", "Back To List", "master/departmentauthoritysignatory");
      this.title="Update";

    } else {
      this._parentApi.setpagelayout("Add Authority Signatory :", "keyboard_backspace", "Back To List", "master/departmentauthoritysignatory");
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
  this._departmentAuthoritySignatoryService.GetById(this.model.Id)
          .subscribe(
            data => {
              if (data.IsSuccess) {
            this.model=<DepartmentAuthoritySignatoryModel>data.Data;
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
        this._departmentAuthoritySignatoryService.Edit(this.model)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(data.Message);
                this._router.navigate(["master/departmentauthoritysignatory"]);
              } else {
                this._alertService.error(data.Message);
              }
            },
            error => {
              this._alertService.error(error.message);
            }
          );
      } else {
        this._departmentAuthoritySignatoryService.Add(this.model)
          .subscribe(
            data => {
              if (data.IsSuccess) {
                this._alertService.success(data.Message);
                this._router.navigate(["master/departmentauthoritysignatory"]);
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
      Name: [null, Validators.required],
      NameHindi: [null],
      Designation: [null, Validators.required],
      DesignationHindi: [null]
    });
  }
}
