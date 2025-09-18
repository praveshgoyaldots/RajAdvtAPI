import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { MonitoringParameterMasterService } from 'src/app/Shared/Service/monitoring-parameter-master.service';
import { MonitoringParameterMasterModel } from 'src/app/Shared/Model/Master/monitoring-parameters-master.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { UserViewModel, UserDepartmentViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: 'app-monitoring-parameter-master-dialog',
  templateUrl: './monitoring-parameter-master-dialog.component.html',
  styleUrls: ['./monitoring-parameter-master-dialog.component.css']
})
export class MonitoringParameterMasterDialogComponent implements OnInit {

  model: MonitoringParameterMasterModel;
  id: number;
  type = new FormControl('', [Validators.required]);
  departmentCode = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  mappingTableName = new FormControl([null]);
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  title: string;
  dDLList: DDLModel;
  constructor(private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    public _dialogRef: MatDialogRef<MonitoringParameterMasterDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _monitoringParameterMasterService: MonitoringParameterMasterService,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    if (data) {
      this.id = data;
      this.GetById();
      this.title='Update';
    }
    else {
      this.title='Add';
    }
    this.model = new MonitoringParameterMasterModel();
  }

  ngOnInit() {
  this.getDepartment();
  this.GetDDLList();
  }

  
  GetDDLList() {

    this._commonService.GetAllDDL(AppSetting.DDLMPMKey).subscribe(
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

  GetById() {
    this._monitoringParameterMasterService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <MonitoringParameterMasterModel>data.Data;
          if(this.model.Type.toLowerCase()=='DDL'.toLowerCase()){
            this.mappingTableName.setValidators([Validators.required]);
            this.mappingTableName.updateValueAndValidity();
          }else{
            this.mappingTableName.setValidators(null);
            this.mappingTableName.updateValueAndValidity();
          }

        }else{
          this.model = new MonitoringParameterMasterModel();
        }
      },
      error => {
        this.model = new MonitoringParameterMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.departmentCode.markAllAsTouched();
    this.type.markAllAsTouched();
    this.name.markAllAsTouched();
    this.mappingTableName.markAllAsTouched();
    if (this.departmentCode.valid && this.type.valid && this.name.valid && this.mappingTableName.valid) {

    if (this.model.Id) {
      this._monitoringParameterMasterService.Edit(this.model).subscribe(data => {
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
      this._monitoringParameterMasterService.Add(this.model).subscribe(data => {
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

  typeChangeEvent(event){

if (event.value.toLowerCase()==='DDL'.toLowerCase()) {
  this.mappingTableName.setValidators([Validators.required]);
  this.mappingTableName.updateValueAndValidity();
}else{
  this.mappingTableName.setValidators(null);
  this.mappingTableName.updateValueAndValidity();
}
   
  }

}
