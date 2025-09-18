import { Component, OnInit, Inject } from "@angular/core";
import { NewsSubjectMasterModel } from "src/app/Shared/Model/Master/news-subject-master-model";
import { Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { NewsSubjectMasterService } from "src/app/Shared/Service/news-subject-master.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import {
  UserViewModel,
  UserDepartmentViewModel
} from "src/app/Shared/Model/user-model";
import { UserService } from "src/app/Shared/Service/user.service";

@Component({
  selector: "app-news-subject-addupdate",
  templateUrl: "./news-subject-addupdate.component.html",
  styleUrls: ["./news-subject-addupdate.component.css"]
})
export class NewsSubjectAddupdateComponent implements OnInit {
  //#region <Variable>

  id: number;
  model: NewsSubjectMasterModel;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  Name = new FormControl("", [Validators.required]);
  NameHindi = new FormControl("", [Validators.required]);
  DepartmentCode = new FormControl("", [Validators.required]);
  title: string = "Add";

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    public readonly _dialogRef: MatDialogRef<NewsSubjectAddupdateComponent>,
    private readonly _alertService: AlertService,
    private readonly _newsSubjectMasterService: NewsSubjectMasterService,
    private readonly _authService: AuthenticationService,
    private readonly _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
      this.GetById();
      this.title = "Update";
    } else {
      this.model = new NewsSubjectMasterModel();
      this.title = "Add";
    }
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
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

  GetById() {
    this._newsSubjectMasterService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <NewsSubjectMasterModel>data.Data;
          if (this.model.DepartmentCode) {
            this.model.DepartmentCode = String(this.model.DepartmentCode);
          }
        }
      },
      error => {
        this.model = new NewsSubjectMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    this.DepartmentCode.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid && this.DepartmentCode.valid) {
      if (this.model.Id) {
        this._newsSubjectMasterService.Edit(this.model).subscribe(
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
        this._newsSubjectMasterService.Add(this.model).subscribe(
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

  //#endregion <Method>
}
