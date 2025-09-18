import { CommonService } from 'src/app/Shared/Service/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { UserDepartmentViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { DepartmentSectionMappingService } from 'src/app/Shared/Service/department-section-mapping.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { DepartmentSectionMappingModel } from 'src/app/Shared/Model/department-section-mapping-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-addupdatedept-section-mapping',
  templateUrl: './addupdatedept-section-mapping.component.html',
  styleUrls: ['./addupdatedept-section-mapping.component.css']
})
export class AddupdatedeptSectionMappingComponent implements OnInit {

//#region << Variable >>

formGroup: FormGroup;
model: DepartmentSectionMappingModel;
title: string;
loginData: UserViewModel;
dDLList: DDLModel;
ddlDepartment: UserDepartmentViewModel[];
BGImagefileValidationMsg : string;
IconImagefileValidationMsg: string;
public defaultColors: string[] = [ '#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582', '#b7d5c4', '#bcd6e7', '#7c90c1', '#9d8594', '#dad0d8', '#4b4fce', '#4e0a77', '#a367b5',
'#ee3e6d', '#d63d62', '#c6a670', '#f46600', '#cf0500', '#efabbd', '#8e0622', '#f0b89a', '#f0ca68', '#62382f', '#c97545', '#c1800b'];
//#endregion

//#region << constructor >>

constructor(
  private _parentApi: AppComponent,
  private readonly _DepartmentSectionMappingService: DepartmentSectionMappingService,
  private readonly _alertService: AlertService,
  private readonly _router: Router,
  private _route: ActivatedRoute,
  private readonly formBuilder: FormBuilder,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  private readonly _commonService: CommonService
) {
  
  this.model = new DepartmentSectionMappingModel();
  const id = this._route.snapshot.params.id;
  if (id) {
    this.model.Id = id;
    this.GetById();
    this._parentApi.setpagelayout(
      "Update Department Section Mapping :",
      "keyboard_backspace",
      "Back To List",
      "department-website/department-section-mapping"
    );
    this.title = "Update";
  } else {
    this._parentApi.setpagelayout(
      "Add Department Section Mapping :",
      "keyboard_backspace",
      "Back To List",
      "department-website/department-section-mapping"
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
  this._commonService.GetAllDDL(AppSetting.DDlKeyForDepartmentSectionMapping).subscribe(
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
  
  this._DepartmentSectionMappingService.GetById(this.model.Id).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.model = <DepartmentSectionMappingModel>data.Data;
       if(this.model.DepartmentCode)
       {
         this.model.DepartmentCode = String(this.model.DepartmentCode);
       }
       if(this.model.SectionMasterCode)
       {
         this.model.SectionMasterCode = String(this.model.SectionMasterCode);
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


// handleImageFileInput(event: any) {
//   
//   if (event.target.files.item(0).type.match("image/*")) {
//     if (
//       event.target.files.item(0).size <
//       this._commonService.ConvertMbintoByte(
//         Number(localStorage.getItem("FileValidation"))
//       )
//     ) {
//       const reader = new FileReader();
//       reader.onload = (event: any) => {
//         
//         this.model.IconImage = event.target.result;
//         this.ImagefileValidationMsg = "";
//       };
//       reader.readAsDataURL(event.target.files.item(0));
//     } else {
//       this.ImagefileValidationMsg =  "Attachment must be less than " +
//       localStorage.getItem("FileValidation") +
//       " MB.";
//     }
//   } else {
//     this.ImagefileValidationMsg = "only image/*";
//   }
// }


handleImageFileInput(event: any,image:boolean) {
  
  if (event.target.files.item(0).type.match("image/*")) {
    if (
      event.target.files.item(0).size <
      this._commonService.ConvertMbintoByte(
        Number(localStorage.getItem("FileValidation"))
      )
    ) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (image) {
          this.model.BackGroundImage = event.target.result;
          this.BGImagefileValidationMsg = "";
        }
        else{
          this.model.IconImage = event.target.result;
          this.IconImagefileValidationMsg = "";
        }

      };
      reader.readAsDataURL(event.target.files.item(0));
    } else {
      this.BGImagefileValidationMsg =  "Attachment must be less than " +
      localStorage.getItem("FileValidation") +
      " MB.";
    }
  } else {
    this.BGImagefileValidationMsg = "only image/*";
  }
}

RemoveImageFile(image:boolean) {
  if (image) {
   this.model.BackGroundImage = null;
  }
  else{
    this.model.IconImage = null;
  }
}


SaveClick() {
  
  this.formGroup.markAllAsTouched();
  if (this.formGroup.valid) {
    if (this.model.Id) {
      this._DepartmentSectionMappingService.Edit(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["department-website/department-section-mapping"]);
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this._DepartmentSectionMappingService.Add(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["department-website/department-section-mapping"]);
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

    DepartmentCode:[null],
    SectionMasterCode:[null],
    NameHindi:[null, Validators.required],
    NameEnglish:[null, Validators.required],
    DisplayOrder:[null],
    IconImage:[null],
    BackGroundImage:[null],
    BackGroungColor:[null],
    BaseUrl:[null],

  });
}


setColor(data){
  
this.model.BackGroungColor=data;
}


//#endregion  << Method >>

}
