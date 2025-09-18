import { JankalyanEntryMasterService } from './../../../../Shared/Service/jankalyan-entry-master.service';
import { JankalyanEntryMasterModel } from './../../../../Shared/Model/Master/JankalyanEntryMaster.model';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-update-jankalyan-entry-master',
  templateUrl: './add-update-jankalyan-entry-master.component.html',
  styleUrls: ['./add-update-jankalyan-entry-master.component.css']
})
export class AddUpdateJankalyanEntryMasterComponent implements OnInit {
  //#region  Variable's
  id: number;
  model: JankalyanEntryMasterModel;
  loginData: UserViewModel;
  name = new FormControl('', [Validators.required]);
  DisplayOrder = new FormControl('', [Validators.required]);
  JankalyanCategoryCode = new FormControl('', [Validators.required]);
  MenuClassificationPageTypeCode = new FormControl(null);
  MenuClassificationCode = new FormControl(null);
  dDLList: DDLModel;
  selectedAllDepartmentDistrict = -1;
  dDLDistrictDepartment: DdlItemModel[];
  //#endregion

  //#region Constructor
  constructor(
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _jankalyanEntryMasterService: JankalyanEntryMasterService,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private _parentApi: AppComponent,
    private _route: ActivatedRoute,
    ) {
    if (this._route.snapshot.params.id) {
      this.id = this._route.snapshot.params.id;
      this.GetById();
      this._parentApi.setpagelayout(
        "Update Jankalyan Entry Type :",
        "keyboard_backspace",
        "Back To List",
        "master/JankalyanEntryType"
      );
    }else {
      this._parentApi.setpagelayout(
        "Add Jankalyan Entry Type :",
        "keyboard_backspace",
        "Back To List",
        "master/JankalyanEntryType"
      );
    }

    this.model = new JankalyanEntryMasterModel();
  }
  //#endregion

  //#region Method's
  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetDDLList();
  }


  GetById() {
    this._jankalyanEntryMasterService.GetById(this.id).subscribe(
      data => {
        
        if (
          (data.IsSuccess)
        ) {
          this.model = <JankalyanEntryMasterModel>data.Data;
          if (this.model.JankalyanCategoryCode) {
            this.model.JankalyanCategoryCode = String(this.model.JankalyanCategoryCode);
          }
          if (this.model.MenuClassificationCode) {
            this.model.MenuClassificationCode = String(this.model.MenuClassificationCode );
          }
          if (this.model.MenuClassificationPageTypeCode) {
            this.model.MenuClassificationPageTypeCode = String(this.model.MenuClassificationPageTypeCode);
          }
          if (this.model.GeneralDepartmentDistrictMapping) {
            this.model.GeneralDepartmentDistrictMapping = String(this.model.GeneralDepartmentDistrictMapping);
            this.GetDepartmentList(this.model.GeneralDepartmentDistrictMapping);
          }
        }
      },
      error => {
        this.model = new JankalyanEntryMasterModel();
        this._alertService.error(error.message);
      }
    );
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


  SaveClick() {
    
    this.name.markAsTouched();
    this.DisplayOrder.markAsTouched();
    this.JankalyanCategoryCode.markAsTouched();
    if (this.name.valid && this.DisplayOrder.valid && this.JankalyanCategoryCode.valid) {
    if (this.model.Id) {

      this._jankalyanEntryMasterService.Edit(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._router.navigate(["master/JankalyanEntryType"]);
        }
        else {
          this._alertService.error(data.Message);

        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    }
    else {
      this._jankalyanEntryMasterService.Add(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._router.navigate(["master/JankalyanEntryType"]);
        }
        else {
          this._alertService.error(data.Message);
        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    }
  }

  }

 numberOnly(value, isCommaOrDash: boolean = false): boolean {
  return this._commonService.numberOnly(value, isCommaOrDash);
}

  //#endregion

}
