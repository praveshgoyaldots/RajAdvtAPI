import { Component, OnInit, Inject } from "@angular/core";
import {
  UserViewModel,
  UserDepartmentViewModel
} from "src/app/Shared/Model/user-model";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/Shared/Service/user.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { VcCreationService } from "src/app/Shared/Service/vc-creation.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { VCCreationViewModel, VCCreationModel } from "src/app/Shared/Model/vccreationView.model";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "src/app/Shared/Model/format-datepicker";
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: "app-add-update-vccreation",
  templateUrl: "./add-update-vccreation.component.html",
  styleUrls: ["./add-update-vccreation.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class AddUpdateVCCreationComponent implements OnInit {
  id: number;
  model: VCCreationModel;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  Title = new FormControl("", Validators.required);
  date = new FormControl("", Validators.required);
  Time = new FormControl("", Validators.required);
  ShortDescription = new FormControl("", Validators.required);
  Type = new FormControl("", Validators.required);
  ChairpersonCategory = new FormControl("", Validators.required);
  Chairperson = new FormControl("", Validators.required);
  // MeetingParticipant = new FormControl("", null);
  VCCategory = new FormControl("", Validators.required);
  Department = new FormControl("", Validators.required);

  minDate = new Date();
  title: string = "Add";
  tomorrow = new Date();
  dDLList: DDLModel;
  ddlParticipant: DdlItemModel[];
  pagetitle:string;
  isDate:boolean;
  constructor(
    private readonly _userService: UserService,
    private readonly _alertService: AlertService,
    public readonly _dialogRef: MatDialogRef<AddUpdateVCCreationComponent>,
    private readonly _vccCreationService: VcCreationService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
      this.GetById();
      this.pagetitle = "Vc Updation";

    }
    else{
      this.pagetitle = "Create VC";
    }
    this.model = new VCCreationModel();
    this.tomorrow.setDate(this.tomorrow.getDate());
    console.log(this.minDate);
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetDDLList();
  }

  DateHide(){
    
    if (this.model.Date) {
      const tempDate = new Date(this.model.Date);
      if ( tempDate < this.tomorrow) {
      this.isDate = false;
      this.Time.setValidators(null);
      this.Time.updateValueAndValidity();
      }
      else{
        this.Time.setValidators([Validators.required]);
        this.Time.updateValueAndValidity();
        this.isDate = true;
      }
    }
  }


  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ddlVCCreationKey).subscribe(
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

  GetById() {

    this._vccCreationService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <VCCreationModel>data.Data;
          if (this.model.Id) {
            this.model.Id = this.model.Id;
          }
          if (this.model.ChairPersonCategoryCode) {
            this.getParticipantList(this.model.ChairPersonCategoryCode);
            this.model.ChairPersonCategoryCode = String(this.model.ChairPersonCategoryCode);

          }
          if (this.model.TypeCode) {
            this.model.TypeCode = String(this.model.TypeCode);
          }
          if (this.model.ChairPersonCode) {
            this.model.ChairPersonCode = String(this.model.ChairPersonCode);
          }
          if (this.model.DepartmentCode) {
            this.model.DepartmentCode = String(this.model.DepartmentCode);
          }
          if (this.model.VCCategoryCode) {
            this.model.VCCategoryCode = String(this.model.VCCategoryCode);
          }
          this.DateHide();
        }
      },
      error => {
        this.model = new VCCreationModel();
        this._alertService.error(error.message);
      }
    );
  }


  getParticipantList(code) {
    
    if (code) {
      this._commonService.GetParticipantList(code).subscribe(
        data => {
          if (data.IsSuccess) {
            this.ddlParticipant = data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
    else{
      this.ddlParticipant = [];
    }
  }

  SaveClick() {
    
    this.Title.markAsTouched();
    this.date.markAsTouched();
    this.Time.markAsTouched();
    this.Chairperson.markAsTouched();
    this.Type.markAsTouched();
    this.ChairpersonCategory.markAsTouched();
    this.ShortDescription.markAsTouched();
    this.VCCategory.markAsTouched();
    this.Department.markAsTouched();
    if (
      this.Title.valid &&
      this.date.valid &&
      this.Time.valid &&
      this.Chairperson.valid &&
      this.Type.valid &&
      this.Department.valid &&
      this.VCCategory.valid &&
      this.ChairpersonCategory.valid &&
      this.ShortDescription.valid
    ) {
      if (this.model.Id) {

        let uTCDate = new Date(
          Date.UTC(new Date( this.model.Date).getFullYear(), new Date( this.model.Date).getMonth(), new Date( this.model.Date).getDate())
          ).toISOString();
          this.model.Date=uTCDate;

        this._vccCreationService.Edit(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._dialogRef.close(true);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            console.log(error);
            this._alertService.error(error.message);
          }
        );
      } else {

        let uTCDate = new Date(
          Date.UTC(new Date( this.model.Date).getFullYear(), new Date( this.model.Date).getMonth(), new Date( this.model.Date).getDate())
          ).toISOString();
          this.model.Date=uTCDate;

        this._vccCreationService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this._alertService.success(data.Message);
              this._dialogRef.close(true);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            console.log(error);
            this._alertService.error(error.message);
          }
        );
      }
    }
  }

  onNoClick(): void {
    this._dialogRef.close();
  }
}
