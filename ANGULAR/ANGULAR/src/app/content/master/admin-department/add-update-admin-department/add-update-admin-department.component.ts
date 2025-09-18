import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { FormControl, Validators } from '@angular/forms';
import { AdminDepartmentMasterModel } from 'src/app/Shared/Model/Master/admin-department.model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AdminDepartmentService } from 'src/app/Shared/Service/admin-department.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';

@Component({
  selector: 'app-add-update-admin-department',
  templateUrl: './add-update-admin-department.component.html',
  styleUrls: ['./add-update-admin-department.component.css']
})
export class AddUpdateAdminDepartmentComponent implements OnInit {


  id: number;
  model: AdminDepartmentMasterModel;
  loginData: UserViewModel;
  name = new FormControl('', [Validators.required]);
  title:string="Add";

  constructor(
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<AddUpdateAdminDepartmentComponent>,
    private readonly _adminDepartmentService: AdminDepartmentService,
    private readonly _authService: AuthenticationService,
    public readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.id = data;
      this.GetById();
    }
    this.model = new AdminDepartmentMasterModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
     }

  GetById() {
    this._adminDepartmentService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <AdminDepartmentMasterModel>data.Data;
        }
      },
      error => {
        this.model = new AdminDepartmentMasterModel();
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    
    this.name.markAsTouched();
    if (this.name.valid ) {
    if (this.model.AdmDepartmentId) {

      this._adminDepartmentService.Edit(this.model).subscribe(data => {
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
      this._adminDepartmentService.Add(this.model).subscribe(data => {
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
