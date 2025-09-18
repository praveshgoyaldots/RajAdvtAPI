import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClassificationPageTypeModel } from 'src/app/Shared/Model/Master/classification-pagetype-model';
import { ClassificationPagetypeService } from 'src/app/Shared/Service/classification-pagetype.service';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserViewModel } from 'src/app/Shared/Model/user-model';

@Component({
  selector: 'app-addupdate-classificationpagetype',
  templateUrl: './addupdate-classificationpagetype.component.html',
  styleUrls: ['./addupdate-classificationpagetype.component.css']
})
export class AddupdateClassificationpagetypeComponent implements OnInit {
//#region << Variable >>

formGroup: FormGroup;
model: ClassificationPageTypeModel;
title: string;
loginData: UserViewModel;
ImagefileValidationMsg: string = "";

//#endregion

//#region << constructor >>

constructor(
  private _parentApi: AppComponent,
  private readonly _ClassificationPagetypeService: ClassificationPagetypeService,
  private readonly _alertService: AlertService,
  private readonly _router: Router,
  private _route: ActivatedRoute,
  private readonly formBuilder: FormBuilder,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  private readonly _commonService: CommonService
) {
  this.model = new ClassificationPageTypeModel();
  const id = this._route.snapshot.params.id;
  if (id) {
    this.model.Id = id;
    this.GetById();
    this._parentApi.setpagelayout(
      "Update Menu Classification Page Type :",
      "keyboard_backspace",
      "Back To List",
      "department-website/classification-Pagetype"
    );
    this.title = "Update";
  } else {
    this._parentApi.setpagelayout(
      "Add Menu Classification Page Type :",
      "keyboard_backspace",
      "Back To List",
      "department-website/classification-Pagetype"
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
  this._ClassificationPagetypeService.GetById(this.model.Id).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.model = <ClassificationPageTypeModel>data.Data;

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
    if (this.model.PageId==-1) {
      this._ClassificationPagetypeService.Edit(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["department-website/classification-Pagetype"]);
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this._ClassificationPagetypeService.Add(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["department-website/classification-Pagetype"]);
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


RemoveImageFile() {
  this.model.AttachmentURl = undefined;
}

handleFileInput(event: any) {
  if (event.target.files.item(0).type.match("image/*")) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.model.AttachmentURl = event.target.result;
    };
    reader.readAsDataURL(event.target.files.item(0));
    this.ImagefileValidationMsg = "";
  } else {
    this.ImagefileValidationMsg = "only accept image file ";
  }
}

FormGroupInit() {
  this.formGroup = this.formBuilder.group({
    NameEnglish: [null, Validators.required],//, Validators.required
    NameHindi: [null],
    DisplayOrder:[null],
    Remarks:[null],
    Url:[null, Validators.required],
    SampleURl:[null],
    AttachmentURl:[null],
  });
}
//#endregion  << Method >>

}
