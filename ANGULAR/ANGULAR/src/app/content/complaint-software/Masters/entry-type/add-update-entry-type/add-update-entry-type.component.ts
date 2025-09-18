import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/Shared/Service/user.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AdminDepartmentService } from 'src/app/Shared/Service/admin-department.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { ComplainEntryTypeMasterViewModel } from 'src/app/Shared/Model/Master/complain-entry-type-master-model';
import { ComplainEntryTypeMasterService } from 'src/app/Shared/Service/complain-entry-type-master.service';
@Component({
  selector: 'app-add-update-entry-type',
  templateUrl: './add-update-entry-type.component.html',
  styleUrls: ['./add-update-entry-type.component.css']
})
export class AddUpdateEntryTypeComponent implements OnInit {


  id: number;
  model: ComplainEntryTypeMasterViewModel;
  loginData: UserViewModel;
  name = new FormControl('', [Validators.required]);

  title: string = "Add";

  constructor(
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<AddUpdateEntryTypeComponent>,
    private readonly _complainEntryTypeMasterService: ComplainEntryTypeMasterService,
    private readonly _authService: AuthenticationService,
    public readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.id = data;
      this.GetById();
      this.title = 'Edit';
    }
    this.model = new ComplainEntryTypeMasterViewModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
  }

  GetById() {
    this._complainEntryTypeMasterService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <ComplainEntryTypeMasterViewModel>data.Data;
        }
      },
      error => {
        this.model = new ComplainEntryTypeMasterViewModel();
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    this.name.markAsTouched();
    if (this.name.valid) {
      if (this.model.Id) {
        this.model.ModifiedBy = this.loginData.UserId;
        this._complainEntryTypeMasterService.Edit(this.model).subscribe(data => {
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
        this._complainEntryTypeMasterService.Add(this.model).subscribe(data => {
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

