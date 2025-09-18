import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MenuClassificationService } from 'src/app/Shared/Service/menu-classification.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { MenuClassificationModel } from 'src/app/Shared/Model/Master/menu-classification-model';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-addupdate-menu-classification',
  templateUrl: './addupdate-menu-classification.component.html',
  styleUrls: ['./addupdate-menu-classification.component.css']
})
export class AddupdateMenuClassificationComponent implements OnInit {
 //#region << Variable >>

 formGroup: FormGroup;
 model: MenuClassificationModel;
 title: string;
 loginData: UserViewModel;
 dDLList: DDLModel;
 //#endregion

 //#region << constructor >>

 constructor(
   private _parentApi: AppComponent,
   private readonly _MenuClassificationService: MenuClassificationService,
   private readonly _alertService: AlertService,
   private readonly _router: Router,
   private _route: ActivatedRoute,
   private readonly formBuilder: FormBuilder,
   private readonly _userService: UserService,
   private readonly _authService: AuthenticationService,
   private readonly _commonService: CommonService
 ) {
   this.model = new MenuClassificationModel();
   const id = this._route.snapshot.params.id;
   if (id) {
     this.model.Id = id;
     this.GetById();
     this._parentApi.setpagelayout(
       "Update Menu Classification :",
       "keyboard_backspace",
       "Back To List",
       "department-website/menu-Classification"
     );
     this.title = "Update";
   } else {
     this._parentApi.setpagelayout(
       "Add Menu Classification :",
       "keyboard_backspace",
       "Back To List",
       "department-website/menu-Classification"
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

 }

 GetDDLList() {
   this._commonService.GetAllDDL(AppSetting.DDlKeyForMenuClassification).subscribe(
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
   this._MenuClassificationService.GetById(this.model.Id).subscribe(
     (data) => {
       if (data.IsSuccess) {
         
         this.model = <MenuClassificationModel>data.Data;
        if(this.model.ClassificationType)
        {
          this.model.ClassificationType = String(this.model.ClassificationType);
        }
        if (this.model.IsSubMenu) {
          this.model.MenuClassificationCode = String(this.model.MenuClassificationCode)
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
       this._MenuClassificationService.Edit(this.model).subscribe(
         (data) => {
           if (data.IsSuccess) {
             this._alertService.success(data.Message);
             this._router.navigate(["department-website/menu-Classification"]);
           } else {
             this._alertService.error(data.Message);
           }
         },
         (error) => {
           this._alertService.error(error.message);
         }
       );
     } else {
       this._MenuClassificationService.Add(this.model).subscribe(
         (data) => {
           if (data.IsSuccess) {
             this._alertService.success(data.Message);
             this._router.navigate(["department-website/menu-Classification"]);
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
     NameEnglish: [null, Validators.required],//, Validators.required
     NameHindi: [null],
     DisplayOrder:[null],
     Remarks:[null],
     MenuTypeMappingList: [null],
     IsSubMenu:[null],
     MenuClassificationCode:[null]
   });
 }
 //#endregion  << Method >>

}
