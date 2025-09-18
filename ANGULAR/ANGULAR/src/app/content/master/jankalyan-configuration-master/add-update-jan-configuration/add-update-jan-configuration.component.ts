import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { JankalyanConfigurationMasterModel } from 'src/app/Shared/Model/Master/jankalyan-configuration-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { JankalyanConfigurationService } from 'src/app/Shared/Service/jankalyan-configuration.service';

@Component({
  selector: 'app-add-update-jan-configuration',
  templateUrl: './add-update-jan-configuration.component.html',
  styleUrls: ['./add-update-jan-configuration.component.css']
})
export class AddUpdateJanConfigurationComponent implements OnInit {

   //#region <Variable>

   id: number;
   model: JankalyanConfigurationMasterModel;
   IsDIPR_IdMandatory = new FormControl('', [Validators.required]);
   title: string = "Add";
  fromGroup: FormGroup;
   //#endregion <Variable>

   //#region <Constructor>

   constructor(
     private readonly _alertService: AlertService,
     private readonly _jankalyanConfigurationService: JankalyanConfigurationService,
     private readonly _commonService: CommonService,
     private _route: ActivatedRoute,
     private _parentApi: AppComponent,
     private readonly _router: Router,
     private readonly fb: FormBuilder,
   ) {

     this.model = new JankalyanConfigurationMasterModel();
     const id = this._route.snapshot.params.id;
     if (id) {
       this.model.Id = id;
       this.GetById();
       this._parentApi.setpagelayout(
         "Update Jankalyan Configuration :",
         "keyboard_backspace",
         "Back To List",
         "master/jan-configuraton-master"
       );
       this.title = "Update";
     } else {
       this._parentApi.setpagelayout(
         "Add Jankalyan Configuration :",
         "keyboard_backspace",
         "Back To List",
         "master/jan-configuraton-master"
       );
       this.title = "Submit";
     }
   }

   //#endregion <Constructor>

   //#region <Method>

   ngOnInit() {
     this.formGroupInit();
   }
  formGroupInit() {
    
    this.fromGroup = this.fb.group({
      IsDIPR_IdMandatory: [null, Validators.required],
      Name: [null, Validators.compose([Validators.required, Validators.maxLength(100)]),],
      PhoneNo: [null, Validators.compose([Validators.required, Validators.maxLength(15)]),],
      Address: [null, Validators.compose([Validators.required, Validators.maxLength(500)]),],
      Email: [null, Validators.compose([Validators.required, Validators.email, , Validators.maxLength(100)])],
    });
  }

   GetById() {
     this._jankalyanConfigurationService.GetById(this.model.Id).subscribe(
       data => {
         if (
           (data.IsSuccess)
         ) {
           this.model = <JankalyanConfigurationMasterModel>data.Data;
         }
       },
       error => {
         this.model = new JankalyanConfigurationMasterModel();
         this._alertService.error(error.message);
       }
     );
   }

  SaveClick() {
    
    this.fromGroup.markAllAsTouched();
    if (this.fromGroup.valid) {
    // this.IsDIPR_IdMandatory.markAsTouched();
    // if (this.IsDIPR_IdMandatory.valid) {
       if (this.model.Id) {
         this._jankalyanConfigurationService.Edit(this.model).subscribe(data => {
           if (data.IsSuccess) {

             this._alertService.success(data.Message);
             this._router.navigate(["/master/jan-configuraton-master"]);
           } else {
             this._alertService.error(data.Message);

           }
         }, error => {
           console.log(error);
           this._alertService.error(error.message);
         });
       } else {
         this._jankalyanConfigurationService.Add(this.model).subscribe(data => {
           if (data.IsSuccess) {
             this._alertService.success(data.Message);
             this._router.navigate(["/master/jan-configuraton-master"]);
           } else {
             this._alertService.error(data.Message);
           }
         }, error => {
           console.log(error);
           this._alertService.error(error.message);
         });
       }
     }
    //}
   }
  numberOnly(value, isCommaOrDash: boolean = false): boolean {
    return this._commonService.numberOnly(value, isCommaOrDash);
  }
   //#endregion <Method>
}
