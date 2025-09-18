import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CCCategoryMasterModel } from 'src/app/Shared/Model/Master/cc-category-master-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CCCategoryService } from 'src/app/Shared/Service/cc-category.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-update-cc-category',
  templateUrl: './add-update-cc-category.component.html',
  styleUrls: ['./add-update-cc-category.component.css']
})
export class AddUpdateCccategoryComponent implements OnInit {
  id: number;
  model: CCCategoryMasterModel;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  name = new FormControl('', [Validators.required]);
  departmentCode = new FormControl('', [Validators.required]);
  title:string="Add";
  constructor(
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<AddUpdateCccategoryComponent>,
    private readonly _ccCategoryService: CCCategoryService,
    private readonly _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.id = data;
      this.GetById();
    }
    this.model = new CCCategoryMasterModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
  }

  GetById() {
    this._ccCategoryService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <CCCategoryMasterModel>data.Data;
          if (this.model.DepartmentCode) {
            this.model.DepartmentCode=String(this.model.DepartmentCode);
          }
        }
      },
      error => {
        this.model = new CCCategoryMasterModel();
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

  SaveClick() {
    
    this.name.markAsTouched();
    this.departmentCode.markAsTouched();
    if (this.name.valid && this.departmentCode.valid) {
    if (this.model.Id) {

      this._ccCategoryService.Edit(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._dialogRef.close(true);
        }
        else {
          this._alertService.error(data.Message);

        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    }
    else {
      this._ccCategoryService.Add(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._dialogRef.close(true);
        }
        else {
          this._alertService.error(data.Message);
        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    }
  }

  }

  onNoClick(): void {

    this._dialogRef.close();
  }

 
}
