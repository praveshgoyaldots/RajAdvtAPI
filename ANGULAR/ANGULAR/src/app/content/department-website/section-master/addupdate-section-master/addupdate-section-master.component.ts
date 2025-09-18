import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SectionMasterModel } from 'src/app/Shared/Model/section-master-model';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { SectionMasterService } from 'src/app/Shared/Service/section-master.service';
import { UserService } from 'src/app/Shared/Service/user.service';

@Component({
  selector: 'app-addupdate-section-master',
  templateUrl: './addupdate-section-master.component.html',
  styleUrls: ['./addupdate-section-master.component.css']
})
export class AddupdateSectionMasterComponent implements OnInit {

//#region << Variable >>
formGroup: FormGroup;
model: SectionMasterModel;
title: string;
loginData: UserViewModel;
//#endregion

//#region << constructor >>

constructor(
  private _parentApi: AppComponent,
  private readonly _sectionMasterService: SectionMasterService,
  private readonly _alertService: AlertService,
  private readonly _router: Router,
  private _route: ActivatedRoute,
  private readonly formBuilder: FormBuilder,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  private readonly _commonService: CommonService
) {
  this.model = new SectionMasterModel();
  const id = this._route.snapshot.params.id;
  if (id) {
    this.model.Id = id;
    this.GetById();
    this._parentApi.setpagelayout(
      "Update Section Master :",
      "keyboard_backspace",
      "Back To List",
      "/department-website/section-master"
    );
    this.title = "Update";
  } else {
    this._parentApi.setpagelayout(
      "Add Section Master :",
      "keyboard_backspace",
      "Back To List",
      "/department-website/section-master"
    );
    this.title = "Add";
  }
}

//#endregion

//#region << Method >>

ngOnInit() {
  this.FormGroupInit();
  this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
}


GetById() {
  this._sectionMasterService.GetById(this.model.Id).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.model = <SectionMasterModel>data.Data;
      } else {
        this._alertService.error(data.Message);
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}


SaveClick() {
  
  this.formGroup.markAllAsTouched();
  if (this.formGroup.valid) {
    if (this.model.Id) {
      this._sectionMasterService.Edit(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["/department-website/section-master"]);
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this._sectionMasterService.Add(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["/department-website/section-master"]);
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    }
  }
}

FormGroupInit() {
  this.formGroup = this.formBuilder.group({
    Id:[null],
    Code:[null],
    ComponentName:[null, Validators.required],
    SelectorName:[null, Validators.required],
    ShortDescription:[null],
    IsActive:[null],
    Isdeleted:[null],
    CreatedDate:[null],
    CreatedBy:[null],
    ModifiedDate:[null],
    ModifiedBy:[null],
    DefaultOrder:[null],
    NameEnglish:[null, Validators.required],
    NameHindi:[null, Validators.required],
    IsDIPRSection:[null]
  });
}
//#endregion  << Method >>

}
