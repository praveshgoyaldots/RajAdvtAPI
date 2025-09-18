import { AuthenticationService } from './../../../../Shared/Service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { JankalyanAdvertisementService } from 'src/app/Shared/Service/jankalyan-advertisement.service';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { ADVTJankalyanAdvertisementModel } from 'src/app/Shared/Model/advtjankalyan-advertisement-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-addupdate-jankalyan-advertisement',
  templateUrl: './addupdate-jankalyan-advertisement.component.html',
  styleUrls: ['./addupdate-jankalyan-advertisement.component.css']
})
export class AddupdateJankalyanAdvertisementComponent implements OnInit {
 //#region << Variable >>

 formGroup: FormGroup;
 model: ADVTJankalyanAdvertisementModel;
 title: string;
 loginData: UserViewModel;
 ImagefileValidationMsg: string;
 dDLList: DDLModel;
 //#endregion

 //#region << constructor >>

 constructor(
   private _parentApi: AppComponent,
   private readonly _JankalyanAdvertisementService: JankalyanAdvertisementService,
   private readonly _alertService: AlertService,
   private readonly _router: Router,
   private _route: ActivatedRoute,
   private readonly formBuilder: FormBuilder,
   private readonly _userService: UserService,
   private readonly _authService: AuthenticationService,
   private readonly _commonService: CommonService
 ) {
   this.model = new ADVTJankalyanAdvertisementModel();
   const id = this._route.snapshot.params.id;
   if (id) {
     this.model.Id = id;
     this.GetById();
     this._parentApi.setpagelayout(
       "Update Jankalyan Advertisement :",
       "keyboard_backspace",
       "Back To List",
       "advertisement/jankalyan-advertisement"
     );
     this.title = "Update";
   } else {
     this._parentApi.setpagelayout(
       "Add Jankalyan Advertisement :",
       "keyboard_backspace",
       "Back To List",
       "advertisement/jankalyan-advertisement"
     );
     this.title = "Add";
   }
 }

 //#endregion

 //#region << Method >>

 ngOnInit() {
   this.FormGroupInit();
   this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
   this.GetDDLList();
 }


 GetDDLList() {
  this._commonService
    .GetAllDDL(AppSetting.DDlKeyForJankalyanAdvertisement)
    .subscribe(
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
   this._JankalyanAdvertisementService.GetById(this.model.Id).subscribe(
     (data) => {
       if (data.IsSuccess) {
         
         this.model = <ADVTJankalyanAdvertisementModel>data.Data;
        if (this.model.AdvertisementPopupCode) {
          this.model.AdvertisementPopupCode = String(this.model.AdvertisementPopupCode);
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

 SaveClick() {
   
   this.formGroup.markAllAsTouched();
   if (this.formGroup.valid) {
     if (this.model.Id) {
       this._JankalyanAdvertisementService.Edit(this.model).subscribe(
         (data) => {
           if (data.IsSuccess) {
             this._alertService.success(data.Message);
             this._router.navigate(["advertisement/jankalyan-advertisement"]);
           } else {
             this._alertService.error(data.Message);
           }
         },
         (error) => {
           this._alertService.error(error.message);
         }
       );
     } else {
       this._JankalyanAdvertisementService.Add(this.model).subscribe(
         (data) => {
           if (data.IsSuccess) {
             this._alertService.success(data.Message);
             this._router.navigate(["advertisement/jankalyan-advertisement"]);
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
     ImageIcon: [null],
     ButtonName: [null, Validators.required],
     ImageUrl:[null,Validators.required],
     IsArrow: [null],
     DisplayOrder: [null],
     AdvertisementPopupCode: [null]
   });
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
        
        this.model.ImageIcon = event.target.result;
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
   if (this.model.ImageIcon) {
    this.model.ImageIcon = null;
   }

}




 //#endregion  << Method >>
}
