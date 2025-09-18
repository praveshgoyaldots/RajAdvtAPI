import { Component, OnInit } from '@angular/core';
import { DepartmentalProgressModel, DepartmentalProgressParameterMappingModel } from 'src/app/Shared/Model/Camparetive/departmental-progress-model';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { DepartmentalProgressService } from 'src/app/Shared/Service/Comperative/departmental-progress.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { environment } from 'src/environments/environment';
import { EbookletEnumProd, EbookletEnum } from 'src/app/Shared/Enum/ebooklet.enum';

@Component({
  selector: 'app-add-update-departmental-progress',
  templateUrl: './add-update-departmental-progress.component.html',
  styleUrls: ['./add-update-departmental-progress.component.css']
})
export class AddUpdateDepartmentalProgressComponent implements OnInit {
 //#region << Variable >>

 model: DepartmentalProgressModel;
 updateModel: DepartmentalProgressModel;
 title: string;
 dDLList: DDLModel;
 listModel: DepartmentalProgressParameterMappingModel[] = [];
 department = new FormControl("", [Validators.required]);
 year = new FormControl("", [Validators.required]);
 parameterCategory = new FormControl("", null);
 Month = new FormControl("", [Validators.required]);
 category = new FormControl("", [Validators.required]);
 isDuplicate = false;
 id: number;
 ebookletEnum=environment.production?EbookletEnumProd:EbookletEnum;
 //#endregion

 //#region << constructor >>

 constructor(
   private _parentApi: AppComponent,
   private readonly _departmentalProgressService: DepartmentalProgressService,
   private readonly _alertService: AlertService,
   private readonly _router: Router,
   private _route: ActivatedRoute,
   private readonly _commonService: CommonService
 ) {
   this.model = new DepartmentalProgressModel();
   this.id = this._route.snapshot.params.id;
   if (this.id) {
     this.model.Id = this.id;
     this.GetById();
     this._parentApi.setpagelayout(
       "Update Departmental Progress Entry :",
       "keyboard_backspace",
       "Back To List",
       "camparative/departmental-progress"
     );
     this.title = "Update";
   } else {
     this._parentApi.setpagelayout(
       "Add Departmental Progress Entry :",
       "keyboard_backspace",
       "Back To List",
       "camparative/departmental-progress"
     );
     this.title = "Add";
   }
 }

 //#endregion

 //#region << Method >>

 ngOnInit() {
   this.GetDDLList();
 }

 GetDDLList() {
   this._commonService
     .GetAllDDL(AppSetting.CurrentGovernmentEntryDDLKey)
     .subscribe(
       data => {
         
         if (data.IsSuccess) {
           this.dDLList = <DDLModel>data.Data;
           if(this.dDLList.ddlComparativeParameterCategory){
             this.dDLList.ddlComparativeParameterCategory=this.dDLList.ddlComparativeParameterCategory.filter(x=>x.Value!=this.ebookletEnum.EbookletCategory);
           }
         }
       },
       error => {
         this._alertService.error(error.message);
       }
     );
 }

 getKPIList(code, isEdit = false) {
   this.isDuplicateData();
 }

 GetById() {
   this._departmentalProgressService.GetById(this.model.Id).subscribe(
     data => {
       if (data.IsSuccess) {
         
         this.model = <DepartmentalProgressModel>data.Data;
         this.updateModel = new DepartmentalProgressModel();
         this.updateModel.Id = this.model.Id;
         this.updateModel.DepartmentCode = this.model.DepartmentCode;
         this.updateModel.YearCode = this.model.YearCode;
         this.updateModel.MonthCode = this.model.MonthCode;

         if (this.model.DepartmentCode) {
           this.model.DepartmentCode = String(this.model.DepartmentCode);
         }
         if (this.model.YearCode) {
           this.model.YearCode = String(this.model.YearCode);
         }
         if (this.model.MonthCode) {
           this.model.MonthCode = String(this.model.MonthCode);
         }
         if (this.model.ParameterCategoryCode) {
          this.model.ParameterCategoryCode = String(this.model.ParameterCategoryCode);
        }
         this.listModel = <DepartmentalProgressParameterMappingModel[]>(
           this.model.DepartmentalProgressParameterMappingModel
         );
         this.updateModel.DepartmentalProgressParameterMappingModel = this.model.DepartmentalProgressParameterMappingModel;
       } else {
         this._alertService.error(data.Message);
       }
     },
     error => {
       this._alertService.error(error.message);
     }
   );
 }

