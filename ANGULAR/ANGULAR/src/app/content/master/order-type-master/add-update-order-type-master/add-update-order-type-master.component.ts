import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderTypeModel } from 'src/app/Shared/Model/Master/order-Type-master-model';
import { DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { AppComponent } from 'src/app/app.component';
import { OrderTypeMasterService } from 'src/app/Shared/Service/order-type-master.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-add-update-order-type-master',
  templateUrl: './add-update-order-type-master.component.html',
  styleUrls: ['./add-update-order-type-master.component.css']
})
export class AddUpdateOrderTypeMasterComponent implements OnInit {
//#region << Variable >>

formGroup: FormGroup;
model: OrderTypeModel;
title: string;
dDLList: DDLModel;
ImagefileValidationMsg: string = "";
dDLDistrictDepartment: DdlItemModel[];
selectedAllDepartmentDistrict = -1;
Isvisible = false;
//#endregion

//#region << constructor >>

constructor(
  private _parentApi: AppComponent,
  private readonly _OrderTypeMasterService: OrderTypeMasterService,
  private readonly _alertService: AlertService,
  private readonly _router: Router,
  private _route: ActivatedRoute,
  private readonly formBuilder: FormBuilder,
  private readonly _userService: UserService,
  private readonly _authService: AuthenticationService,
  private readonly _commonService: CommonService
) {
  this.model = new OrderTypeModel();
  const id = this._route.snapshot.params.id;
  if (id) {
    
    this.model.Id = id;
    this.GetById();
    this._parentApi.setpagelayout(
      "Update Order Type :",
      "keyboard_backspace",
      "Back To List",
      "master/order-Type-Master"
    );
    this.title = "Update";
    this.Isvisible = true;
  } else {
    this._parentApi.setpagelayout(
      "Add Order Type :",
      "keyboard_backspace",
      "Back To List",
      "master/order-Type-Master"
    );
    this.title = "Add";
  }
}

//#endregion

//#region << Method >>

ngOnInit() {
  this.FormGroupInit();
  this.GetDDLList();

}

GetDDLList() {
  this._commonService.GetAllDDL(AppSetting.DDLKeyForOrderType).subscribe(
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
  this._OrderTypeMasterService.GetById(this.model.Id).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.model = <OrderTypeModel>data.Data;
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
         else {
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
      this._OrderTypeMasterService.Edit(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["master/order-Type-Master"]);
          } else {
            this._alertService.error(data.Message);
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this._OrderTypeMasterService.Add(this.model).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(["master/order-Type-Master"]);
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
    Name: [null, Validators.required],//, Validators.required
    NameHindi: [null],
		ShortName: [null],
		IsSystemGenerated: [null],
		ReportOrderType: [null],
		IsDateMandatory: [null],
		IsDocumentNoMandatory: [null],
		ImagePath: [null],
		SubMenuNameHindi: [null],
		SubMenuNameEnglish: [null],
		MenuClassificationCode: [null],
		MenuClassificationPageTypeCode: [null],
		GeneralDepartmentDistrictMapping: [null],
		GeneralDepartmentDistrictMappingList: [null],
    CommonCategoryCode : [null],
    IsShowInJankalyan : [null]
  });
}

RemoveImageFile() {
  this.model.ImagePath = undefined;
}

handleFileInput(event: any) {
  if (event.target.files.item(0).type.match("image/*")) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.model.ImagePath = event.target.result;
    };
    reader.readAsDataURL(event.target.files.item(0));
    this.ImagefileValidationMsg = "";
  } else {
    this.ImagefileValidationMsg = "only *image file accepted ";
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

//#endregion  << Method >>
}
