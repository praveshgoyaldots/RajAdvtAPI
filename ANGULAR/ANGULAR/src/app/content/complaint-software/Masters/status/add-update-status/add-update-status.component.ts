

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/Shared/Service/user.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AdminDepartmentService } from 'src/app/Shared/Service/admin-department.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';

import { ComplainEntryTypeMasterService } from 'src/app/Shared/Service/complain-entry-type-master.service';
import { ComplainStatusMasterService } from 'src/app/Shared/Service/complain-status-master.service';
import { ComplainStatusMasterViewModel } from 'src/app/Shared/Model/Master/complain-status-master-model';
@Component({
  selector: 'app-add-update-status',
  templateUrl: './add-update-status.component.html',
  styleUrls: ['./add-update-status.component.css']
})
export class AddUpdateStatusComponent implements OnInit {


  id: number;
  model: ComplainStatusMasterViewModel;
  loginData: UserViewModel;
  name = new FormControl('', [Validators.required]);

  title: string = "Add";

  constructor(
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<AddUpdateStatusComponent>,
    private readonly _complainStatusMasterService: ComplainStatusMasterService,
    private readonly _authService: AuthenticationService,
    public readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.id = data;
      this.GetById();
      this.title = 'Edit';
    }
    this.model = new ComplainStatusMasterViewModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }

  GetById() {
    this._complainStatusMasterService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <ComplainStatusMasterViewModel>data.Data;
        }
      },
      error => {
        this.model = new ComplainStatusMasterViewModel();
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    this.name.markAsTouched();
    if (this.name.valid) {
      if (this.model.Id) {
        this.model.ModifiedBy = this.loginData.UserId;
        this._complainStatusMasterService.Edit(this.model).subscribe(data => {
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
        this.model.CreatedBy = this.loginData.UserId;
        this._complainStatusMasterService.Add(this.model).subscribe(data => {
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

  Numberonly(event): boolean {
    return this._commonService.numberOnly(event);
  }
}