 SaveClick() {
   
   this.department.markAsTouched();
   this.year.markAsTouched();
   this.parameterCategory.markAsTouched();
   this.Month.markAsTouched();
   this.category.markAsTouched();
   if (
     this.department.valid &&
     this.year.valid &&
     this.parameterCategory.valid &&
     this.category.valid &&
     this.Month.valid
   ) {
     this.model.DepartmentalProgressParameterMappingModel = <
       DepartmentalProgressParameterMappingModel[]
     >this.listModel;
     if (this.model.Id) {
       this._departmentalProgressService.Edit(this.model).subscribe(
         data => {
           if (data.IsSuccess) {
             this._alertService.success(data.Message);
             this._router.navigate(["camparative/departmental-progress"]);
           } else {
             this._commonService.ScrollingTop();
             this._alertService.error(data.Message);
           }
         },
         error => {
           this._alertService.error(error.message);
         }
       );
     } else {
       this._departmentalProgressService.Add(this.model).subscribe(
         data => {
           if (data.IsSuccess) {
             this._alertService.success(data.Message);
             this._router.navigate(["camparative/departmental-progress"]);
           } else {
             this._commonService.ScrollingTop();
             this._alertService.error(data.Message);
           }
         },
         error => {
           this._alertService.error(error.message);
         }
       );
     }
   } else {
   }
 }

 isDuplicateData() {

   this._departmentalProgressService.isDuplicateData(this.model).subscribe(
     data => {
       
       if (data.IsSuccess) {
         if (data.Data) {
           const temp = <DepartmentalProgressModel>data.Data;
           this.model.Id = temp.Id;
           this.listModel = <DepartmentalProgressParameterMappingModel[]>(
             temp.DepartmentalProgressParameterMappingModel
           );
         } else {
           this.model.Id = this.id;
           if (!this.model.Id) {

           } else if (
             this.updateModel.Id == this.model.Id &&
             this.model.ParameterCategoryCode == this.updateModel.KPICategoryCode &&
             this.model.DepartmentCode == this.updateModel.DepartmentCode
           ) {
             this.listModel = <DepartmentalProgressParameterMappingModel[]>(
               this.updateModel.DepartmentalProgressParameterMappingModel
             );
           }
         }
       } else {
         this.model.Id = this.id;
         if (!this.model.Id) {
           const temp = <DepartmentalProgressModel>data.Data;
           this.listModel = <DepartmentalProgressParameterMappingModel[]>(
             temp.DepartmentalProgressParameterMappingModel
           );

         } else if (
           this.updateModel.Id == this.model.Id &&
           this.model.YearCode == this.updateModel.YearCode &&
           this.model.MonthCode == this.updateModel.MonthCode &&
           this.model.ParameterCategoryCode == this.updateModel.ParameterCategoryCode &&
           this.model.DepartmentCode == this.updateModel.DepartmentCode
         ) {
           this.listModel = <DepartmentalProgressParameterMappingModel[]>(
             this.updateModel.DepartmentalProgressParameterMappingModel
           );
         }else{
           const temp = <DepartmentalProgressModel>data.Data;
           this.listModel = <DepartmentalProgressParameterMappingModel[]>(
             temp.DepartmentalProgressParameterMappingModel
           );
         }
       }
     },
     error => {
       this._alertService.error(error.message);
     }
   );

 }

 //#endregion  << Method >>
}
