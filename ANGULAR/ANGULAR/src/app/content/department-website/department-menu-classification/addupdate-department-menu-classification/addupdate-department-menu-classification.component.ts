import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { DepartmentMenuClassificationModel } from 'src/app/Shared/Model/Master/department.model';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DepartmentMenuClassificationService } from 'src/app/Shared/Service/department-menu-classification.service';
import { UserService } from 'src/app/Shared/Service/user.service';

@Component({
  selector: 'app-addupdate-department-menu-classification',
  templateUrl: './addupdate-department-menu-classification.component.html',
  styleUrls: ['./addupdate-department-menu-classification.component.css']
})
export class AddupdateDepartmentMenuClassificationComponent implements OnInit {
//#region << Variable >>

formGroup: FormGroup;
model: DepartmentMenuClassificationModel;
title: string;
loginData: UserViewModel;
dDLList: DDLModel;
ddlDepartment: UserDepartmentViewModel[];
ImagefileValidationMsg: string;
//#endregion

//#region << constructor >>

constructor(
  private _parentApi: AppComponent,
  private readonly _DepartmentMenuClassificationService: DepartmentMenuClassificationService,
  private readonly _alertService: AlertService,
  private readonly _router: Router,
  private _route: ActivatedRoute,
  private readonly formBuilder: FormBuilder,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  private readonly _commonService: CommonService
) {
  this.model = new DepartmentMenuClassificationModel();
  const id = this._route.snapshot.params.id;
  if (id) {
    this.model.Id = id;
    this.GetById();
    this._parentApi.setpagelayout(
      "Update Department Menu Classification :",
      "keyboard_backspace",
      "Back To List",
      "department-website/department-menu-Classification"
    );
    this.title = "Update";
  } else {
    this._parentApi.setpagelayout(
      "Add Department Menu Classification :",
      "keyboard_backspace",
      "Back To List",
      "department-website/department-menu-Classification"
    );
    this.title = "Add";
  }
}

//#endregion

//#region << Method >>

ngOnInit() {
  this.FormGroupInit();
  this.GetDDLList();
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

GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.DDlKeyForDepartmentMenuClassification).subscribe(
    (data) => {
      
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}


GetById() {
  this._DepartmentMenuClassificationService.GetById(this.model.Id).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.model = <DepartmentMenuClassificationModel>data.Data;
       if(this.model.DepartmentCode)
       {
         this.model.DepartmentCode = String(this.model.DepartmentCode);
       }
       if(this.model.MenuClassificationCode)
       {
         this.model.MenuClassificationCode = String(this.model.MenuClassificationCode);
       }
      } else {
        this._alertService.error(data.Message);
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}


handleImageFileInput(event: any) {
  
  if (event.target.files.item(0).type.match("image/*")) {
    if (
      event.target.files.item(0).size <
      this._commonService.ConvertMbintoByte(
        Number(localStorage.getItem("FileValidation"))
      )
    ) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        
        this.model.IconImage = event.target.result;
        this.ImagefileValidationMsg = "";
      };
      reader.readAsDataURL(event.target.files.item(0));
    } else {
      this.ImagefileValidationMsg =  "Attachment must be less than " +
      localStorage.getItem("FileValidation") +
      " MB.";
    }
  } else {
    this.ImagefileValidationMsg = "only image/*";
  }
}

RemoveImageFile() {
  if (this.model.IconImage) {
   this.model.IconImage = null;
  }
}

SaveClick() {
  
  this.formGroup.markAllAsTouched();
  if (this.formGroup.valid) {
    if (this.model.Id) {
      this._DepartmentMenuClassificationService.Edit(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["department-website/department-menu-Classification"]);
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this._DepartmentMenuClassificationService.Add(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["department-website/department-menu-Classification"]);
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
    DepartmentCode:[null],
    MenuClassificationCode:[null],
    DisplayNameEnglish:[null, Validators.required],
    DisplayNameHindi:[null, Validators.required],
    DisplayOrder:[null],
    IsSubMenu:[null] ,
    IsActive:[null],
    IsDelete:[null],
    CreatedDate:[null] ,
    CreatedBy:[null],
    ModifiedDate:[null] ,
    ModifiedBy:[null],
    Code:[null],
    IsExternalUrl:[null],
    ExternalUrl:[null],
    InternalUrl:[null],
  });
}
//#endregion  << Method >>

}
