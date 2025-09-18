import { OrderSubTypeMasterService } from './../../../../Shared/Service/order-sub-type-master.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { OrderSubTypeMasterModel } from 'src/app/Shared/Model/Master/order-SubType-Master-model';
import { FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Shared/Service/common.service';

@Component({
  selector: 'app-add-update-ordersubtype',
  templateUrl: './add-update-ordersubtype.component.html',
  styleUrls: ['./add-update-ordersubtype.component.css']
})
export class AddUpdateOrdersubtypeComponent implements OnInit {

  id: number;
  model: OrderSubTypeMasterModel;
  loginData: UserViewModel;
  name = new FormControl('', [Validators.required]);
  TypeCode = new FormControl('', [Validators.required]);
  department = new FormControl('', [Validators.required]);
  IsApplicableToAllDPT = new FormControl('', null);
   title:string;
  dDLList: DDLModel;
  ddlDepartment: UserDepartmentViewModel[];
  constructor(
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<AddUpdateOrdersubtypeComponent>,
    private readonly _orderSubTypeMasterService: OrderSubTypeMasterService,
    private readonly _authService: AuthenticationService,
    public readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.id = data;
      this.GetById();
      this.title = "Update";
    }
    else{
      this.model = new OrderSubTypeMasterModel();
      this.title = "Add";
    }


  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetDDLList();
    this.getDepartment();
  }

  GetById() {
    this._orderSubTypeMasterService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <OrderSubTypeMasterModel>data.Data;
          if (this.model.TypeCode) {
            this.model.TypeCode=String(this.model.TypeCode);
          }
          if (this.model.DepartmentCode) {
            this.model.DepartmentCode=String(this.model.DepartmentCode);
          }
        }
      },
      error => {
        this.model = new OrderSubTypeMasterModel();
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

  GetDDLList() {

    this._commonService.GetAllDDL(AppSetting.DDlKeyForOrderSubType).subscribe(
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

  SaveClick() {
    
    this.name.markAsTouched();
    this.TypeCode.markAsTouched();
    if (this.name.valid && this.TypeCode.valid ) {
    if (this.model.Id) {

      this._orderSubTypeMasterService.Edit(this.model).subscribe(data => {
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
      this._orderSubTypeMasterService.Add(this.model).subscribe(data => {
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
