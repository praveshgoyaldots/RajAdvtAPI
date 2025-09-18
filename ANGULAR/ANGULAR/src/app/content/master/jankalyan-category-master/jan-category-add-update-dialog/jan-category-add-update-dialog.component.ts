import { Component, OnInit, Inject } from '@angular/core';
import { JANCategoryMasterModel } from 'src/app/Shared/Model/Master/jan-category-master.model';
import { FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JankalyanCategoryService } from 'src/app/Shared/Service/jankalyan-category.service';
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-jan-category-add-update-dialog',
  templateUrl: './jan-category-add-update-dialog.component.html',
  styleUrls: ['./jan-category-add-update-dialog.component.css']
})
export class JanCategoryAddUpdateDialogComponent implements OnInit {

   //#region <Variable>

  id: number;
  model: JANCategoryMasterModel;
  Name = new FormControl('', [Validators.required]);
  NameHindi = new FormControl(null);
  SubMenuNameHindi =  new FormControl(null);
  SubMenuNameEnglish =  new FormControl(null);
  MenuClassificationCode =  new FormControl(null);
  MenuClassificationPageTypeCode =  new FormControl(null);
  GeneralDepartmentDistrictMapping =  new FormControl(null);
  GeneralDepartmentDistrictMappingList =  new FormControl(null);
  IsPressRelease = new FormControl(null);
  CommonCategoryCode = new FormControl(null);
  title: string = "Add";
  dDLList: DDLModel;
  dDLDistrictDepartment: DdlItemModel[];
  selectedAllDepartmentDistrict = -1;

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    private readonly _alertService: AlertService,
    private readonly _jankalyanCategoryService: JankalyanCategoryService,
    private readonly _commonService: CommonService,
    private _route: ActivatedRoute,
    private _parentApi: AppComponent,
    private readonly _router: Router,
  ) {
   
    this.model = new JANCategoryMasterModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Jankalyan Category :",
        "keyboard_backspace",
        "Back To List",
        "master/jancategorylist"
      );
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout(
        "Add Jankalyan Category :",
        "keyboard_backspace",
        "Back To List",
        "master/jancategorylist"
      );
      this.title = "Submit";
    }
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeyForCategory).subscribe(
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
    this._jankalyanCategoryService.GetById(this.model.Id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <JANCategoryMasterModel>data.Data;
          if (this.model.MenuClassificationCode) {
            this.model.MenuClassificationCode = String(this.model.MenuClassificationCode );
          }
          if (this.model.MenuClassificationPageTypeCode) {
            this.model.MenuClassificationPageTypeCode = String(this.model.MenuClassificationPageTypeCode);
          }

           if (this.model.CommonCategoryCode) {
            this.model.CommonCategoryCode = String(this.model.CommonCategoryCode);
          }
          if (this.model.GeneralDepartmentDistrictMapping) {
            this.model.GeneralDepartmentDistrictMapping = String(this.model.GeneralDepartmentDistrictMapping);
            this.GetDepartmentList(this.model.GeneralDepartmentDistrictMapping);
          }
        }
      },
      error => {
        this.model = new JANCategoryMasterModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.Name.markAsTouched();
    this.NameHindi.markAsTouched();
    if (this.Name.valid && this.NameHindi.valid) {
      if (this.model.Id) {
        this._jankalyanCategoryService.Edit(this.model).subscribe(data => {
          if (data.IsSuccess) {

            this._alertService.success(data.Message);
            this._router.navigate(["/master/jancategorylist"]);
            // this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);

          }
        }, error => {
          console.log(error);
          this._alertService.error(error.message);
        });
      } else {
        this._jankalyanCategoryService.Add(this.model).subscribe(data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["/master/jancategorylist"]);
            // this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);
          }
        }, error => {
          console.log(error);
          this._alertService.error(error.message);
        });
      }
    }
  }

  // onNoClick(): void {
  //   this._dialogRef.close();
  // }


  GetDepartmentList(data){
    if (data) {
      this._commonService.GetDepartmentDistrictList(data).subscribe(
        data => {
          if (data.IsSuccess) {
            this.dDLDistrictDepartment = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.dDLDistrictDepartment = [];
    }
  }


  selectAllDepartment() {
    
    if (this.selectedAllDepartmentDistrict < 0) {
      this.model.GeneralDepartmentDistrictMappingList = this.dDLDistrictDepartment.map(function (a) {
        return a.Value;
      });
      this.selectedAllDepartmentDistrict = 1;
    } else {
      this.selectedAllDepartmentDistrict = -1;
      this.model.GeneralDepartmentDistrictMappingList = [];
    }
  }

  //#endregion <Method>

}
